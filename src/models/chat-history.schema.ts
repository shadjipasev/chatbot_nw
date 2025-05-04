import { Document } from "./../../node_modules/bson/src/bson";
import mongoose, { Schema } from "mongoose";
import { ChatRole, IChatHistory, IMessage } from "./types/chat.interface";
import { configBlockSchema } from "./config.schema";

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
