const express = require("express");
const router = express.Router();
const { getAllResources, createResource } = require("../controllers/resourceController");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.use(protect, authorize("admin"));

router.get("/resources", getAllResources);
router.post("/resources", validate(["title", "content"]), createResource);

module.exports = router;
