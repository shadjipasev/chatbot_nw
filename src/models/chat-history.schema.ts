import { Document } from "./../../node_modules/bson/src/bson";
import mongoose, { InferSchemaType, Model, Mongoose, Schema } from "mongoose";
import { IBlock } from "./types/config.interface";
import { ChatRole } from "./types/chat.interface";
import { configBlockSchema } from "./config.schema";

export interface IMessage {
  role: ChatRole;
  message: string;
  currentBlock: IBlock;
  timestamp?: Date;
}

export interface IChatHistory {
  messages: IMessage[];
}

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: ChatRole, required: true },
  message: { type: String, required: true },
  currentBlock: [configBlockSchema],
  timestamp: { type: Date, default: Date.now },
});

const chatHistorySchema = new Schema<IChatHistory>({
  messages: [messageSchema],
});

export type HistoryDoc = IChatHistory & Document;

export const ChatHistory = mongoose.model<HistoryDoc>(
  "ChatHistory",
  chatHistorySchema
);

// type UserModel = Model<IChatHistory, {}, ChatHistory>;
