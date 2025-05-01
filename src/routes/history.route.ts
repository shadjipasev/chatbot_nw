import { Server } from "restify";
import { getHistoryById } from "../controllers/history.controller";

export const historyRoutes = (server: Server) => {
  server.get("/history/:id", getHistoryById);
};
