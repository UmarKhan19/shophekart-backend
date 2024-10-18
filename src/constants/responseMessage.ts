export default {
    SUCCESSFUL_OPERATION: "Operation completed successfully.",
    CREATED_SUCCESSFULLY: (entity: string) => `${entity} created successfully.`,
    ALREADY_EXISTS: (entity: string) => `${entity} already exists.`,
    UPDATED_SUCCESSFULLY: (entity: string) => `${entity} updated successfully.`,
    DELETED_SUCCESSFULLY: (entity: string) => `${entity} deleted successfully.`,
    FETCHED_SUCCESSFULLY: (entity: string) => `${entity} fetched successfully.`,
    INVALID_INPUT: "Invalid input. Please provide valid details.",
    OPERATION_FAILED: "Operation failed. Please try again.",
    NOT_FOUND: (entity: string) => `${entity} not found.`,
    UNAUTHORIZED_ACCESS: "Unauthorized access. Please authenticate.",
    INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
    SOMETHING_WENT_WRONG: "Something went wrong!",
    TOO_MANY_REQUESTS: `Too many requests! Please try again after some time`
}
