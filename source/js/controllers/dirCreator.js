import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import mkdirp from "mkdirp";
import { each } from "lodash";

class DirCreator {
	static create(options) {
		each(options, val => {
			DirCreator.checkDir(val.dir).then(() => {
				each(val.files, file => {
					writeFileSync(resolve(`./${val.dir}/${file.name}`), file.source, "utf8");
				});
			});
		});
	}

	static checkDir(path) {
		const dir = resolve(`./${path}`);

		return new Promise((res, reject) => {
			if (existsSync(dir)) res();
			mkdirp(dir, err => (err ? reject(err) : res()));
		});
	}
}

export default DirCreator;
