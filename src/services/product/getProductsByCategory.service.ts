import { Product } from "../../models"
import { IProductDocument } from "../../types"

const getProductsByCategory = async (categoryName: string): Promise<IProductDocument[]> => {
    try {
        const products: IProductDocument[] = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $match: {
                    "category.0.label": categoryName
                }
            }
        ])
        return products
    } catch (error) {
        throw new Error(`Failed to get products: ${(error as Error).message}`)
    }
}

export default getProductsByCategory
