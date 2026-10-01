const Gratitude = require("../models/Gratitude");

const handleError = (error, res) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

exports.createGratitude = async (req, res) => {
  try {
    const entry = await Gratitude.create({ user: req.user._id, text: req.body.text });
    res.status(201).json(entry);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getGratitudes = async (req, res) => {
  try {
    const list = await Gratitude.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getUserGratitudes = async (req, res) => {
  try {
    const isOwner = req.user._id.toString() === req.params.id;
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only view your own gratitude entries" });
    }
    const list = await Gratitude.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    handleError(error, res);
  }
};
