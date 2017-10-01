import ApolloClient, { createNetworkInterface } from "apollo-client";
//import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

let nextId = 1;

export default new ApolloClient({
	dataIdFromObject: o => {
		//console.log("o", o);
		return `${o.__typename}-${o.id ? o.id : nextId++},`;		
	},
	networkInterface: createNetworkInterface({ 
		uri: `http://${location.hostname}:${location.port}/api`,
		opts: {
			credentials: "same-origin"
		}
	})
});