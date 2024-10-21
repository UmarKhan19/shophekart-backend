import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const deleteShippingAddress = z.object({
    body: z.object({
        id: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("_id"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("_id")
            })
            .uuid(validationErrorMessages.INVALID_ENTITY("_id"))
    })
})

export default deleteShippingAddress

export type TDeleteShippingAddress = z.TypeOf<typeof deleteShippingAddress>
