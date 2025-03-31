import { ReactElement } from "react";
import { IconButtonRound } from "./styles";

interface IProps {
    children: ReactElement;
    onClick: () => void;
}

export const ButtonIcon = ({ children, onClick }: IProps) => {
    return (
        <IconButtonRound onClick={onClick}>
            {children}
        </IconButtonRound>
    );
}