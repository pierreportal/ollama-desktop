import styled from "styled-components";

interface StyledSidebarProps {
  is_collapsed: boolean;
}

export const StyledSidebar = styled.div<StyledSidebarProps>`
  z-index: 1;
  position: absolute;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  background-color: #222;
  transition: transform 0.3s;
  transform: ${({ is_collapsed }) =>
    is_collapsed ? "translateX(-100%)" : "translateX(0)"};

  & > button {
    margin-bottom: 20px;
    transform: translateX(
      ${({ is_collapsed }) => (is_collapsed ? "250px" : "0")}
    );
    transition: transform 0.3s;
    background: transparent;
    justify-content: center;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    border: none;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;