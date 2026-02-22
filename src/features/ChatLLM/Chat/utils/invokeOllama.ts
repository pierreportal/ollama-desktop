import { invoke } from "@tauri-apps/api/core";
import { Message, LocalLLM } from "../../../../bindings";

const ASK_OLLAMA = "ask_ollama";
const SELECT_MODEL = "select_model";
const GET_LOCAL_LLMS = "get_local_llms";
const GET_CHATS = "get_chats";
const GET_CHAT_BY_ID = "get_chat_by_id";

const askOllama = async (prompt: Message): Promise<void> => {
  try {
    // TODO: should return new chat ID or updated chat ID
    await invoke(ASK_OLLAMA, {
      prompt: prompt.content,
    });
  } catch (error) {
    console.error(error);
  }
};

const selectModel = async (model: LocalLLM) => {
  try {
    return await invoke(SELECT_MODEL, { model });
  } catch (error) {
    console.error(error);
  }
};

const getLocalLLMs = async () => {
  try {
    const models: Array<LocalLLM> = await invoke(GET_LOCAL_LLMS);
    return models;
  } catch (error) {
    console.error(error);
  }
};

const getChats = async () => {
  try {
    const chats = await invoke(GET_CHATS);
    return chats;
  } catch (error) {
    console.error(error);
  }
};

const getChatById = async (id: string) => {
  try {
    const chat = await invoke(GET_CHAT_BY_ID, { id });
    return chat;
  } catch (error) {
    console.error(error);
  }
};

export const invokeOllama = {
  askOllama,
  getChats,
  getChatById,
  selectModel,
  getLocalLLMs,
};
