# 🏨 Hotel Booking Platform - Backend

This is a **Node.js + Express.js** backend application for a Hotel Booking Platform. It provides full-featured APIs for user authentication, hotel and room management, and secure bookings with availability checks. MySQL is used as the primary database.

---

## 🚀 Features

- 🔐 User & Admin authentication (JWT)
- 🏨 Admins can manage hotels and rooms (CRUD)
- 🔍 Users can search hotels by location, price, and availability
- 📅 Bookings with overlap prevention
- 📜 Users can view booking history and cancel upcoming bookings
- ✅ Input validation and clean error handling
- 📦 Structured project architecture
- 📄 API documentation via Postman Collection

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL (using phpMyAdmin or MySQL CLI)
- **Authentication**: JWT
- **Validation**: express-validator
- **Password Hashing**: bcrypt

---

## 📁 Project Structure

HotelBooking/
│
├── config/
│ └── db.js # MySQL connection
│
├── controllers/ # Route handlers
│ ├── auth.controller.js
│ ├── hotel.controller.js
│ ├── room.controller.js
│ └── booking.controller.js
│
├── middlewares/
│ └── auth.middleware.js # JWT middleware
│
├── routes/
│ ├── auth.routes.js
│ ├── hotel.routes.js
│ ├── room.routes.js
│ └── booking.routes.js
│
│
├── .env # Environment variables
├── app.js # Entry point
├── package.json
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file at the root with the following:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=HotelManagementSystem
JWT_SECRET=your_jwt_secret_key
⚠️ Make sure your MySQL server is running and the database is created.

🧪 Running Locally
# Install dependencies
npm install

# Run the server
npm run dev
Server runs on: http://localhost:5000/

🔐 Roles
User: Can search hotels, make bookings, view/cancel bookings.

Admin: Can manage hotels and rooms (CRUD operations).

🔌 API Endpoints
Method	Endpoint	Access	Description
POST	/api/auth/register	Public	Register a new user
POST	/api/auth/login	Public	Login and get token
POST	/api/hotels	Admin	Add a hotel
POST	/api/rooms	Admin	Add a room to a hotel
GET     /api/rooms  Public  Get Available Rooms
POST	/api/bookings	User	Make a booking
GET	/api/bookings	User	View my bookings
DELETE	/api/bookings/:id	User	Cancel a booking (if upcoming)


🧱 Database Schema Overview
You’ll need the following tables:

users – name, email, password, role

hotels – name, location, price_range, etc.

rooms – room type, number, hotel_id

bookings – user_id, room_id, check_in, check_out, status


✍️ Author
Om Chauhan – Full Stack Developer

