import { Message } from "../../../../bindings";

export type LocalLLMs = {
  name: string;
  size: number;
  modified_at: string;
};

export type OllamaChat = Array<Message>;
