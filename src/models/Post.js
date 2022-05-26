import { model, Schema } from "mongoose";

export const PostModel = model(
  "Post",
  new Schema({
    body: String,
    createdAt: { type: String, default: new Date().toISOString() },
    userId: String,
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
  })
);
