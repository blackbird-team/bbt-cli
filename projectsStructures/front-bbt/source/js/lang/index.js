import Config from "@/config.json";

class Lang {
	constructor() {
		this.curLang = Config.loc.lang;
		this.text = null;

		// Подключение языкового пакета
		this.Text = require(`./${this.curLang}/${this.curLang}`); //eslint-disable-line
	}

	set Text(text) {
		this.text = text;
	}

	get Text() {
		return this.text;
	}

	getReplace(field, param) {
		const rx = /{sss}/g;
		let i = 0;
		return this.Text[field].replace(rx, () => param[(i += 1)]);
	}
}

export default Lang;
