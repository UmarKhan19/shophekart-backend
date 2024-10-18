import { Router } from "express";
import { validateSchema } from "../middlewares";
import createReviewController from "../controllers/review/review.controller";
import createReviewSchema from "../validation/review/review.validation";

const reviewRouter: Router = Router();

reviewRouter.post(
  "/create",
  validateSchema(createReviewSchema),
  createReviewController
);

export default reviewRouter;
