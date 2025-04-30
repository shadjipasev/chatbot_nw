import mongoose, { Schema } from "mongoose";
import { IBlock } from "./types/config.interface";
import { configBlockSchema } from "./config.schema";

export interface IChatHistory {
  userMessage: string;
  botMessage: string;
  currentBlock: IBlock;
  timestamp: Date;
}

const chatHistorySchema = new Schema<IChatHistory>({
  userMessage: { type: String, required: true },
  botMessage: { type: String, required: true },
  currentBlock: [configBlockSchema],
  timestamp: { type: Date, required: true, default: Date.now },
});

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

export default ChatHistory;
