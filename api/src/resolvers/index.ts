import { merge } from "lodash";

import * as variation from "./variation";
import * as viewer from "./viewer";

export const resolvers = merge(variation, viewer);
