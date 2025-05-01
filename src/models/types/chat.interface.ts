import { IBlock } from "./config.interface";

export interface IChat {
  userMessage: string;
  botMessage: string;
  timestamp: Date;
}

export interface IMessage {
  role: ChatRole;
  message: string;
  currentBlock: IBlock;
  timestamp: Date;
}

export interface IChatHistory {
  messages: IMessage[];
}

export enum ChatRole {
  User = "user",
  Bot = "bot",
}
