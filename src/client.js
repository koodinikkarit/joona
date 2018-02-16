import { BatchHttpLink } from "apollo-link-batch-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

export default new ApolloClient({
	link: new BatchHttpLink({
		uri: `http://${process.env.REACT_APP_PETRI_IP}:${
			process.env.REACT_APP_PETRI_PORT
		}`
	}),
	cache: new InMemoryCache()
});
