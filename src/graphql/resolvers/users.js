import { UserInputError } from "apollo-server";
import { UserModel } from "src/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LoginValidate, RegisterValidate } from "src/utils/validators";
dotenv.config();

function createToken({ id, email, name, phone }) {
  const secret = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id, email, name, phone }, secret, { expiresIn: "1h" });
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
    if (!isValid) return new UserInputError("Input Error", { errors });
    const user = await UserModel.findOne({ email: loginInput.email });

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
