import { UserInputError } from "apollo-server";
import { UserModel } from "src/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LoginValidate, RegisterValidate } from "../utils/validators";
dotenv.config();

function createToken({ id, email, userName }) {
  const secret = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id, email, userName }, secret, { expiresIn: "1h" });
}

async function register(_, args, context, info) {
  try {
    const { registerInput } = args;
    let { confirmPassword, ...user } = registerInput;

    // Validate user data
    const { isValid, errors } = await RegisterValidate(registerInput);
    if (!isValid) {
      throw new UserInputError("Input Error", { errors });
    }

    // Make sure user doesnt already exist
    const dbUser = await UserModel.findOne({ userName: user.userName });
    if (dbUser) {
      throw new UserInputError("Username is taken.", {
        errors: {
          userName: "This username is taken",
        },
      });
    }

    user.password = await bcrypt.hash(user.password, 12);
    const newUser = new UserModel(user);
    const res = await newUser.save();
    const token = createToken(res);
    return { ...res._doc, id: res._id, token };
  } catch (error) {
    throw new Error(error);
  }
}

async function login(_, args, context, info) {
  try {
    const { loginInput } = args;

    const { isValid, errors } = await LoginValidate(loginInput);
    if (!isValid) throw new UserInputError("Input Error", { errors });
    const user = await UserModel.findOne({ userName: loginInput.userName });
    if (!user) {
      errors.general = "User not found";
      throw new Error("User not found", { errors });
    }

    const isValidPassword = await bcrypt.compare(loginInput.password, user.password);
    if (!isValidPassword) {
      errors.general = "Wrong Credentials";
      throw new Error("Wrong Credentials", { errors });
    }

    const token = createToken(user);
    return { ...user._doc, id: user._id, token };
  } catch (error) {
    throw new Error(error);
  }
}

export const userResolvers = {
  Mutation: {
    register,
    login,
  },
};
