import { Document, ObjectId } from "mongoose";

interface ISize {
  size: string;
  price: number;
  stock: number;
}

export default interface IFixedProductDocument extends Document {
  productId: ObjectId;  // Reference to Product
  sizes?: ISize[];  // Optional sizes array
  price?: number;  // Required if sizes are not provided
  stock?: number;  // Required if sizes are not provided
  createdAt: Date;
  updatedAt: Date;
}
