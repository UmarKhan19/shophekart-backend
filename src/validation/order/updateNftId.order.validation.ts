import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const updateNftidSchema = z.object({
    body: z.object({
        nftId: z.number({
            required_error: validationErrorMessages.MISSING_ENTITY("NFT Id"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("NFT Id")
        }),
        orderId: z.string({
            required_error: validationErrorMessages.MISSING_ENTITY("Order Id"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Order Id")
        })
    })
})

export default updateNftidSchema

export type TUpdateNftId = z.TypeOf<typeof updateNftidSchema>
