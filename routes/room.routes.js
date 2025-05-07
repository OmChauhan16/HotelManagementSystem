const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const roomController = require("../controllers/room.controller");

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     description: Admin only. Add a new room to a hotel.
 *     tags:
 *       - Room
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT Bearer token (Admin)
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGci...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotel_id
 *               - room_number
 *               - price
 *               - capacity
 *             properties:
 *               hotel_id:
 *                 type: integer
 *                 example: 1
 *               room_number:
 *                 type: string
 *                 example: "101"
 *               price:
 *                 type: number
 *                 example: 150.00
 *               capacity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room created
 *       500:
 *         description: Server error while creating room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.post("/", authenticate, authorize("admin"), roomController.createRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     description: Retrieve a list of all rooms.
 *     tags:
 *       - Room
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   hotel_id:
 *                     type: integer
 *                     example: 1
 *                   room_number:
 *                     type: string
 *                     example: "101"
 *                   price:
 *                     type: number
 *                     example: 150.00
 *                   capacity:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Server error while retrieving rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.get("/", roomController.getAllRooms);

/**
 * @swagger
 * /api/rooms/available:
 *   get:
 *     summary: Get available rooms
 *     description: Retrieve available rooms matching filter criteria (dates, location, price range).
 *     tags:
 *       - Room
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Desired check-in date (YYYY-MM-DD).
 *         example: 2025-05-01
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Desired check-out date (YYYY-MM-DD).
 *         example: 2025-05-05
 *       - in: query
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel location to filter by.
 *         example: Delhi
 *       - in: query
 *         name: min_price
 *         schema:
 *           type: number
 *         description: Minimum room price (optional).
 *         example: 1000
 *       - in: query
 *         name: max_price
 *         schema:
 *           type: number
 *         description: Maximum room price (optional).
 *         example: 5000
 *     responses:
 *       200:
 *         description: List of available rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   hotel_id:
 *                     type: integer
 *                     example: 1
 *                   room_number:
 *                     type: string
 *                     example: "101"
 *                   price:
 *                     type: number
 *                     example: 150.00
 *                   capacity:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Server error while retrieving available rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.get("/available", roomController.getAvailableRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room
 *     description: Admin only. Update room details by ID.
 *     tags:
 *       - Room
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the room to update.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: header
 *         name: Authorization
 *         description: JWT Bearer token (Admin)
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGci...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotel_id
 *               - room_number
 *               - price
 *               - capacity
 *             properties:
 *               hotel_id:
 *                 type: integer
 *                 example: 1
 *               room_number:
 *                 type: string
 *                 example: "102"
 *               price:
 *                 type: number
 *                 example: 200.00
 *               capacity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Room updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room updated
 *       500:
 *         description: Server error while updating room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.put("/:id", authenticate, authorize("admin"), roomController.updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     description: Admin only. Remove a room by ID.
 *     tags:
 *       - Room
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the room to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: header
 *         name: Authorization
 *         description: JWT Bearer token (Admin)
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGci...
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room deleted
 *       500:
 *         description: Server error while deleting room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.delete("/:id", authenticate, authorize("admin"), roomController.deleteRoom);

module.exports = router;
