import styled from "styled-components";

const RADIUS_BUBBLE = "30px";

interface IProps {
  $isUser?: boolean;
}

export const Bubble = styled.div<IProps>`
  background-color: ${({ $isUser }) =>
    $isUser ? "#444" : "rgba(52, 60, 68, 0)"};
  color: "white";
  padding: 0 20px;
  border-radius: ${({ $isUser }) =>
    $isUser
      ? `${RADIUS_BUBBLE} ${RADIUS_BUBBLE} 0 ${RADIUS_BUBBLE}`
      : `0 ${RADIUS_BUBBLE} ${RADIUS_BUBBLE} ${RADIUS_BUBBLE}`};
  max-width: 70%;
  margin: 10px;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  word-wrap: break-word;

  & a {
    color: rgb(58, 255, 210);
    text-decoration: none;
  }

  & pre {
    font-size: 14px;

    & > div {
      border-radius: 10px;
    }
  }
`;

export const Thread = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  padding: 0 20px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
`;

export const ThreadInner = styled.div`
  width: 800px;
  justify-self: center;
  margin: 0 auto;
  padding: 0 20px;
  flex-direction: column;
  display: flex;
`;

export const Placeholder = styled.div`
  font-size: 100px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
