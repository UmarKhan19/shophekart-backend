import Product from "../../models/product.model";

import responseMessage from "../../constants/responseMessage";

/**
 * Search products by name (case insensitive, starts with).
 * 
 * @param {string} searchTerm - The search term to match products.
 * @returns {Promise<IProductDocument[]>} - List of matching products.
 */
export default async function searchProductsByName(searchTerm: string) {
    if (!searchTerm) throw new Error(responseMessage.INVALID_INPUT("Search term"));

    // Perform case-insensitive search with regex for products whose names start with the search term
    const products = await Product.find({
        name: { $regex: new RegExp("^" + searchTerm, "i") } // ^ for startsWith, 'i' for case-insensitive
    }).populate("category"); // Optionally populate category if needed

    return products;
}
