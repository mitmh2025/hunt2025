import { styled } from "styled-components";
import StyledDialog from "../../components/StyledDialog";
import NoteBg from "./assets/bg.png";
import bg from "./assets/desk-bg.png";

const BG_COLOR = "#272421";

export const NotesDialog = styled(StyledDialog)`
  font-family: "Reenie Beanie";
  font-size: 24px;
  transform: rotate(-2deg);
  background-color: #f0f0de;
  background-image: url(${NoteBg});
  background-size: 300% 16rem;
  background-position: 20% 1rem;
  background-repeat: repeat-y;
  font-size: 2rem;

  h1 {
    font-family: "Kiwi Maru";
    font-size: 2rem;
  }

  ul {
    margin-top: 0;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
  }
`;

export const DeskItem = styled.a`
  position: absolute;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;

  & img {
    -webkit-filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);
    filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);
  }

  &:hover:not(:disabled) img {
    -webkit-filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);
    filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);
  }

  &:disabled {
    cursor: default;
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

  // Each DeskItem is its own stacking context because they use filters, so if
  // we want tooltips to stack over all of them, we need to hoist them up.
  //
  // (But because they're not inside the link, we need to add hover text-shadow
  // back ourselves)
  .tooltip {
    font-family: "Kiwi Maru";
    color: ${BG_COLOR};
    background-color: rgba(115, 147, 93, 0.8);
    max-width: 300px;
    z-index: 5;
    text-shadow: 0 0 0.5rem hsl(from var(--white) h s l / 0.4);

    .desc {
      color: var(--gray-800);
    }
  }
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
