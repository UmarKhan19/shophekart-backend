/**
 * A utility function to standardize HTTP responses across the application.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {number} responseStatusCode - The HTTP status code of the response.
 * @param {string} responseMessage - A descriptive message of the response.
 * @param {unknown} data - The data payload of the response.
 *
 * @returns {void}
 */
import { Request, Response } from "express"
import { config } from "../config"
import { EApplicationEnvironment } from "../constants/application"
import { logger } from "../utils"
import { IHttpResponse } from "../types"

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown): void => {
    /**
     * The standardized HTTP response object.
     *
     * @typedef {object} IHttpResponse
     * @property {boolean} success - Whether the response was successful or not.
     * @property {unknown} data - The data payload of the response.
     * @property {number} statusCode - The HTTP status code of the response.
     * @property {string} message - A descriptive message of the response.
     * @property {object} request - Information about the original request.
     * @property {string} request.method - The HTTP method of the original request.
     * @property {string} request.url - The URL of the original request.
     * @property {string|null} request.ip - The IP address of the original request.
     */
    const response: IHttpResponse<unknown> = {
        success: true,
        data,
        statusCode: responseStatusCode,
        message: responseMessage,
        request: { method: req.method, url: req.originalUrl, ip: req.ip || null }
    }

    // Log
    /**
     * Logs the response metadata to the console.
     */
    logger.info(`CONTROLLER_RESPONSE`, {
        meta: response
    })

    // Production ENV check
    /**
     * In production environment, removes the client's IP address from the response metadata.
     */
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }
    /**
     * Sends the standardized HTTP response back to the client.
     */
    res.status(responseStatusCode).json(response)
}
