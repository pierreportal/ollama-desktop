import styled from "styled-components";

interface StyledSidebarProps {
  $isCollapsed: boolean;
}

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  & label {
    font-size: 16px;
    color: #eee;
  }
`;

export const Dropdown = styled.button`
  background-color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  padding: 8px;
  margin: 0;
  width: 100%;
  border: none;
  cursor: pointer;
  text-align: left;

  & > span {
    font-size: 12px;
    color: #999;
    margin-left: 5px;
    background-color: #222;
    border-radius: 5px;
    padding: 2px 5px;
  }
`;

export const DorpdownOptions = styled.div<StyledSidebarProps>`
  background-color: #333;
  border-radius: 5px;
  border-top: 2px solid #222;
  padding: 0;
  max-height: 200px;
  overflow: scroll;

  & ul {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;

    & li {
      text-wrap: nowrap;
      text-overflow: elipsis;
      cursor: pointer;
      font-size: 16px;
      padding: 5px 8px;
      margin: 0;

      & > span {
        font-size: 12px;
        color: #999;
        margin-left: 5px;
        background-color: #222;
        border-radius: 5px;
        padding: 2px 5px;
      }

      &:hover {
        background-color: #222;
      }
    }
  }

  display: ${({ $isCollapsed }) => ($isCollapsed ? "none" : "block")};
  position: absolute;
  width: 100%;
  z-index: 1;
`;
