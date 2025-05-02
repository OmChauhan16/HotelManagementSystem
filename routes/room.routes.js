const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const roomController = require("../controllers/room.controller");

router.post("/", authenticate, authorize("admin"), roomController.createRoom);
router.get("/", roomController.getAllRooms);
router.get("/available", roomController.getAvailableRooms);
router.put("/:id", authenticate, authorize("admin"), roomController.updateRoom);
router.delete("/:id", authenticate, authorize("admin"), roomController.deleteRoom);

module.exports = router;
