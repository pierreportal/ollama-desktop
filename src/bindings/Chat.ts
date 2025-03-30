import type { Message } from './Message';

export interface Chat {
    id: string;
    messages: Message[];
    summary: string;
    title: string;
}