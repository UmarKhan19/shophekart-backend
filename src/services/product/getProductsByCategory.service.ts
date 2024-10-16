 
 
 
import { Product } from "../../models";
import { IProductDocument } from "../../types";
import { Category } from "../../models";
import responseMessage from "../../constants/responseMessage";

const getProductsByCategory = async (categoryName: string): Promise<IProductDocument[]> => {
  try {
    const category = await Category.findOne({ parentCategory: categoryName });
    if (!category) {
      throw new Error(responseMessage.NOT_FOUND("Category"));
    }
    const products = await Product.find({ category: category._id });
    return products;
  } catch (error) {
    throw new Error(`Failed to get products: ${(error as Error).message}`);
  }
};

export default getProductsByCategory;
