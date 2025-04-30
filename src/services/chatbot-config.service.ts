import { ChatConfig } from "../models/config.schema";

export const createChatConfig = async (jsonConfig: JSON) => {
  const chatConfig = await ChatConfig.create(jsonConfig);

  return chatConfig;
};
