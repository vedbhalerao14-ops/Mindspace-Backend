const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  getUserGoals,
  updateGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect);

router.post("/", validate(["title"]), createGoal);
router.get("/", getGoals);
router.get("/user/:id", getUserGoals);
router.put("/:id", updateGoal);

module.exports = router;
