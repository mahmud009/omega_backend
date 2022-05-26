import { model, Schema } from "mongoose";

export const PostModel = model(
  "Post",
  new Schema({
    body: String,
    userName: String,
    createdAt: { type: String, default: new Date().toISOString() },
    comments: [
      {
        body: String,
        userName: String,
        createdAt: { type: String, default: new Date().toISOString() },
      },
    ],
    likes: [
      {
        userName: String,
        createdAt: { type: String, default: new Date().toISOString() },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  })
);
