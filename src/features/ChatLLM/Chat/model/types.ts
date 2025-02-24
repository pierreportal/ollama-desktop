export type ChatItem = {
  text: string;
  isUser: boolean;
};

export type LocalLLMs = {
  name: string;
  size: number;
  modified_at: string;
};

export type OllamaChat = Array<ChatItem>;
