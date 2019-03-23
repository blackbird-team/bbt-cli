const _ARGV: { [key: string]: any } = {};

// EXAMPLE
// node bin\index.min.js -vqWr --name=Arthur --age 23 --force -f=filename.txt -- one two four
// node bin\index.min.js --name=Arthur --age 23 -vqWr --force -f=filename.txt -- one two four

export function parseArgs(args: string[]): void {
	_ARGV.shell = args[0];
	_ARGV.path = args[1];
	_ARGV.params = [];
	_ARGV.routes = [];

	for (let index = 2; index < args.length; index++) {
		if (args[index].startsWith("--")) {
			if (args[index].indexOf("=") > -1) {
				const [key, value] = args[index].split("=");
				_ARGV[key.slice(2, key.length)] = value;
			} else if (args[index].length == 2) {
				_ARGV.params = [...args.slice(args.indexOf(args[index]) + 1, args.length)];
				break;
			} else {
				if (args[index + 1].startsWith("-")) {
					_ARGV[args[index].slice(2, args[index].length)] = true;
				} else _ARGV[args[index].slice(2, args[index].length)] = args[++index];
			}
		} else if (args[index].startsWith("-")) {
			if (args[index].indexOf("=") > -1) {
				const [key, value] = args[index].split("=");
				_ARGV[key.slice(1, key.length)] = value;
			} else if (args[index].length === 2) {
				_ARGV[args[index]] = true;
			} else if (args[index].length > 2) {
				for (let q = 1; q < args[index].length; q++) {
					_ARGV[args[index][q]] = true;
				}
				continue;
			} else {
				_ARGV[args[index]] = args[++index];
			}
		} else {
			_ARGV.routes.push(args[index]);
		}
		// console.log("#" + index + " -> " + args[index]);
	}

	console.log(_ARGV);
}
