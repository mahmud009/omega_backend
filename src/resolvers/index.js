import { postResolvers } from "./posts";
import { userResolvers } from "./users";

export const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
