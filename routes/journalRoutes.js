const express = require("express");
const router = express.Router();
const {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/journalController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect);

router.post("/", validate(["title", "content"]), createEntry);
router.get("/", getEntries);
router.get("/:id", getEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

module.exports = router;
