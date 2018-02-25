import { merge } from "lodash";

import * as variation from "./variation";
import * as viewer from "./viewer";
import * as user from "./user";

export const resolvers = merge(variation, viewer, user);
