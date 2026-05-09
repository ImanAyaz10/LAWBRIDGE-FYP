const Review = require('../models/Review');

const createReview = async (req, res) => {
    res.json({ message: "Review created (Skeleton)" });
};

const getLawyerReviews = async (req, res) => {
    res.json({ message: "Reviews fetched (Skeleton)" });
};

module.exports = {
    createReview,
    getLawyerReviews,
};
