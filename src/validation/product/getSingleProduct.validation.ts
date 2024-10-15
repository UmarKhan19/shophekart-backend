import { z } from "zod";

export interface IGetSingleProduct {
    query: {
        productId: string;
    };
}

export const getSingleProductSchema = z.object({
    query: z.object({
        productId: z.string().uuid(),
    }),
});
