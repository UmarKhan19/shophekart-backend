import { Category } from "../../models";
import { ICategoryDocument } from "../../types";

const createCategory = async (categoryData: Partial<ICategoryDocument>): Promise<ICategoryDocument> => {
  try {
    const category = await Category.create(categoryData);
    return category;
  } catch (error) {
    throw new Error(`Failed to create category: ${(error as Error).message}`);
  }
};

export default createCategory;
