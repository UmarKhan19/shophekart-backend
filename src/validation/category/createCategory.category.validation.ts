import { object, string, TypeOf } from "zod";
import validationErrorMessages from "../../constants/validationErrors";

const createCategorySchema = object({
  body: object({
    parentCategory: string({ required_error: validationErrorMessages.MISSING_ENTITY("Parent Category") }),
  })
});

export default createCategorySchema;
export type ICreateCategory = TypeOf<typeof createCategorySchema>;
