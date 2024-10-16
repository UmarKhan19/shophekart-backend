// src/controllers/product/createProduct.product.controllers.ts

import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import { ICreateProduct } from "../../validation/product/createProduct.product.validation";
import responseMessage from "../../constants/responseMessage";
import { createProduct as createProductService } from "../../services/product";
import { Types } from "mongoose";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const createProduct = asyncHandler(async (req: Request<{}, {}, ICreateProduct["body"]>, res: Response) => {
    const productData = {
        ...req.body,
        category: new Types.ObjectId(req.body.category),

    };

    const product = await createProductService(productData);
    httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Product"), product);
});

export default createProduct;
