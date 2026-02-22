import type { Message } from "./Message";

export interface Chat {
  id: string;
  thread: Message[];
  summary: string;
  title: string;
}
