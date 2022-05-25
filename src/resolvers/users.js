import { GraphQLTypeResolver } from "graphql";
import { UserModel } from "src/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const register = async (_, args, context, info) => {
  const { registerInput } = args;
  const { userName, email, password, confirmPassword } = registerInput;
  password = await bcrypt.hash(password, 12);
  const newUser = new UserModel({
    email,
    userName,
    password,
    createdAt: new Date().toISOString(),
  });
  const res = await newUser.save();
  const token = jwt.sign(
    {
      is: res.id,
      email: res.email,
      userName: res.userName,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return { ...res._doc, id: res._id, token };
};

export const userResolvers = {
  Mutation: {
    register,
  },
};
