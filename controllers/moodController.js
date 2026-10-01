const Mood = require("../models/Mood");

const handleError = (error, res) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

exports.createMood = async (req, res) => {
  try {
    const { mood, score, note } = req.body;
    const entry = await Mood.create({ user: req.user._id, mood, score, note });
    res.status(201).json(entry);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getUserMoods = async (req, res) => {
  try {
    const isOwner = req.user._id.toString() === req.params.id;
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only view your own moods" });
    }
    const moods = await Mood.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    handleError(error, res);
  }
};
