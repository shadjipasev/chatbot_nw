import { Server, Socket } from "socket.io";
import { sendInitialMessage, setConfig } from "../services/flow.service";
import { flowController } from "./flow.controller";
import { setActiveSocket } from "../services/socket.service";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    console.log("Connected socket", socket.id);
    setActiveSocket(socket);
    sendInitialMessage();
    socket.on("message_from_client", async (data) => {
      await flowController(data);
      console.log("message_from_client", data);
    });
  });
};
