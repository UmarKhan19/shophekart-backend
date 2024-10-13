/**
 * IUserDocument interface definition.
 *
 * @description This interface extends the Document interface and IUser type to include the createdAt and updatedAt fields. It represents a User document in the database.
 *
 * @property {string} _id - The unique identifier for the document.
 * @property {`0x${string}`} walletAddress - The user's wallet address, starting with '0x' followed by a string.
 * @property {string} [firstName] - The user's first name (optional).
 * @property {string} [lastName] - The user's last name (optional).
 * @property {string} [email] - The user's email address (optional).
 * @property {string} [phoneNumber] - The user's phone number (optional).
 * @property {number} trustScore - A numerical value representing the user's trust score.
 * @property {Date} createdAt - The date and time the document was created.
 * @property {Date} updatedAt - The date and time the document was last updated.
 */

import IUser from "./user.type"

interface IUserDocument extends Document, IUser {
    /**
     * The date and time the document was created.
     */
    createdAt: Date
    /**
     * The date and time the document was last updated.
     */
    updatedAt: Date
}

export default IUserDocument
