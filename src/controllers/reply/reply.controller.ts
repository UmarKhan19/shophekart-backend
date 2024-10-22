import { Request, Response } from "express";
import { Reply } from "../../models";
import { NextFunction } from "express";
import { httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

const createReplyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reply = new Reply(req.body);
    await reply.save();
    httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Reply"), reply);
  } catch (error) {
    next(error); // Call next with the error
  }
};

export default createReplyController;
