import { Flags } from "./flags";

export function _removeInitialDashes(arg: string): string {
	return arg.replace(/^[-]{1,2}/g, "");
}

export class Argv {
	private _index: number = 2;
	private _ARGV: { [key: string]: any } = {
		shell: process.argv[0],
		path: process.argv[1],
		params: [],
		routes: []
	};

	private _flags: Flags = new Flags();

	public static parse(): Argv {
		const args = new Argv();
		args._parse();
		return args;
	}

	public get(): { [key: string]: any } {
		return this._ARGV;
	}

	public getFlags(): { [key: string]: any } {
		return this._flags.get();
	}

	private _set(key: string, value?: string): void {
		this._ARGV[_removeInitialDashes(key)] = value || true;
	}

	private _parse(): void {
		while (this._index < process.argv.length) {
			this._loop();
			this._index++;
		}
	}

	private _loop(): void {
		const arg = process.argv[this._index];
		const nextArg = process.argv[this._index + 1];
		const [key, value] = arg.split("=");

		if (arg === "--") {
			this._parseLastOptionalArgs();
		} else if (value) {
			this._set(key, value);
		} else if (arg.startsWith("-") && nextArg.startsWith("-")) {
			this._flags.parseFlag(arg);
		} else if (arg.startsWith("--")) {
			this._set(arg, nextArg);
			this._index += 1;
		} else this._ARGV.routes.push(arg);
	}

	private _parseLastOptionalArgs(): void {
		const { argv } = process;
		this._ARGV.params = [...argv.slice(argv.indexOf(argv[this._index]) + 1, argv.length)];

		// Stop loop args
		this._index = process.argv.length - 1;
	}
}
