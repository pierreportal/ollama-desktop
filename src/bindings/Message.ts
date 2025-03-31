import type { MessageSender } from './MessageSender';

export interface Message {
    sender: MessageSender;
    content: string;
    timestamp: string;
}