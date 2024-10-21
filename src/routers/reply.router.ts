import { Router } from "express";
import { validateSchema } from "../middlewares";
import createReplyController from "../controllers/reply/reply.controller";
import createReplySchema from "../validation/reply/reply.validation";

const replyRouter: Router = Router();

replyRouter.post(
  "/create",
  validateSchema(createReplySchema),
  createReplyController
);

export default replyRouter;
