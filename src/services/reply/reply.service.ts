import IReplyDocument from "../../types/reply.type";
import { Reply } from "../../models";

const createReplyService = async (replyData: IReplyDocument) => {
  const reply = new Reply(replyData);
  await reply.save();
  return reply.toJSON();
};

export default createReplyService;
