import styled from "styled-components";

interface IProps {
  $selected: boolean;
}

export const ChatItem = styled.li<IProps>`
  list-style: none;
  padding: 5px 5px 5px 10px;
  border-radius: 5px;
  background-color: ${({ $selected }) => ($selected ? "#333" : "transparent")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

export const ChatName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  outline: none;
  border: none;
  transition: opacity .3s ease;

  &:hover {
    opacity: 1;
  }
`;
