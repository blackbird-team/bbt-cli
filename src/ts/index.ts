#!/usr/bin/env node

import { parseArgs } from "./parameters";

function start(): void {
	console.log("Works");
	parseArgs(process.argv);
}

start();
