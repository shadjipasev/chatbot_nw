import { ChatRole } from "./../models/types/chat.interface";
import { BlockTypes } from "./../models/types/config.interface";
import { intentDetection } from "../services/openai.service";
import { sendMessageToClient } from "../services/socket.service";
import {
  addMessageToConversation,
  getConfig,
  getCurrentBlock,
  setCurrentBlock,
} from "../services/flow.service";
import { InternalServerError } from "restify-errors";

export const flowController = async (message: string) => {
  try {
    let current = getCurrentBlock();
    let config = getConfig();

    await addMessageToConversation({
      role: ChatRole.User,
      message,
      currentBlock: current,
    });

    if (current.type === BlockTypes.WaitForResponse) {
      console.log("Wait for response");
      setCurrentBlock(current.next);
      current = getCurrentBlock();
    }

    if (current.type === BlockTypes.DetectIntent) {
      const intendedReply = await intentDetection(config, message, current);
      sendMessageToClient(intendedReply.content, current);
      setCurrentBlock(intendedReply.next);
      current = getCurrentBlock();
    }

    if (current.type === BlockTypes.WriteMessage) {
      sendMessageToClient(current.content, current);
      setCurrentBlock(current.next);
    }
  } catch (error) {
    throw new InternalServerError({
      message: "Chatbot stopped working unexpectedly",
      cause: error,
    });
  }
};
