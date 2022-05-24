import { GraphQLTypeResolver } from "graphql";
import { UserModel } from "../models/User";

const register: MutationCallback = async (parent, args, context, info) => {};

export const userResolvers = {
  Mutation: {
    register(parent, args, context, info) {},
  },
};
