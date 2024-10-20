/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import { ICreateCategory } from "../../validation/category/createCategory.category.validation"
import responseMessage from "../../constants/responseMessage"
import createCategory from "../../services/category/createCategory.category.service"
import { Types } from "mongoose"

const createCategoryController = asyncHandler(async (req: Request<{}, {}, ICreateCategory["body"]>, res: Response) => {
  
  const parentCategoryId = req.body.parentCategory === "" ? null : new Types.ObjectId(req.body.parentCategory);
  const category = await createCategory({ label: req.body.label, parentCategory: parentCategoryId })
  httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Category"), category)
})

export default createCategoryController
