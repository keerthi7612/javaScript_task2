import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secretkey";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

// LOGIN
const SECRET = "mysecret123"; // ✅ use same value everywhere

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
    expiresIn: "1d",
  });

  return { token };
};
