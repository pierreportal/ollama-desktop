import { IconButtonRound } from "./styles";


export const ButtonIcon = ({ children, onClick }: any) => {
    return (
        <IconButtonRound onClick={onClick}>
            {children}
        </IconButtonRound>
    );
}