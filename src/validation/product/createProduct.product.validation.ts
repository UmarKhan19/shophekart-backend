import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const createProductSchema = z.object({
    body: z.object({
        productIdOnChain: z
            .number({
                required_error: validationErrorMessages.MISSING_ENTITY("Product Id On Chain"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Product Id On Chain")
            })
            .optional(),
        sellerId: z
            .string({ required_error: validationErrorMessages.MISSING_ENTITY("Seller Id") })
            .uuid(validationErrorMessages.MISSING_ENTITY("Seller Id")),
        currencyType: z.enum(["USDT", "USDC", "CSHOP", "BNB"], {
            required_error: validationErrorMessages.MISSING_ENTITY("Currency Type"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Currency Type")
        }),
        currencyAddress: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Currency Address") }),
        name: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Name") }),
        description: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Description") }),
        details: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Details") }),
        images: z
            .array(z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Image URL") }))
            .min(1, validationErrorMessages.MISSING_ENTITY("At least one image"))
            .max(5, validationErrorMessages.INVALID_ENTITY("A maximum of 5 images")),
        shippingType: z.enum(["LOCAL", "GLOBAL"], {
            required_error: validationErrorMessages.MISSING_ENTITY("Shipping Type"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Shipping Type")
        }),
        shippingDuration: z.number({ required_error: validationErrorMessages.MISSING_ENTITY("Shipping Duration") }),
        shippingCharges: z.number({
            required_error: validationErrorMessages.MISSING_ENTITY("Shipping Charges"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Shipping Charges")
        }),
        productAddress: z.string({
            required_error: validationErrorMessages.MISSING_ENTITY("Product Address"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Product Address")
        }),
        category: z
            .string({ required_error: validationErrorMessages.MISSING_ENTITY("Category") })
            .uuid(validationErrorMessages.INVALID_ENTITY("Category")),
            email: z
            .string({ required_error: validationErrorMessages.MISSING_ENTITY("Category") })
            .uuid(validationErrorMessages.INVALID_ENTITY("Category"))
    })
})

export default createProductSchema
export type TCreateProduct = z.TypeOf<typeof createProductSchema>
