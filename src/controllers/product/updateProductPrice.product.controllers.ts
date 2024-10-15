import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import { IUpdateProductPrice } from "../../validation/product/updateProductPrice.product.validation";
import responseMessage from "../../constants/responseMessage";
import {updateProductPrice as updateProductServicePrice} from "../../services/product/updateProductPrice.product.service";

const updateProductPriceController = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const productId = req.params.id as string; 

  const updatedProduct = await updateProductServicePrice(productId, req.body as IUpdateProductPrice["body"]); // assert the type of req.body manually
  httpResponse(req, res, 200, responseMessage.UPDATED_SUCCESSFULLY("Product Price"), updatedProduct);
});

export default updateProductPriceController;
