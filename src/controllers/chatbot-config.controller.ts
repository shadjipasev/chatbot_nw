import { Request, Response } from "restify";
import {
  createChatConfig,
  getMostRecentConfig,
} from "../services/chatbot-config.service";
import { BadRequestError } from "restify-errors";
import { setConfig } from "../services/flow.service";

export const createConfig = async (req: Request, res: Response) => {
  const jsonCongif = req.body;
  try {
    const createdConfig = await createChatConfig(jsonCongif);
    await setConfig();
    res.send(201, {
      message: "Configuration was successfully uploaded.",
      data: createdConfig,
    });
  } catch (error) {
    throw new BadRequestError({
      messsage: "Unable to upload configuration",
      cause: error,
    });
  }
};

export const getLatestConfig = async (req: Request, res: Response) => {
  try {
    const latestConfig = await getMostRecentConfig();

    res.send(200, {
      message: "Retrieving latest chatbot configuration.",
      data: latestConfig,
    });
  } catch (error) {
    throw new BadRequestError({
      message: "Unable to get configuration",
      cause: error,
    });
  }
};
