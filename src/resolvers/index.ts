export * from "./resolvers";
export * from "./defaults";
export * from "./types";

import merge from "lodash.merge";

import * as songs from "./songs";

const merged = merge(songs);

// tslint:disable-next-line
console.log("merged", merged);

export const resolvers = merged.resolvers;
export const defaults = merged.defaults;
