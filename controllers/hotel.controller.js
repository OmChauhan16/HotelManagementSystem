const db = require("../config/db");

exports.createHotel = async (req, res) => {
  const { name, location, description, price } = req.body;

  try {
    await db.execute("INSERT INTO hotels (name, location, description, price) VALUES (?, ?, ?, ?)", [
      name,
      location,
      description,
      price
    ]);
    res.status(201).json({ message: "Hotel created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, check_in, check_out } = req.query;
    let query = 'SELECT * FROM hotels WHERE 1=1';
    const params = [];

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(maxPrice);
    }


    const [hotels] = await db.query(query, params);
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({ error: 'Server error while retrieving hotels' });
  }
};

exports.updateHotel = async (req, res) => {
  console.log(req.body);
  
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
