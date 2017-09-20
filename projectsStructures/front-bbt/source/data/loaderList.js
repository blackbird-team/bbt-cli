import { StoreController } from "redux-store-controller";
import StoreList from "@/storeList";
import SubscriptionMap from "@/subscriptionMap.js";
import Lang from "~/lang/index";
import history from "~/stores/history";
import ViewController from "~/views/viewController";

const LoaderList = [
	{
		step: 0,
		parts: [
			{
				name: "storeList",
				type: "data",
				controller: StoreList
			},
			{
				name: "subscriptionMap",
				type: "data",
				controller: SubscriptionMap
			},
			{
				name: "history",
				type: "data",
				controller: history
			},
			{
				name: "stores",
				type: "class",
				controller: StoreController,
				params: ["storeList", "subscriptionMap"]
			},
			{
				name: "lang",
				type: "class",
				controller: Lang
			}
		]
	},
	{
		step: 1,
		parts: [
			{
				name: "view",
				type: "class",
				controller: ViewController,
				params: ["stores", "lang", "history", "session"]
			}
		]
	}
];

export default LoaderList;
