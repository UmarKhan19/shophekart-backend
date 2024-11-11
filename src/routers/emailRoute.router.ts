/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from "express"

import { mainMail } from "../services/mail/mainMail.service"

const Emailrouter = express.Router()

Emailrouter.post("/", async (req: Request, res: Response) => {
    const { proposal, walletAddress } = req.body
    try {
        const result = await mainMail(proposal, walletAddress)
        res.json({ result, success: "ok" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Message could not be sent" })
    }
})

export default Emailrouter
