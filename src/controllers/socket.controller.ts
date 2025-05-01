import { Server, Socket } from "socket.io";
import { setActiveSocket } from "../services/socket.service";
import { handleMessage, sendInitialMessage } from "../services/flow.service";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    console.log("Connected socket", socket.id);
    setActiveSocket(socket);
    sendInitialMessage();
    socket.on("message_from_client", async (data) => {
      await handleMessage(data);
      console.log("Message Received ", data);
    });
  });
};
