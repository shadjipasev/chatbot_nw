import { Server } from "restify";
import { createConfig } from "../controllers/chatbot-config.controller";

export const chatConfigRoutes = (server: Server) => {
  server.post("/config", createConfig);
};
