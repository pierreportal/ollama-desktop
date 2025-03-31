import type { Message } from './Message';

export interface ChatCreation {
    messages: Message[];
    title: string;
    timestamp: string;
}