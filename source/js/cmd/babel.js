import { yellow } from "colors";
import Babel from "~/controllers/babel";

const handler = argv => {
	const babel = new Babel({ argv });
	babel.init();
};

module.exports = {
	command: "babel",
	desc: `Append ${yellow("Babel")} dependencies`,
	alias: "b",
	handler,
	builder: {
		bbt: {
			type: "boolean",
			desc: `Special option for ${yellow(
				"BlackBird Team"
			)} Tech Rules support`
		},
		presets: {
			type: "array",
			alias: "ps",
			desc: "Set extend presets"
		},
		plugins: {
			type: "array",
			alias: "pl",
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
