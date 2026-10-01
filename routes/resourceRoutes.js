const express = require("express");
const router = express.Router();
const {
  getResources,
  getResource,
  createResource,
} = require("../controllers/resourceController");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect);

router.get("/", getResources);
router.get("/:id", getResource);
router.post("/", authorize("admin"), validate(["title", "content"]), createResource);

module.exports = router;
