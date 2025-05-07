const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const bookingController = require("../controllers/booking.controller");

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     description: User only. Book a room for a specified date range.
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT Bearer token (User)
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
 *               - room_id
 *               - start_date
 *               - end_date
 *             properties:
 *               room_id:
 *                 type: integer
 *                 example: 1
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-05-01
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-05-05
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room booked successfully
 *       400:
 *         description: Room not available for the selected dates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room not available for selected dates
 *       500:
 *         description: Server error while creating booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.post("/", authenticate, bookingController.createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get user bookings
 *     description: Retrieve all bookings for the authenticated user.
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT Bearer token (User)
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGci...
 *     responses:
 *       200:
 *         description: List of user bookings
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
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   room_id:
 *                     type: integer
 *                     example: 101
 *                   start_date:
 *                     type: string
 *                     format: date
 *                     example: 2025-05-01
 *                   end_date:
 *                     type: string
 *                     format: date
 *                     example: 2025-05-05
 *                   status:
 *                     type: string
 *                     example: booked
 *                   room_number:
 *                     type: string
 *                     example: "101"
 *                   hotel_name:
 *                     type: string
 *                     example: Grand Plaza
 *                   location:
 *                     type: string
 *                     example: Mumbai
 *       500:
 *         description: Server error while retrieving bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.get("/", authenticate, bookingController.getUserBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     description: User only. Cancel a future booking by its ID.
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking to cancel.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: header
 *         name: Authorization
 *         description: JWT Bearer token (User)
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGci...
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking cancelled
 *       404:
 *         description: Booking not found or not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking not found
 *       500:
 *         description: Server error while cancelling booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.delete("/:id", authenticate, bookingController.cancelBooking);

module.exports = router;
