import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const deleteOrderSchema = z.object({
    params: z.object({
        orderId: z.string({
            required_error: validationErrorMessages.MISSING_ENTITY("Order Id"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Order Id"),
            message: validationErrorMessages.MISSING_ENTITY("Order Id")
        })
    })
})

export default deleteOrderSchema

export type TDeleteOrder = z.TypeOf<typeof deleteOrderSchema>
