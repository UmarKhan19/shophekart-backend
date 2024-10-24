/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Add these functions to your existing review.controller.ts file
import { Request, Response, NextFunction } from "express";
import { Review } from "../../models";
import { httpError, httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

export const increaseLikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = req.params.reviewId;
    const {userId} = req.body;
   

    const review = await Review.findById(reviewId);
    if (!review) {
        return httpResponse(req, res, 404, responseMessage.NOT_FOUND("Review"),"");
      }
      const alreadyLiked = await Review.findOne({
        _id: reviewId,
        likedBy: { $in: [userId] },
      });
      if (alreadyLiked) {
        httpError(next,  new Error("Already liked"), req,400)
return
      } 
      await review.updateOne({ $inc: { likes: 1 }, $addToSet: { likedBy: userId } });


    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Likes Increased"), review);
  } catch (error) {
    next(error);
  }
};

export const increaseDislikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = req.params.reviewId;
    const {userId} = req.body;
    const review = await Review.findById(reviewId);

    if (!review) {
        return httpResponse(req, res, 404, responseMessage.NOT_FOUND("Review"),"");
      }

    const alreadyDisliked = await Review.findOne({
        _id: reviewId,
        dislikedBy: { $in: [userId] },
      });
      
   
      
      if (alreadyDisliked) {
        httpError(next,new Error("Already disliked"), req,400)
        return
    } 
      await review.updateOne({ $inc: { dislikes: 1 }, $addToSet: { dislikedBy: userId } });

      httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Dislikes Increased"), review);
    } catch (error) {
//    console.log(error);
        next(error);
  }
};
