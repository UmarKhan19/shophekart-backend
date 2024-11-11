import { config } from "../../config/index"
const express = require("express")
const nodemailer = require("nodemailer")
const router = express.Router()
async function mainMail(proposal, walletAddress) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    })

    const mailOption = {
        from: process.env.USER, // Sender email (your email)
        to: process.env.USER, // Receiver email (also your email)
        subject: "New Proposal Submission",
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>New Proposal Submitted</h2>
        <p><strong>Proposal:</strong></p>
        <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${proposal
              .split("\n")
              .map((line) => `<p>${line}</p>`)
              .join("")}
        </div>
        <p><strong>Wallet Address:</strong> ${walletAddress}</p>
      </div>
    `
    }

    try {
        await transporter.sendMail(mailOption)
        return Promise.resolve("Message Sent Successfully!")
    } catch (error) {
        return Promise.reject(error)
    }
}

router.post("/", async (req, res) => {
    const { proposal, walletAddress } = req.body
    console.log(`Proposal: ${proposal}, Wallet Address: ${walletAddress}`)

    try {
        const result = await mainMail(proposal, walletAddress)
        res.json({ result, success: "ok" })
    } catch (error) {
        console.log(error)
        res.json({ error: "Message could not be sent" })
    }
})

module.exports = router
