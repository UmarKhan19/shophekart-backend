// src/validation/review/review.validation.ts

import { z } from "zod";

const createReviewSchema = z.object({
  targetId: z.string().min(1, { message: "Target ID is required" }),
  targetType: z.enum(["product", "user"], { required_error: "Target type is required" }).transform((val) => val.toLowerCase()),
  reviewType: z.enum(["positive", "neutral", "negative"], { required_error: "Review type is required" }),
  rating: z.number({
    required_error: "Rating is required",
    invalid_type_error: "Rating must be a number",
  }).min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must not exceed 5" }),
  comment: z.string({
    required_error: "Comment is required",
  }).min(1, { message: "Comment must not be empty" }),
});

export default createReviewSchema;
