import request from "request";
import { includes, join } from "lodash";
import { waitIn } from "~/controllers/printInController";
import Messages from "@/messages";

class ParamParser {
	constructor(options) {
		this.argv = options.argv;
	}

	async init() {
		Messages.replace("step", [1]);
		await this.checkType();

		Messages.replace("step", [2]);
		await this.checkGit();
	}

	async checkType() {
		const valid = ["front", "service", "back", "standalone", "npm"];

		if (includes(valid, this.argv.type)) {
			Messages.replace("selectProjectType", [this.argv.type]);
			return;
		}

		const message =
			typeof this.argv.type === "undefined"
				? `Project type can't be undefined`
				: `Project type "${this.argv.type}" not available`;

		Messages.replace("selectProjectTypeFail", [message, join(valid, ", ")]);

		this.argv.type = await waitIn();
		await this.checkType();
	}

	async checkGit() {
		if (typeof this.argv.github === "undefined") {
			Messages.console("setRemoteRepoFailUndefined");
			await this.gitInput();
		}

		if (this.argv.github === "later") {
			Messages.console("setRemoteRepoPostponed");
			return;
		}

		const resu = await this.request();
		await this.requestHandler(resu);
	}

	request() {
		return new Promise(resolve => {
			request(this.argv.github, (error, response) =>
				resolve({ error, response })
			);
		});
	}

	async requestHandler(res) {
		if (res.error) {
			Messages.replace("setRemoteRepoFailError", [res.error.message]);
		} else if (res.response) {
			if (res.response.statusCode === 200) {
				Messages.replace("setRemoteRepo", [this.argv.github]);
				return;
			}
			Messages.replace("requestStatusCode", [res.response.statusCode]);
		}

		await this.gitInput();
		await this.checkGit();
	}

	async gitInput() {
		Messages.console("setRemoteRepoFail");
		this.argv.github = await waitIn();
	}
}

export default ParamParser;
