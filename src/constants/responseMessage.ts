/**
 * Response messages used throughout the application.
 * These messages provide information to the user about the outcome of an operation.
 * Each message can be customized with relevant information, such as the entity being affected or the operation being performed.
 *
 * @typedef {Object} ResponseMessage
 */

export default {
    /**
     * A message indicating that data was retrieved successfully.
     * @function DATA_RETRIEVED_SUCCESSFULLY
     * @param {string} entity - The type of data that was retrieved (e.g., "users", "products", etc.).
     * @returns {string} A message indicating that the data was retrieved successfully.
     * @example
     * console.log(DATA_RETRIEVED_SUCCESSFULLY("users")); // Output: "users data retrieved successfully."
     */
    DATA_RETRIEVED_SUCCESSFULLY: (entity: string) => `${entity} data retrieved successfully.`,

    /**
     * A message indicating that an operation was completed successfully.
     * @function SUCCESSFUL_OPERATION
     * @param {string} operation - The name of the operation that was performed (e.g., "login", "registration", etc.).
     * @returns {string} A message indicating that the operation was completed successfully.
     * @example
     * console.log(SUCCESSFUL_OPERATION("login")); // Output: "login completed successfully."
     */
    SUCCESSFUL_OPERATION: (operation: string) => `${operation} completed successfully.`,

    /**
     * A message indicating that an entity was created successfully.
     * @function CREATED_SUCCESSFULLY
     * @param {string} entity - The type of entity that was created (e.g., "user", "product", etc.).
     * @returns {string} A message indicating that the entity was created successfully.
     * @example
     * console.log(CREATED_SUCCESSFULLY("user")); // Output: "user created successfully."
     */
    CREATED_SUCCESSFULLY: (entity: string) => `${entity} created successfully.`,

    /**
     * A message indicating that an entity already exists.
     * @function ALREADY_EXISTS
     * @param {string} entity - The type of entity that already exists (e.g., "user", "product", etc.).
     * @returns {string} A message indicating that the entity already exists.
     * @example
     * console.log(ALREADY_EXISTS("user")); // Output: "user already exists."
     */
    ALREADY_EXISTS: (entity: string) => `${entity} already exists.`,

    /**
     * A message indicating that an entity was updated successfully.
     * @function UPDATED_SUCCESSFULLY
     * @param {string} entity - The type of entity that was updated (e.g., "user", "product", etc.).
     * @returns {string} A message indicating that the entity was updated successfully.
     * @example
     * console.log(UPDATED_SUCCESSFULLY("user")); // Output: "user updated successfully."
     */
    UPDATED_SUCCESSFULLY: (entity: string) => `${entity} updated successfully.`,

    /**
     * A message indicating that an entity was deleted successfully.
     * @function DELETED_SUCCESSFULLY
     * @param {string} entity - The type of entity that was deleted (e.g., "user", "product", etc.).
     * @returns {string} A message indicating that the entity was deleted successfully.
     * @example
     * console.log(DELETED_SUCCESSFULLY("user")); // Output: "user deleted successfully."
     */
    DELETED_SUCCESSFULLY: (entity: string) => `${entity} deleted successfully.`,
    FETCHED_SUCCESSFULLY: (entity: string) => `${entity} fetched successfully.`,

    /**
     * A message indicating that the input provided is invalid.
     * @function INVALID_INPUT
     * @param {string} input - The type of input that is invalid (e.g., "username", "password", etc.).
     * @returns {string} A message indicating that the input is invalid.
     * @example
     * console.log(INVALID_INPUT("username")); // Output: "Invalid username. Please provide valid details."
     */
    INVALID_INPUT: (input: string) => `Invalid ${input}. Please provide valid details.`,

    /**
     * A message indicating that an operation failed.
     * @function OPERATION_FAILED
     * @param {string} operation - The name of the operation that failed (e.g., "login", "registration", etc.).
     * @returns {string} A message indicating that the operation failed.
     * @example
     * console.log(OPERATION_FAILED("login")); // Output: "login failed. Please try again."
     */
    OPERATION_FAILED: (operation: string) => `${operation} failed. Please try again.`,

    /**
     * A message indicating that an entity was not found.
     * @function NOT_FOUND
     * @param {string} entity - The type of entity that was not found (e.g., "user", "product", etc.).
     * @returns {string} A message indicating that the entity was not found.
     * @example
     * console.log(NOT_FOUND("user")); // Output: "user not found."
     */
    NOT_FOUND: (entity: string) => `${entity} not found.`,

    /**
     * A message indicating that unauthorized access was attempted.
     * @function UNAUTHORIZED_ACCESS
     * @returns {string} A message indicating that unauthorized access was attempted.
     * @example
     * console.log(UNAUTHORIZED_ACCESS); // Output: "Unauthorized access. Please authenticate."
     */
    UNAUTHORIZED_ACCESS: "Unauthorized access. Please authenticate.",

    /**
     * A message indicating that an internal server error occurred.
     * @function INTERNAL_SERVER_ERROR
     * @returns {string} A message indicating that an internal server error occurred.
     * @example
     * console.log(INTERNAL_SERVER_ERROR); // Output: "Internal server error. Please try again later."
     */
    INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",

    /**
     * A message indicating that something went wrong.
     * @function SOMETHING_WENT_WRONG
     * @returns {string} A message indicating that something went wrong.
     * @example
     * console.log(SOMETHING_WENT_WRONG); // Output: "Something went wrong!"
     */
    SOMETHING_WENT_WRONG: "Something went wrong!",

    /**
     * A message indicating that too many requests were made.
     * @function TOO_MANY_REQUESTS
     * @returns {string} A message indicating that too many requests were made.
     * @example
     * console.log(TOO_MANY_REQUESTS); // Output: "Too many requests! Please try again after some time"
     */
    TOO_MANY_REQUESTS: `Too many requests! Please try again after some time`
}
