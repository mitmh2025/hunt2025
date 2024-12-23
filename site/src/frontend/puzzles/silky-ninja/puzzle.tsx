import React from "react";
import { styled } from "styled-components";
import imgA from "./assets/A.png";
import imgB from "./assets/B.png";
import imgC from "./assets/C.png";
import imgD2 from "./assets/D(2).png";
import imgD3 from "./assets/D(3).png";
import imgD4 from "./assets/D(4).png";
import imgD5 from "./assets/D(5).png";
import imgD6 from "./assets/D(6).png";
import imgD7 from "./assets/D(7).png";
import imgE from "./assets/E.png";
import imgF from "./assets/F.png";
import imgG from "./assets/G.png";
import imgH from "./assets/H.png";
import imgI from "./assets/I.png";
import imgJ from "./assets/J.png";
import imgK from "./assets/K.png";
import imgL from "./assets/L.png";
import imgM from "./assets/M.png";
import imgN from "./assets/N.png";
import imgO from "./assets/O.png";
import imgP from "./assets/P.png";
import imgQ from "./assets/Q.png";

const PuzzleRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 30px;
  overflow: scroll;
`;

const PuzzleRowGray = styled(PuzzleRow)`
  background-color: #ddd;
  padding: 20px;
`;

const EditorsNote = styled.div`
  padding: 30px;
  font-style: italic;
`;

const PuzzleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Clue = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Separator = styled.div`
  background-color: black;
  height: 20px;
  width: vw;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Blanks = styled.div`
  font-family:
    Courier New,
    monospace;
  letter-spacing: 2px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

const ClueBlanks = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-family:
    Courier New,
    monospace;
  letter-spacing: 2px;
`;

const VCentered = styled.div`
  display: flex;
  align-items: center;
`;

const Droid = styled.img``;

const DroidDitto = styled(Droid)`
  margin-left: -50px;
`;

