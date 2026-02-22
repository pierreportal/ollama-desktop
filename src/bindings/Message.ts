import type { MessageSender } from "./MessageSender";

export interface Message {
  from: MessageSender;
  content: string;
}
