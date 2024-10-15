import { Product } from "../../models";
import { IProductDocument } from "../../types";
import responseMessage from "../../constants/responseMessage";

const getSingleProduct = async (productId: string): Promise<IProductDocument> => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(responseMessage.NOT_FOUND("Product"));
    }
    return product;
  } catch (error) {
    throw new Error(`Failed to get product: ${(error as Error).message}`);
  }
};

export default getSingleProduct;
