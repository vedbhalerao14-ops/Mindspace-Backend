const express = require("express");
const router = express.Router();
const {
  getCommunities,
  createCommunity,
  getCommunity,
} = require("../controllers/communityController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect);

router.get("/", getCommunities);
router.post("/", validate(["name"]), createCommunity);
router.get("/:id", getCommunity);

module.exports = router;
