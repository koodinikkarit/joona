import ApolloClient, { createNetworkInterface, createBatchingNetworkInterface } from "apollo-client";
//import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

let nextId = 1;

export default new ApolloClient({
	dataIdFromObject: o => {
		return `${o.__typename}-${o.id ? o.id : nextId++},`;		
	},
	networkInterface: createBatchingNetworkInterface({ 
		uri: "http://" + CONFIG.PETRI_IP + ":" + CONFIG.PETRI_PORT,
		batchInterval: 10,
		opts: {
			credentials: "include"
		}
	})
});