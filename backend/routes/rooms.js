const express = require("express");
const {
  getRoomById,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
} = require("../controllers/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// get a room by ID
router.get("/:id", getRoomById);

// get all rooms
router.get("/", getRooms);

// create
router.post("/:hotelid", verifyAdmin, createRoom);

// update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// delete

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

module.exports = router;
