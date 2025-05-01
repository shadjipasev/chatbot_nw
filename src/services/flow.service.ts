import ChatHistory, { IChatHistory } from "../models/chat-history.schema";
import { getBlock, getMostRecentConfig } from "./chatbot-config.service";
import { sendMessageToClient } from "./socket.service";
import { FilterQuery } from "mongoose";

export const sendInitialMessage = async () => {
  const startingBlock = await getBlock("start_block");
  await sendMessageToClient(startingBlock.content);
  await ChatHistory.create({
    userMessage: "",
    botMessage: startingBlock.content,
    currentBlock: startingBlock,
  });
};

export const handleMessage = async (message?: string) => {
  const isInitialized = await searchHistory({ id: "start_message" });
  if (!isInitialized) {
    await sendInitialMessage();
  }
  const currentBlock = await getBlock("start_block");
  console.log("startingBlock -- " + currentBlock);
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
