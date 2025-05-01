import mongoose, { Schema } from "mongoose";
import { BlockTypes, IBlock, IChatConfig } from "./types/config.interface";

export const configBlockSchema = new Schema<IBlock>({
  id: { type: String, required: true },
  type: { type: String, enum: BlockTypes },
  content: { type: String, required: false },
  intents: [
    {
      name: { type: String, required: false },
      next: { type: String, required: false },
    },
  ],
  fallback: { type: String, required: false },
  next: { type: String, required: false },
});

const chatConfigSchema = new Schema<IChatConfig>({
  blocks: [configBlockSchema],
  startBlock: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

export const ChatConfig = mongoose.model("ChatConfig", chatConfigSchema);
