#!/usr/bin/env node

import Argv from "./argv";
import { Router } from "./routing";
import Version from "./utils/version";

const router = new Router();

function start(): void {
	Version();
	router.handleRoute(Argv.getRoutes());
}

try {
	start();
} catch (err) {
	console.log("\n   " + err.message + "\n");
	console.log("\n   " + "Please call --help");
	console.log("\n   " + "Or see documentation\n   https://github.com/blackbird-team/bbt-cli" + "\n\n");

	process.stdin.write("\n   " + "Exit? (Y/n) ");
	if (process.stdin.setRawMode) process.stdin.setRawMode(true);

	process.stdin.on("readable", function(): void {
		const key = String(process.stdin.read());
		if (key === "q") {
			process.stdin.write("\n");
			process.exit(0);
		}
		console.log(key + "\n\n\n");
	});
}
