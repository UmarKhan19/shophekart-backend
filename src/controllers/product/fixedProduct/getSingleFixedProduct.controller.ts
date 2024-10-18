 
/* eslint-disable @typescript-eslint/no-explicit-any */
 
// getSingleFixedProduct.controller.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler} from "../../../utils";
import getSingleFixedProduct from "../../../services/product/fixedProduct/getSingleFixedProduct.service";
import responseMessage from "../../../constants/responseMessage";
 
// Then use `ExpressParsedQs` in your code


const getSingleFixedProductController = asyncHandler(async (req: Request<Record<string, any>, any, any, Record<string, any>>, res: Response, next: NextFunction) => {

    try {
      const { id } = req.params as { id: string };
    
      const fixedProduct = await getSingleFixedProduct(id);
      res.status(200).json({ message: responseMessage.FETCHED_SUCCESSFULLY("Fixed Product"), fixedProduct });
    } catch (error) {
      next(error); // pass the error to the next middleware
    }
  });
  

export default getSingleFixedProductController;
