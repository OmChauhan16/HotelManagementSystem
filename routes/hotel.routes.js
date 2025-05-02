const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const hotelController = require("../controllers/hotel.controller");

router.post("/", authenticate, authorize("admin"), hotelController.createHotel);
router.get("/", hotelController.getAllHotels);
router.put("/:id", authenticate, authorize("admin"), hotelController.updateHotel);
router.delete("/:id", authenticate, authorize("admin"), hotelController.deleteHotel);

module.exports = router;
