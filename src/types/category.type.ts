import { Document, Types } from "mongoose"

/**
 * Represents a document in the categories collection.
 *
 * @interface ICategoryDocument
 * @extends {Document}
 */
interface ICategoryDocument extends Document {
    /**
     * The unique identifier for the document.
     *
     * @type {string}
     * @memberof ICategoryDocument
     * @example
     * const categoryId = category._id; // e.g. "620c3cb3a93cd21ca21a7ce3"
     */
    _id: string

    /**
     * The label or name of the category.
     *
     * @type {string}
     * @memberof ICategoryDocument
     * @example
     * const categoryName = category.label; // e.g. "Electronics"
     */
    label: string

    /**
     * The id of the parent category, if it exists.
     *
     * @type {(Types.ObjectId | null)}
     * @memberof ICategoryDocument
     * @example
     * const parentId = category.parentCategory; // e.g. ObjectId("620c3cb3a93cd21ca21a7ce3") or null
     */
    parentCategory: Types.ObjectId | null

    /**
     * The date and time the document was created.
     *
     * @type {Date}
     * @memberof ICategoryDocument
     * @example
     * const createdAt = category.createdAt; // e.g. 2022-02-15T14:30:00.000Z
     */
    createdAt: Date

    /**
     * The date and time the document was last updated.
     *
     * @type {Date}
     * @memberof ICategoryDocument
     * @example
     * const updatedAt = category.updatedAt; // e.g. 2022-03-01T16:45:00.000Z
     */
    updatedAt: Date
}

/**
 * Example of a fully populated ICategoryDocument object:
 *
 * ```json
 * {
 *   "_id": "620c3cb3a93cd21ca21a7ce3",
 *   "label": "Gaming Consoles",
 *   "parentCategory": ObjectId("620c3cb3a93cd21ca21a7ce2"),
 *   "createdAt": "2022-02-15T14:30:00.000Z",
 *   "updatedAt": "2022-03-01T16:45:00.000Z"
 * }
 * ```
 */
export default ICategoryDocument
