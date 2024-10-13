import responseMessage from "../../constants/responseMessage"
import { User } from "../../models"
import { IUser } from "../../types"

/**
 * Registers a new user with the given wallet address.
 *
 * @param walletAddress - The user's wallet address.
 * @throws {Error} If the wallet address is invalid or registration fails.
 * @returns The newly created user.
 */
const registerUser = async (walletAddress: `0x${string}`): Promise<IUser> => {
    try {
        const existingUser = await User.findOne({ walletAddress })

        if (existingUser) {
            throw new Error(responseMessage.ALREADY_EXISTS("User"))
        }

        const user: IUser = await User.create({ walletAddress })
        return user
    } catch (error) {
        throw new Error(`Failed to register user: ${(error as Error).message}`)
    }
}

export default registerUser
