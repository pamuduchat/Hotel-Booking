const express = require("express");
const {
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

// get a user by ID
router.get("/:id", verifyUser, getUserById);

// get all users
router.get("/", verifyAdmin, getUsers);

// update
router.put("/:id", verifyUser, updateUser);

// delete

router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
