import { Chat } from './Chat';
import { ChatLLMContextWrapper } from './context';
// import { Sidebar } from './Sidebar';
import { Row } from '../../UIKit';



export const ChatLLM = () => {
    return (
        <ChatLLMContextWrapper>
            <Row>
                {/* <Sidebar /> */}
                <Chat />
            </Row>
        </ChatLLMContextWrapper>
    );
}