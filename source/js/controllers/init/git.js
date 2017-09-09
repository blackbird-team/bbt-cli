import { execSync } from "child_process";
import { red, yellow, green } from "colors";
import { waitIn } from "~/controllers/printInController";
import Messages from "@/messages";

class GitInit {
	constructor(options) {
		this.argv = options.argv;
		this.remoteName = "origin";
	}

	async init() {
		if(this.argv.github === "later") {
			Messages.console("setRemoteRepoPostponed");
			return;
		};

		GitInit.checkoutLocal();
		await this.appendRemote();

		console.log(green("----------------\r\n"));
	}

	static checkoutLocal() {
		try {
			execSync("git status");
			console.log(yellow("  Git already initialized"));
		} catch (e) {
			Messages.clear(-1);
			GitInit.gitInit();
		}
	}

	static gitInit() {
		try {
			console.log("  Git init...");
			execSync("git init");
			console.log(`  Git init ${green("success")}`);
		} catch (e) {
			console.log(`  Git init ${red("failed")}`);
		}
	}

	async appendRemote() {
		if (this.argv.github === "later") return;
		try {
			console.log(`\r\n  Git remote add "${this.remoteName}"...`);
			execSync(`git remote add ${this.remoteName} ${this.argv.github}`);
			console.log(`  Git remote add ${green("success")}`);
			return;
		} catch (e) {
			console.log(`  Git remote add ${red("failed")}`);
			await this.change();
		}
	}

	async change() {
		global.console.log(`\r\n  0 - Rename remote for URI: ${this.argv.github}`);
		global.console.log(
			`  1 - Change exist URI for remote "${this.remoteName}"`
		);
		global.console.log(`Yout choice? (0 or 1):`);

		const res = await waitIn(-5);

		switch (res) {
			case "0":
				await this.changeRemoteName();
				break;
			case "1":
				this.changeRemote();
				break;
			default:
				await this.change();
				break;
		}
	}

	async changeRemoteName() {
		global.console.log(`\r\n Retry remote name:  `);
		await waitIn()
			.then(result => {
				this.remoteName = result;
			})
			.catch(console.error);
		await this.appendRemote();
	}

	changeRemote() {
		execSync(`git remote set-url ${this.remoteName} ${this.argv.github}`);
	}
}

module.exports = GitInit;
