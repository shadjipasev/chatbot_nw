// import { setCurrentBlock } from './../controllers/flow.controller';
import { ChatRole } from "../models/types/chat.interface";
import ChatHistory, { IChatHistory } from "../models/chat-history.schema";
import { getBlock, getMostRecentConfig } from "./chatbot-config.service";
import { sendMessageToClient } from "./socket.service";
import { FilterQuery } from "mongoose";
import { intentDetection } from "./openai.service";
import {} from "../controllers/flow.controller";
import { IBlock, IChatConfig } from "src/models/types/config.interface";

let currentBlock: IBlock | null = null;
let config: IChatConfig | null = null;

export const setCurrentBlock = (blockId: string) => {
  currentBlock = getBlock(config, blockId);
};

export const getCurrentBlock = () => {
  return currentBlock;
};

export const setConfig = async () => {
  config = await getMostRecentConfig();
};

export const getConfig = () => {
  return config;
};

export const sendInitialMessage = async () => {
  const startingBlock = getBlock(config, "start_block");
  try {
    await sendMessageToClient(startingBlock.content);

    await ChatHistory.create({
      messages: [
        {
          role: ChatRole.Bot,
          message: startingBlock.content,
          currentBlock: startingBlock,
        },
      ],
    });

    setCurrentBlock(startingBlock.next);
  } catch (error) {
    console.log("sendInitialMessage error: " + error);
    throw error;
  }
};

export const handleResponseMessage = async (message: string) => {
  const currentBlock = getCurrentBlock;
};

export const getMostRecentMessage = async (): Promise<IChatHistory> => {
  try {
    const message = await ChatHistory.findOne().sort({ _id: -1 });
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchHistory = async (
  query: FilterQuery<IChatHistory>
): Promise<IChatHistory> => {
  try {
    const interaction = await ChatHistory.findOne(query);
    return interaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
