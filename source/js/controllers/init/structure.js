import { createReadStream } from "fs";
import { resolve } from "path";
import { green, red } from "colors";
import unzip from "unzip";
import { EventEmitter } from "events";

class Structure  extends EventEmitter {
	constructor(options) {
		super();
		this.argv = options.argv;
		this.zip = resolve(__dirname, `./../../../projectsStructures/${this.argv.type}-bbt.zip`);
	}

	init() {
		const path = resolve("./");

		createReadStream(this.zip)
			.on("error", this.errorHandler.bind(this))
			.pipe(unzip.Extract({ path }))
			.on("close", this.doneHandler.bind(this));
	}

	errorHandler() {
		console.log(red("Structure not been created\r\n"));

		this.emit("done");
	}

	doneHandler() {
		console.log(`Structure has been ${green("created")}\r\n`);
		this.emit("done");
	}
}

export default Structure;
