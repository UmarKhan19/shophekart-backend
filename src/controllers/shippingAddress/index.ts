import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { TCreateShippingAddress } from "../../validation/shippingAddress/create.shippingAddress.validation"
import responseMessage from "../../constants/responseMessage"
import ShippingAddressService from "../../services/shippingAddress"
import { Types } from "mongoose"
import { IMySessionData, TShippingAddress } from "../../types"
import { TGetUserShippingAddress } from "../../validation/shippingAddress/getUserShippingAddress.validation"
import { TUpdateShippingAddress } from "../../validation/shippingAddress/update.shippingAddress.validation"
import { TDeleteShippingAddress } from "../../validation/shippingAddress/delete.shippingAddress.validation"

const ShippingAddressController = {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    create: asyncHandler(async (req: Request<{}, {}, TCreateShippingAddress["body"]>, res: Response) => {
        const { address, buyerId, city, country, postalCode, state, email, firstName, lastName, phoneNumber } = req.body

        const shippingAddress: TShippingAddress = await ShippingAddressService.create({
            address,
            buyerId: new Types.ObjectId(buyerId),
            city,
            country,
            postalCode,
            state,
            email,
            firstName,
            lastName,
            phoneNumber
        })

        httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("User Shipping Address"), shippingAddress)
    }),

    fetchUserShippingAddresses: asyncHandler(async (req: Request, res: Response) => {
        const { buyerId } = req.params as TGetUserShippingAddress["params"]

        const usersAddresses: TShippingAddress[] = await ShippingAddressService.getUserShippingAddresses(new Types.ObjectId(buyerId))

        httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("User's Addresses"), usersAddresses)
    }),

    fetchLoggedInUserShippingAddresses: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.session as IMySessionData

        if (!userId) {
            httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 402)
            return
        }

        const usersAddresses: TShippingAddress[] = await ShippingAddressService.getUserShippingAddresses(userId)

        httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("User's Addresses"), usersAddresses)
    }),

    updateShippingAddress: asyncHandler(
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        async (req: Request<{}, {}, TUpdateShippingAddress["body"]>, res: Response, next: NextFunction) => {
            const { id, address, city, country, postalCode, state, email, firstName, lastName, phoneNumber } = req.body

            const { userId } = req.session as IMySessionData

            if (!userId) {
                httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 402)
                return
            }

            const updatedAddress: TShippingAddress | null = await ShippingAddressService.updateshippingAddress({
                _id: new Types.ObjectId(id),
                address,
                city,
                country,
                postalCode,
                state,
                buyerId: userId,
                email,
                firstName,
                lastName,
                phoneNumber
            })

            if (!updatedAddress) {
                httpError(next, new Error(responseMessage.NOT_FOUND("Shipping Address")), req, 400)
                return
            }

            httpResponse(req, res, 200, responseMessage.UPDATED_SUCCESSFULLY("Shipping Address"), updatedAddress)
        }
    ),

    deleteShippingAddress: asyncHandler(
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        async (req: Request<{}, {}, TDeleteShippingAddress["body"]>, res: Response, next: NextFunction) => {
            const { id } = req.body

            const { userId } = req.session as IMySessionData

            if (!userId) {
                httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 402)
                return
            }

            const deletedAddress: TShippingAddress | null = await ShippingAddressService.deleteShippingAddress(new Types.ObjectId(id), userId)

            if (!deletedAddress) {
                httpError(next, new Error(responseMessage.NOT_FOUND("Shipping Address")), req, 400)
                return
            }

            httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY("Shipping Address"), deletedAddress)
        }
    ),

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    getSingleShippingAddress: asyncHandler(async (req: Request<{}, {}, TDeleteShippingAddress["body"]>, res: Response, next: NextFunction) => {
        const { id } = req.body

        const shippingAddress: TShippingAddress | null = await ShippingAddressService.getSingleShippingAddresses(new Types.ObjectId(id))

        if (!shippingAddress) {
            httpError(next, new Error(responseMessage.NOT_FOUND("Shipping Address")), req, 400)
            return
        }

        httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY("Shipping Address"), shippingAddress)
    })
}

export default ShippingAddressController
