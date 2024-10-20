// getCategories.controller.ts
import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import getCategories from "../../services/category/getCategories.service";

const getCategoriesController = asyncHandler(async (req: Request, res: Response) => {
  const categories = await getCategories();
  httpResponse(req, res, 200, "Categories fetched successfully", categories);
});

export default getCategoriesController;
