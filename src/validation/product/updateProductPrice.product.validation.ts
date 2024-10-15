import { object, number, TypeOf } from "zod";
import validationErrorMessages from "../../constants/validationErrors";

const updateProductPriceSchema = object({
  body: object({
    price: number({ required_error: validationErrorMessages.MISSING_ENTITY("Price") }),
  }),
});

export default updateProductPriceSchema;
export type IUpdateProductPrice = TypeOf<typeof updateProductPriceSchema>;
