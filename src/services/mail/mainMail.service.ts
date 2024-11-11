/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer"
import { config } from "../../config"
export async function mainMail(proposal: string, walletAddress: string): Promise<string> {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD
        }
    })

    const mailOption = {
        from: config.EMAIL,
        to: config.EMAIL,
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
        return "Message Sent Successfully!"
    } catch (error) {
        throw error
    }
}
