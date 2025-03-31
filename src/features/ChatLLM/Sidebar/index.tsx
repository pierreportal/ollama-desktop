import { useState } from "react";
import { ModelSelector } from "./components/ModelSelector";
import { StyledSidebar } from "./styles";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { useChatContext } from "../context/hooks/useChatContext";
import { ChatList } from "./components/ChatList";
import { Column } from "../../../UIKit";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedModel } = useChatContext();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const collapseButton = (
    <button onClick={toggleCollapse}>
      {isCollapsed ? (
        <TbLayoutSidebarLeftExpand size={20} />
      ) : (
        <TbLayoutSidebarLeftCollapse size={20} />
      )}
    </button>
  );

  return (
    <>
      <StyledSidebar is_collapsed={isCollapsed}>
        {collapseButton}
        <Column gap={20}>
          <ModelSelector />
          <ChatList />
        </Column>
      </StyledSidebar>

      {isCollapsed ? (
        <div style={{ position: "absolute", top: "25px", left: "60px" }}>
          {selectedModel?.name.split(":")[0]}
        </div>
      ) : null}
    </>
  );
};
