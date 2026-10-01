const express = require("express");
const router = express.Router();
const { getMeditations, getMeditation } = require("../controllers/meditationController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", getMeditations);
router.get("/:id", getMeditation);

module.exports = router;
