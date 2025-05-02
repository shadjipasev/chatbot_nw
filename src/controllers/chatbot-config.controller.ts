import { Request, Response } from "restify";
import {
  createChatConfig,
  getMostRecentConfig,
} from "../services/chatbot-config.service";

export const createConfig = async (req: Request, res: Response) => {
  const jsonCongif = req.body;
  const createdConfif = await createChatConfig(jsonCongif);

  res.json({
    message: "Configuration was successfully uploaded.",
    data: createdConfif,
  });
};

export const getLatestConfig = async (req: Request, res: Response) => {
  const latestConfig = await getMostRecentConfig();

  res.json({
    message: "Retrieving latest chatbot configuration.",
    data: latestConfig,
  });
};
