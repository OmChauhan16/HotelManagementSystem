📘 API Documentation – Hotel Booking Platform
All API endpoints use https://your-domain.com/api/... or http://localhost:5000/api/... for local development.

Authentication-protected routes require a JWT token in the header:

makefile
Copy
Edit
Authorization: Bearer <your_token>
🧑 Auth Routes
1. Register User
URL: /api/auth/register

Method: POST

Access: Public

Body:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourPassword"
}
Response:

json
Copy
Edit
{
  "message": "User registered successfully"
}
2. Login User
URL: /api/auth/login

Method: POST

Access: Public

Body:

json
Copy
Edit
{
  "email": "john@example.com",
  "password": "yourPassword"
}
Response:

json
Copy
Edit
{
  "token": "<JWT_TOKEN>"
}
🏨 Hotel Routes (Admin Only)
3. Create Hotel
URL: /api/hotels

Method: POST

Access: Admin

Body:

json
Copy
Edit
{
  "name": "Taj Palace",
  "location": "Delhi",
  "price_range": "3000-8000"
}
Response: Hotel created details.

4. Update Hotel
URL: /api/hotels/:id

Method: PUT

Access: Admin

Body: (Any fields to update)

5. Delete Hotel
URL: /api/hotels/:id

Method: DELETE

Access: Admin

6. Get All Hotels with Filters
URL: /api/hotels

Method: GET

Access: Public

Query Params (optional):

location: string

minPrice: number

maxPrice: number

check_in: YYYY-MM-DD

check_out: YYYY-MM-DD

Example: /api/hotels?location=Delhi&minPrice=3000&check_in=2025-05-01&check_out=2025-05-04

🛏️ Room Routes (Admin Only)
7. Create Room
URL: /api/rooms

Method: POST

Access: Admin

Body:

json
Copy
Edit
{
  "hotel_id": 1,
  "room_number": "101",
  "type": "Deluxe"
}
📅 Booking Routes (User Only)
8. Create Booking
URL: /api/bookings

Method: POST

Access: User

Body:

json
Copy
Edit
{
  "room_id": 1,
  "check_in": "2025-05-01",
  "check_out": "2025-05-04"
}
9. Get My Bookings
URL: /api/bookings/my

Method: GET

Access: User

Response: List of bookings for the current user.

10. Cancel Booking
URL: /api/bookings/:id

Method: DELETE

Access: User

Only allowed for upcoming bookings

🔒 Role-Based Access
Endpoint	Role
/api/auth/register	Public
/api/auth/login	Public
/api/hotels (POST/PUT/DEL)	Admin
/api/rooms (POST)	Admin
/api/bookings	User
/api/bookings/my	User