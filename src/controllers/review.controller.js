import * as reviewService from "../services/review.service.js";

export const addReview = async (req, res) => {
  try {
    const reviewId = await reviewService.createReview(req.body);
    res.status(201).json({
      message: "리뷰 등록 완료",
      review_id: reviewId,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
