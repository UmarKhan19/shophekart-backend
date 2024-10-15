/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import { ICreateCategory } from "../../validation/category/createCategory.category.validation";
import responseMessage from "../../constants/responseMessage";
import createCategory from "../../services/category/createCategory.category.service";

const createCategoryController = asyncHandler(async (req: Request<{}, {}, ICreateCategory["body"]>, res: Response) => {
  const category = await createCategory(req.body);
  httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Category"), category);
});

export default createCategoryController;
