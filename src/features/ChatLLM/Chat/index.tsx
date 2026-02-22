import { Form } from "./components/Form";
import { useEffect } from "react";
import { ChatStream } from "./components/ChatStream";
import { Main, ThreadColumn } from "./styles";
import { useChatContext } from "../context/hooks/useChatContext";
import { Message, MESSAGE_SENDER } from "../../../bindings";
import { invokeOllama } from "./utils/invokeOllama";
import { useChatStream } from "./hooks/useChatStream";

export const Chat = () => {
  const { currentChatId, setSelectedModel } = useChatContext();
  const { askOllama, getChatById, selectModel } = invokeOllama;
  const {
    isLoading,
    setIsLoading,
    stream,
    setStream,
    stopStreaming,
    ollamaCompletion,
  } = useChatStream();

  useEffect(() => {
    const fetchChat = async () => {
      const chat: any = await getChatById(currentChatId!);
      if (chat) {
        setSelectedModel(chat.model);
        selectModel(chat.model);
        setStream(chat.thread);
      }
    };
    if (currentChatId) {
      fetchChat();
    } else {
      setStream([]);
    }
  }, [currentChatId]);

  const handleSendMessage = (message: Message) => {
    setIsLoading(true);
    setStream((prev) => [
      ...prev,
      message,
      {
        content: "",
        from: MESSAGE_SENDER.MODEL,
      },
    ]);
    askOllama(message);
  };

  return (
    <Main>
      <ThreadColumn gap={10} reverse={true}>
        {currentChatId}
        <Form
          onSubmit={handleSendMessage}
          onInterupt={stopStreaming}
          isCompleting={!!ollamaCompletion}
        />
        <ChatStream stream={stream} isLoading={isLoading} />
      </ThreadColumn>
    </Main>
  );
};
