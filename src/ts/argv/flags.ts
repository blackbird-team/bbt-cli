import { FLAG, IFlags} from "./../_interfaces/argv";
import { _removeInitialDashes } from "./../utils";

export class Flags {
	private _flags: IFlags = {};

	public get(): IFlags {
		return this._flags;
	}

	public parseFlag(flag: FLAG): void {
		if (flag.startsWith("--")) this._setFlag(flag);
		else this._parseFlagParad(flag);
	}

	private _setFlag(key: FLAG): void {
		this._flags[_removeInitialDashes(key) as FLAG] = true;
	}

	private _parseFlagParad(flags: FLAG): void {
		for (let q = 1; q < flags.length; q++) {
			this._setFlag(flags[q] as FLAG);
		}
	}
}
