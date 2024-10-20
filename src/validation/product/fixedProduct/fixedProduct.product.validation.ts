// fixedProduct.product.validation.ts
import { object, string, number, TypeOf } from "zod"
import productTypeValidator from "../createProduct.product.validation"

const fixedProductValidator = object({
    body: object({
        ...productTypeValidator.shape.body.shape,
        price: number({ required_error: "Price is required" }).min(0, "Price must be greater than or equal to 0"),
        stock: number({ required_error: "Stock is required" }).min(0, "Stock must be greater than or equal to 0"),
        productAddress: string({ required_error: "Product Address is required" }),
        productIdOnChain: string({ required_error: "Product Id On Chain is required" })
    })
})

export default fixedProductValidator

export type ICreateFixedProduct = TypeOf<typeof fixedProductValidator>
