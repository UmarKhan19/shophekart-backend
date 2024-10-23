import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../../utils"
import getSingleFixedProduct from "../../../services/product/fixedProduct/getSingleFixedProduct.service"
import responseMessage from "../../../constants/responseMessage"

const getSingleFixedProductController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const fixedProduct = await getSingleFixedProduct(id)
    httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Fixed Product"), fixedProduct)
    return
})

export default getSingleFixedProductController
