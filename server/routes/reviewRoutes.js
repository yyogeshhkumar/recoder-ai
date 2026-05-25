const express = require("express");
const router = express.Router();
const {
  createReview,
  getMyReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Protected routes
router.post("/", protect, createReview);
router.get("/my", protect, getMyReviews);

module.exports = router;