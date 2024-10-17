// IVerifyNonceParams
interface IVerifyNonceParams {
    /** Signature of the message signed by the wallet */
    signature: string

    /** Message of siwe */
    message: {
        address: string
        chainId: number
        issuedAt: string
        expirationTime: string
        notBefore?: string
        statement?: string
        uri?: string
        version: string
    }

    /** RFC 4501 dns authority that is requesting the signing. */
    domain?: string

    /** Randomized token used to prevent replay attacks, at least 8 alphanumeric characters. */
    nonce: string

    /**ISO 8601 datetime string of the current time. */
    time: string
}

export default IVerifyNonceParams
