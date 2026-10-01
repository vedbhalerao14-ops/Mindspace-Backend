# MindSpace - Mental Health & Mindfulness Journal (Backend)

A REST API with real-time community support for logging moods, journaling, practicing mindfulness, and tracking mental health goals.

## Technologies
Node.js, Express.js, MongoDB, Mongoose, JWT, Firebase (push notifications), Socket.io

## Setup

1. Install Node.js (v18 or higher).
2. Download or clone this project and open the folder in a terminal.
3. Install packages:
   npm install
4. Copy `.env.example` to `.env` and fill in:
   - PORT (for example 3000)
   - MONGO_URI (your MongoDB Atlas connection string)
   - JWT_SECRET (any secret text)
5. (Optional, for notifications) Download a service account key from Firebase Console
   (Project settings > Service accounts > Generate new private key), rename it
   `firebase-key.json` and place it in the main folder.
6. Add sample meditations and breathing exercises (run once):
   node seed.js
7. Start the server:
   npm run dev
8. Open http://localhost:3000 to see "MindSpace API is running".

## Roles
- user (default): can use all personal features
- admin: can also add resources and view all resources.
  To create an admin, register with `"role": "admin"` in the body.

## Authentication
Login returns a JWT token. Send it in the header of every protected request:
Authorization: Bearer YOUR_TOKEN

## API Endpoints

| Area | Endpoints |
|------|-----------|
| Auth | POST /api/auth/register, POST /api/auth/login |
| Journal | POST, GET /api/journal; GET, PUT, DELETE /api/journal/:id |
| Mood | POST, GET /api/mood; GET /api/mood/user/:id |
| Gratitude | POST, GET /api/gratitude; GET /api/gratitude/user/:id |
| Goals | POST, GET /api/goals; GET /api/goals/user/:id; PUT /api/goals/:id |
| Meditations | GET /api/meditations; GET /api/meditations/:id |
| Breathing | GET /api/breathing; GET /api/breathing/:id |
| Trends | GET /api/trends, /api/trends/mood, /api/trends/insights |
| Community | GET, POST /api/community; GET /api/community/:id |
| Resources | GET /api/resources; GET /api/resources/:id; POST /api/resources (admin) |
| Admin | GET, POST /api/admin/resources (admin) |
| Notifications | POST /api/notifications/send |

## Middleware
- JWT authentication (`protect`)
- Role-based authorization (`authorize`)
- Validation (`validate`)

## Real-time community (Socket.io)
Connect to the server with the JWT token: `io(url, { auth: { token } })`

Events sent by the client:
- `joinCommunity` with the community id
- `sendMessage` with `{ communityId, text }`

Events received by the client: `joined`, `notice`, `newMessage`, `errorMessage`

Messages are shown as "Anonymous". To try it, open `test-socket.html` in two browser tabs.

## Push notifications
`POST /api/notifications/send` with `{ "title", "body", "token" }` sends a Firebase push
notification to the device token. A real device token is needed for delivery.

## Testing
Import `MindSpace.postman_collection.json` into Postman and send the requests in order.
