import styled from 'styled-components';

interface IProps {
    gap?: number;
    reverse?: boolean;
}

export const Row = styled.div<IProps>`
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: ${(props) => props.gap || 0}px;
`;

export const Column = styled.div<IProps>`
    display: flex;
    flex-direction: ${(props) => props.reverse ? "column-reverse" : "column"};
    height: 100%;
    gap: ${(props) => props.gap || 0}px;
`;

export const Full = styled.div`
    display: flex;
    flex-direction: column;
`;