import { each } from "lodash";
import fs from "fs";
import path from "path";
import DepsInstaller from "~/controllers/depsInstaller";
import Messages from "@/messages";

class Lint {
	argv = null;
	config = { extends: [] };

	constructor(options) {
		this.argv = options.argv;
		DepsInstaller.append("dev", "eslint");
	}

	init() {
		each(this.argv.configs, val => {
			if (val === "prettier") DepsInstaller.append("dev", "prettier");
			this.appendExtends(val);
		});

		each(this.argv.plugins, val => {
			if (val === "babel") this.appendBabel();
			if (val === "pre-commit") Lint.appendPreCommit();
		});

		Lint.installDeps().then(this.saveConfig.bind(this));
	}

	appendExtends(name) {
		this.config.extends.push(name);
		DepsInstaller.append("dev", `eslint-config-${name}`);
	}

	appendBabel() {
		this.config.parser = "babel-eslint";
		this.config.parserOptions = {
			ecmaVersion: 6,
			sourceType: "module"
		};
	}

	static appendPreCommit() {
		DepsInstaller.append("dev", "lint-staged");
		DepsInstaller.append("dev", "pre-commit");

		let file = {};
		const p = path.resolve("./package.json");

		try {
			const q = fs.readFileSync(p);
			file = JSON.parse(q);
		} catch (e) {
			console.log("package.json corrupted");
		}

		file.scripts["lint-stage"] = "lint-staged";
		file["pre-commit"] = "lint-staged";
		file["lint-staged"] = { "*.js": "eslint" };

		fs.writeFileSync(p, JSON.stringify(file, null, 2));
	}

	static async installDeps() {
		Messages.console("commandLintStart");

		try {
			await DepsInstaller.install("dev");
			Messages.console("lintInstallDepsSuccess");
		} catch (e) {
			Messages.console("lintInstallDepsFail");
		}
	}

	saveConfig() {
		Messages.console("lintConfigWriteStart");

		try {
			const p = path.resolve(`./.eslintrc`);
			fs.writeFileSync(p, JSON.stringify(this.config, null, 2), "utf8");

			Messages.console("lintConfigWriteDone");
			Messages.console("commandLintSuccess");
		} catch (e) {
			console.log(".eslintrc save fail")
		}
	}
}

export default Lint;
