/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import responseMessage from "../../constants/responseMessage";
import { FixedProduct } from "../../models";

/**
 * Search products by name (case insensitive, starts with).
 * 
 * @param {string} searchTerm - The search term to match products.
 * @returns {Promise<IProductDocument[]>} - List of matching products.
 */
export default async function searchFixedProductsByName(searchTerm: string) {
    if (!searchTerm) throw new Error(responseMessage.INVALID_INPUT("Search term"));

    // Perform case-insensitive search with regex for products whose names start with the search term
    const fixedProducts = await FixedProduct.find({
        name: { $regex:  `${searchTerm}$`,$options: "i" } // ^ for startsWith, 'i' for case-insensitive
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    }); // Optionally populate category if needed

    return fixedProducts;
}
    