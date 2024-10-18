import { Schema, model } from "mongoose";
import ICategoryDocument from "../types/category.type";

const categorySchema = new Schema<ICategoryDocument>({
   
  
    parentCategory: { type:String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
export default model<ICategoryDocument>("Category", categorySchema);