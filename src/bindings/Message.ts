import type { MessageSender } from './MessageSender';

export interface Message {
    id: string;
    from: MessageSender;
    content: string;
    timestamp: number;
}