
import { Router } from "express";
import { validateSchema } from "../middlewares";
import createReplyController from "../controllers/reply/reply.controller";
import createReplySchema from "../validation/reply/reply.validation";
import { increaseDislikeController, increaseLikeController } from "../controllers/reply/likesAndDislikeController";
import getReplyController from "../controllers/reply/getReplyController";

const replyRouter: Router = Router();

replyRouter.post(
  "/create",
  validateSchema(createReplySchema),
  createReplyController
);
replyRouter.get("/target/:commentId", getReplyController);

replyRouter.patch("/increase-like/:replyId", increaseLikeController);
replyRouter.patch("/increase-dislike/:replyId", increaseDislikeController);
export default replyRouter;
