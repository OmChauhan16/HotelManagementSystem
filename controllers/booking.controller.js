const db = require("../config/db");

exports.createBooking = async (req, res) => {
  const { room_id, start_date, end_date } = req.body;
  const user_id = req.user.id;

  try {
    const [conflicts] = await db.execute(
      `
      SELECT * FROM bookings
      WHERE room_id = ? AND status = 'booked'
      AND NOT (
        end_date < ? OR start_date > ?
      )
    `,
      [room_id, start_date, end_date]
    );

    if (conflicts.length > 0) {
      return res.status(400).json({ message: "Room not available for selected dates" });
    }

    await db.execute(
      "INSERT INTO bookings (user_id, room_id, start_date, end_date) VALUES (?, ?, ?, ?)",
      [user_id, room_id, start_date, end_date]
    );

    res.status(201).json({ message: "Room booked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  const user_id = req.user.id;
  try {
    const [bookings] = await db.execute(
      `SELECT b.*, r.room_number, h.name AS hotel_name, h.location
       FROM bookings b
       JOIN rooms r ON r.id = b.room_id
       JOIN hotels h ON h.id = r.hotel_id
       WHERE b.user_id = ?
       ORDER BY b.start_date DESC`,
      [user_id]
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const [booking] = await db.execute("SELECT * FROM bookings WHERE id = ? AND user_id = ?", [
      id,
      user_id,
    ]);

    if (booking.length === 0) return res.status(404).json({ message: "Booking not found" });

    await db.execute("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [id]);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
