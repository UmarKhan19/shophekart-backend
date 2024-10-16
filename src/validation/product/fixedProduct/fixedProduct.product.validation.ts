// fixedProduct.validation.ts
import { object, array, string, number, TypeOf } from "zod";
import validationErrorMessages from "../../../constants/validationErrors";
import mongoose from "mongoose"; // Import mongoose to use ObjectId validation

// Custom validator to check if the product is a valid ObjectId
const objectIdValidator = string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
  message: validationErrorMessages.INVALID_ENTITY("Product"),
});

const sizeValidator = object({
  size: string({ required_error: validationErrorMessages.MISSING_ENTITY("Size") }),
  price: number({ required_error: validationErrorMessages.MISSING_ENTITY("Price") }),
  stock: number({ required_error: validationErrorMessages.MISSING_ENTITY("Stock") }),
});

const createFixedProductSchema = object({
  body: object({
    productId: objectIdValidator,
    sizes: array(sizeValidator).optional(),
    price: number().optional(),
    stock: number().optional(),
  }),
});

export default createFixedProductSchema;
export type ICreateFixedProduct = TypeOf<typeof createFixedProductSchema>;
