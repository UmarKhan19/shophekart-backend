// fetchFixedProduct.controller.ts
import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../../utils"
import getAllFixedProducts from "../../../services/product/fixedProduct/fixedProduct.service"
import responseMessage from "../../../constants/responseMessage"

const fetchFixedProductController = asyncHandler(async (req: Request, res: Response) => {
    const fixedProducts = await getAllFixedProducts()
    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Fixed Products"), fixedProducts)
})

export default fetchFixedProductController