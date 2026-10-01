const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    sender: { type: String, default: "Anonymous" },
  },
  { timestamps: true }
);

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
