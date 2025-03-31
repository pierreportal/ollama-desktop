import { useStreamListener } from "./hooks/useStreamListener";
import { Form } from "./components/Form";
import { useEffect, useState } from "react";
import { ChatStream } from "./components/ChatStream";
import { Main } from "./styles";
import { Column } from "../../../UIKit";
import { useChatContext } from "../context/hooks/useChatContext";
import { Message, MESSAGE_SENDER } from "../../../bindings";
import { useChatApi } from "./hooks/useChatApi";
import { useOllama } from "./hooks/useOllama";

export const Chat = () => {
  const { getChat, upsertChat, updateChat } = useChatApi();
  const { currentChatId } = useChatContext();
  const { ollamaCompletion, stopStreaming, endOfStream } = useStreamListener();
  const { askOllama, giveTitleToChat } = useOllama();
  const [stream, setStream] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChat(currentChatId!);
      if (chat) {
        setStream(chat.messages);
      }
    }
    if (currentChatId) {
      fetchChat();
    }
  }, []);

  const summarise = async () => {
    const title = await giveTitleToChat(stream.slice(-4));
    if (title) {
      updateChat({ title });
    }
  };

  useEffect(() => {
    if (ollamaCompletion) {
      const ollamaMessage = stream.pop();
      if (ollamaMessage) {
        ollamaMessage.content = ollamaCompletion;
        setStream((prev) => [...prev, ollamaMessage]);
      }
      setIsLoading(false);
    }
    if (endOfStream) {
      upsertChat(stream);
      if (stream.length % 4 === 0) {
        summarise();
      }
    }
  }, [ollamaCompletion, endOfStream]);

  const handleSendMessage = (message: Message) => {
    setIsLoading(true);
    setStream((prev) => [...prev, message, { content: "", from: MESSAGE_SENDER.Ollama }]);
    upsertChat([...stream, message]);
    askOllama(message);
  };

  return (
    <Main>
      <Column gap={10} reverse={true} style={{ alignItems: "center" }}>
        {currentChatId}
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
