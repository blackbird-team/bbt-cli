import { yellow } from "colors";
import Lint from "~/controllers/lint";

const handler = argv => {
	const lint = new Lint({ argv });
	lint.init();
};

module.exports = {
	command: "lint",
	desc: `Append ${yellow("ESLint")} dependencies`,
	alias: "l",
	handler,
	builder: {
		bbt: {
			type: "boolean",
			desc: `Special option for ${yellow(
				"BlackBird Team"
			)} Tech Rules support`
		},
		configs: {
			type: "array",
			alias: "c",
			desc: "Set extends configurations"
		},
		plugins: {
			type: "array",
			alias: "p",
			desc: "Set plugins"
		},
		type: {
			type: "string",
			alias: "t",
			desc: `Type of project: \r\n["front", "service", "back", "standalone", "npm"]`
		},
		fast: {
			type: "boolean",
			alias: "f",
			desc: "It will use only defaults and not prompt you for most options"
		}
	}
};
