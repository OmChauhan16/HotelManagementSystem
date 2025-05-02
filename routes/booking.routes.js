const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const bookingController = require("../controllers/booking.controller");

router.post("/", authenticate, bookingController.createBooking);
router.get("/", authenticate, bookingController.getUserBookings);
router.delete("/:id", authenticate, bookingController.cancelBooking);

module.exports = router;
