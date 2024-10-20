import { Schema, model } from "mongoose"
import ICategoryDocument from "../types/category.type"

const categorySchema = new Schema<ICategoryDocument>(
    {
        parentCategory: { type: Schema.Types.ObjectId, ref: "Category",required:false },
        label: { type: String, required: true, lowercase: true }
    },
    { timestamps: true }
)

export default model<ICategoryDocument>("Category", categorySchema)
