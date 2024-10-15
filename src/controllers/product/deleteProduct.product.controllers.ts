 
import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";
import deleteProduct from "../../services/product/deleteProduct.product.service";

const deleteProductController =  asyncHandler(async (
    req: Request,
    res: Response,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const productId = req.params.id as string; 
  const deletedProduct = await deleteProduct(productId);
  httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY("Product"), deletedProduct);
});

export default deleteProductController;
