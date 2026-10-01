const express = require("express");
const router = express.Router();
const { getBreathings, getBreathing } = require("../controllers/breathingController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", getBreathings);
router.get("/:id", getBreathing);

module.exports = router;
