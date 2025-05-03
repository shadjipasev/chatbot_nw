export enum BlockTypes {
  WriteMessage = "write_message",
  WaitForResponse = "wait_for_response",
  DetectIntent = "detect_intent",
}

export interface Intent {
  name: string;
  next: string;
}

export interface IBlock {
  id: string;
  type: BlockTypes;
  content?: string;
  intents?: Intent[];
  fallback?: string;
  next?: string;
}

export interface IChatConfig {
  blocks: IBlock[];
  startBlock: string;
  timestamp?: Date;
  active?: boolean;
}
