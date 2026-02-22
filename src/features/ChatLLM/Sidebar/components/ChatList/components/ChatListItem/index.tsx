import { useChatContext } from "../../../../../context/hooks/useChatContext";

interface IProps {
  chat: {
    id: string;
    title: string;
  };
}

export const ChatListItem = ({ chat }: IProps) => {
  const { setCurrentChatId } = useChatContext();
  const handleClick = () => setCurrentChatId(chat.id);

  return <div onClick={handleClick}>{chat.title}</div>;
};
