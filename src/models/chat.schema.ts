import mongoose, { Schema } from "mongoose";
import { IChat } from "./types/chat.interface";

const chatSchema = new Schema<IChat>({
  userMessage: { type: String, required: true },
  botMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
