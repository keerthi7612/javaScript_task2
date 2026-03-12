import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.create({
    name,
    email,
  });
  res.json({ message: "User created successfully", data: user });
};

export const getUser = async (req, res) => {
  const user = await User.find();
  res.json(user);
};
