import { Request, Response } from "restify";
import { searchHistory } from "../services/flow.service";

export const getHistoryById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const history = await searchHistory({ id: id });
    return history;
  } catch (error) {
    console.log("getHistoryById error :" + error);
    throw error;
  }
};
