export * from "./resolvers";
export * from "./defaults";
export * from "./types";

import merge from "lodash.merge";

import * as songs from "./songs";

const merged = merge(songs);

export const resolvers = merged.resolvers;
export const defaults = merged.defaults;
