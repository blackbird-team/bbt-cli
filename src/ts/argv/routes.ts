export class Routes {
	private _routes: string[] = [];

	public get(): string[]{
		return this._routes;
	}

	public add(route: string): void {
		this._routes.push(route);
	}
}
