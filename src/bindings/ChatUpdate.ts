import type { Message } from './Message';

export interface ChatUpdate {
    messages?: Message[];
    summary?: string;
    title?: string;
}