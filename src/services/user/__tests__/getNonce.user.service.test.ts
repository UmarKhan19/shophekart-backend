import generateNonceService from "../generateNonce.user.service"

describe("Get Nonce Service", () => {
    it("should return a nonce", () => {
        const nonce: string = generateNonceService()
        expect(nonce).toBeDefined()
    })
})
