// fetchFixedProduct.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../../utils";
import getAllFixedProducts from "../../../services/product/fixedProduct/fixedProduct.service";
import responseMessage from "../../../constants/responseMessage";

const fetchFixedProductController = asyncHandler(async (_req: Request, res: Response) => {
    const fixedProducts = await getAllFixedProducts();
    res.status(200).json({
      message: responseMessage.CREATED_SUCCESSFULLY("Fixed Products"),
      fixedProducts,
    });
  });
  

export default fetchFixedProductController;
