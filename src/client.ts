import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { withClientState } from "apollo-link-state";

import { resolvers, defaults } from "./resolvers";

const cache = new InMemoryCache();

const batchHttpLink = new BatchHttpLink({
	uri: `http://localhost:9595`
});

console.log("resolvers", resolvers);

const localState = withClientState({ cache, resolvers, defaults });

export const client = new ApolloClient({
	link: ApolloLink.from([localState, batchHttpLink]),
	cache
});
