import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import registerUser from "../register.user.service"

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

    it("should register a new user", async () => {
        const response = await registerUser(walletAddress)

        expect(response).toHaveProperty("walletAddress", walletAddress)
        expect(response).toHaveProperty("createdAt")
        expect(response).toHaveProperty("updatedAt")
    })

    it("should not register an existing user", async () => {
        await expect(registerUser(walletAddress)).rejects.toThrow("Failed to register user: User already exists.")
    })
})
