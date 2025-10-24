import * as reviewRepository from "../repositories/review.repository.js";

export const createReview = async (data) => {
  if (!data.member_id || !data.store_id || !data.body || data.score === undefined) {
    throw new Error("필수 필드 누락");
  }

  const result = await reviewRepository.addReview(data);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.reviewId;
};
