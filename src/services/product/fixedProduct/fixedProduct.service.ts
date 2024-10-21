/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FixedProduct } from "../../../models"
import IFixedProductDocument from "../../../types/fixedProduct.type"

const getAllFixedProducts = async (): Promise<IFixedProductDocument[]> => {
    try {
        const fixedProducts = (await FixedProduct.find({}))

        return fixedProducts
    } catch (error) {
        throw new Error(`Failed to fetch fixed products: ${(error as Error).message}`)
    }
}

export default getAllFixedProducts
