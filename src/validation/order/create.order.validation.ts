import { number, object, string, TypeOf} from "zod"
import validationErrorMessages from "../../constants/validationErrors"
import { ShippingAddress } from "../../models";

const createOrderSchema = object({
    body: object({
        shippingAddress: string({
          required_error: validationErrorMessages.MISSING_ENTITY("Shipping Address"),
          invalid_type_error: validationErrorMessages.INVALID_ENTITY("Shipping Address"),
        })
        .refine((addressId) => {
          return ShippingAddress.findById(addressId).then((address) => address !== null);
        }, validationErrorMessages.INVALID_ENTITY("Shipping Address")),
        deliveryBy: string({ required_error: validationErrorMessages.MISSING_ENTITY("Delivery date") })
            .date()
            .refine((date) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const deliveryDate = new Date(date)
                deliveryDate.setHours(0, 0, 0, 0)
                return deliveryDate >= today
            }, validationErrorMessages.INVALID_ENTITY("Delivery date")),
        buyerId: string({ required_error: validationErrorMessages.MISSING_ENTITY("Buyer Id") }),
        productId: string({ required_error: validationErrorMessages.MISSING_ENTITY("Product Id") }),
        productIdOnChain: number({ required_error: validationErrorMessages.MISSING_ENTITY("Product Id On Chain") }),
        nftId: number({
            required_error: validationErrorMessages.MISSING_ENTITY("NFT Id"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("NFT Id")
        }).optional(),
        shippingPrice: number({ required_error: validationErrorMessages.MISSING_ENTITY("Shipping Price") }).min(
            0,
            validationErrorMessages.MIN_VALUE("Shipping Price", 0)
        )
    })
})

export default createOrderSchema

export type TCreateOrder = TypeOf<typeof createOrderSchema>
