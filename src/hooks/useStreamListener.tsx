import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

const OLLAMA_TOKEN = "ollama_token";
export const useStreamListener = () => {
  const [ollamaCompletion, setOllamaCompletion] = useState("");
  useEffect(() => {
    const unlisten = listen<any>(OLLAMA_TOKEN, (event) => {
      setOllamaCompletion((prev: string) => prev + event.payload[0].response);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return { ollamaCompletion };
};
