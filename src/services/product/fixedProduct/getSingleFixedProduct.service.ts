/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FixedProduct } from "../../../models"
import IFixedProductDocument from "../../../types/fixedProduct.type"
import responseMessage from "../../../constants/responseMessage"

const getSingleFixedProduct = async (fixedProductId: string): Promise<IFixedProductDocument> => {
    try {
        const fixedProduct: IFixedProductDocument = await FixedProduct.findById(fixedProductId)

        if (!fixedProduct) {
            throw new Error(responseMessage.NOT_FOUND("Fixed Product"))
        }

        return fixedProduct
    } catch (error) {
        throw new Error(`Failed to get fixed product: ${(error as Error).message}`)
    }
}

export default getSingleFixedProduct
