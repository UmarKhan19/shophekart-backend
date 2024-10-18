
import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";
import getSingleProduct from "../../services/product/getSingleProduct.product.service";

const getSingleProductController = asyncHandler(async (
    req: Request,
    res: Response,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const productId = req.params.id as string;
    // eslint-disable-next-line no-console
    console.log(productId);
    const product = await getSingleProduct(productId);
    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION, product);
});

export default getSingleProductController;
