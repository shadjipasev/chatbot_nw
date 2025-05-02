import { Server } from "restify";
import {
  createConfig,
  getLatestConfig,
} from "../controllers/chatbot-config.controller";

export const chatConfigRoutes = (server: Server) => {
  server.get("/config", getLatestConfig);
  server.post("/config", createConfig);
};
