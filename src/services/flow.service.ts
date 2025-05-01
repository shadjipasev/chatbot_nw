import { ChatRole } from "../models/types/chat.interface";
import ChatHistory, { IChatHistory } from "../models/chat-history.schema";
import { getBlock, getMostRecentConfig } from "./chatbot-config.service";
import { sendMessageToClient } from "./socket.service";
import { FilterQuery } from "mongoose";
import { intentDetection } from "./openai.service";

export const sendInitialMessage = async () => {
  const startingBlock = await getBlock("start_block");
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
  } catch (error) {
    console.log("sendInitialMessage error: " + error);
    throw error;
  }
};

export const handleMessage = async (message: string) => {
  const currentBlock = getMostRecentMessage;
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
