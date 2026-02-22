import { useStreamListener } from "./useStreamListener";
import { useState, useEffect } from "react";
import { Message } from "../../../../bindings";

export const useChatStream = () => {
  const { ollamaCompletion, stopStreaming, endOfStream } = useStreamListener();
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<Message[]>([]);

  useEffect(() => {
    if (ollamaCompletion) {
      const ollamaMessage = stream.pop();
      if (ollamaMessage) {
        ollamaMessage.content = ollamaCompletion;
        setStream((prev) => [...prev, ollamaMessage]);
      }
      setIsLoading(false);
    }
  }, [ollamaCompletion, endOfStream]);

  return {
    isLoading,
    setIsLoading,
    stream,
    setStream,
    stopStreaming,
    ollamaCompletion,
  };
};
