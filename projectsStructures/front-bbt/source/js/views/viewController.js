import { createElement } from "react";
import { render } from "react-dom";

import IndexView from "./indexView.jsx";

class ViewController {
	constructor(options) {
		render(
			createElement(
				"div",
				{ id: "wrapper" },
				createElement(IndexView, options)
			),
			document.getElementById("container")
		);
	}
}

export default ViewController;
