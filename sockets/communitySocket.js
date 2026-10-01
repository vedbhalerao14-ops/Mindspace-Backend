const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Community = require("../models/Community");

module.exports = (io) => {
  // Only logged-in users can connect
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error("User not found"));
      socket.userId = user._id.toString();
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.userId);

        socket.on("joinCommunity", async (communityId) => {
      console.log("joinCommunity received: " + communityId);
      try {
      
        const community = await Community.findById(communityId);
        if (!community) return socket.emit("errorMessage", "Community not found");

        socket.join(communityId);
        if (!community.members.some((m) => m.toString() === socket.userId)) {
          community.members.push(socket.userId);
          await community.save();
        }
        socket.emit("joined", "You joined " + community.name);
        socket.to(communityId).emit("notice", "Someone joined the circle");
      } catch (error) {
        socket.emit("errorMessage", "Could not join");
      }
    });

        socket.on("sendMessage", async ({ communityId, text }) => {
      console.log("sendMessage received: " + text);
      try {
        if (!text) return socket.emit("errorMessage", "Message is empty");
        const community = await Community.findById(communityId);
        if (!community) return socket.emit("errorMessage", "Community not found");

        community.messages.push({ text, sender: "Anonymous" });
        await community.save();

        const saved = community.messages[community.messages.length - 1];
        io.to(communityId).emit("newMessage", {
          text: saved.text,
          sender: saved.sender,
          createdAt: saved.createdAt,
        });
      } catch (error) {
        socket.emit("errorMessage", "Could not send message");
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.userId);
    });
  });
};
