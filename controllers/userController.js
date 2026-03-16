import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(
        `Registration failed: User already exists with email ${email}`,
      );
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    logger.info(`New user registered: ${email} (ID: ${user._id})`);

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN API
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: Invalid email or password for ${email}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Login failed: Invalid password for ${email}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    logger.info(`User logged in: ${email}`);

    res.status(200).json({
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        serviceActive: user.serviceActive,
      },
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    logger.info(`Fetched ${user.length} users`);
    res.json(user);
  } catch (error) {
    logger.error(`Get users error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
