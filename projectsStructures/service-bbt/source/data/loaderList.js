import { StoreController } from "redux-store-controller";
import StoreList from "./storeList";
import SubscriptionMap from "./subscriptionMap";

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
				name: "stores",
				type: "class",
				controller: StoreController,
				params: ["storeList", "subscriptionMap"]
			}
		]
	}
];

export default LoaderList;
