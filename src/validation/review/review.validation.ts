// src/validation/review/review.validation.ts

import { z } from "zod";
import validationErrorMessages from "../../constants/validationErrors";

const createReviewSchema = z.object({
  body:z.object({
  targetId: z.string().min(1, { message: "Target ID is required" }),
  reviewerId: z.string().min(1, { message: "Reviewer ID is required" }),

  targetType: z.enum(["product","user"], {
    required_error: validationErrorMessages.MISSING_ENTITY("Target Type"),
    invalid_type_error: validationErrorMessages.INVALID_ENTITY("Target Type")
}),
  reviewType:  z.enum(["positive","negative","neutral"], {
    required_error: validationErrorMessages.MISSING_ENTITY("Review Type"),
    invalid_type_error: validationErrorMessages.INVALID_ENTITY("Review Type")
}),
  rating: z.number({
    required_error: "Rating is required",
    invalid_type_error: "Rating must be a number",
  }).min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must not exceed 5" }),
  comment: z.string({
    required_error: "Comment is required",
  }).min(1, { message: "Comment must not be empty" }),
})});

export default createReviewSchema;
