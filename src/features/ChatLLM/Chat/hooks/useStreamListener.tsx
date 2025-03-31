import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

const OLLAMA_TOKEN = "ollama_token";
const STOP_STREAM = "stop_stream";

export const useStreamListener = () => {
  const [ollamaCompletion, setOllamaCompletion] = useState("");
  const [endOfStream, setEndOfStream] = useState(false);

  const stopStreaming = async () => {
    await invoke(STOP_STREAM);
    setOllamaCompletion("");
    setEndOfStream(true);
  };

  useEffect(() => {
    const unlisten = listen<any>(OLLAMA_TOKEN, (event) => {
      setEndOfStream(false);
      setOllamaCompletion((prev: string) => prev + event.payload[0].response);
      if (event.payload[0].done) {
        setOllamaCompletion("");
        setEndOfStream(true);
      }
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return { ollamaCompletion, endOfStream, stopStreaming };
};
