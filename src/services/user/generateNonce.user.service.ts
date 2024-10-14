import { generateNonce } from "siwe"

const generateNonceService = (): string => {
    return generateNonce()
}

export default generateNonceService
