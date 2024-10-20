import { FixedProduct } from "../../../models"
import IFixedProductDocument from "../../../types/fixedProduct.type"

const createFixedProduct = async (fixedProductData: Partial<IFixedProductDocument>): Promise<IFixedProductDocument> => {
    try {
        const fixedProduct = await FixedProduct.create({
            ...fixedProductData
        })
        return fixedProduct
    } catch (error) {
        throw new Error(`Failed to create fixed product: ${(error as Error).message}`)
    }
}

export default createFixedProduct
