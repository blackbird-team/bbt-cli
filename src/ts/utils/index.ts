export function _removeInitialDashes(arg: string): string {
	return arg.replace(/^[-]{1,2}/g, "");
}