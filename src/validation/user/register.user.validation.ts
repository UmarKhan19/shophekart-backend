import { object, string, TypeOf } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const registerUserSchema = object({
    body: object({
        walletAddress: string({
            required_error: validationErrorMessages.MISSING_ENTITY("Wallet Address")
        }).regex(/^(0x)?[0-9a-fA-F]{40}$/, validationErrorMessages.INVALID_ENTITY("Wallet Address"))
    })
})

export default registerUserSchema

export type IRegisterUser = TypeOf<typeof registerUserSchema>
