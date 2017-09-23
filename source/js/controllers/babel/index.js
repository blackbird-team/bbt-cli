import { resolve } from "path";
import { existsSync, writeFileSync, readFileSync } from "fs";
import { each, union } from "lodash";
import DepsInstaller from "~/controllers/depsInstaller";
import BabelPluginOptions from "@/babelPluginOptions";
// import Messages from "@/messages";

class Babel {
	argv = null;
	config = null;
	pathConfig = resolve("./.babelrc");

	constructor(options) {
		this.argv = options.argv;
		DepsInstaller.append("dev", ["babel-core", "babel-cli"]);
	}

	async init(install = true) {
		this.getConfig();

		each(this.argv.presets, val => {
			this.appendPreset(val);
		});

		each(this.argv.plugins, val => {
			this.appendPlugin(val);
		});

		if (install === true) await Babel.installDeps();
		this.saveConfig();
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
		this.config = {
			presets: [],
			plugins: []
		};
	}

	appendPreset(name) {
		this.config.presets = union(this.config.presets, [name]);
		DepsInstaller.append("dev", `babel-preset-${name}`);
	}

	appendPlugin(name) {
		const plug = [name];
		const opt = BabelPluginOptions[name];
		if (typeof opt === "object") {
			const rules = this.argv.bbt ? opt.bbt : opt.common;
			plug.push(rules);
		}
		this.config.plugins.push(plug);
		DepsInstaller.append("dev", name);
	}

	static async installDeps() {
		// Messages.console("commandInitStart");

		try {
			await DepsInstaller.install("dev");
			// Messages.console("lintInstallDepsSuccess");
		} catch (e) {
			// Messages.console("lintInstallDepsFail");
		}
	}

	saveConfig() {
		// Messages.console("lintConfigWriteStart");

		try {
			writeFileSync(
				this.pathConfig,
				JSON.stringify(this.config, null, 2),
				"utf8"
			);

			// Messages.console("lintConfigWriteDone");
			// Messages.console("commandLintSuccess");
		} catch (e) {
			console.log(".babelrc save fail");
		}
	}
}

export default Babel;
