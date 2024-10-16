/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import getProductsByCategory from "../../services/product/getProductsByCategory.service";

const getProductsByCategoryController = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const categoryName = req.params.categoryName as string;
  const products = await getProductsByCategory(categoryName);
  httpResponse(req, res, 200, "Products fetched successfully", products);
});

export default getProductsByCategoryController;
