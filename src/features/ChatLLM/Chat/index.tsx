import { useStreamListener } from "./hooks/useStreamListener";
import { Form } from "./components/Form";
import { useEffect, useState } from "react";
import { ChatStream } from "./components/ChatStream";
import { Main } from "./styles";
import { Column } from "../../../UIKit";
import { invoke } from "@tauri-apps/api/core";
import { ChatItem, OllamaChat } from "./model/types";
import { useChatContext } from "../context/hooks/useChatContext";

const OLLAMA = "ollama";

export const Chat = () => {
  const [stream, setStream] = useState<OllamaChat>([]);
  const { selectedModel } = useChatContext();

  const askLaura = async (prompt: string) => {
    setIsLoading(true);
    await invoke(OLLAMA, { prompt, model: selectedModel?.name.split(":")[0] });
  };

  const handleSendMessage = (message: ChatItem) => {
    setStream((prev) => [...prev, message, { text: "", isUser: false }]);
    askLaura(message.text);
  };

  const { ollamaCompletion, stopStreaming } = useStreamListener();

  useEffect(() => {
    if (ollamaCompletion) {
      const b = stream.pop();
      if (b) {
        b.text = ollamaCompletion;
        setStream((prev) => [...prev, b]);
      }
      setIsLoading(false);
    }
  }, [ollamaCompletion]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Main>
      <Column gap={10} reverse style={{ alignItems: "center" }}>
        <Form
          onSubmit={handleSendMessage}
          onInterupt={stopStreaming}
          isCompleting={!!ollamaCompletion}
        />
        <ChatStream stream={stream} isLoading={isLoading} />
      </Column>
    </Main>
  );
};
