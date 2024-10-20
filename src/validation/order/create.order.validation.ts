import { number, object, string, TypeOf } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const createOrderSchema = object({
    body: object({
        deliveryBy: string({ required_error: validationErrorMessages.MISSING_ENTITY("Delivery date") })
            .date()
            .refine((date) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const deliveryDate = new Date(date)
                deliveryDate.setHours(0, 0, 0, 0)
                return deliveryDate >= today
            }, validationErrorMessages.INVALID_ENTITY("Delivery date")),
        buyerId: string({ required_error: validationErrorMessages.MISSING_ENTITY("Buyer Id") }).uuid(
            validationErrorMessages.INVALID_ENTITY("Buyer Id")
        ),
        productId: string({ required_error: validationErrorMessages.MISSING_ENTITY("Product Id") }).uuid(
            validationErrorMessages.INVALID_ENTITY("Product Id")
        ),
        productIdOnChain: string({ required_error: validationErrorMessages.MISSING_ENTITY("Product Id On Chain") }),
        tokenId: number({ required_error: validationErrorMessages.MISSING_ENTITY("Token Id") }).min(
            1,
            validationErrorMessages.MIN_VALUE("Token Id", 1)
        ),

        shippingPrice: number({ required_error: validationErrorMessages.MISSING_ENTITY("Shipping Price") }).min(
            0,
            validationErrorMessages.MIN_VALUE("Shipping Price", 0)
        )
    })
})

export default createOrderSchema

export type TCreateOrder = TypeOf<typeof createOrderSchema>
