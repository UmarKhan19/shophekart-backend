/* eslint-disable @typescript-eslint/restrict-template-expressions */
// fixedProduct.service.ts
import { FixedProduct } from "../../../models";
import IFixedProductDocument from "../../../types/fixedProduct.type";

const createFixedProduct = async (fixedProductData: Partial<IFixedProductDocument>): Promise<IFixedProductDocument> => {
  try {
    // Check if a fixed product with the product ID already exists
    const existingFixedProduct = await FixedProduct.findOne({
      productId: fixedProductData.productId,
    });

    if (existingFixedProduct) {
      throw new Error(`A fixed product with product ID ${fixedProductData.productId} already exists`);
    }

    // Create a new fixed product
    const fixedProduct = await FixedProduct.create({
      ...fixedProductData,
      productId: fixedProductData.productId,
    });
    return fixedProduct;
  } catch (error) {
    throw new Error(`Failed to create fixed product: ${(error as Error).message}`);
  }
};

export default createFixedProduct;
