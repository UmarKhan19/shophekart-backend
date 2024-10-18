/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { model, Schema } from "mongoose";
import IReviewDocument from "../types/review.type";
import User from "./user.model";

const reviewSchema: Schema<IReviewDocument> = new Schema<IReviewDocument>({
    targetType: {
    type: String,
    enum: ["Product", "User"], // It can be either 'Product' or 'User'
    required: true,
  },
  target_id: {
    type: Schema.Types.ObjectId,
    refPath: "targetType",
    required: true,
  },
  reviewer_id: {
    type: Schema.Types.ObjectId,
    ref: User, // The reviewer is always a User
    required: true,
  },
  reviewType: {
    type: String,
    enum: ["positive", "neutral", "negative", "productReview", "userReview"],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
replyNumber:{
type:Number,
required:false
},
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a method to populate the target details (User or Product)
reviewSchema.methods.populateTarget = async function () {
    if (this.targetType === "Product") {
      return await this.populate("target_id"); // Populate entire product document
    } else if (this.targetType === "User") {
      return await this.populate("target_id"); // Populate entire user document
    }
  };

export default model<IReviewDocument>("Review", reviewSchema);
