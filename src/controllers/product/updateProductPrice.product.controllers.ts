/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";
import { updateProductPriceService } from "../../services/product/updateProductPrice.product.service";

const updateProductPriceController = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const productId = req.params.id as string;
  const updatedFixedProduct = await updateProductPriceService(productId, req.body);

  httpResponse(req, res, 200, responseMessage.UPDATED_SUCCESSFULLY("Product Price"), updatedFixedProduct);
});

export default updateProductPriceController;
