/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { Request, Response, NextFunction } from "express"
import Wallet from "../../models/chat.model"
import { httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"

const checkLimitController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { walletAddress } = req.body

        if (!walletAddress) {
            return httpResponse(req, res, 400, responseMessage.INVALID_INPUT("walletAddress"), "")
        }

        const now = new Date()
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

        // Find the wallet in the database
        let wallet = await Wallet.findOne({ walletAddress })

        if (!wallet) {
            wallet = new Wallet({ walletAddress, timestamps: [now] })
            await wallet.save()
            return httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Allowed"), { allowed: true })
        }

        // Filter timestamps within the last 24 hours
        wallet.timestamps = wallet.timestamps.filter((timestamp) => timestamp > twentyFourHoursAgo)

        if (wallet.timestamps.length >= 2) {
            return httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Not Allowed"), { allowed: false })
        }

        // Add the new timestamp and save
        wallet.timestamps.push(now)
        await wallet.save()

        return httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Allowed"), { allowed: true })
    } catch (error) {
        next(error)
    }
}

export default checkLimitController
