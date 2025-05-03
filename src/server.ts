import * as restify from "restify";
import connectMongo from "./configs/mongo.config";
import * as dotenv from "dotenv";
import { Server as SocketIoServer } from "socket.io";
import { handleSocketConnection } from "./controllers/socket.controller";
import { chatConfigRoutes } from "./routes/chat-config.routes";
import OpenAI from "openai";
import { historyRoutes } from "./routes/history.route";
import { getConfig, setConfig } from "./services/flow.service";
import { errorHandler } from "./common/error.handler";
import { InternalServerError } from "restify-errors";

dotenv.config();

try {
  createApp();
} catch (error) {
  throw new InternalServerError({
    message: "Failed to initialize server!",
    cause: error,
  });
}

export async function createApp() {
  const server = restify.createServer();

  const respond = (
    req: restify.Request,
    res: restify.Response,
    next: restify.Next
  ) => {
    res.send("Server started!");
    next();
  };

  server.get("/", respond);
  server.head("/", respond);
  chatConfigRoutes(server);
  historyRoutes(server);

  const io = new SocketIoServer(server.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  handleSocketConnection(io);

  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.queryParser());
  server.on("uncaughtException", errorHandler);

  if (process.env.NODE_ENV !== "test") {
    await setConfig();

    await connectMongo();

    server.listen(3000, () => {
      console.log("%s listening at %s", server.name, server.url);
    });
  }

  return { server, io };
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});
