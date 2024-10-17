import { styled } from "styled-components";
import { deviceMin, deviceMax } from "../utils/breakpoints";

const PuzzleWrapper = styled.div`
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
  gap: 2rem;
  padding: 2rem;

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
  margin: 0.5em 0;

  @media ${deviceMax.md} {
    margin: 0.33em 0;
  }
`;

const PuzzleMain = styled.main`
  padding: 2rem;
  padding-bottom: 4rem;

  @media ${deviceMax.lg} {
    padding: 1rem;
    padding-bottom: 2rem;
  }

  @media ${deviceMax.sm} {
    padding: 0.5rem;
    padding-bottom: 1rem;
  }
`;

const PuzzleFooter = styled.footer``;

export { PuzzleHeader, PuzzleMain, PuzzleFooter, PuzzleWrapper, PuzzleTitle };
