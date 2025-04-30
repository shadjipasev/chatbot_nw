import { Server, Socket } from "socket.io";
import { intentDetection } from "../services/openai.services";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Connected socket", socket.id);

    socket.on("message_from_client", async (data) => {
      intentDetection(data);
      console.log("Message Received ", data);
    });
  });
};
