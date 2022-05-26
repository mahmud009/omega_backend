import { model, Schema } from "mongoose";

export const UserModel = model(
  "User",
  new Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: String,
    createdAt: { type: String, default: new Date().toISOString() },
  })
);
