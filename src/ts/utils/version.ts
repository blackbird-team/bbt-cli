import Argv from "../argv/index";

const _VERSION = "0.1.0-alpha";

export default function(): void {
	const { version, v } = Argv.getFlags();
	if (!version && !v) return;
	console.log(_VERSION);
	process.exit(0);
}
