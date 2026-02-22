import { LocalLLM } from "./LocalLLM";
import type { Message } from "./Message";

export interface Chat {
  id: string;
  thread: Message[];
  summary: string;
  title: string;
  model: LocalLLM;
}
