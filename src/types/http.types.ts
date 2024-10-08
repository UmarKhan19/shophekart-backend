/**
 * HTTP request metadata interface.
 *
 * @interface IHttpRequestMeta
 */
export interface IHttpRequestMeta {
    /**
     * Client IP address (if available).
     */
    ip?: string | null

    /**
     * HTTP request method.
     */
    method: string

    /**
     * Request URL.
     */
    url: string
}

/**
 * HTTP response interface.
 *
 * @interface IHttpHttpResponse
 * @template T Response data type.
 */
export interface IHttpResponse<T> {
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

/**
 * HTTP error interface.
 *
 * @interface IHttpError
 * @extends IHttpHttpResponse
 * @template T Error data type.
 */
export interface IHttpError<T> extends IHttpResponse<T> {
    /**
     * Error stacktrace (if available).
     */
    trace?: object | null
}
