import { ChatConfig } from "src/models/config.schema";
import {
  BlockTypes,
  IBlock,
  IChatConfig,
} from "./../models/types/config.interface";
import { getBlock } from "../services/chatbot-config.service";
import { intentDetection } from "../services/openai.service";
import { sendMessageToClient } from "../services/socket.service";

let currentBlock: IBlock | null = null;

export const setCurrentBlock = (block: IBlock) => {
  currentBlock = block;
};

export const getCurrentBlock = () => {
  return currentBlock;
};

export const flowController = async (message: string) => {
  //   console.log(JSON.stringify(currentBlock));

  console.log("23 currentBlock.id == " + currentBlock.id);

  setCurrentBlock(await getBlock(currentBlock.next));

  if (currentBlock.type === BlockTypes.DetectIntent) {
    console.log("23 currentBlock.id == " + currentBlock.id);
    try {
      // Ask openAI for intention
      const recognizedNextBlock = await intentDetection(message, currentBlock);
      console.log(recognizedNextBlock.id);

      // Send to client intention content
      sendMessageToClient(recognizedNextBlock.content);

      // If no intent recognized return fallback block
      if (recognizedNextBlock.id === currentBlock.fallback) {
        setCurrentBlock(recognizedNextBlock);
        return;
      }

      const nextBlock = await getBlock(recognizedNextBlock.next);

      setCurrentBlock(await getBlock(currentBlock.next));
      console.log("43: recognizedNextBlock.id -" + recognizedNextBlock.id);
      console.log("44: nextBlock -" + nextBlock.id);

      // Ask if anything else
      sendMessageToClient(nextBlock.content);
      setCurrentBlock(nextBlock);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
