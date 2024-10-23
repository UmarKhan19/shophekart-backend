import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import updateProductOnChainIdService from "../../services/product/updateOnChainId.product.service"
import { TUpdateProductOnChainId } from "../../validation/product/updateProductOnChainId.validation"
import { Types } from "mongoose"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const updateProductOnChainId = asyncHandler(async (req: Request<{}, {}, TUpdateProductOnChainId["body"]>, res: Response) => {
    const { onChainId, productId } = req.body

    const updatedProduct = await updateProductOnChainIdService(new Types.ObjectId(productId), onChainId)

    httpResponse(req, res, 200, responseMessage.UPDATED_SUCCESSFULLY("On Chain Product Id"), updatedProduct)
})

export default updateProductOnChainId
