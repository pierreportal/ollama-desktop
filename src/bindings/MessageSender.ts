const MESSAGE_SENDER = {
    User: 'User',
    Ollama: 'Ollama',
} as const;

export type MessageSender = typeof MESSAGE_SENDER[keyof typeof MESSAGE_SENDER];

