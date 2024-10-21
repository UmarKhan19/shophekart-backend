import { Request, Response, NextFunction } from "express";
import { Review } from "../../models";
import { httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

const deleteReviewController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return httpResponse(req, res, 404, responseMessage.NOT_FOUND("Review"),review);
    }
    return httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY("Review"),review);
  } catch (error) {
    next(error);
  }
};

export default deleteReviewController;
