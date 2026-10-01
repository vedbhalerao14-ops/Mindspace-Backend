const Resource = require("../models/Resource");

const handleError = (error, res) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

// Users: only approved resources
exports.getResources = async (req, res) => {
  try {
    const list = await Resource.find({ status: "approved" }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getResource = async (req, res) => {
  try {
    const item = await Resource.findOne({ _id: req.params.id, status: "approved" });
    if (!item) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(item);
  } catch (error) {
    handleError(error, res);
  }
};

// Admin: all resources
exports.getAllResources = async (req, res) => {
  try {
    const list = await Resource.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    handleError(error, res);
  }
};

// Admin: create a resource (used by both POST routes)
exports.createResource = async (req, res) => {
  try {
    const { title, content, category, url, status } = req.body;
    const item = await Resource.create({
      title,
      content,
      category,
      url,
      status,
      createdBy: req.user._id,
    });
    res.status(201).json(item);
  } catch (error) {
    handleError(error, res);
  }
};
