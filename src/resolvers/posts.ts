import { PostModel } from "../models/Post";

const getPosts = async () => {
  try {
    return await PostModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const PostResolvers = {
  Query: {
    getPosts,
  },
};
