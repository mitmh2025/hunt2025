import { styled } from "styled-components";
import bg from "./assets/desk-bg.png";

const BG_COLOR = "#272421";

export const DeskItem = styled.a`
  position: absolute;
  cursor: pointer;
  -webkit-filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);
  filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);

  .tooltip {
    font-family: "Kiwi Maru";
    color: ${BG_COLOR};
    background-color: rgba(115, 147, 93, 0.7);
  }

  &:hover {
    -webkit-filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);
    filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);

    .tooltip {
      visibility: visible;
    }
  }
`;

export const Desk = styled.div`
  background: url("${bg}");
  background-size: contain;
  background-repeat: no-repeat;
  width: min(100%, 1920px);
  height: min(calc(100vw * 1080 / 1920), 1080px);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

// Leaving the things that still need additional customization here so I don't forget about them
export const Cabinet = styled(DeskItem)`
  top: min(calc(100vw * 24 / 1920), 24px);
  right: 0;

  img {
    width: min(calc(100vw * 355.5 / 1920), 355.5px);
  }

  .tooltip {
    left: 0.5rem;
    top: -0.5rem;
  }
`;

export const Fly = styled(DeskItem)`
  right: min(calc(100vw * 420 / 1920), 420px);
  top: min(calc(100vw * 300 / 1920), 300px);

  // TODO: I don't have a good way to do effects only on hover with inline styles
  &:hover {
    -webkit-filter: drop-shadow(0px 0px 9px #ffffefaa);
    filter: drop-shadow(0px 0px 9px #ffffefaa);
  }

  img {
    width: min(calc(100vw * 333 / 1920), 333px);
  }
`;

export const Coffee = styled(DeskItem)`
  top: min(calc(100vw * 584 / 1920), 584px);
  right: min(calc(100vw * 640 / 1920), 640px);
  visibility: visible;

  img {
    width: min(calc(100vw * 930 / 1920), 930px);
  }

  .tooltip {
    position: absolute;
    left: auto;
    right: 0.25rem;
    top: -2.25rem;
  }
`;

export const Meta3 = styled(DeskItem)`
  left: min(calc(100vw * 390 / 1920), 390px);
  top: min(calc(100vw * 35 / 1920), 35px);

  img {
    width: min(calc(100vw * 151 / 1920), 151px);
  }

  .tooltip {
    top: -0.5rem;
  }
`;
export const Meta4 = styled(DeskItem)`
  left: min(calc(100vw * 504 / 1920), 504px);
  top: min(calc(100vw * 55 / 1920), 55px);

  img {
    width: min(calc(100vw * 169 / 1920), 169px);
  }

  .tooltip {
    top: -0.5rem;
  }
`;

export const Root = styled.div`
  background-color: ${BG_COLOR};
`;
