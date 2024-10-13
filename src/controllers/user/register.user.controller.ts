import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import { IRegisterUser } from "../../validation/user/register.user.validation"
import responseMessage from "../../constants/responseMessage"
import { registerUser as registerUserService } from "../../services/user"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const registerUser = asyncHandler(async (req: Request<{}, {}, IRegisterUser["body"]>, res: Response) => {
    const walletAddress = req.body.walletAddress as `0x${string}`
    const user = await registerUserService(walletAddress)
    httpResponse(req, res, 200, responseMessage.CREATED_SUCCESSFULLY("User"), user)
})

export default registerUser
