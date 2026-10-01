const Meditation = require("../models/Meditation");

exports.getMeditations = async (req, res) => {
  try {
    const list = await Meditation.find().sort({ createdAt: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMeditation = async (req, res) => {
  try {
    const item = await Meditation.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Meditation not found" });
    }
    res.json(item);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    res.status(500).json({ message: error.message });
  }
};
