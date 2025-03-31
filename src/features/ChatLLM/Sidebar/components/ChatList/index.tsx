import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { chatController } from "../../../../../api/api";
import { useChatContext } from "../../../context/hooks/useChatContext";
import { ChatListItem } from "./components/ChatListItem";
import { NewChatButton } from "./styles";
import { SidebarHeader } from "../../styles";
import { useChatApi } from "../../../Chat/hooks/useChatApi";

const ITEMS_PER_PAGE = 10;
const page = { page: 0, limit: ITEMS_PER_PAGE }


export const ChatList = () => {

  // const [page, setPage] = useState<Page>({ page: 0, limit: ITEMS_PER_PAGE });
  const { chatsList, setChatsList } = useChatContext();
  const { createChat } = useChatApi();

  // const listChats = async () => {
  //   try {
  //     const response = await chatController.list(page);
  //     setChatsList(response);
  //   } catch (error) {
  //     console.error('listChats', error);
  //   }
  // }
  useEffect(() => {
    console.log('listChats');
    // listChats();
  }, []);

  const createNewChat = async () => {
    await createChat({
      messages: [],
    });
    // listChats();
  };

  return (
    <div>
      <SidebarHeader>
        <label htmlFor="model-selector">Chats</label>
        <NewChatButton onClick={createNewChat}>
          <FiEdit size={16} />
        </NewChatButton>
      </SidebarHeader>
      <ul>
        {chatsList.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};
