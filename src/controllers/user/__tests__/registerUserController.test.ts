/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import request from "supertest"
import app from "../../../app"
import supertest from "supertest"
import validationErrorMessages from "../../../constants/validationErrors"

describe("registerUserController", () => {
    let mongoServer: MongoMemoryServer

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterEach(async () => {
        await mongoose.connection.collection("users").deleteMany({})
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
        await mongoServer.stop()
    })

    describe("POST /register", () => {
        it("should register a new user", async () => {
            const userData = {
                walletAddress: "0x0123456789012345678901234567890123456789"
            }
            const response: supertest.Response = await request(app).post("/api/v1/user/register").send(userData)

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.data).toBeTruthy()
            expect(response.body.data.walletAddress).toBe(userData.walletAddress)
        })

        it("should return 400 if the wallet address is missing", async () => {
            const response: supertest.Response = await request(app).post("/api/v1/user/register")
            expect(response.status).toBe(400)
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe(validationErrorMessages.MISSING_ENTITY("Wallet Address"))
        })

        it("should return 400 if the wallet address is invalid", async () => {
            const userData = {
                walletAddress: "invalid-wallet-address"
            }
            const response: supertest.Response = await request(app).post("/api/v1/user/register").send(userData)
            expect(response.status).toBe(400)
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe(validationErrorMessages.INVALID_ENTITY("Wallet Address"))
        })
    })
})
