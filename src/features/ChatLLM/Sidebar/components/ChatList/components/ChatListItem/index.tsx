import { useChatContext } from "../../../../../context/hooks/useChatContext";
import { ChatItem } from "./styles";

interface IProps {
  chat: {
    id: string;
    title: string;
  };
  isSelected: boolean;
}

export const ChatListItem = ({ chat, isSelected }: IProps) => {
  const { setCurrentChatId } = useChatContext();
  const handleClick = () => setCurrentChatId(chat.id);

  return (
    <ChatItem $selected={isSelected} onClick={handleClick}>
      {chat.title}
    </ChatItem>
  );
};
