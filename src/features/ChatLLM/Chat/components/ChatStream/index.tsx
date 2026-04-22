import Markdown from "react-markdown";
import { Bubble, Thread, Placeholder, ThreadInner } from "./styles";
import { DotLoader } from "./components/DotLoader";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
//import { FiCopy, FiRefreshCcw } from "react-icons/fi";
//import { Row } from "../../../../../UIKit";
import { Message, MESSAGE_SENDER } from "../../../../../bindings";
import React from "react";
import { useEffect } from "react";
import { open } from "@tauri-apps/plugin-shell";


interface IProps {
  stream: Array<Message>;
  isLoading: boolean;
}
export function useExternalLinks() {
  useEffect(() => {
    const handler = async (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");

      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // only handle external links
      if (href.startsWith("http")) {
        e.preventDefault();
        await open(href);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
}
export const ChatStream = ({ stream, isLoading }: IProps) => {
  useExternalLinks();
  const items = stream
    .filter((x) => x.content)
    .map((item, index) => {
      return item.from === MESSAGE_SENDER.USER ? (
        <Bubble key={index} $isUser>
          <p>{item.content}</p>
        </Bubble>
      ) : (
        <React.Fragment key={index}>
          <div>
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      customStyle={{
                        borderRadius: 10,
                      }}
                      style={tomorrow}
                      PreTag="div"
                      language={match[1]}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
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
          {/*
          <Row $gap={10}>
            <FiCopy />
            TODO: implement refresh query 
            <FiRefreshCcw />
          </Row>
            */}
        </React.Fragment>
      );
    });

  return (
    <Thread>
      <ThreadInner>
        {items.length ? (
          items
        ) : (
          <Placeholder>
            <p>🦙</p>
          </Placeholder>
        )}
        {isLoading && (
          <Bubble>
            <DotLoader />
          </Bubble>
        )}
      </ThreadInner>
    </Thread>
  );
};
