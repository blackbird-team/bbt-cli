import { _removeInitialDashes } from "./../utils";

export class Flags {
	private _flags: { [key: string]: boolean } = {};

	public get(): { [key: string]: boolean } {
		return this._flags;
	}

	public parseFlag(flag: string): void {
		if (flag.startsWith("--")) this._setFlag(flag);
		else this._parseFlagParad(flag);
	}

	private _setFlag(key: string): void {
		this._flags[_removeInitialDashes(key)] = true;
	}

	private _parseFlagParad(flags: string): void {
		for (let q = 1; q < flags.length; q++) {
			this._setFlag(flags[q]);
		}
	}
}
