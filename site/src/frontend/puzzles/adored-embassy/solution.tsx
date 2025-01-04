import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import image from "./assets/image.png";

const StyledDiv = styled.div`
  margin-bottom: 1em;
`;

const FlexWrapper = styled(StyledDiv)`
  display: flex;
  gap: 16px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        After solving some of the clues, solvers must begin constructing a
        Boggle grid that consists of a 4x4 Boggle board that occupies the center
        of a larger 6x6 Boggle board, containing the given words.
      </p>
      <p>The clues solve to the following words:</p>
      <FlexWrapper>
        <div>
          <h4>Regular words</h4>

          <div>DOO</div>
          <div>EQUID</div>
          <div>FADE</div>
          <div>FEUDING</div>
          <div>JUDO</div>
          <div>PONY</div>
          <div>UPDO</div>
          <div>VAX</div>
          <div>VYING</div>
        </div>
        <div>
          <h4>Super Big words</h4>
          <div>BEGIN</div>
          <div>BLANK</div>
          <div>BUST</div>
          <div>COINAGE</div>
          <div>FETE</div>
          <div>KOOK</div>
          <div>MAROON</div>
          <div>MITT</div>
          <div>OKRA</div>
          <div>POCKMARKED</div>
          <div>PRODIGAL</div>
          <div>SQUID</div>
          <div>STEED</div>
          <div>TITHE</div>
        </div>
      </FlexWrapper>
      <p>
        The number of “pts” listed next to each word is the Boggle score of that
        word in the respective Boggle game.
      </p>
      <h3>Boggle Variants</h3>
      <p>
        Boggle was originally a 4x4 game. A 5x5 version has been sold under
        various names (Big Boggle, Boggle Master, and Boggle Deluxe). The 6x6
        version is called Super Big Boggle, and it adds a couple special cubes
        into the game: a double-letter cube, and one with some blank faces.
        Original Boggle also has “Qu” together on one face of a die. So the
        instructions below the grid clarify the rules of the puzzle, while also
        helping hint that this is Boggle.
      </p>
      <h3>Word lengths and scoring:</h3>
      <p>
        4x4 Boggle allows words of three or more letters, while 5x5 and 6x6
        Boggle require words to be at least four letters. 4x4 and 5x5 Boggle use
        the same word scoring system, where three- and four-letter words are 1
        point each, five-letter words are 2 points, and then it goes 3, 5, 11.
        6x6 Boggle changes the scoring of words of 9 or more letters to be 2N,
        where N is the number of letters:
      </p>
      <LinkedImage
        src={image}
        alt="A diagram explaining Boggle scoring. 4 letters get 1 point, 5 letters get 2 points, 6 letters get 3 points, 7 letters get 5 points, 8 letters get 11 points, and 9 or more letters get 2 points per letter."
      />
      <p>
        The “Regular” words are confined to the 4x4 shaded area, while the
        “Super Big” words may occur anywhere in the grid, following the normal
        rules for spelling a word on a Boggle grid: you may move orthogonally or
        diagonally from letter to adjacent letter, and you must not reuse any
        square (cube) within the same word.
      </p>
      <p>
        The best plan of attack for solvers is to try to construct the 4x4
        shaded area first, and then build the 6x6 grid around that, though in
        some test-solves, feedback from the 6x6 layer helped clarify one or two
        of the Regular words.
      </p>
      <p>The correct grid (up to rotations and reflections) is as follows:</p>
      <StyledDiv>
        <Mono>SUBMIT</Mono>
        <Mono>TQFJXT</Mono>
        <Mono>EEUAVH</Mono>
        <Mono>KPDIYE</Mono>
        <Mono>ROONGB</Mono>
        <Mono>AMKCAL</Mono>
      </StyledDiv>
      <p>
        Reading around the edge gives the answer, <Mono>SUBMIT</Mono>{" "}
        <PuzzleAnswer>THE BLACK MARKET</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
