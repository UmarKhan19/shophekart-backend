 
import { Product } from "../../models";
import { IProductDocument } from "../../types";
import responseMessage from "../../constants/responseMessage";

const deleteProduct = async (productId: string): Promise<IProductDocument> => {
  try {
    
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error(responseMessage.NOT_FOUND("Product"));
    }
     
    return deletedProduct;
  } catch (error) {
    throw new Error(`Failed to delete product: ${(error as Error).message}`);
  }
};

export default deleteProduct;
