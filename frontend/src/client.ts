import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { withClientState } from "apollo-link-state";

import { resolvers, defaults } from "./resolvers";

import { defaultDataIdFromObject } from "apollo-cache-inmemory/lib/inMemoryCache";
import { createApolloFetch } from "apollo-fetch";

declare const config: {
	API_IP: string;
	API_PORT: number;
	API_HTTPS_PORT: number;
};

const protocol = window.location.protocol;
const isHttps = protocol.includes("https:");

export const getApiBaseUrl = () => {
	const port = isHttps ? config.API_HTTPS_PORT : config.API_PORT;
	return `${window.location.protocol}//${config.API_IP}:${port}`;
};

export const getBaseUrl = () => {
	return `${window.location.protocol}//${window.location.host}`;
};
const graphqlAddress = `${getApiBaseUrl()}/graphql`;

const cache = new InMemoryCache({
	dataIdFromObject: (o: { __typename: string; id?: string }) => {
		switch (o.__typename) {
			default:
				return defaultDataIdFromObject(o);
		}
	}
});

const customFetch = (uri, options) =>
	fetch(uri, {
		...options,
		credentials: "include"
	});

const batchHttpLink = new BatchHttpLink({
	uri: graphqlAddress,
	batchMax: 20,
	fetch: createApolloFetch({
		uri: graphqlAddress,
		customFetch
	})
});

const localState = withClientState({ cache, resolvers, defaults });

const link = ApolloLink.from([localState, batchHttpLink]);

export const client = new ApolloClient({
	link,
	cache
});
