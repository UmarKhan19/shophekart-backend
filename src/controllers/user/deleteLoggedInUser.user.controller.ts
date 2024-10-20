import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import { IMySessionData } from "../../types"
import { User } from "../../models"

const deleteLoggedInUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const session: IMySessionData = req.session as IMySessionData

    /**
     * Check if user ID and user data are present in the session.
     */
    if (!session.userId || !session.userData) {
        /**
         * If not present, raise an error with a corresponding message.
         */
        throw new Error("User not logged in")
    }

    const user = await User.findByIdAndDelete(session.userId)

    if (!user) {
        httpError(next, Error(responseMessage.NOT_FOUND("User")), req, 404)
        return
    }

    httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY("User"), null)
})

export default deleteLoggedInUser
