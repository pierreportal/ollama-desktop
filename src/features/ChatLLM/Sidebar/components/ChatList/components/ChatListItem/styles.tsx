import styled from "styled-components";

interface IProps {
  $selected: boolean;
}

export const ChatItem = styled.li<IProps>`
  list-style: none;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ $selected }) => ($selected ? "#333" : "transparent")};
  cursor: pointer;
`;
