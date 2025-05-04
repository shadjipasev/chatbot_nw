import { IBlock, IChatConfig } from "src/models/types/config.interface";
import { ChatConfig } from "../models/config.schema";
import { InternalServerError, NotFoundError } from "restify-errors";

export const createChatConfig = async (
  jsonConfig: IChatConfig
): Promise<IChatConfig> => {
  const chatConfig = await ChatConfig.create(jsonConfig);
  return chatConfig;
};

export const getMostRecentConfig = async (): Promise<IChatConfig> => {
  try {
    const latestConfig = await ChatConfig.findOne().sort({ _id: -1 });
    return latestConfig;
  } catch (error) {
    throw new InternalServerError({
      message: "Failed to retrieve most recent configuration",
      cause: error,
    });
  }
};

export const getBlock = (config: IChatConfig, blockId: string): IBlock => {
  const block = config.blocks.find((block) => block.id === blockId);

  if (!block) {
    throw new NotFoundError({
      message: `${block.id} block not found`,
    });
  }

  return block;
};
