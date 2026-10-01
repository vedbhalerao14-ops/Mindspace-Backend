const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "general" },
    url: { type: String, default: "" },
    status: { type: String, enum: ["approved", "hidden"], default: "approved" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
