// Add these functions to your existing review.controller.ts file
import { Request, Response, NextFunction } from "express";
import { Review } from "../../models";
import { httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

export const increaseLikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findByIdAndUpdate(reviewId, { $inc: { likes: 1 } }, { new: true });
    if (!review) {
      return httpResponse(req, res, 404, responseMessage.NOT_FOUND("Review"),"");
    }
    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Likes Increased"), review);
  } catch (error) {
    next(error);
  }
};

export const increaseDislikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findByIdAndUpdate(reviewId, { $inc: { dislikes: 1 } }, { new: true });
    if (!review) {
        return httpResponse(req, res, 404, responseMessage.NOT_FOUND("Review"),"");
      }
      httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Likes Increased"), review);
    } catch (error) {
    next(error);
  }
};
