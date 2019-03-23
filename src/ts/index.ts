#!/usr/bin/env node

import Argv from "./argv";

function start(): void {
	console.log(Argv.get());
}

start();
