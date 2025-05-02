import { BlockTypes } from "./../models/types/config.interface";
import {} from "../services/chatbot-config.service";
import { intentDetection } from "../services/openai.service";
import { sendMessageToClient } from "../services/socket.service";
import {
  getConfig,
  getCurrentBlock,
  setCurrentBlock,
} from "../services/flow.service";

export const flowController = async (message: string) => {
  let current = getCurrentBlock();
  let config = getConfig();

  //   console.log("Before WaitForResponse Type", current.type);
  //   console.log("Before WaitForResponse Id", current.id);

  if (current.type === BlockTypes.WaitForResponse) {
    console.log("Wait for response");
    setCurrentBlock(current.next);
    current = getCurrentBlock();
  }

  //   console.log("Before DetectIntent Type", current.type);
  //   console.log("Before DetectIntent Id", current.id);

  if (current.type === BlockTypes.DetectIntent) {
    const intendedReply = await intentDetection(config, message, current);
    sendMessageToClient(intendedReply.content);
    setCurrentBlock(intendedReply.next);
    current = getCurrentBlock();
  }

  //   console.log("Before WriteMessage Type", current.type);
  //   console.log("Before WriteMessage Id", current.id);
  if (current.type === BlockTypes.WriteMessage) {
    sendMessageToClient(current.content);
    setCurrentBlock(current.next);
    // console.log("After WriteMessage Id", current.id);
    // console.log("After WriteMessage NEXT", current.next);
  }
};
