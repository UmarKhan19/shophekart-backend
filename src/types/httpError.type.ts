import { IHttpResponse } from "./"

/**
 * HTTP error interface.
 *
 * @interface IHttpError
 * @extends IHttpHttpResponse
 * @template T Error data type.
 */
export default interface IHttpError<T> extends IHttpResponse<T> {
    /**
     * Error stacktrace (if available).
     */
    trace?: object | null
}
