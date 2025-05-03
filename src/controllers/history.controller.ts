import { Request, Response } from "restify";
import { searchHistory } from "../services/flow.service";
import { BadRequestError } from "restify-errors";

export const getHistoryById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const history = await searchHistory({ _id: id });
    res.json({
      data: history,
    });
    console.log(history);
    return history;
  } catch (error) {
    throw new BadRequestError({
      message: "Unable to get history record",
      cause: error,
    });
  }
};
