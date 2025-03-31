import React, { useState } from "react";
import { ChatContext, IChatContext } from "./hooks/useChatContext";
import { LocalLLMs } from "../Chat/model/types";
// import { Chat } from "../../../bindings";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState<LocalLLMs | null>(null);
  const [chatsList, setChatsList] = useState<{ id: string, title: string }[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const createNewChat = (newChat: { id: string, title: string }) => {
    setChatsList([...chatsList, newChat]);
    setCurrentChatId(newChat.id);
  };

  const context: IChatContext = {
    selectedModel,
    setSelectedModel,
    chatsList,
    setChatsList,
    currentChatId,
    setCurrentChatId,
    createNewChat
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};
