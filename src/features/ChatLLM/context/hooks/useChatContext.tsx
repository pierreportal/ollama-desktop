import React from "react";
import { LocalLLMs } from "../../Chat/model/types";
// import { Chat } from "../../../../bindings";

export interface IChatContext {
  selectedModel: LocalLLMs | null;
  setSelectedModel: (model: LocalLLMs) => void;
  currentChatId: string | null;
  setCurrentChatId: (chatId: string) => void;
  chatsList: { id: string, title: string }[];
  setChatsList: (chat: { id: string, title: string }[]) => void;
  createNewChat: (newChat: { id: string, title: string }) => void;
}

export const ChatContext = React.createContext<IChatContext | undefined>(
  undefined
);

export const useChatContext = () => {
  const context = React.useContext(ChatContext);

  if (!context) {
    throw new Error("This component must be rendered within a chat context");
  }

  return context;
};
