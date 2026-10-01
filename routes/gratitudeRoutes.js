const express = require("express");
const router = express.Router();
const {
  createGratitude,
  getGratitudes,
  getUserGratitudes,
} = require("../controllers/gratitudeController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect);

router.post("/", validate(["text"]), createGratitude);
router.get("/", getGratitudes);
router.get("/user/:id", getUserGratitudes);

module.exports = router;
