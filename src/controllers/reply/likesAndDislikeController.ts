/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Add these functions to your existing reply.controller.ts file
import { Request, Response, NextFunction } from "express";
import { Reply } from "../../models";
import { httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";

export const increaseLikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const replyId = req.params.replyId;
    const {userId} = req.body;
   

    const reply = await Reply.findById(replyId);
    if (!reply) {
        return httpResponse(req, res, 404, responseMessage.NOT_FOUND("Reply"),"");
      }
      const alreadyLiked = await Reply.findOne({
        _id: replyId,
        likedBy: { $in: [userId] },
      });
      if (alreadyLiked) {
        throw new Error("Already liked");

      } 
      await reply.updateOne({ $inc: { likes: 1 }, $addToSet: { likedBy: userId } });


    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Likes Increased"), reply);
  } catch (error) {
    next(error);
  }
};

export const increaseDislikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const replyId = req.params.replyId;
    const {userId} = req.body;
    const reply = await Reply.findById(replyId);

    if (!reply) {
        return httpResponse(req, res, 404, responseMessage.NOT_FOUND("Reply"),"");
      }
    console.log("hy")

    const alreadyDisliked = await Reply.findOne({
        _id: replyId,
        dislikedBy: { $in: [userId] },
      });
      
   
      
      if (alreadyDisliked) {
        throw new Error("Already disliked");
    } 
      await reply.updateOne({ $inc: { dislikes: 1 }, $addToSet: { dislikedBy: userId } });

      httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Dislikes Increased"), reply);
    } catch (error) {
//    console.log(error);
        next(error);
  }
};
