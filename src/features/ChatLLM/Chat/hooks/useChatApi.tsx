import { chatController } from "../../../../api/api";
import { ChatUpdate, Message } from "../../../../bindings";
import { useChatContext } from "../../context/hooks/useChatContext";

export const useChatApi = () => {
    const { currentChatId, setCurrentChatId } = useChatContext();

    const getChat = async (chatId: string) => {
        try {
            return await chatController.get(chatId).then((chat) => {
                return chat;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const createChat = async (messages?: Message[]) => {
        const chatId = await chatController.create({
            title: 'Untitled Chat',
            messages: messages || []
        });
        setCurrentChatId(chatId.slice(5));
    };

    const updateChat = async (update: ChatUpdate) => {
        if (!currentChatId) {
            return;
        }
        await chatController.update(
            currentChatId,
            update
        );
    };

    const upsertChat = async (messages: Message[]) => {
        if (!currentChatId && messages.length === 1) {
            createChat(messages);
        } else {
            updateChat({ messages });
        }
    };

    return {
        getChat,
        createChat,
        updateChat,
        upsertChat
    };
}