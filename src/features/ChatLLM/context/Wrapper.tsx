import { useState } from "react";
import { ChatContext, IChatContext } from "./hooks/useChatContext";
import { LocalLLMs } from "../Chat/model/types";

export const Wrapper = ({ children }: any) => {
  const [selectedModel, setSelectedModel] = useState<LocalLLMs | null>(null);

  const context: IChatContext = {
    selectedModel,
    setSelectedModel,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};
