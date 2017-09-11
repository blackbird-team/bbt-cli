import { each } from "lodash";
import { existsSync, writeFileSync, readFileSync } from "fs";
import { resolve } from "path";
import DepsInstaller from "~/controllers/depsInstaller";
import Messages from "@/messages";

class Lint {

	argv = null;
	config = null;
	pathConfig = resolve("./.eslintrc");

	constructor(options) {
		this.argv = options.argv;
		DepsInstaller.append("dev", "eslint");
	}

	init() {
		this.getConfig();

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

	getConfig() {
		if (existsSync(this.pathConfig)) this.setLocalConfig();
		else this.setDefaultConfig();
	}

	setLocalConfig() {
		try {
			const q = readFileSync(this.pathConfig);
			this.config = JSON.parse(q);
		} catch (e) {
			this.setDefaultConfig();
		}
	}

	setDefaultConfig() {
		this.config = { extends: [] };
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
		const p = resolve("./package.json");

		try {
			const q = readFileSync(p);
			file = JSON.parse(q);
		} catch (e) {
			console.log("package.json corrupted");
		}

		file.scripts["lint-stage"] = "lint-staged";
		file["pre-commit"] = "lint-staged";
		file["lint-staged"] = { "*.js": "eslint" };

		writeFileSync(p, JSON.stringify(file, null, 2));
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
			writeFileSync(this.pathConfig, JSON.stringify(this.config, null, 2), "utf8");

			Messages.console("lintConfigWriteDone");
			Messages.console("commandLintSuccess");
		} catch (e) {
			console.log(".eslintrc save fail")
		}
	}
}

export default Lint;
