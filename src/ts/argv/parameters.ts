import { IParameters, PARAMETER } from "./../_interfaces/argv";
import { _removeInitialDashes } from "./../utils";

export class Parameters {
	private _parameters: IParameters = {
		optional: []
	};

	public get(): IParameters {
		return this._parameters;
	}

	public set(key: PARAMETER, value?: any): void {
		this._parameters[_removeInitialDashes(key) as PARAMETER] = value;
	}

	public parseLastOptionalArgs(index: number): void {
		const { argv } = process;
		this._parameters.optional = [...argv.slice(argv.indexOf(argv[index]) + 1, argv.length)];
	}
}
