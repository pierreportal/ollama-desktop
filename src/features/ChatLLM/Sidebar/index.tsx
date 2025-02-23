import { ButtonIcon } from "../../../UIKit/ButtonIcon";
import { StyledSidebar } from "./styles";
import { FiChevronLeft } from "react-icons/fi";

export const Sidebar = () => {
    return (
        <StyledSidebar>
            <ButtonIcon onClick={() => console.log("clicked")}>
                <FiChevronLeft />
            </ButtonIcon>
            Sidebar
        </StyledSidebar>
    );
}