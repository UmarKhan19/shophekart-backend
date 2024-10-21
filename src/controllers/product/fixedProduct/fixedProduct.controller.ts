/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// controllers/product/fixedProduct/fixedProduct.controller.ts
import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../../utils";
import createFixedProduct from "../../../services/product/fixedProduct/fixedProduct.product.service";
import responseMessage from "../../../constants/responseMessage";
import { ICreateFixedProduct } from "../../../validation/product/fixedProduct/fixedProduct.product.validation";
import { Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const createFixedProductController = asyncHandler(async (req: Request<{}, {}, ICreateFixedProduct["body"]>, res: Response) => {
  const {
    category,
    currencyAddress,
    currencyType,
    description,
    details,
    name,
    price,
    productAddress,
    productIdOnChain,
    sellerId,
    shippingType,
    stock,
    shippingCharges,
    shippingDuration,
  } = req.body;
console.log(req.body);
  // Handle images uploaded by Multer (req.files is an array of image file details)
  const images = (req.files as Express.Multer.File[]).map((file) => file.path); // Cloudinary image URLs
console.log(images);
  const fixedProduct = await createFixedProduct({
    category: new Types.ObjectId(category),
    currencyAddress,
    currencyType,
    description,
    details,
    images,
    name,
    price,
    productAddress,
    productIdOnChain,
    sellerId: new Types.ObjectId(sellerId),
    shippingType,
    stock,
    shippingCharges,
    shippingDuration
  });

  httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Fixed Product"), fixedProduct);
});

export default createFixedProductController;
