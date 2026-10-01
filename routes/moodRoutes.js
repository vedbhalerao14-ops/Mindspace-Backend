const express = require("express");
const router = express.Router();
const { createMood, getMoods, getUserMoods } = require("../controllers/moodController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect);

router.post("/", validate(["mood", "score"]), createMood);
router.get("/", getMoods);
router.get("/user/:id", getUserMoods);

module.exports = router;