const Puzzle = () => {
  return (
    <>
      <div className="puzzle-flavor">
        We’ve received these cryptic messages from our rebel spies. Fortunately,
        our decryption droids are lined up to assist.
      </div>
      <EditorsNote>
        Editors’ Note: These are cryptic crossword clues, a common type in
        puzzlehunts involving both crossword definitions and wordplay. If you’ve
        never seen them before, check out{" "}
        <a href="https://s.wsj.net/blogs/html/wsjcrypticguide.pdf">
          https://s.wsj.net/blogs/html/wsjcrypticguide.pdf
        </a>{" "}
        or{" "}
        <a href="https://www.puzzledpint.com/files/3613/8170/3749/CrypticsGuide.pdf">
          https://www.puzzledpint.com/files/3613/8170/3749/CrypticsGuide.pdf
        </a>
        , but note that every cryptic is different, and these guides are not
        canonical.
      </EditorsNote>
      <PuzzleList>
        <PuzzleRow>
          <Clue>Cannibalism acknowledged secret buffet (5).</Clue>
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgB} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Universal dropping Southern comedian (5).</Clue>
          <Droid src={imgD6} alt="R2-D2 with “D(6)” on its body" />
          <Droid src={imgE} alt="R2-D2 with the letter E on its body" />
          <Droid src={imgF} alt="R2-D2 with the letter F on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Hedberg might initially irritate (5).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgG} alt="R2-D2 with the letter G on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Marijuana butts eaten by horse eventually (7).</Clue>
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgH} alt="R2-D2 with the letter H on its body" />
          <Droid src={imgI} alt="R2-D2 with the letter I on its body" />
          <DroidDitto src={imgI} alt="R2-D2 with the letter I on its body" />
          <Droid src={imgD5} alt="R2-D2 with “D(5)” on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Following closer to the stern (5).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Even DJ Rookie is a fool (4).</Clue>
          <Droid src={imgJ} alt="R2-D2 with the letter J on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <DroidDitto src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <DroidDitto src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks>_____</Blanks>
          <Blanks>_____</Blanks>
          <Blanks>_____</Blanks>
          <Blanks>_______</Blanks>
          <Blanks>_____</Blanks>
          <Blanks>____</Blanks>
          <VCentered>(5)</VCentered>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgH} alt="R2-D2 with the letter H on its body" />
          <Droid src={imgL} alt="R2-D2 with the letter L on its body" />
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Warrior housed in Anjediva (4).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgB} alt="R2-D2 with the letter A on its body" />
          <DroidDitto src={imgB} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Survives using core samples primarily (2).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgM} alt="R2-D2 with the letter M on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgG} alt="R2-D2 with the letter G on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>One peach pit (1).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgM} alt="R2-D2 with the letter M on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Impotent authority, even elders, heart of issue (9).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgD5} alt="R2-D2 with “D(5)” on its body" />
          <Droid src={imgJ} alt="R2-D2 with the letter J on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgM} alt="R2-D2 with the letter M on its body" />
          <DroidDitto src={imgM} alt="R2-D2 with the letter M on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Break family cloth (6).</Clue>
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks>____</Blanks>
          <Blanks>__</Blanks>
          <Blanks>_</Blanks>
          <Blanks>_________</Blanks>
          <Blanks>______</Blanks>
          <VCentered>(6)</VCentered>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgE} alt="R2-D2 with the letter E on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Vacuum mangled capes (5).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Drunken revel follows returning art tourist (8).</Clue>
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgL} alt="R2-D2 with the letter L on its body" />
          <Droid src={imgO} alt="R2-D2 with the letter O on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Apostle gag changed profit to loss (4).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
          <Droid src={imgP} alt="R2-D2 with the letter P on its body" />
          <Droid src={imgF} alt="R2-D2 with the letter F on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgF} alt="R2-D2 with the letter F on its body" />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks>_____</Blanks>
          <Blanks>________</Blanks>
          <Blanks>____</Blanks>
          <VCentered>(9)</VCentered>
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgD6} alt="R2-D2 with “D(6)” on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Cry audibly for reception (4).</Clue>
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
          <Droid src={imgQ} alt="R2-D2 with the letter Q on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Not opposed to hiding in Scarif orbit (3).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgB} alt="R2-D2 with the letter A on its body" />
          <DroidDitto src={imgB} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <DroidDitto src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Show us involved in absurd claim (7).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgI} alt="R2-D2 with the letter I on its body" />
          <DroidDitto src={imgI} alt="R2-D2 with the letter I on its body" />
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Royal band turning somber ending into knight’s debut (4).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
          <Droid src={imgP} alt="R2-D2 with the letter P on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgH} alt="R2-D2 with the letter H on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgG} alt="R2-D2 with the letter G on its body" />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks>____</Blanks>
          <Blanks>___</Blanks>
          <Blanks>_______</Blanks>
          <Blanks>____</Blanks>
          <VCentered>(2)</VCentered>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Odd roomba reverting to machine (5).</Clue>
          <Droid src={imgJ} alt="R2-D2 with the letter J on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgO} alt="R2-D2 with the letter O on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Messed up escape, hemorrhaged (9).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgD5} alt="R2-D2 with “D(5)” on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Wireless radiator leaks messy tar (5).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgE} alt="R2-D2 with the letter E on its body" />
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Drop of wine enters exhausting trading (8).</Clue>
          <Droid src={imgG} alt="R2-D2 with the letter G on its body" />
          <DroidDitto src={imgG} alt="R2-D2 with the letter G on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgI} alt="R2-D2 with the letter I on its body" />
          <Droid src={imgD7} alt="R2-D2 with “D(7)” on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Match goal an upset (6).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Warning misheard in support (3).</Clue>
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
          <Droid src={imgQ} alt="R2-D2 with the letter Q on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <DroidDitto src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Ass in face online (7).</Clue>
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgI} alt="R2-D2 with the letter I on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks>_____</Blanks>
          <Blanks>_________</Blanks>
          <Blanks>_____</Blanks>
          <Blanks>________</Blanks>
          <Blanks>______</Blanks>
          <Blanks>___</Blanks>
          <Blanks>_______</Blanks>
          <VCentered>(5)</VCentered>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgP} alt="R2-D2 with the letter P on its body" />
          <Droid src={imgF} alt="R2-D2 with the letter F on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgF} alt="R2-D2 with the letter F on its body" />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Rattle in Audi’s turbocharger (7).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgB} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Paddle back without wife either (2).</Clue>
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgO} alt="R2-D2 with the letter O on its body" />
          <Droid src={imgE} alt="R2-D2 with the letter E on its body" />
          <Droid src={imgF} alt="R2-D2 with the letter F on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Finish queasy after dark ending (4).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgL} alt="R2-D2 with the letter L on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgH} alt="R2-D2 with the letter H on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Note sung for myself (2).</Clue>
          <Droid src={imgD2} alt="R2-D2 with “D(2)” on its body" />
          <Droid src={imgQ} alt="R2-D2 with the letter Q on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Evelyn collapses regularly (6).</Clue>
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks>_______</Blanks>
          <Blanks>__</Blanks>
          <Blanks>____</Blanks>
          <Blanks>__</Blanks>
          <Blanks>______</Blanks>
          <VCentered>(4)</VCentered>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <DroidDitto src={imgA} alt="R2-D2 with the letter A on its body" />
          <DroidDitto src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgJ} alt="R2-D2 with the letter J on its body" />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Researcher is after recalled cod (7).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
          <Droid src={imgO} alt="R2-D2 with the letter O on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>P.S.: Following retrospective yelp continues (5).</Clue>
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgL} alt="R2-D2 with the letter L on its body" />
          <Droid src={imgO} alt="R2-D2 with the letter O on its body" />
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Secret toll follows greeting (6).</Clue>
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
          <Droid src={imgD2} alt="R2-D2 with “D(2)” on its body" />
          <Droid src={imgL} alt="R2-D2 with the letter L on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Silly Lisp error (4).</Clue>
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks>_______</Blanks>
          <Blanks>_____</Blanks>
          <Blanks>______</Blanks>
          <Blanks>____</Blanks>
          <VCentered>(4)</VCentered>
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <DroidDitto src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgB} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRowGray>
        <Separator></Separator>
        <Separator></Separator>
        <PuzzleRowGray>
          <ClueBlanks>
            _____ ______ REDACTED _________ REDACTED REDACTED __ _____ REDACTED
            ____ REDACTED ____ REDACTED for answer
          </ClueBlanks>
          <Droid src={imgD3} alt="R2-D2 with “D(3)” on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgG} alt="R2-D2 with the letter G on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgG} alt="R2-D2 with the letter G on its body" />
          <Droid src={imgI} alt="R2-D2 with the letter I on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgM} alt="R2-D2 with the letter M on its body" />
          <Droid src={imgA} alt="R2-D2 with the letter A on its body" />
          <Droid src={imgN} alt="R2-D2 with the letter N on its body" />
          <Droid src={imgD4} alt="R2-D2 with “D(4)” on its body" />
          <Droid src={imgO} alt="R2-D2 with the letter O on its body" />
          <Droid src={imgK} alt="R2-D2 with the letter K on its body" />
          <Droid src={imgC} alt="R2-D2 with the letter C on its body" />
        </PuzzleRowGray>
      </PuzzleList>
    </>
  );
};

export default Puzzle;
