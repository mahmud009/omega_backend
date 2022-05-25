import { PostModel } from "src/models/Post";

const getPosts = async () => {
  try {
    return await PostModel.find();
  } catch (error) {
    throw new Error(error);
  }
};

export const postResolvers = {
  Query: {
    getPosts,
  },
};
