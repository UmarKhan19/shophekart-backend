import { Request, Response } from "express";
import { asyncHandler } from "../../../utils";
import createFixedProduct from "../../../services/product/fixedProduct/fixedProduct.product.service";
import responseMessage from "../../../constants/responseMessage";

const createFixedProductController = asyncHandler(async (req: Request, res: Response) => {
  // Pass the request body to the service to handle product creation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const fixedProduct = await createFixedProduct(req.body);

  // No need to return, just send the response
  res.status(201).json({
    message: responseMessage.CREATED_SUCCESSFULLY("Fixed Product"),
    fixedProduct,
  });
});

export default createFixedProductController;
