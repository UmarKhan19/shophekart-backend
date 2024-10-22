import { Request, Response, NextFunction } from "express";
import { Review } from "../../models";
import { httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

const getReviewsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetId = req.params.targetId;
    const reviews = await Review.find({ targetId });
    if (!reviews) {
      res.status(400).json({"message":"No reviews found"});
    }
    return httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Reviews"), reviews);
  } catch (error) {
    next(error);
  }
};

export default getReviewsController;
