import Messages from "@/messages";
import ParamParser from "./paramParser";
import GitInit from "./git";
import NpmInit from "./npm";

class Init {
	constructor(options) {
		this.argv = options.argv;

		this.parser = new ParamParser(options);
		this.git = new GitInit(options);
		this.npm = new NpmInit(options);
	}

	init() {
		Messages.console("commandInitStart");

		this.parser
			.init()
			.then(this.gitInit.bind(this))
			.then(this.npmInit.bind(this))
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
}

export default Init;
