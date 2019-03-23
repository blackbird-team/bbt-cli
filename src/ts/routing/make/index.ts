import { writeFileSync } from "fs";
import { parse, join } from "path";

import { IRoute } from "./../index";
import Ignore from "./git/ignore";

export class Make implements IRoute {
	public handleRoute(docs: string[]): void {
		for (let doc of docs) {
			if (doc === ".gitignore") {
				console.log("Write file .gitignore...");
				console.log(join(parse(process.cwd()).dir, ".gitignore"),)
				writeFileSync(join(parse(process.cwd()).dir, ".gitignore"), Ignore.common.join("\n"));
				console.log("File .gitignore was created.");
			} else throw new Error(`Creating for '${doc}' not implemented`);
		}
	}

}