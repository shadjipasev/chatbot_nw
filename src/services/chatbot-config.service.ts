import { IBlock, IChatConfig } from "src/models/types/config.interface";
import { ChatConfig } from "../models/config.schema";

export const createChatConfig = async (
  jsonConfig: JSON
): Promise<IChatConfig> => {
  const chatConfig = await ChatConfig.create(jsonConfig);
  return chatConfig;
};

export const getMostRecentConfig = async (): Promise<IChatConfig> => {
  const latestConfig = await ChatConfig.findOne().sort({ _id: -1 });
  // console.log(latestConfig);
  latestConfig;
  return latestConfig;
};

export const getBlock = async (blockId: string): Promise<IBlock> => {
  const currentCongif = await getMostRecentConfig();

  const block = currentCongif.blocks.find((block) => block.id === blockId);

  return block;
};
