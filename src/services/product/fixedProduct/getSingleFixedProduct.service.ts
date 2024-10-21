/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// getSingleFixedProduct.service.ts
import { FixedProduct } from "../../../models";
import IFixedProductDocument from "../../../types/fixedProduct.type";
import responseMessage from "../../../constants/responseMessage";
import mongoose from "mongoose";

const getSingleFixedProduct = async (fixedProductId: string): Promise<IFixedProductDocument> => {
  try {
    console.log("hi");
    const fixedProduct = await FixedProduct.findOne({ _id: new mongoose.Types.ObjectId(fixedProductId) })
.populate({ path: "_id"})
      .exec();
    if (!fixedProduct) {
      throw new Error(responseMessage.NOT_FOUND("Fixed Product"));
    }
    return fixedProduct;
  } catch (error) {console.log(error);
    
    throw new Error(`Failed to get fixed product: ${(error as Error).message}`);
  }
};

export default getSingleFixedProduct;
