import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { IVerifyNonceParamsRequest } from "../../validation/user/verifyNonce.user.validation"
import { SiweMessage, SiweErrorType } from "siwe"
import { IMySessionData } from "../../types"
import { User } from "../../models"
import responseMessage from "../../constants/responseMessage"

const SiweAuthController = asyncHandler(
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    async (req: Request<{}, {}, IVerifyNonceParamsRequest["body"]>, res: Response, next: NextFunction): Promise<void> => {
        const mySession = req.session as IMySessionData
        try {
            const siweMessage = new SiweMessage(req.body.message)
            siweMessage.chainId = req.body.message.chainId
            siweMessage.address = req.body.message.address

            const { error, data } = await siweMessage.verify({
                signature: req.body.signature
            })

            if (data.nonce !== mySession.nonce) {
                httpError(next, Error(SiweErrorType.NONCE_MISMATCH), req, 422)
                return
            }

            if (error) {
                if ((error as { type: SiweErrorType }).type === SiweErrorType.EXPIRED_MESSAGE) {
                    httpError(next, Error(SiweErrorType.EXPIRED_MESSAGE), req, 440)
                    return
                }

                if ((error as { type: SiweErrorType }).type === SiweErrorType.INVALID_SIGNATURE) {
                    httpError(next, Error(SiweErrorType.INVALID_SIGNATURE), req, 422)
                    return
                }

                httpError(next, Error(responseMessage.SOMETHING_WENT_WRONG), req, 500)
                return
            }

            mySession.userData = data

            const user = await User.findOne({ where: { walletAddress: mySession.userData.address } })

            if (user) {
                mySession.userId = user._id
            } else {
                const newUser = await User.create({ walletAddress: mySession.userData.address })
                mySession.userId = newUser._id
            }

            mySession.cookie.expires = new Date(siweMessage.expirationTime ?? Date.now() + 24 * 60 * 60 * 1000)
            mySession.save(() => httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Nonce verification"), null))
        } catch (e) {
            mySession.userData = null
            mySession.nonce = null
            httpError(next, e, req, 500)
        }
    }
)

export default SiweAuthController
