/**
 * HTTP request metadata interface.
 *
 * @interface IHttpRequestMeta
 */
export default interface IHttpRequestMeta {
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
