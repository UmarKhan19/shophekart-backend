import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const updateShippingAddressSchema = z.object({
    body: z.object({
        address: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("Address"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Address")
            })
            .max(255, validationErrorMessages.MAX_VALUE("Address", 255))
            .optional(),
        city: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("City"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("City")
            })
            .max(50, validationErrorMessages.MAX_VALUE("City", 50))
            .optional(),
        country: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("Country"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Country")
            })
            .max(50, validationErrorMessages.MAX_VALUE("Country", 50))
            .optional(),
        postalCode: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("Postal Code"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Postal Code")
            })
            .min(2, validationErrorMessages.MIN_VALUE("Postal Code", 2))
            .max(20, validationErrorMessages.MAX_VALUE("Postal Code", 20))
            .optional(),
        state: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("State"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("State")
            })
            .max(50, validationErrorMessages.MAX_VALUE("State", 50))
            .optional(),
        isPrimary: z.boolean().optional(),

        id: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("_id"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("_id")
            })
            .uuid(validationErrorMessages.INVALID_ENTITY("_id"))
    })
})

export default updateShippingAddressSchema

export type TUpdateShippingAddress = z.TypeOf<typeof updateShippingAddressSchema>
