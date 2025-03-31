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

    const createChat = async ({ messages }: { messages: Message[] }) => {
        try {
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();
            const timestamp = `${date}-${time}`;

            const chatId = await chatController.create({
                title: `Untitled Chat ${timestamp}`,
                messages,
                timestamp
            });

            console.log("chatId:", chatId);
            setCurrentChatId(chatId.slice(5));
        } catch (error) {
            console.error(error);
        }
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
            createChat({ messages });
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