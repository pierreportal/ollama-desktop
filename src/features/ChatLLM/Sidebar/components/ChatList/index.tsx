import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { ChatListItem } from "./components/ChatListItem";
import { NewChatButton } from "./styles";
import { SidebarHeader } from "../../styles";
import { useChatContext } from "../../../context/hooks/useChatContext";
import { invokeOllama } from "../../../Chat/utils/invokeOllama";

export type ChatListItem = {
  id: string;
  title: string;
};

export const ChatList = () => {
  const { setCurrentChatId, chatsList, setChatsList } = useChatContext();
  const { getChats } = invokeOllama;

  useEffect(() => {
    const listChats = async () => {
      const chats = await getChats();
      setChatsList(chats as ChatListItem[]);
    };
    listChats();
  }, []);

  return (
    <div>
      <SidebarHeader>
        <label htmlFor="model-selector">Chats</label>
        <NewChatButton onClick={() => setCurrentChatId(null)}>
          <FiEdit size={16} />
        </NewChatButton>
      </SidebarHeader>
      <ul>
        {chatsList.map((chat: any) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};
