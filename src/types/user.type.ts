/**
 * @interface IUser
 * @description Represents a user object with various properties.
 * @property {`0x${string}`} walletAddress - The user's wallet address, starting with '0x' followed by a string.
 * @property {number} trustScore - A numerical value representing the user's trust score.
 */
interface IUser {
    walletAddress: `0x${string}`
    trustScore: number
    description:string;
    user:string;
}

export default IUser
