import { model, Schema } from "mongoose";

export const PostModel = model(
  "Post",
  new Schema({
    body: String,
    userName: String,
    createdAt: String,
    comments: [
      {
        body: String,
        userName: String,
        createdAt: String,
      },
    ],
    likes: [
      {
        userName: String,
        createdAt: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  })
);
