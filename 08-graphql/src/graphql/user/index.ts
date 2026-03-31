import { mutations } from "./mutations.ts";
import { queries } from "./queries.ts";
import { resolvers } from "./resolvers.ts";
import { typedefs } from "./typedef.ts";

export const User = { typedefs, queries, mutations, resolvers };
