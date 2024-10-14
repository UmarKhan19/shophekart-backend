import { SessionData } from "express-session"

interface IMySessionData extends SessionData {
    nonce?: string
}

export default IMySessionData
