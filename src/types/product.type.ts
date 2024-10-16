// src/types/product.type.ts
import { Document, Types } from "mongoose";
interface IProductDocument extends Document {
  /**
   * The unique identifier for the document.
   */
  _id: string;

  /**
   * The name of the product.
   */
  name: string;

  /**
   * The description of the product.
   */
  description: string ;

  /**
   * The details of the product.
   */
  details: string ;
 /**
   * The type of the product.
   */
 productType: string ;
  /**
   * The images of the product.
   */
  images: string;

  /**
   * The currency type of the product.
   */
  currencyType: string;

  /**
   * The shipping type of the product.
   */
  shippingType: string;

  /**
   * The status of the product.
   */
  status: string;

  /**
   * The rating of the product.
   */
  rating: number;

  /**
   * The price of the product
   */
  price: number;
  /**
   * The product address of the product.
   */
  productAddress: string|null;

  /**
   * The category of the product.
   */
  category:Types.ObjectId;

  /**
   * The seller ID of the product.
   */
  sellerId:  string|null;

  /**
   * The date and time the document was created.
   */
  createdAt: Date;

  /**
   * The date and time the document was last updated.
   */
  updatedAt: Date;
}

export default IProductDocument;
