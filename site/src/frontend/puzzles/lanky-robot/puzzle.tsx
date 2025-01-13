import React from "react";
import { styled } from "styled-components";
import Blanks from "../../components/Blanks";

const CenteredColumn = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const FullWidthCenteredColumn = styled(CenteredColumn)`
  width: 100%;
`;

const StyledBlanks = styled(Blanks)`
  gap: 1rem;

  & .cell {
    min-width: 2rem;
  }
`;

const Puzzle = () => {
  return (
    <>
      <ol>
        <li>hatred or malice possessed by one with geldon hair (6 5 ⇒ 5 4)</li>
        <li>musical nembur written about ballpoint pens (3 4 ⇒ 6)</li>
        <li>low mournful suond that emanates from cheese (4 4 ⇒ 7)</li>
        <li>a wedi flat cooking receptacle used to contain regret (5 3 ⇒ 9)</li>
        <li>record kept about the baem running under the hull (4 3 ⇒ 9)</li>
        <li>enlarge or widen, like a pipul or nostril (6 ⇒ 8)</li>
        <li>suddenly immerse a breath freshener in cold wetar (5 4 ⇒ 8)</li>
        <li>the unlucky child used to lure uot Pennywise (2 4 ⇒ 5-3)</li>
        <li>pinac at the sight of crimson colors (4 3 ⇒ 7)</li>
        <li>the version control cammond that cooks a pastry? (3 5 ⇒ 8)</li>
        <li>
          the entirety of a discoloration on a porsen‘s clothing (5 5 ⇒ 9)
        </li>
        <li>a baby‘s bed ewnod by an Objectivist author (3‘1 4 ⇒ 8)</li>
        <li>a fellow who has clear and visible wrenklis (5 3 ⇒ 4 4)</li>
        <li>
          backbone that ollaws one to successfully express mirth (5 5 ⇒ 8)
        </li>
        <li>simian that resides in the sledgu (4 3 ⇒ 6)</li>
        <li>grassy area naer a house that‘s mediocre (3 4 ⇒ 7)</li>
        <li>an amusing woolen hat meda in Scotland (3 3 ⇒ 7)</li>
        <li>
          annoy or dustirb group associated with sporting events (4 4 ⇒ 4-4)
        </li>
        <li>the posterior of a small to medium sized redont (3 4 ⇒ 5 4)</li>
        <li>
          feli legal action in court against triplets (hopefully with cause) (3
          5 ⇒ 3 7)
        </li>
        <li>a photograph of a cervud woodwind instrument (3 3 ⇒ 3 4)</li>
        <li>the tapered part of a bettlo made of wood (4 4 ⇒ 9)</li>
        <li>sample perplu drank by taking a small sip (3 4 ⇒ 8)</li>
        <li>a dress wearer in a wedding who is soaked thruogh (3 5 ⇒ 5 5)</li>
      </ol>

      {/* should look like
      __ __ __ __ __ __ __ __    __ __ __ __ __
      15 16 23 12  4 18 20 13    24  8  6 22 17
      
      __ __    __ __ __    __ __    __ __ __ __
      21  7     5 11 19     1  9    14  3  2 10
      */}
      <FullWidthCenteredColumn>
        <StyledBlanks
          structure={[
            "_",
            "_",
            "_",
            "_",
            "_",
            "_",
            "_",
            "_",
            " ",
            "_",
            "_",
            "_",
            "_",
            "_",
          ]}
          fill={[
            "15",
            "16",
            "23",
            "12",
            "4",
            "18",
            "20",
            "13",
            " ",
            "24",
            "8",
            "6",
            "22",
            "17",
          ]}
          fillPosition="below"
        />
        <StyledBlanks
          structure={[
            "_",
            "_",
            " ",
            "_",
            "_",
            "_",
            " ",
            "_",
            "_",
            " ",
            "_",
            "_",
            "_",
            "_",
          ]}
          fill={[
            "21",
            "7",
            " ",
            "5",
            "11",
            "19",
            " ",
            "1",
            "9",
            " ",
            "14",
            "3",
            "2",
            "10",
          ]}
          fillPosition="below"
        />
      </FullWidthCenteredColumn>
    </>
  );
};

export default Puzzle;
