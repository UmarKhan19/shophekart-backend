import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import searchProductsByName from "../../services/product/searchProduct.service";
import responseMessage from "../../constants/responseMessage";

// Controller to handle product search
const searchProductController = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query as { query?: string }; // Extract search query from request query params
    
    if (!query) {
        return httpResponse(req, res, 400, responseMessage.INVALID_INPUT("Search query"),"");
    }

    // Call the service to fetch products matching the query
    const products = await searchProductsByName(query);

    // Respond with the found products
    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Products"), products);
});

export default searchProductController;
