import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import img11 from "./assets/img11.svg";
import puzzle1 from "./assets/puzzle1.svg";
import puzzle10 from "./assets/puzzle10.svg";
import puzzle2 from "./assets/puzzle2.svg";
import puzzle3 from "./assets/puzzle3.svg";
import puzzle4 from "./assets/puzzle4.svg";
import puzzle5 from "./assets/puzzle5.svg";
import puzzle6 from "./assets/puzzle6.svg";
import puzzle7 from "./assets/puzzle7.svg";
import puzzle8 from "./assets/puzzle8.svg";
import puzzle9 from "./assets/puzzle9.svg";
import sample1 from "./assets/sample1.svg";
import sample10 from "./assets/sample10.svg";
import sample2 from "./assets/sample2.svg";
import sample3 from "./assets/sample3.svg";
import sample4 from "./assets/sample4.svg";
import sample5 from "./assets/sample5.svg";
import sample6 from "./assets/sample6.svg";
import sample7 from "./assets/sample7.svg";
import sample8 from "./assets/sample8.svg";
import sample9 from "./assets/sample9.svg";

const SampleWrapper = styled.div`
  display: flex;
  background-color: #fcf5e5;
  print-color-adjust: unset;
  -webkit-print-color-adjust: unset;
`;

const SampleChild = styled.div`
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  &:first-child {
    border-right-width: 0px;
  }
`;

const ImageRow = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 32px;
  margin-bottom: 16px;
  border: 1px solid black;
  border-top-width: 0px;
  background-color: #fcf5e5;
  print-color-adjust: unset;
  -webkit-print-color-adjust: unset;

  @media screen {
    height: 800px;
  }
`;

const StyledImage = styled(LinkedImage)<{ $height: string }>`
  display: flex;
  height: ${({ $height }) => $height};

  @media print {
    max-height: min(100%, ${({ $height }) => $height});
    max-width: 100%;
    height: 100%;
    width: 100%;
  }
`;

const StyledHr = styled.hr`
  border: none;
  @media print {
    page-break-after: always;
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 8px;

  @media print {
    height: 98vh;
    page-break-inside: avoid;
    page-break-after: always;

    div {
      background-color: transparent;
    }
  }

  &:last-child {
    background-color: transparent;
    margin-bottom: 0px;

    @media print {
      page-break-after: auto;
    }

    div {
      border: none;
      background-color: transparent;
    }
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        At some point Papa thought he might go to grad school, but the entrance
        exam made it clear what he should expect from it.
      </p>
      <StyledHr />
      <Page>
        <SampleWrapper>
          <SampleChild>1. Kakuro</SampleChild>
          <SampleChild>
            <LinkedImage src={sample1} alt="A solved 3x3 Kakuro grid." />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={puzzle1}
            alt="A 9x9 Kakuro grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>2. Nonogram</SampleChild>
          <SampleChild>
            <LinkedImage src={sample2} alt="A solved 6x6 Nonogram grid." />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="700px"
            src={puzzle2}
            alt="A 20x20 Nonogram grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>3. Killer Sudoku</SampleChild>
          <SampleChild>
            <LinkedImage src={sample3} alt="A solved 4x4 Killer Sudoku grid." />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={puzzle3}
            alt="A 9x9 Killer Sudoku grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>4. Fillomino</SampleChild>
          <SampleChild>
            <LinkedImage src={sample4} alt="A solved 4x4 Fillomino grid." />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={puzzle4}
            alt="A 10x12 Fillomino grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>5. Average Snake</SampleChild>
          <SampleChild>
            <LinkedImage src={sample5} alt="A solved 3x5 Average Snake grid." />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={puzzle5}
            alt="A 12x12 Average Snake grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>6. Sum Skyscrapers with Mirrors</SampleChild>
          <SampleChild>
            <LinkedImage
              src={sample6}
              alt="A solved 4x4 Sum Skyscrapers with Mirrors grid."
            />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="400px"
            src={puzzle6}
            alt="A 7x7 Sum Skyscrapers with Mirrors grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>7. Japanese Sums or Products</SampleChild>
          <SampleChild>
            <LinkedImage
              src={sample7}
              alt="A solved 5x5 Japanese Sums or Products grid."
            />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="400px"
            src={puzzle7}
            alt="A 8x8 Japanese Sums or Products grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>8. Hungarian Tapa</SampleChild>
          <SampleChild>
            <LinkedImage src={sample8} alt="A solved 6x6 Fillomino grid." />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={puzzle8}
            alt="A 10x10 Hungarian Tapa grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>9. Doppelblock Sudoku</SampleChild>
          <SampleChild>
            <LinkedImage
              src={sample9}
              alt="A solved 4x4 Doppelblock Sudoku grid."
            />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={puzzle9}
            alt="A 9x9 Doppelblock Sudoku grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <SampleWrapper>
          <SampleChild>10. Index Yajilin</SampleChild>
          <SampleChild>
            <LinkedImage
              src={sample10}
              alt="A solved 6x6 Index Yajilin grid."
            />
          </SampleChild>
        </SampleWrapper>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={puzzle10}
            alt="A 12x12 Index Yajilin grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
          />
        </ImageRow>
      </Page>
      <Page>
        <ImageRow>
          <StyledImage
            $height="500px"
            src={img11}
            alt="A 12x15 grid of letters and numbers. Across the top of the grid are green-highlighted numbers 1, 2, 3, and so on. Across the left side of the grid are red-highlighted numbers 1, 2, 3, and so on."
          />
        </ImageRow>
      </Page>
    </>
  );
};

export default Puzzle;
