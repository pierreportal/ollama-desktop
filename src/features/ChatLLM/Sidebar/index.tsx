import { useState } from "react";
import { ModelSelector } from "./components/ModelSelector";
import { StyledSidebar } from "./styles";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <StyledSidebar isCollapsed={isCollapsed}>
        {/* TODO: when collapsed, add selected model name next to the button */}
        <button onClick={toggleCollapse}>
          {isCollapsed ? (
            <TbLayoutSidebarLeftExpand size={20} />
          ) : (
            <TbLayoutSidebarLeftCollapse size={20} />
          )}
        </button>
        <ModelSelector />
        {/* TODO: add list of chats */}
      </StyledSidebar>
    </>
  );
};
