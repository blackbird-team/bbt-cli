import { uniq, concat, join, size, findIndex, trim } from "lodash";
import { execSync } from "child_process";
import request from "request";
import { waitIn } from "./printInController";
import Messages from "./../data/messages";

class DepsInstaller {
	static list = {
		dev: [],
		prod: []
	};

	static append(type, array) {
		DepsInstaller.list[type] = uniq(concat(DepsInstaller.list[type], array));
	}

	static async install(type) {
		Messages.replace("modulesCheckStart", [type]);
		await DepsInstaller.check(type);
		Messages.replace("modulesCheckEnd", [type]);
		Messages.replace("modulesInstallStart", [type]);
		const res = await DepsInstaller.step(type);
		if (res === "done") Messages.replace("modulesInstallFinish", [type]);
	}

	static async check(type, index = 0) {
		if (index >= size(DepsInstaller.list[type])) return;
		const module = DepsInstaller.list[type][index];
		await DepsInstaller.checkStep(type, module, index);
		await DepsInstaller.check(type, index + 1);
	}

	static async checkStep(type, module) {
		const resu = await DepsInstaller.request(module);
		await DepsInstaller.requestHandler(resu, type, module);
	}

	static async step(type) {
		try {
			const t = type === "dev" ? "-D" : "-S";
			const modules = join(DepsInstaller.list[type], " ");
			execSync(`npm i  ${t} ${modules} --loglevel silent`, {
				stdio: [0, "pipe", 2]
			});
			return "done";
		} catch (e) {
			Messages.replace("modulesInstallFail", [type, e.message]);
			return e;
		}
	}

	static reset() {
		DepsInstaller.list = {
			dev: [],
			prod: []
		};
	}

	static request(module) {
		return new Promise(resolve => {
			request(`https://registry.npmjs.org/${module}`, (error, response) =>
				resolve({ error, response })
			);
		});
	}

	static async requestHandler(res, type, module) {
		if (res.error) {
			Messages.replace("moduleCheckError", [module, res.error.message]);
		} else if (res.response) {
			if (res.response.statusCode === 200) {
				Messages.replace("moduleCheckSuccess", [res.response.statusCode, module]);
				return;
			}
			Messages.replace("requestStatusCode", [res.response.statusCode]);
		}

		await DepsInstaller.depInput(type, module);
		// await this.checkGit();
	}

	static async depInput(type, module) {
		Messages.replace("moduleCheckFail", [module]);
		const newDep = await waitIn(-9);
		const index = findIndex(DepsInstaller.list[type], val => val === module);
		if(size(trim(newDep)) > 0) DepsInstaller.list[type].splice(index, 1, newDep);
		if(newDep === "NOT") DepsInstaller.list[type].splice(index, 1);
		else await DepsInstaller.checkStep(type, newDep, index);
	}
}

export default DepsInstaller;
