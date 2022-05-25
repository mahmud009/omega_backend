import { PostResolvers } from "./posts";

export const resolvers = {
  Query: {
    ...PostResolvers.Query,
  },
};
