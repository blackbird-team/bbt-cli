import { red, yellow, green } from "colors";
import { join, map, each } from "lodash";
import path from "path";
import readline from "readline";
import fs from "fs";

const Messages = {
	use: [
		`${green("BBT-CLI")} version: ${green("{sss}")}`,
		`\r\n`,
		`See documentation on https://github.com/blackbird-team/bbt-cli`
	],
	step: ["Step {sss}", green("----------------")],
	getReplace: (field, param, j = false) => {
		const rx = /{sss}/g;
		let i = -1;
		const res = map(Messages[field], val =>
			val.replace(rx, () => {
				i += 1;
				return param[i];
			})
		);

		return j ? join(res, "") : res;
	},
	replace: (field, param) => {
		const mes = Messages.getReplace(field, param);
		each(mes, val => {
			console.log(val);
		});
	},

	console: field => {
		each(Messages[field], val => {
			console.log(val);
		});
	},

	clear: number => {
		readline.moveCursor(process.stdout, null, number);
		readline.cursorTo(process.stdout, 0, null);
		readline.clearScreenDown(process.stdout);
	},

	success: argv => {
		let pack = null;

		try {
			pack = fs.readFileSync(path.resolve("./package.json"));
			pack = JSON.parse(pack);
		} catch(e) {
			// console
		}

		console.log(green("\r\n====================="));
		console.log(green("  Project initialization completed"));
		console.log(green("----------------"));
		console.log(`  Name: "${pack.name}"`);
		console.log(`  Version: ${pack.version}`);
		console.log(`  Type: ${argv.type}`);
		console.log(`  Remote repository: ${argv.github}`);
		console.log(green("=====================\r\n"));
	},
	commandInitStart: [
		"",
		green("====================="),
		green("  Project Initialization"),
		green("----------------"),
		""
	],
	selectProjectType: [
		`  Selected project type ${yellow("{sss}")}`,
		green("----------------"),
		""
	],
	selectProjectTypeFail: [
		"",
		`${red("Error:")} {sss}`,
		"",
		yellow("  Select type of project:"),
		`    Available types: [{sss}]`,
		""
	],
	setRemoteRepo: [
		`  Remote repository ${yellow("{sss}")}`,
		green("----------------"),
		""
	],
	setRemoteRepoPostponed: [
		"  The choice GITHUB remote repository is postponed",
		green("----------------"),
		""
	],
	setRemoteRepoFail: [
		yellow("  Input github repositoy URI"),
		"    Or type 'later' for to postpone that:",
		""
	],
	setRemoteRepoFailUndefined: [
		"",
		`  ${red("Error:")} Remote repository undefined`,
		""
	],
	setRemoteRepoFailError: ["", `  ${red("Error:")} {sss}`, ""],
	requestStatusCode: ["", `  ${red("Error:")} StatusCode: {sss}`, ""]
};

export default Messages;
