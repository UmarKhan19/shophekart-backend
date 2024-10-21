import { Document, ObjectId } from "mongoose";

export default interface IReplyDocument extends Document {
  reviewId: ObjectId;  // Reference to Review
  replierId: ObjectId;  // Reference to User
  verifiedPurchase: boolean;
  replyText: string;
  likes: number;
  dislikes: number;

  createdAt: Date;  // Timestamp when reply was created
  updatedAt: Date;  // Timestamp when reply was last updated
}
