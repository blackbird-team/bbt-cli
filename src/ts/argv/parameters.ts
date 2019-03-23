import { _removeInitialDashes } from "./../utils";

export class Parameters {
	private _parameters: { [key: string]: any } = {};

	public get(): { [key: string]: string } {
		return this._parameters;
	}

	public set(key: string, value?: string): void {
		this._parameters[_removeInitialDashes(key)] = value;
	}

	public parseLastOptionalArgs(index: number): void {
		const { argv } = process;
		this._parameters.optional = [...argv.slice(argv.indexOf(argv[index]) + 1, argv.length)];
	}
}
