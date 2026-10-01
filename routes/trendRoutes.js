const express = require("express");
const router = express.Router();
const { getOverview, getMoodTrend, getInsights } = require("../controllers/trendController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", getOverview);
router.get("/mood", getMoodTrend);
router.get("/insights", getInsights);

module.exports = router;
