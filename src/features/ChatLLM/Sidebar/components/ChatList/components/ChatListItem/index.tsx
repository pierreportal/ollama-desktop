import { useChatContext } from "../../../../../context/hooks/useChatContext";

export const ChatListItem = ({ chat }: { chat: { id: string, title: string } }) => {
    const { setCurrentChatId } = useChatContext();

    const handleClick = () => {
        setCurrentChatId(chat.id);
    };

    return (
        <div onClick={handleClick}>
            {chat.title}
        </div>
    );
}