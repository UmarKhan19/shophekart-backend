import { object, array, string, number, TypeOf } from "zod";
import validationErrorMessages from "../../constants/validationErrors";

const sizeValidator = object({
  size: string({ required_error: validationErrorMessages.MISSING_ENTITY("Size") }),
  price: number({ required_error: validationErrorMessages.MISSING_ENTITY("Price") }),
  stock: number({ required_error: validationErrorMessages.MISSING_ENTITY("Stock") }),
});

const updateProductPriceSchema = object({
  body: object({
    sizes: array(sizeValidator).optional(),
    price: number().optional(),
  }),
});

export default updateProductPriceSchema;
export type IUpdateProductPrice = TypeOf<typeof updateProductPriceSchema>;
