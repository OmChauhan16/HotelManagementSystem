const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const hotelController = require("../controllers/hotel.controller");

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Create a new hotel
 *     description: Admin only. Add a new hotel with name, location, and description.
 *     tags:
 *       - Hotel
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
 *               - name
 *               - location
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Grand Plaza
 *               location:
 *                 type: string
 *                 example: Mumbai
 *               description:
 *                 type: string
 *                 example: A luxurious five-star hotel located in Mumbai.
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hotel created
 *       500:
 *         description: Server error while creating hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.post("/", authenticate, authorize("admin"), hotelController.createHotel);

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Get all hotels
 *     description: Retrieve a list of all hotels. Supports optional filters.
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter hotels by location (partial match).
 *         example: Delhi
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum room price filter (optional).
 *         example: 3000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum room price filter (optional).
 *         example: 5000
 *     responses:
 *       200:
 *         description: List of hotels
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
 *                   name:
 *                     type: string
 *                     example: Grand Plaza
 *                   location:
 *                     type: string
 *                     example: Mumbai
 *                   description:
 *                     type: string
 *                     example: A luxurious five-star hotel located in Mumbai.
 *       500:
 *         description: Server error while retrieving hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.get("/", hotelController.getAllHotels);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Update a hotel
 *     description: Admin only. Update hotel details by ID.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel to update.
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
 *               - name
 *               - location
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Grand Plaza Deluxe
 *               location:
 *                 type: string
 *                 example: Mumbai
 *               description:
 *                 type: string
 *                 example: Newly renovated deluxe rooms available.
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hotel updated
 *       500:
 *         description: Server error while updating hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.put("/:id", authenticate, authorize("admin"), hotelController.updateHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     description: Admin only. Remove a hotel by ID.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel to delete.
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
 *         description: Hotel deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hotel deleted
 *       500:
 *         description: Server error while deleting hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.delete("/:id", authenticate, authorize("admin"), hotelController.deleteHotel);

module.exports = router;

