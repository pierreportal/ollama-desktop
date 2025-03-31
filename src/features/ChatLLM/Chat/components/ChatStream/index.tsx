import Markdown from "react-markdown";
import { Bubble, Thread } from "./styles";
import { DotLoader } from "./components/DotLoader";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FiCopy, FiRefreshCcw } from "react-icons/fi";
import { Row } from "../../../../../UIKit";
import { Message, MESSAGE_SENDER } from "../../../../../bindings";
import React from "react";

interface IProps {
    stream: Array<Message>;
    isLoading: boolean;
}

export const ChatStream = ({ stream, isLoading }: IProps) => {

    const items = stream.filter(x => x.content).map((item, index) => {
        return item.from === MESSAGE_SENDER.User ? (
            <Bubble key={index} isUser>
                <p>
                    {item.content}
                </p>
            </Bubble>
        ) : (
            <React.Fragment key={index}>
                <div >
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({ inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');

                                return !inline && match ? (
                                    <SyntaxHighlighter style={tomorrow} PreTag="div" language={match[1]} {...props}>
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {item.content}
                    </Markdown>
                </div>
                <Row gap={10}>
                    {/* TODO: implement copy to clipboard */}
                    <FiCopy />
                    {/* TODO: implement refresh query */}
                    <FiRefreshCcw />
                </Row>
            </React.Fragment>
        );
    });

    return (
        <Thread>
            {items.length ? items : (
                <div style={{ fontSize: '100px', textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>🦙</p>
                </div>
            )}
            {isLoading && (
                <Bubble>
                    <DotLoader />
                </Bubble>
            )}
        </Thread>
    );
}