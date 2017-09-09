import Messages from "@/messages";

process.stdin.setEncoding("utf8");

class PrintInController {
	static waitIn(number = -7) {
		process.stdin.resume();
		process.stdout.write("  > ");

		return new Promise(resolve => {
			process.stdin.once("data", text => {
				const input = text.replace(/(?:\r\n|\r|\n)/g, "");
				process.stdin.resume();

				Messages.clear(number);
				resolve(input);
			});
		});
	}
}

module.exports = PrintInController;
