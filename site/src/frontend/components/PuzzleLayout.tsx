import { styled } from "styled-components";
import { deviceMin, deviceMax } from "../utils/breakpoints";
import { Wrapper } from "./StyledUI";

const PuzzleWrapper = styled(Wrapper)`
  background-color: var(--white);
  margin: 0 auto;
  width: 900px;
  max-width: 100%;
  color: var(--black);

  a {
    color: var(--black);
    text-decoration-color: var(--black);

    &:hover {
      text-shadow: none;
      color: var(--gold-700);
      text-decoration-color: var(--gold-700);
    }
  }

  @media ${deviceMin.lg} {
    width: calc(1080px - 1rem);
  }
`;

const PuzzleHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: var(--gray-100);
  gap: 1rem;
  padding: 2rem;
  position: relative;

  @media ${deviceMax.md} {
    gap: 2rem;
    padding: 1rem;
  }

  @media ${deviceMax.sm} {
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const PuzzleTitle = styled.h1`
  grid-column: 1 / 3;
  overflow-x: clip;
`;

const PuzzleMain = styled.main`
  padding: 2rem;
  padding-bottom: 4rem;

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

export {
  PuzzleHeader,
  PuzzleMain,
  PuzzleFooter,
  PuzzleWrapper,
  PuzzleTitle,
  AuthorsNote,
};
