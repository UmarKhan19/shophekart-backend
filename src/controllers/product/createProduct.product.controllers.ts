import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import { ICreateProduct } from "../../validation/product/createProduct.product.validation";
import responseMessage from "../../constants/responseMessage";
import { createProduct as createProductService } from "../../services/product";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const createProduct = asyncHandler(async (req: Request<{}, {}, ICreateProduct["body"]>, res: Response) => {
    const product = await createProductService(req.body);
    httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Product"), product);
});

export default createProduct;
 