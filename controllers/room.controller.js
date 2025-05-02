const db = require("../config/db");

exports.createRoom = async (req, res) => {
  const { hotel_id, room_number, price, capacity } = req.body;
  try {
    await db.execute(
      "INSERT INTO rooms (hotel_id, room_number, price, capacity) VALUES (?, ?, ?, ?)",
      [hotel_id, room_number, price, capacity]
    );
    res.status(201).json({ message: "Room created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const [rooms] = await db.execute("SELECT * FROM rooms");
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableRooms = async (req, res) => {
  const { start_date, end_date, location, min_price, max_price } = req.query;

  try {
    const [rooms] = await db.execute(
      `
      SELECT r.* FROM rooms r
      JOIN hotels h ON h.id = r.hotel_id
      WHERE h.location LIKE ? AND r.price BETWEEN ? AND ? AND r.id NOT IN (
        SELECT room_id FROM bookings
        WHERE status = 'booked'
        AND NOT (
          end_date < ? OR start_date > ?
        )
      )
    `,
      [`%${location}%`, min_price || 0, max_price || 99999, start_date, end_date]
    );

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  const { hotel_id, room_number, price, capacity } = req.body;
  const { id } = req.params;
  try {
    await db.execute(
      "UPDATE rooms SET hotel_id = ?, room_number = ?, price = ?, capacity = ? WHERE id = ?",
      [hotel_id, room_number, price, capacity, id]
    );
    res.json({ message: "Room updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM rooms WHERE id = ?", [id]);
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
