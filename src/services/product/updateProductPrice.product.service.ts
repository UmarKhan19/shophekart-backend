import { Product } from "../../models";
import { IProductDocument } from "../../types";

const updateProductPrice = async (productId: string, updateData: { price: number }): Promise<IProductDocument> => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, { price: updateData.price }, { new: true });
      if (!updatedProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      return updatedProduct;
    } catch (error) {
      throw new Error(`Failed to update product price: ${(error as Error).message}`);
    }
  };
  

export default updateProductPrice;
