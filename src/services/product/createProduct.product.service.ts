import { Product } from "../../models";
import { IProductDocument } from "../../types";
import responseMessage from "../../constants/responseMessage";

const createProduct = async (productData: Partial<IProductDocument>): Promise<IProductDocument> => {
    try {
        const existingProduct = await Product.findOne({ name: productData.name });

        if (existingProduct) {
            throw new Error(responseMessage.ALREADY_EXISTS("Product"));
        }

        const product = await Product.create(productData);
        return product;
    } catch (error) {
        throw new Error(`Failed to create product: ${(error as Error).message}`);
    }
};

export default createProduct;
