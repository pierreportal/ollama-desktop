import React, { Dispatch, SetStateAction } from "react";
import { LocalLLM } from "../../../../bindings";

export interface IChatContext {
  selectedModel: LocalLLM | null;
  setSelectedModel: (model: LocalLLM) => void;
  currentChatId: string | null;
  setCurrentChatId: (chatId: string | null) => void;
  chatsList: { id: string; title: string }[];
  setChatsList: Dispatch<SetStateAction<{ id: string; title: string }[]>>;
}

export const ChatContext = React.createContext<IChatContext | undefined>(
  undefined,
);

export const useChatContext = () => {
  const context = React.useContext(ChatContext);

  if (!context) {
    throw new Error("This component must be rendered within a chat context");
  }

  return context;
};
