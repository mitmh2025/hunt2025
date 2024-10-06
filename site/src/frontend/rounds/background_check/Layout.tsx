import {
  BgColor,
  FridgeColor,
} from "../../components/BackgroundCheckPuzzleLayout";
import { styled } from "styled-components";

export const Background = styled.div`
  background-color: ${BgColor};
`;

export const Fridge = styled.main`
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: ${FridgeColor};
  color: ${BgColor};

  a {
    color: ${BgColor};
    text-decoration-color: ${BgColor};
  }
`;
