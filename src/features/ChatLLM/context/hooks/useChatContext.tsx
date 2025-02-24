import React from "react";
import { LocalLLMs } from "../../Chat/model/types";

export interface IChatContext {
  selectedModel: LocalLLMs | null;
  setSelectedModel: (model: LocalLLMs) => void;
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
