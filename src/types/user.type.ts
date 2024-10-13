/**
 * @interface IUser
 * @description Represents a user object with various properties.
 * @property {`0x${string}`} walletAddress - The user's wallet address, starting with '0x' followed by a string.
 * @property {string} [firstName] - The user's first name (optional).
 * @property {string} [lastName] - The user's last name (optional).
 * @property {string} [email] - The user's email address (optional).
 * @property {string} [phoneNumber] - The user's phone number (optional).
 * @property {number} trustScore - A numerical value representing the user's trust score.
 */
interface IUser {
    walletAddress: `0x${string}`
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string
    trustScore: number
}

export default IUser
