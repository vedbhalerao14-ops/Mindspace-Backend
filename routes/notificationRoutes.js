const express = require("express");
const router = express.Router();
const { sendNotification } = require("../controllers/notificationController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect);

router.post("/send", validate(["title", "body"]), sendNotification);

module.exports = router;
