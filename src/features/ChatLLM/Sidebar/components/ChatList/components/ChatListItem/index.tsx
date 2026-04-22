import { useChatContext } from "../../../../../context/hooks/useChatContext";
import { ChatItem, ChatName, DeleteButton } from "./styles";
import { MdDeleteForever } from "react-icons/md";
import { invokeOllama } from "../../../../../Chat/utils/invokeOllama";

interface IProps {
  chat: {
    id: string;
    title: string;
  };
  isSelected: boolean;
}

export const ChatListItem = ({ chat, isSelected }: IProps) => {
  const { setCurrentChatId } = useChatContext();
  const { deleteChatById } = invokeOllama;
  const handleClick = () => setCurrentChatId(chat.id);
  const handleDelete = () => deleteChatById(chat.id);

  return (
    <ChatItem $selected={isSelected} onClick={handleClick}>
      <ChatName>
        {chat.title}
      </ChatName>
      <DeleteButton onClick={handleDelete}>
        <MdDeleteForever />
      </DeleteButton>
    </ChatItem>
  );
};
