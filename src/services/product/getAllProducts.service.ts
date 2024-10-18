// services/product/getAllProducts.service.ts

import { Product } from "../../models";
import { IProductDocument } from "../../types";
const getAllProducts = async (): Promise<IProductDocument[]> => {
  try {
    const products = await Product.find().exec();
    return products;
  } catch (error) {
    throw new Error(`Failed to get products: ${(error as Error).message}`);
  }
};

export default getAllProducts;
