import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpResponse, httpError } from "../../utils"
import Category from "../../models/category.model"
import responseMessage from "../../constants/responseMessage"
import mongoose from "mongoose"

const defaultCategories = [
    { label: "electronics" },
    { label: "sports & outdoors" },
    { label: "home & kitchen" },
    { label: "fashion" },
    { label: "office supplies" },
    { label: "groceries" },
    { label: "appliances" },
    { label: "gardening" }
]

const addDefaultCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        // Find existing categories with matching labels
        const existingCategories = await Category.find({
            label: { $in: defaultCategories.map((cat) => cat.label) }
        }).session(session)

        const existingLabels = existingCategories.map((cat) => cat.label)

        // Filter out already existing categories
        const newCategories = defaultCategories.filter((cat) => !existingLabels.includes(cat.label))

        // Insert only the non-existing categories
        if (newCategories.length > 0) {
            await Category.insertMany(newCategories, { session })
        }

        // Commit the transaction
        await session.commitTransaction()
        await session.endSession()

        httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Default categories"), newCategories)
    } catch {
        // Rollback the transaction in case of an error
        await session.abortTransaction()
        await session.endSession()

        httpError(next, new Error("An error occurred while adding default categories"), req, 500)
    }
})

export default addDefaultCategories
