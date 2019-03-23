#!/usr/bin/env node

import {Argv} from "./argv";

function start(): void {
	const argv = Argv.parse();
	console.log(argv.get());
	console.log(argv.getFlags());
}

start();
