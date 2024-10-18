import { Document, ObjectId } from "mongoose";

export default interface IReviewDocument extends Document {
  target_id: ObjectId;  // Reference to Product or User based on targetType
  targetType: "Product" | "User";  // Type of review target (Product or User)
  reviewer_id: ObjectId;  // Reference to User who is reviewing
  reviewType: "positive" | "neutral" | "negative";  // Type of review
  rating: number;  // Rating between 1 and 5
  comment: string;  // Review comment
  likes: number;  // Number of likes on the review
  dislikes: number;  // Number of dislikes on the review
  replyNumber: number|undefined;  

  createdAt: Date;  // Timestamp when review was created
  updatedAt: Date;  // Timestamp when review was last updated
}
