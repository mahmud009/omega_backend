import { PostModel } from "src/models/Post";
import { checkAuth } from "src/utils/checkAuth";
import { AuthenticationError } from "apollo-server";

async function getPosts() {
  try {
    return await PostModel.find().sort({ createdAt: -1 });
  } catch (error) {
    return new Error(error);
  }
}

async function getPost(_, { postId }, { req }) {
  try {
    const post = await PostModel.findById(postId);
    if (!post) throw new Error("Post not found.");
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function createPost(_, { body }, context) {
  const user = checkAuth(context);
  try {
    const post = await PostModel({
      body,
      userId: user.id,
    }).save();
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function deletePost(_, { postId }, context) {
  const user = checkAuth(context);
  try {
    const post = await PostModel.findById(postId);
    if (user.id == post.userId) {
      await post.delete();
      return "Post deleted successfully.";
    }
    throw new AuthenticationError("Action now allowed");
  } catch (error) {
    throw new Error(error);
  }
}

export const postResolvers = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    createPost,
    deletePost,
  },
};
