const Community = require("../models/Community");

// Hide member ids so everyone stays anonymous
const toPublic = (c) => ({
  _id: c._id,
  name: c.name,
  description: c.description,
  memberCount: c.members.length,
  messages: c.messages,
  createdAt: c.createdAt,
});

exports.getCommunities = async (req, res) => {
  try {
    const list = await Community.find().sort({ createdAt: -1 });
    res.json(
      list.map((c) => ({
        _id: c._id,
        name: c.name,
        description: c.description,
        memberCount: c.members.length,
        createdAt: c.createdAt,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const community = await Community.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json(toPublic(community));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.json(toPublic(community));
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    res.status(500).json({ message: error.message });
  }
};
