/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FixedProduct } from "../../models";
interface ISize {
  size: string;
  price: number;
  stock: number;
}

export const updateProductPriceService = async (productId: string, updateData: any) => {
  try {
    const existingFixedProduct = await FixedProduct.findOne({ productId });

    if (!existingFixedProduct) {
      throw new Error(`FixedProduct with Product ID ${productId} not found`);
    }

    // If sizes are provided, update the sizes array
    if (updateData.sizes) {
      existingFixedProduct.sizes = updateData.sizes.map((size: ISize) => ({
        size: size.size,
        price: size.price,
        stock: size.stock,
      }));
    }

    // If direct price is provided, update the direct price
    if (updateData.price) {
      existingFixedProduct.price = updateData.price;
    }

    const updatedFixedProduct = await existingFixedProduct.save();

    return updatedFixedProduct;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to update product price: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
  
};
