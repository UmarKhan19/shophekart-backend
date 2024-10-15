import { Document, Types } from "mongoose";

interface ICategoryDocument extends Document {
  /**
   * The unique identifier for the document.
   */
  _id: string;

  /**
   * The name of the category.
   */
  name: string;

  /**
   * The id of the parent category.
   */
  parentCategory: Types.ObjectId | string;

  /**
   * The date and time the document was created.
   */
  createdAt: Date;

  /**
   * The date and time the document was last updated.
   */
  updatedAt: Date;
}

export default ICategoryDocument;
