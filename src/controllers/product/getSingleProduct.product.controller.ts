import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import getSingleProduct from "../../services/product/getSingleProduct.product.service"

const getSingleProductController = asyncHandler(async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const productId = req.params.id as string
    const product = await getSingleProduct(productId)
    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Product"), product)
})

export default getSingleProductController
