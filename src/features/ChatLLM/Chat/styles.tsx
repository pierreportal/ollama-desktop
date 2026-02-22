import styled from "styled-components";
import { Column } from "../../../UIKit";

export const Main = styled.main`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0;
`;

export const ThreadColumn = styled(Column)`
  align-items: center;
  padding: 5px;
`;
