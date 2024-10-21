import { z } from "zod";

const createReplySchema = z.object({
  reviewId: z.string().min(1, { message: "Review ID is required" }),
  replierId: z.string().min(1, { message: "Replier ID is required" }),
  verifiedPurchase: z.boolean({ required_error: "Verified Purchase is required" }),
  replyText: z.string({
    required_error: "Reply Text is required",
  }).min(1, { message: "Reply Text must not be empty" }),
});

export default createReplySchema;
