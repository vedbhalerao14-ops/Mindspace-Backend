const Breathing = require("../models/Breathing");

exports.getBreathings = async (req, res) => {
  try {
    const list = await Breathing.find().sort({ createdAt: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBreathing = async (req, res) => {
  try {
    const item = await Breathing.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Breathing exercise not found" });
    }
    res.json(item);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    res.status(500).json({ message: error.message });
  }
};
