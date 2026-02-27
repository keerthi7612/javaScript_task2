import { registerUser, loginUser } from "../services/authService.js";

// REGISTER
export const registerController = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: "User registered",
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
