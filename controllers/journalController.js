const Journal = require("../models/Journal");

exports.createEntry = async (req, res) => {
  try {
    const { title, content, mood, moodScore } = req.body;
    const entry = await Journal.create({
      user: req.user._id,
      title,
      content,
      mood,
      moodScore,
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEntry = async (req, res) => {
  try {
    const entry = await Journal.findOne({ _id: req.params.id, user: req.user._id });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const entry = await Journal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Journal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    res.status(500).json({ message: error.message });
  }
};
