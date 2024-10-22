/* eslint-disable no-console */
// src/controllers/review/review.controller.ts
import { Request, Response } from "express";
import { Review } from "../../models";
import { NextFunction } from "express";
import { httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

const createReviewController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const review = new Review(req.body);
    await review.save();
    httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Review"), review);

  } catch (error) {
    next(error); // Call next with the error
  }
};
export default createReviewController;
