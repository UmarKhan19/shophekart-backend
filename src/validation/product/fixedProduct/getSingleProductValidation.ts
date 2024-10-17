// getSingleProduct.validation.ts (already exists)
import { z } from "zod";
import mongoose from "mongoose";

export interface IGetSingleProduct {
  params: {
    id: string;
  };
}

export const getSingleProductSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id)),
  }),
});
