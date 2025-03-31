import { invoke } from "@tauri-apps/api/core";
import { Message } from "../../../../bindings";
import { useChatContext } from "../../context/hooks/useChatContext";

const ASK_OLLAMA = "ask_ollama";
const SUMMARISE_CHAT = "summarise_chat";
const GIVE_TITLE_TO_CHAT = "give_title_to_chat";

type OllamaSummary = {
  summary: string;
  title: string;
};

export const useOllama = () => {
  const { selectedModel } = useChatContext();

  const askOllama = async (prompt: Message): Promise<void> => {
    try {
      await invoke(ASK_OLLAMA, { prompt: prompt.content, model: selectedModel?.name.split(":")[0] });
    } catch (error) {
      console.error(error);
    }
  };

  const summariseChat = async (messages: Message[]): Promise<OllamaSummary | null> => {
    try {
      const response = await invoke(SUMMARISE_CHAT, {
        model: selectedModel?.name.split(":")[0],
        prompt: JSON.stringify(messages),
      }) as OllamaSummary;
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const giveTitleToChat = async (messages: Message[]): Promise<string | null> => {
    try {
      const response = await invoke(GIVE_TITLE_TO_CHAT, {
        model: selectedModel?.name.split(":")[0],
        prompt: JSON.stringify(messages),
      }) as string;
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { askOllama, summariseChat, giveTitleToChat };
}