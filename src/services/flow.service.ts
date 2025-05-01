import ChatHistory, { IChatHistory } from "../models/chat-history.schema";
import { getMostRecentConfig } from "./chatbot-config.service";
import { sendMessageToClient } from "./socket.service";
import { FilterQuery } from "mongoose";

export const sendInitialMessage = async () => {
  const config = await getMostRecentConfig();

  //   console.log("config -- " + config);
  //   console.log("config.startBlock -- " + config.startBlock);

  const startingBlock = config.blocks.find((block) => {
    // console.log("block.id -- " + block.id);
    return block.id === config.startBlock;
  });

  console.log("startingBlock -- " + startingBlock);

  await sendMessageToClient(startingBlock.content);
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
