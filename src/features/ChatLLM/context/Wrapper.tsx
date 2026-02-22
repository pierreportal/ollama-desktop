import React, { useState } from "react";
import { ChatContext, IChatContext } from "./hooks/useChatContext";
import { LocalLLM } from "../../../bindings";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState<LocalLLM | null>(null);
  const [chatsList, setChatsList] = useState<{ id: string; title: string }[]>(
    [],
  );
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const context: IChatContext = {
    selectedModel,
    setSelectedModel,
    chatsList,
    setChatsList,
    currentChatId,
    setCurrentChatId,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};
