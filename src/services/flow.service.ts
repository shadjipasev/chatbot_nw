import { HistoryDoc } from "./../models/chat-history.schema";
import { ChatHistory } from "../models/chat-history.schema";
import { ChatRole, IMessage } from "../models/types/chat.interface";
// import { IChatHistory, IMessage } from "../models/chat-history.schema";
import { getBlock, getMostRecentConfig } from "./chatbot-config.service";
import { sendMessageToClient } from "./socket.service";
import { FilterQuery, Mongoose } from "mongoose";
import {} from "../controllers/flow.controller";
import { IBlock, IChatConfig } from "src/models/types/config.interface";
import { InternalServerError } from "restify-errors";

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
    await sendMessageToClient(startingBlock.content, startingBlock);

    const messageBlock: IMessage = {
      role: ChatRole.Bot,
      message: startingBlock.content,
      currentBlock: startingBlock,
    };

    await addMessageToConversation(messageBlock);

    setCurrentBlock(startingBlock.next);
  } catch (error) {
    throw new InternalServerError({
      message: "Failed to send initial message.",
      cause: error,
    });
  }
};

export const getMostRecentConversation = async (): Promise<HistoryDoc> => {
  try {
    const message = await ChatHistory.findOne().sort({ _id: -1 });
    return message;
  } catch (error) {
    throw new InternalServerError({
      message: "Failed to retrieve most recent conversation",
      cause: error,
    });
  }
};

export const searchHistory = async (query: FilterQuery<HistoryDoc>) => {
  console.log("searchHistory query:", query);
  try {
    const interaction = await ChatHistory.findOne(query);
    return interaction;
  } catch (error) {
    throw new InternalServerError({
      messag: "Failed to retrieve history",
      cause: error,
    });
  }
};

export const addMessageToConversation = async (messageBlock: IMessage) => {
  try {
    const conversation = await getMostRecentConversation();
    conversation.messages.push(messageBlock);
    await conversation.save();
  } catch (error) {
    throw new InternalServerError({
      message: "Failed to add message to conversation",
      cause: error,
    });
  }
};
