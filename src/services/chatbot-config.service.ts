import { IBlock, IChatConfig } from "src/models/types/config.interface";
import { ChatConfig } from "../models/config.schema";

export const createChatConfig = async (
  jsonConfig: JSON
): Promise<IChatConfig> => {
  const chatConfig = await ChatConfig.create(jsonConfig);
  return chatConfig;
};

export const getMostRecentConfig = async (): Promise<IChatConfig> => {
  const config = await ChatConfig.findOne().sort({ _id: -1 });
  return config;
};
