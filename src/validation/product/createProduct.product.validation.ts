import { object, string, number, TypeOf } from "zod";
import validationErrorMessages from "../../constants/validationErrors";
import mongoose from "mongoose"; // Import mongoose to use ObjectId validation

// Custom validator to check if the category is a valid ObjectId
const objectIdValidator = string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: validationErrorMessages.INVALID_ENTITY("Category")
});

const createProductSchema = object({
    body: object({
        name: string({ required_error: validationErrorMessages.MISSING_ENTITY("Name") }),
        description: string({ required_error: validationErrorMessages.MISSING_ENTITY("Description") }),
        details: string({ required_error: validationErrorMessages.MISSING_ENTITY("Details") }),
        images: string({ required_error: validationErrorMessages.MISSING_ENTITY("Images") }),
        currencyType: string({ required_error: validationErrorMessages.MISSING_ENTITY("Currency Type") }),
        shippingType: string({ required_error: validationErrorMessages.MISSING_ENTITY("Shipping Type") }),
        status: string({ required_error: validationErrorMessages.MISSING_ENTITY("Status") }),
        rating: number({ required_error: validationErrorMessages.MISSING_ENTITY("Rating") }),
        productAddress: string().optional(),
        category: objectIdValidator,  // Use ObjectId validator here
        sellerId: string().optional()
    })
});

export default createProductSchema;
export type ICreateProduct = TypeOf<typeof createProductSchema>;
