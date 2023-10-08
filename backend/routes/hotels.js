const express = require("express");
const {
  getHotelById,
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// get a hotel by ID
router.get("/find/:id", getHotelById);

// get all hotels
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

// create
router.post("/", verifyAdmin, createHotel);

// update
router.put("/:id", verifyAdmin, updateHotel);

// delete

router.delete("/:id", verifyAdmin, deleteHotel);

module.exports = router;
