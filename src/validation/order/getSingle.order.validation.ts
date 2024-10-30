import { TypeOf, z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const getSingleOrderSchema = z.object({
    params: z.object({
        orderId: z.string({
            required_error: validationErrorMessages.MISSING_ENTITY("Order Id"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Order Id")
        })
    })
})

export default getSingleOrderSchema

export type TGetSingleOrder = TypeOf<typeof getSingleOrderSchema>
