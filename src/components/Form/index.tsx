import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

const OLLAMA = "ollama";
const STOP_STREAM = "stop_stream";

export const Form = ({ setIsLoading }: any) => {
  const [prompt, setPrompt] = useState("");

  const stopStreaming = async () => {
    await invoke(STOP_STREAM);
  };
  const askLaura = async () => {
    setIsLoading(true);
    await invoke(OLLAMA, { prompt });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrompt("");
    askLaura();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  };

  return (
    <>
      <form className="row" onSubmit={handleSubmit}>
        <input
          id="greet-input"
          onChange={handleChange}
          value={prompt}
          placeholder="Ask me something..."
        />
        <button type="submit">Ask Laura</button>
      </form>
      <button onClick={stopStreaming}>Stop Streaming</button>
    </>
  );
};
