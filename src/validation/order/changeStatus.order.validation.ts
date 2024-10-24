import { z } from "zod"
import { ORDER_STATUS_VALUES } from "../../constants/application"
import validationErrorMessages from "../../constants/validationErrors"

const changeOrderStatusSchema = z.object({
    body: z.object({
        status: z.enum(ORDER_STATUS_VALUES),
        orderId: z.string({
            required_error: validationErrorMessages.MISSING_ENTITY("Order Id"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Order Id")
        })
    })
})

export default changeOrderStatusSchema

export type TChangeOrderStatus = z.TypeOf<typeof changeOrderStatusSchema>
