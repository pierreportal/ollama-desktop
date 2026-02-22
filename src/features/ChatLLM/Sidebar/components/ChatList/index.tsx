import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { ChatListItem } from "./components/ChatListItem";
import { ChatUList, NewChatButton } from "./styles";
import { SidebarHeader } from "../../styles";
import { useChatContext } from "../../../context/hooks/useChatContext";
import { invokeOllama } from "../../../Chat/utils/invokeOllama";

export type ChatListItem = {
  id: string;
  title: string;
};

export const ChatList = () => {
  const { getChats } = invokeOllama;
  const { setCurrentChatId, chatsList, setChatsList, currentChatId } =
    useChatContext();

  useEffect(() => {
    const listChats = async () => {
      const chats = await getChats();
      setChatsList(chats as ChatListItem[]);
    };
    listChats();
  }, [currentChatId]);

  return (
    <div>
      <SidebarHeader>
        <label htmlFor="model-selector">Chats</label>
        <NewChatButton onClick={() => setCurrentChatId(null)}>
          <FiEdit size={16} />
        </NewChatButton>
      </SidebarHeader>
      <ChatUList>
        {chatsList.map((chat: any) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isSelected={chat.id === currentChatId}
          />
        ))}
      </ChatUList>
    </div>
  );
};
