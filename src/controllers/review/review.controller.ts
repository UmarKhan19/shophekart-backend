// src/controllers/review/review.controller.ts
import { Request, Response } from "express";
import { Review } from "../../models";
import { NextFunction } from "express";

const createReviewController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review.toJSON());
  } catch (error) {
    next(error); // Call next with the error
  }
};
export default createReviewController;
