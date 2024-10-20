import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const createProductSchema = z.object({
    body: z.object({
        
        productIdOnChain: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Product Id On Chain") }),
        sellerId: z
            .string({ required_error: validationErrorMessages.MISSING_ENTITY("Seller Id") })
            .uuid(validationErrorMessages.MISSING_ENTITY("Seller Id")),
        currencyType: z.enum(["usdt", "usdc", "cshop", "bnb"], {
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
        shippingType: z.enum(["local", "global"], {
            required_error: validationErrorMessages.MISSING_ENTITY("Shipping Type"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Shipping Type")
        }),
        productAddress: z.object({
            address: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Address") }),
            state: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("State") }),
            country: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Country") }),
            postalCode: z.string({ required_error: validationErrorMessages.MISSING_ENTITY("Postal Code") })
        }),
        category: z
            .string({ required_error: validationErrorMessages.MISSING_ENTITY("Category") })
            .uuid(validationErrorMessages.INVALID_ENTITY("Category"))
    })
})

export default createProductSchema
export type TCreateProduct = z.TypeOf<typeof createProductSchema>
