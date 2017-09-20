import { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import RouteList from "./routeList";

class IndexView extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "indexView" });
	}

	render() {
		return this.getRoute();
	}

	getRoute() {
		const component = RouteList[this.state.viewport].child;

		return createElement(component, {
			stores: this.props.stores,
			lang: this.props.lang.Text,
			history: this.props.history
		});
	}
}

export default IndexView;
