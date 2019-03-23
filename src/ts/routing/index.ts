import { Make } from "./make";

export interface IRoute {
	handleRoute(path: string[]): void;
}

export class Router implements IRoute {
	private _routes: Map<string, IRoute> = new Map();

	constructor() {
		this._routes.set("mk", new Make());
	}

	public handleRoute([path, ...rests]: string[]): void {
		this._checkPathExist(path);
		const route = this._getRoute(path);
		route.handleRoute(rests);
	}

	private _checkPathExist(path: string): void | never {
		if (!path) throw new Error(`See available commands with --help or -h`);
	}

	private _getRoute(path: string): IRoute | never {
		const route = this._routes.get(path);
		if (!route) throw new Error(`Command '${path}' not found`);
		return route;
	}
}
