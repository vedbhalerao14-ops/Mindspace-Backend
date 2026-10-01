const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
require("./sockets/communitySocket")(io);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/journal", require("./routes/journalRoutes"));
app.use("/api/mood", require("./routes/moodRoutes"));
app.use("/api/gratitude", require("./routes/gratitudeRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/meditations", require("./routes/meditationRoutes"));
app.use("/api/breathing", require("./routes/breathingRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/trends", require("./routes/trendRoutes"));
app.use("/api/community", require("./routes/communityRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.get("/", (req, res) => {
  res.send("MindSpace API is running");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
