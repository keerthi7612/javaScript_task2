import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ message: "data added successfully", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  // pageInt was undefined; use parseInt and handle NaN
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 3;
  const sort = req.query.sort || "name";

  const users = await User.find()
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ message: "List of user", data: users });
};

const activeUser = async (req, res) => {
  const users = await User.find({ active: true });
  res.json(users);
};

const useByRole = async (req, res) => {
  const users = await User.find({ role: req.params.role });
  res.json(users);
};

const getAdult = async (req, res) => {
  const users = await User.find({
    age: { $gte: 18 },
  });
  res.json(users);
};

const searchUsers = async (req, res) => {
  const { role, minAge, active, minSalary } = req.query;

  let query = {};

  if (role) {
    query.role = role;
  }

  if (minAge) {
    query.age = { $gte: minAge };
  }

  if (active) {
    query.active = active === "true";
  }

  if (minSalary) {
    query.salary = { $gte: minSalary };
  }

  const users = await User.find(query);

  res.json(users);
};

export default {
  createUser,
  getUser,
  activeUser,
  useByRole,
  getAdult,
  searchUsers,
};
