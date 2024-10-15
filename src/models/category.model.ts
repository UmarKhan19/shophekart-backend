import { Schema, model } from "mongoose";
import ICategoryDocument from "../types/category.type";

const categorySchema = new Schema<ICategoryDocument>({
    name: { type: String, required: true },
    parentCategory: { type: Schema.Types.ObjectId , ref: "Category", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
export default model<ICategoryDocument>("Category", categorySchema);