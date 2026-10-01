const Goal = require("../models/Goal");

const handleError = (error, res) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

exports.createGoal = async (req, res) => {
  try {
    const { title, description, targetDays } = req.body;
    const goal = await Goal.create({
      user: req.user._id,
      title,
      description,
      targetDays,
    });
    res.status(201).json(goal);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getUserGoals = async (req, res) => {
  try {
    const isOwner = req.user._id.toString() === req.params.id;
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only view your own goals" });
    }
    const goals = await Goal.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    handleError(error, res);
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const { title, description, targetDays, progress } = req.body;
    const updates = { title, description, targetDays, progress };

    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    if (updates.progress !== undefined) {
      updates.status = updates.progress >= 100 ? "completed" : "active";
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json(goal);
  } catch (error) {
    handleError(error, res);
  }
};
