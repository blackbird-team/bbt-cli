#!/usr/bin/env node

import yargs from "yargs";
import { red } from "colors";
import Messages from "@/messages";

const failHandler = (msg, err, self) => {
	if (err) throw err;
	console.log(self.help());
	console.log(red(msg));
	process.exit(1);
};

// eslint-disable-next-line
const argv = yargs
	.fail(failHandler)
	.usage(Messages.getReplace("use", ["0.0.1"], true))
	.commandDir("cmd")
	.alias("i", "init")
	.help("h")
	.alias("h", "help").argv;

// Test console
// console.log(`Argv`, argv);
// console.log(`Commands: ${command}`);
