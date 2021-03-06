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
		} catch (e) {
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
	requestStatusCode: ["", `    ${red("Error:")} StatusCode: {sss}`, ""],
	modulesCheckStart: ["", `    Check list of dependencies for {sss}...`, ""],
	modulesCheckEnd: ["", `    Check {sss} dependencies ${green("comlete")}`, ""],
	modulesInstallStart: [`    Instalation dependencies for {sss}...`],
	modulesInstallFinish: [
		`    Instalation {sss} dependencies ${green("comlete")}`
	],
	modulesInstallFail: [
		"",
		`    Instalation {sss} dependencies ${red("FAILED")} with {sss}`,
		""
	],
	moduleCheckError: [
		"",
		`    Check module {sss} ${red("FAILED")} with: {sss}`,
		""
	],
	moduleCheckFail: [
		`    Check module {sss} ${red("FAILED")}`,
		"",
		yellow("  Enter the correct module name"),
		"    Or type 'NOT' for not install this module:",
		""
	],
	moduleCheckSuccess: [`      ${green("{sss}")} {sss}`],
	commandLintStart: [
		"",
		green("====================="),
		green("  ESLint Initialization"),
		green("----------------"),
		"",
		"   Install ESLint dependencies..."
	],
	commandLintSuccess: [
		"",
		green("====================="),
		green("  ESLint initialization successfully completed"),
		green("====================="),
		"",
	],
	lintInstallDepsSuccess: [
		"",
		`   Install ESLint dependencies ${green("completed")}`,
		""
	],
	lintInstallDepsFail: [
		"",
		red("====================="),
		red("  ESLint init failed"),
		red("====================="),
		""
	],
	lintConfigWriteStart: [
		`   Write file config ${yellow(".eslintrc")}...`
	],
	lintConfigWriteDone: [
		`   Write ESLint config ${green("done")}`
	],
	firstCommitSuccess: [
		`First commit ${green("created")}`,
		""
	],
	firstCommitFail: [
		`Something went ${red("wrong")} with "First commit"`,
		`Maybe is already done. Check it:`,
		yellow("git log --oneline -5"),
		""
	]

};

export default Messages;
