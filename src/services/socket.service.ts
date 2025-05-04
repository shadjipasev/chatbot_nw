import { Socket } from "socket.io";
import { ChatRole, IMessage } from "../models/types/chat.interface";
import { IBlock } from "../models/types/config.interface";
import { addMessageToConversation } from "./flow.service";
import { InternalServerError } from "restify-errors";

let activeSocket: Socket | null = null;

export const setActiveSocket = (socket: Socket) => {
  activeSocket = socket;
};

export const sendMessageToClient = async (
  message: string,
  currentBlock: IBlock
) => {
  try {
    // console.log(activeSocket.)
    activeSocket.emit("message_from_server", message);

    const messageBlock: IMessage = {
      role: ChatRole.Bot,
      message,
      currentBlock,
    };

    await addMessageToConversation(messageBlock);
    console.log("message_from_server: " + message);
  } catch (error) {
    throw new InternalServerError({
      message: "Failed to send message to client.",
      cause: error,
    });
  }
};
