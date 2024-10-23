import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const updateProductOnChainIdSchema = z.object({
    body: z.object({
        productId: z.string({
            required_error: validationErrorMessages.MISSING_ENTITY("Product Id"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Product Id")
        }),
        onChainId: z.number({
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("On Chain Id"),
            required_error: validationErrorMessages.MISSING_ENTITY("On Chain Id")
        })
    })
})

export type TUpdateProductOnChainId = z.TypeOf<typeof updateProductOnChainIdSchema>

export default updateProductOnChainIdSchema
