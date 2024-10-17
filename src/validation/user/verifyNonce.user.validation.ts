// verifyNonce.user.validation.ts
import { TypeOf, z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const verifyNonceParamsSchema = z.object({
    body: z.object({
        signature: z.string({
            required_error: validationErrorMessages.MISSING_ENTITY("Signature")
        }),
        message: z.object({
            address: z.string({
                required_error: validationErrorMessages.MISSING_ENTITY("Address")
            }),
            chainId: z.number({
                required_error: validationErrorMessages.MISSING_ENTITY("ChainId")
            }),
            issuedAt: z.string({
                required_error: validationErrorMessages.MISSING_ENTITY("IssuedAt")
            }),
            expirationTime: z
                .string({
                    required_error: validationErrorMessages.MISSING_ENTITY("ExpirationTime")
                })
                .optional(),
            notBefore: z.string().optional(),
            statement: z.string().optional(),
            uri: z.string().optional(),
            version: z.string({
                required_error: validationErrorMessages.MISSING_ENTITY("Version")
            }),
            domain: z.string().optional(),
            nonce: z.string({
                required_error: validationErrorMessages.MISSING_ENTITY("Nonce")
            })
        })
    })
})

export default verifyNonceParamsSchema

export type IVerifyNonceParamsRequest = TypeOf<typeof verifyNonceParamsSchema>
