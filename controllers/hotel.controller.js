const db = require("../config/db");

exports.createHotel = async (req, res) => {
  const { name, location, description } = req.body;
  try {
    await db.execute("INSERT INTO hotels (name, location, description) VALUES (?, ?, ?)", [
      name,
      location,
      description,
    ]);
    res.status(201).json({ message: "Hotel created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const [hotels] = await db.execute("SELECT * FROM hotels");
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHotel = async (req, res) => {
  const { name, location, description } = req.body;
  const { id } = req.params;
  try {
    await db.execute("UPDATE hotels SET name = ?, location = ?, description = ? WHERE id = ?", [
      name,
      location,
      description,
      id,
    ]);
    res.json({ message: "Hotel updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM hotels WHERE id = ?", [id]);
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
