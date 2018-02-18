import { makeExecutableSchema } from "graphql-tools";

import { resolvers } from "./resolvers";

import { typeDefs } from "./schemadef";

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});
