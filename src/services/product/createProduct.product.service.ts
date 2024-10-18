import { Product } from "../../models";
import { IProductDocument } from "../../types";

const createProduct = async (productData: Partial<IProductDocument>): Promise<IProductDocument> => {
    try {
       

        const product = await Product.create(productData);
        return product;
    } catch (error) {
        throw new Error(`Failed to create product: ${(error as Error).message}`);
    }
};

export default createProduct;
