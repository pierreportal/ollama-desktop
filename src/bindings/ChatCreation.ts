import type { Message } from './Message';

export interface ChatCreation {
    messages: Message[];
    summary: string;
    title: string;
}