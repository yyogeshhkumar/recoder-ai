const Review = require("../models/Review");
const { getCodeReview } = require("../utils/aiService");

// Create Review
exports.createReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }

    const aiResponse = await getCodeReview(code);

    let parsedResult;

    try {
        parsedResult = JSON.parse(aiResponse);
    } catch (error) {
        parsedResult = { raw: aiResponse }; // fallback
    }

    const review = await Review.create({
        user: req.user._id,
        code,
        language,
        result: parsedResult,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Reviews
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};