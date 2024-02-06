// controllers/userController.js
const User = require("../models/User");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ success: false, msg: "Please fill all required fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ success: false, msg: "User not found" });
  }

  const passwordIsCorrect = password === user.password;

  if (user && passwordIsCorrect) {
    return res.send({
      success: true,
      msg: "Successfully LoggedIn",
    });
  } else {
    return res.status(401).send({ success: false, msg: "Invalid Credentials" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ success: true, newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      name,
      email,
    });

    res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
