import React from "react";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th {
    text-align: left;
  }
  td:nth-child(3) {
    text-align: center;
  }
  td,
  th {
    padding: 1px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <NotoColorEmojiFont />
      <p>
        This puzzle is about the video game Mortal Kombat, and specifically the
        “friendship” finishing moves from Mortal Kombat 2 (as hinted by the K in
        “kan’t,” the added “too,” the audio, and—last and least—the logo on the
        coffee mug that appears in the final scene). The video shows the
        protagonist visiting various characters from the game, and each actor is
        wearing colors similar to the character they represent. In an effort to
        become friends (inspired by his choice of reading material as shown in
        the introduction), the protagonist performs the visited character’s own
        friendship move.
      </p>
      <p>
        The map represents the protagonist’s neighborhood as he walks around and
        visits his opponents. The movement is dictated by the sequence of
        joystick controls for the friendship move of each character he visits,
        starting from the corner of the map as designated by the illustrated
        figure. Take the letter of the house at each stop to extract the answer:
        <PuzzleAnswer>FOOTSTEPS</PuzzleAnswer>.
      </p>
      <p>
        The full list of controls/movements is shown below. As implied by the
        character facing right and starting in the righthand corner (and thus
        unable to move further right), the controls are interpreted as F =
        forward/right, B = back/left, U = up, D = down. Kicks are ignored, and
        the flavor text gives a checksum of the total number of moves (strides)
        to confirm that, as well as guard against some websites that we
        discovered have inaccurate information for Baraka.
      </p>
      <StyledTable>
        <tr>
          <th>Character</th>
          <th>Moves</th>
          <th>Grid Letter</th>
        </tr>
        <tr>
          <td>Kitana</td>
          <td>DDDU (LK)</td>
          <td>
            <Mono>F</Mono>
          </td>
        </tr>
        <tr>
          <td>Kung Lao</td>
          <td>BBBD (HK)</td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
        <tr>
          <td>Mileena</td>
          <td>DDDU (HK)</td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
        <tr>
          <td>Baraka</td>
          <td>UFF (HK)</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>Johnny Cage</td>
          <td>DDDD (HK)</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>Liu Kang</td>
          <td>FBBB (LK)</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>Raiden</td>
          <td>DBF (HK)</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>Reptile</td>
          <td>BBD (LK)</td>
          <td>
            <Mono>P</Mono>
          </td>
        </tr>
        <tr>
          <td>Shang Tsung</td>
          <td>BBDF (HK)</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
      </StyledTable>
      <h3>Author’s Note</h3>
      <p>
        I wanted to include an outtakes video here, but we mostly deleted the
        failed shots as they occurred and anyway I think I embarrassed myself
        enough in the actual finished video. So I’ll just leave this short
        “Oscar” speech: I’d like to thank my wife Susan for all of her patient
        and wonderful help with props and filming. I also want to thank my
        friends and neighbors (who all wished to remain anonymous) for agreeing
        to be in a video that I couldn’t even tell them about until 2025. 🙂
      </p>
    </>
  );
};

export default Solution;
