import { IHttpRequestMeta } from "./"

/**
 * HTTP response interface.
 *
 * @interface IHttpHttpResponse
 * @template T Response data type.
 */
export default interface IHttpResponse<T> {
    /**
     * Whether the request was successful.
     */
    success: boolean

    /**
     * HTTP status code.
     */
    statusCode: number

    /**
     * Request metadata.
     */
    request: IHttpRequestMeta

    /**
     * Response message.
     */
    message: string

    /**
     * Response data.
     */
    data: T
}
