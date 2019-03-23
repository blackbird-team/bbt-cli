import { Flags } from "./flags";
import { Routes } from "./routes";
import { Parameters } from "./parameters";

class Argv {
	public readonly shell: string = process.argv[0];
	public readonly path: string = process.argv[1];

	private static _instance: Argv;

	private _index: number = 2;

	private _flags: Flags = new Flags();
	private _routes: Routes = new Routes();
	private _parameters: Parameters = new Parameters();

	public static parse(): Argv {
		if (!this._instance) this._instance = new Argv();
		return this._instance;
	}

	constructor() {
		this._parse();
	}

	public get(): { [key: string]: any } {
		return {
			shell: this.shell,
			path: this.path,
			flags: this.getFlags(),
			routes: this.getRoutes(),
			parameters: this.getParameters()
		};
	}

	public getFlags(): { [key: string]: boolean } {
		return this._flags.get();
	}

	public getRoutes(): string[] {
		return this._routes.get();
	}

	public getParameters(): { [key: string]: string } {
		return this._parameters.get();
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
			this._parameters.parseLastOptionalArgs(this._index);
			this._stopLoops();
		} else if (value) {
			this._parameters.set(key, value);
		} else if (arg.startsWith("-") && nextArg.startsWith("-")) {
			this._flags.parseFlag(arg);
		} else if (arg.startsWith("--")) {
			this._parameters.set(arg, nextArg);
			this._index += 1;
		} else this._routes.add(arg);
	}

	private _stopLoops(): void {
		this._index = process.argv.length - 1;
	}
}

export default Argv.parse();

