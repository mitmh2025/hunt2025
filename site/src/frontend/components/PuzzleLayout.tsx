import { styled } from "styled-components";
import { deviceMin, deviceMax } from "../utils/breakpoints";
import { lightBgLinkStyles, mdBgLinkStyles, Wrapper } from "./StyledUI";

const PuzzleWrapper = styled(Wrapper)`
  background-color: var(--white);
  color: var(--black);
  padding: 0;

  @media ${deviceMin.lg} {
    width: calc(1080px - 1rem);
  }
`;

const PuzzleHeader = styled.header`
  background-color: var(--gray-100);
  padding: 2rem;
  position: relative;

  @media ${deviceMax.md} {
    padding: 1rem;
  }

  @media ${deviceMax.sm} {
    padding: 0.5rem;
  }

  #puzzle-guess-section {
    a {
      ${mdBgLinkStyles}
    }
  }
`;

const PuzzleTitleWrapper = styled.div`
  grid-column: 1/3;
  overflow-x: clip;
  margin-bottom: 1rem;
`;

const PuzzleTitle = styled.h1`
  padding-top: 0.5rem;
`;

const PuzzleBacklink = styled.a`
  ${mdBgLinkStyles}
`;

const PuzzleMain = styled.main`
  padding: 2rem;
  padding-bottom: 4rem;

  a {
    ${lightBgLinkStyles}
  }

  & * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  @media ${deviceMax.lg} {
    padding: 1rem;
    padding-bottom: 2rem;
  }

  @media ${deviceMax.sm} {
    padding: 0.5rem;
    padding-bottom: 1rem;
  }

  .puzzle-flavor {
    font-style: italic;
  }
`;

const PuzzleFooter = styled.footer``;

const AuthorsNote = styled.p`
  font-size: 14px;
  border: 1px solid var(--gold-700);
  color: var(--gold-800);
  padding: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  background-color: var(--gold-200);
  border-radius: 2px;
  .copying & {
    background-color: transparent;
  }
`;

const AuthorsNoteBlock = styled.div`
  font-size: 14px;
  border: 1px solid var(--gold-700);
  color: var(--gold-800);
  padding: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  background-color: var(--gold-200);
  border-radius: 2px;
  .copying & {
    background-color: transparent;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

const InteractionLinkBlock = styled.div`
  font-size: 18px;
  border: 2px solid var(--gold-900);
  color: var(--white) !important;
  padding: 1rem;
  margin: 0 auto 2rem;
  background-color: var(--gold-700);
  max-width: 400px;
  border-radius: 20px;
  text-align: center;

  a {
    color: var(--white) !important;
    text-decoration-color: var(--white) !important;
  }

  a:hover {
    color: var(--gold-300) !important;
  }
`;

export {
  PuzzleHeader,
  PuzzleMain,
  PuzzleBacklink,
  PuzzleFooter,
  PuzzleWrapper,
  PuzzleTitleWrapper,
  PuzzleTitle,
  AuthorsNote,
  AuthorsNoteBlock,
  InteractionLinkBlock,
};
