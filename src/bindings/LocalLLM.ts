import { Message } from "./";

export type LocalLLM = {
  name: string;
  size: number;
  modified_at: string;
};

export type OllamaChat = Array<Message>;
