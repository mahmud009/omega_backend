import { model, Schema } from "mongoose";

export const UserModel = model(
  "User",
  new Schema({
    userName: String,
    password: String,
    email: String,
    createdAt: { type: String, default: new Date().toISOString() },
  })
);
