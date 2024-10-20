// getCategories.service.ts
import { Category } from "../../models";
import { ICategoryDocument } from "../../types";

const getCategories = async (): Promise<ICategoryDocument[]> => {
  try {
    const categories = await Category.find().exec();
    return categories;
  } catch (error) {
    throw new Error(`Failed to get categories: ${(error as Error).message}`);
  }
};

export default getCategories;
