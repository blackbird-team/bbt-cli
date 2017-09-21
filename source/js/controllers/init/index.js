import DepsInstaller from "~/controllers/depsInstaller";
import StructureDependencies from  "@/structureDependencies";
import Babel from "~/controllers/babel";
import Lint from "~/controllers/lint";
import Messages from "@/messages";
import ParamParser from "./paramParser";
import GitInit from "./git";
import NpmInit from "./npm";
import Structure from "./structure";

class Init {
	constructor(options) {
		this.argv = options.argv;

		this.parser = new ParamParser(options);
		this.git = new GitInit(options);
		this.npm = new NpmInit(options);
		this.structure = new Structure(options);
	}

	init() {
		Messages.console("commandInitStart");

		this.parser
			.init()
			.then(this.gitInit.bind(this))
			.then(this.npmInit.bind(this))
			.then(this.createStructure.bind(this))
			.then(this.appendBabel.bind(this))
			.then(this.appendLint.bind(this))
			.then(this.installDeps.bind(this))
			.then(Init.firstCommit)
			.then(this.success.bind(this));
	}

	success() {
		Messages.success(this.argv);
		process.stdin.end();
		process.exit(0);
	}

	async gitInit() {
		Messages.replace("step", [3]);

		if (typeof this.argv.github === "undefined") return;
		await this.git.init();
	}

	async npmInit() {
		Messages.replace("step", [4]);

		if (this.argv.npm === false) return;
		await this.npm.init();
	}

	createStructure() {
		Messages.replace("step", [5]);

		if (this.argv.bbt === false) return false;
		return new Promise(resolve => {
			this.structure.init();
			this.structure.on("done", resolve);
		});
	}

	async appendBabel() {
		this.argv.presets = StructureDependencies[this.argv.type].babel.presets;
		this.argv.plugins = StructureDependencies[this.argv.type].babel.plugins;
		const babel = new Babel({ argv: this.argv });
		await babel.init(false);
	}

	async appendLint() {
		this.argv.configs = StructureDependencies[this.argv.type].lint.configs;
		this.argv.plugins = StructureDependencies[this.argv.type].lint.plugins;
		const lint = new Lint({ argv: this.argv });
		await lint.init(false);
	}

	async installDeps(type = null) {
		if(type == null) {
			Messages.replace("step", [6]);
			DepsInstaller.append("dev", StructureDependencies[this.argv.type].dev);
			await this.installDeps("dev");

			DepsInstaller.append("prod", StructureDependencies[this.argv.type].prod);
			await this.installDeps("prod");
		} else {
			try {
				await DepsInstaller.install(type);
				Messages.console("lintInstallDepsSuccess");
			} catch (e) {
				Messages.console("lintInstallDepsFail");
			}
		}
	}

	static firstCommit(){
		Messages.replace("step", [7]);

		try {
			GitInit.firstCommit();
			Messages.console("firstCommitSuccess");
		} catch(e) {
			Messages.console("firstCommitFail");
		}
	}
}

export default Init;
