const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.get("/user/:id", getUserById);
router.post("/adduser", createUser);
router.post("/edituser/:id", updateUser);
router.post("/deleteuser/:id", deleteUser);
module.exports = router;
