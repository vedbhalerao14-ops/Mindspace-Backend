const mongoose = require("mongoose");

const breathingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    inhaleSeconds: { type: Number, required: true },
    holdSeconds: { type: Number, default: 0 },
    exhaleSeconds: { type: Number, required: true },
    durationMinutes: { type: Number, default: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Breathing", breathingSchema);
