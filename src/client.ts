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

const localState = withClientState({ cache, resolvers, defaults });

const link = ApolloLink.from([localState, batchHttpLink]);

export const client = new ApolloClient({
	link,
	cache
});
