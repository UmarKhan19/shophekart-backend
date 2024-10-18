// review.type.ts
import { Document, Types } from "mongoose";

interface IReviewDocument extends Document {
  /**
   * The unique identifier for the document.
   */
  _id: string;

  /**
   * The ID of the product or user being reviewed.
   */
  targetId: Types.ObjectId;

  /**
   * The type of the target. Can be either 'product' or 'user'.
   */
  targetType: string;

  /**
   * The ID of the user who made the review.
   */
  reviewerId: Types.ObjectId;

  /**
   * The type of review. Can be either 'productReview' or 'userReview'.
   */
  reviewType: string;

  /**
   * The rating of the review.
   */
  rating: number;

  /**
   * The comment made in the review.
   */
  comment: string;

  /**
   * The number of likes on the review.
   */
  likes: number;

  /**
   * The number of dislikes on the review.
   */
  dislikes: number;

  /**
   * The date and time the document was created.
   */
  createdAt: Date;

  /**
   * The date and time the document was last updated.
   */
  updatedAt: Date;
}

export default IReviewDocument;

