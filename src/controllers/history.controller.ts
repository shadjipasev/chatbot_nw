import { Request, Response } from "restify";
import { searchHistory } from "../services/flow.service";
import { BadRequestError } from "restify-errors";

export const getHistoryById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const history = await searchHistory({ _id: id });

    res.send(200, {
      message: `Successfuly retrieved conversation history with id:${id}`,
      data: history,
    });
  } catch (error) {
    throw new BadRequestError({
      message: "Unable to get history record",
      cause: error,
    });
  }
};
