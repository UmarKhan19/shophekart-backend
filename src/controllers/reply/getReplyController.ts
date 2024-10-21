/* eslint-disable no-console */
import { Request, Response, NextFunction } from "express";
import { Reply } from "../../models";
import { httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

const getReplyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = req.params.commentId;
    const replys = await Reply.find({ reviewId });
    if (!replys) {
      res.status(400).json({"message":"No replys found"});
    }
    
    return httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Replys"), replys);
  } catch (error) {
    next(error);
  }
};

export default getReplyController;
