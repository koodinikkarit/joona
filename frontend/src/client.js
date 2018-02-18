import { BatchHttpLink } from "apollo-link-batch-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

import cache from "./cache";
import localLink from "./local-link";

const batchHttpLink = new BatchHttpLink({
	uri: `http://${window.config.PETRI_IP}:${window.config.PETRI_PORT}`
});

export default new ApolloClient({
	link: ApolloLink.from([localLink, batchHttpLink]),
	cache
});
