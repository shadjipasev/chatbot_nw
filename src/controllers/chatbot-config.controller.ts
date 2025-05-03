import { Request, Response } from "restify";
import {
  createChatConfig,
  getMostRecentConfig,
} from "../services/chatbot-config.service";
import { BadRequestError } from "restify-errors";

export const createConfig = async (req: Request, res: Response) => {
  const jsonCongif = req.body;
  try {
    const createdConfif = await createChatConfig(jsonCongif);

    res.json({
      message: "Configuration was successfully uploaded.",
      data: createdConfif,
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
    res.json({
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
