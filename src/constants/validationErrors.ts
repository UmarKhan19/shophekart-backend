/**
 * Exports the ValidationErrorMessages enum for use in other parts of the application.
 *
 * @type {ValidationErrorMessages}
 */
/**
 * An enum containing error messages related to validation.
 *
 * @enum {string}
 */
const validationErrorMessages = {
    /**
     *@description Error message displayed when a required entity is missing.
     *
     * @example validationErrorMessages.MISSING_ENTITY('Username') outputs "Please provide Username."
     *
     * @type {string}
     */
    MISSING_ENTITY: (entity: string) => `Please provide ${entity}.`,

    /**
     *@description Error message displayed when an invalid value is provided for the specified entity.
     *
     * @example validationErrorMessages.INVALID_ENTITY('Email Address') outputs "Please provide a valid Email Address"
     *
     * @type {string}
     */
    INVALID_ENTITY: (entity: string) => `Please provide a valid ${entity}`,

    /**
     *@description Error message displayed when a value is below its minimum allowed value.
     *
     * @example validationErrorMessages.MIN_VALUE('Age', 18) outputs "The Age must be at least 18."
     *
     * @type {string}
     */
    MIN_VALUE: (entity: string, minValue: number) => `The ${entity} must be at least ${minValue}.`
}

export default validationErrorMessages
