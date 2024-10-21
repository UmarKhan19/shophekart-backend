import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const getUserShippingAddressSchema = z.object({
    params: z.object({
        buyerId: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("Buyer Id"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Buyer Id")
            })
            .uuid(validationErrorMessages.INVALID_ENTITY("Buyer Id"))
    })
})

export default getUserShippingAddressSchema

export type TGetUserShippingAddress = z.TypeOf<typeof getUserShippingAddressSchema>
