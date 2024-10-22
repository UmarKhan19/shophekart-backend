import { Review } from "../../models";
import IReviewDocument from "../../types/review.type";

const createReviewService = async (reviewData: IReviewDocument) => {
  const review = new Review(reviewData);
  await review.save();
  return review.toJSON();
};

export default createReviewService;
