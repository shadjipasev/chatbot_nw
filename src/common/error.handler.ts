import { Next, Request, Response } from "restify";
import { InternalServerError } from "restify-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: Next
) => {
  console.error(JSON.stringify(err, null, 2));
  res.send(
    new InternalServerError({ message: "Something went wrong", cause: err })
  );
  next();
};
