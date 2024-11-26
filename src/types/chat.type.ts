/**
 * @interface IWallet
 * @description Represents a wallet object with various properties.
 * @property {`0x${string}`} walletAddress - The unique wallet address of the user, starting with '0x' followed by a string.
 * @property {Date[]} timestamps - An array of timestamps representing the user's interactions.
 */
interface IWallet {
    walletAddress: `0x${string}`
    timestamps: Date[]
}
export default IWallet
