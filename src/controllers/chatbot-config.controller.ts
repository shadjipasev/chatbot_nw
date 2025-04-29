import { Request, Response } from "restify";
import { createChatConfig } from "../services/chatbot-config.services";

export const createConfig = async (req: Request, res: Response) => {
  const jsonCongif = req.body;
  const createdConfif = await createChatConfig(jsonCongif);

  res.json({
    body: createdConfif,
    message: "thx",
  });
};
