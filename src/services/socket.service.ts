import { Socket } from "socket.io";

let activeSocket: Socket | null = null;

export const setActiveSocket = (socket: Socket) => {
  activeSocket = socket;
};

export const sendMessageToClient = (content: string) => {
  try {
    activeSocket.emit("message_from_server", content);
    console.log("message_from_server: " + content);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
