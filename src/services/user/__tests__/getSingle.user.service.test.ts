import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import registerUser from "../register.user.service"
import getSingleUserService from "../getSingle.user.service"
import responseMessage from "../../../constants/responseMessage"

describe("Register user service", () => {
    let mongoServer: MongoMemoryServer
    const walletAddress = "0x0123456789012345678901234567890123456789"

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.connection.collection("users").deleteMany({})
        await mongoose.disconnect()
        await mongoose.connection.close()
        await mongoServer.stop()
    })

    it("should return user", async () => {
        await registerUser(walletAddress)

        const user = await getSingleUserService(walletAddress)
        expect(user).toHaveProperty("walletAddress", walletAddress)
        expect(user).toHaveProperty("createdAt")
        expect(user).toHaveProperty("updatedAt")
    })

    it("should throw user not found error", async () => {
        await expect(getSingleUserService("0x0123456789012345")).rejects.toThrow(responseMessage.NOT_FOUND("User"))
    })
})
