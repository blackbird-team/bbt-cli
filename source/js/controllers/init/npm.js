import path from "path";
import { execSync } from "child_process";
import { red } from "colors";
import fs from "fs";
// import Messages from "@/messages";
import def from "@/package.default";

class NpmInit {
	constructor(options) {
		this.argv = options.argv;
	}

	async init() {
		await NpmInit.copyDefault();
		this.cmd();
	}

	static copyDefault() {
		try {
			const ori = path.resolve("./package.json");
			if (fs.existsSync(ori)) return;
			fs.writeFileSync(ori, JSON.stringify(def, null, 2), "utf8");
			console.log("def copy");
		} catch (e) {
			console.log(e);
		}
	}

	cmd() {
		global.console.log("npm init");
		try {
			let command = `npm init`;
			command += this.argv.fast ? ` -y` : ``;
			execSync(command, { stdio: [0, 1, 2] });
			global.console.log("npm init success");
		} catch (e) {
			global.console.log(red(`npm init aborted`));
		}
	}
}

module.exports = NpmInit;
