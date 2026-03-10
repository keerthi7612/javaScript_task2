import User from "../models/userModel.js";

const createUser = async (req, res) => {
  const { name, balance } = req.body;

  try {
    const user = await User.create({ name, balance });
    res.json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUser };
