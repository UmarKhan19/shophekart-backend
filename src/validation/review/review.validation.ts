import { z } from "zod";

const createReviewSchema = z.object({
  targetId: z.string().uuid(),
  targetType: z.enum(["product", "user"]),
  reviewType: z.enum([ "positive" , "neutral" , "negative"]),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

export default createReviewSchema;
