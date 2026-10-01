const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    durationMinutes: { type: Number, required: true },
    category: { type: String, default: "general" },
    audioUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meditation", meditationSchema);
