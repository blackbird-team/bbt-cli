import { yellow } from "colors";
import Init from "~/controllers/init";

const handler = argv => {
	const init = new Init({ argv });
	init.init();
};

module.exports = {
	command: "init",
	desc: `Initialization of the project`,
	handler,
	builder: {
		bbt: {
			type: "boolean",
			desc: `Special option for ${yellow(
				"BlackBird Team"
			)} Tech Rules support`
		},
		github: {
			type: "string",
			alias: "gh",
			desc: "URI GitHub repository as remote origin"
		},
		npm: {
			type: "boolean",
			default: true,
			desc: "npm init"
		},
		type: {
			type: "string",
			alias: "t",
			demand: false,
			desc: `Type of project: \r\n["front", "service", "back", "standalone", "npm"]`
		},
		fast: {
			type: "boolean",
			alias: "f",
			default: false,
			desc: "it will use only defaults and not prompt you for most options"
		}
	}
};
