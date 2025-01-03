import React from "react";
import { styled } from "styled-components";
import { CourierFont } from "../../assets/SharedFonts";
import { CopyableBlanks } from "../../components/Blanks";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import { AuthorsNote } from "../../components/PuzzleLayout";
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
  overflow: auto;
`;

const PuzzleRowGray = styled(PuzzleRow)`
  background-color: #ddd;
  padding: 20px;
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
  font-family: Courier, monospace;
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
  font-family: Courier, monospace;
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

const CopyTable = ({ fill }: { fill: string[] }): JSX.Element => {
  return (
    <table className={COPY_ONLY_CLASS}>
      <tr>
        {fill.map((cell, i) => (
          <td key={i}>{cell}</td>
        ))}
      </tr>
    </table>
  );
};

const Puzzle = () => {
  return (
    <>
      <CourierFont />
      <p className="puzzle-flavor">
        We’ve received these cryptic messages from our rebel spies. Fortunately,
        our decryption droids are lined up to assist.
      </p>
      <AuthorsNote>
        These are cryptic crossword clues, a common type in puzzlehunts
        involving both crossword definitions and wordplay. If you’ve never seen
        them before, check out these guides to cryptic crosswords from{" "}
        <a href="https://s.wsj.net/blogs/html/wsjcrypticguide.pdf">
          The Wall Street Journal
        </a>{" "}
        or{" "}
        <a href="https://www.puzzledpint.com/files/3613/8170/3749/CrypticsGuide.pdf">
          Puzzled Pint
        </a>
        , but note that every cryptic is different, and these guides are not
        canonical.
      </AuthorsNote>
      <PuzzleList>
        <PuzzleRow>
          <Clue>Cannibalism acknowledged secret buffet (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgB}
            alt="R2-D2 with the letter B on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["A", "A", "B", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Universal dropping Southern comedian (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD6}
            alt="R2-D2 with “D(6)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgE}
            alt="R2-D2 with the letter E on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgF}
            alt="R2-D2 with the letter F on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(6)", "E", "F", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Hedberg might initially irritate (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgG}
            alt="R2-D2 with the letter G on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <CopyTable fill={["C", "A", "G", "D(4)"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Marijuana butts eaten by horse eventually (7).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgH}
            alt="R2-D2 with the letter H on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgI}
            alt="R2-D2 with the letter I on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgI}
            alt="R2-D2 with the letter I on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD5}
            alt="R2-D2 with “D(5)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["A", "H", "II", "D(5)", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Following closer to the stern (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["C", "CCCC"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Even DJ Rookie is a fool (4).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgJ}
            alt="R2-D2 with the letter J on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["J", "AA", "KK", "C"]} />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>_______</Blanks>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>____</Blanks>
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"_______".split("")} />
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"____".split("")} />
          <VCentered>(5).</VCentered>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgH}
            alt="R2-D2 with the letter H on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgL}
            alt="R2-D2 with the letter L on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <CopyTable fill={["C", "A", "A", "H", "L", "D(3)"]} />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Warrior housed in Anjediva (4).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgB}
            alt="R2-D2 with the letter B on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgB}
            alt="R2-D2 with the letter B on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "BB", "A"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Survives using core samples primarily (2).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgM}
            alt="R2-D2 with the letter M on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgG}
            alt="R2-D2 with the letter G on its body"
          />
          <CopyTable fill={["C", "A", "M", "A", "G"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>One peach pit (1).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgM}
            alt="R2-D2 with the letter M on its body"
          />
          <CopyTable fill={["C", "A", "M"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Impotent authority, even elders, heart of issue (9).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD5}
            alt="R2-D2 with “D(5)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgJ}
            alt="R2-D2 with the letter J on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgM}
            alt="R2-D2 with the letter M on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgM}
            alt="R2-D2 with the letter M on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "D(5)", "J", "A", "MM", "A"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Break family cloth (6).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(3)", "D(3)", "C"]} />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks className={NO_COPY_CLASS}>____</Blanks>
          <Blanks className={NO_COPY_CLASS}>__</Blanks>
          <Blanks className={NO_COPY_CLASS}>_</Blanks>
          <Blanks className={NO_COPY_CLASS}>_________</Blanks>
          <Blanks className={NO_COPY_CLASS}>______</Blanks>
          <CopyableBlanks structure={"____".split("")} />
          <CopyableBlanks structure={"__".split("")} />
          <CopyableBlanks structure={"_".split("")} />
          <CopyableBlanks structure={"_________".split("")} />
          <CopyableBlanks structure={"______".split("")} />
          <VCentered>(6).</VCentered>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgE}
            alt="R2-D2 with the letter E on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "K", "A", "E", "A"]} />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Vacuum mangled capes (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "N", "A"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Drunken revel follows returning art tourist (8).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgL}
            alt="R2-D2 with the letter L on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgO}
            alt="R2-D2 with the letter O on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["N", "A", "L", "O", "A", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Apostle gag changed profit to loss (4).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgP}
            alt="R2-D2 with the letter P on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgF}
            alt="R2-D2 with the letter F on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgF}
            alt="R2-D2 with the letter F on its body"
          />
          <CopyTable fill={["C", "D(4)", "P", "F", "K", "F"]} />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>________</Blanks>
          <Blanks className={NO_COPY_CLASS}>____</Blanks>
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"________".split("")} />
          <CopyableBlanks structure={"____".split("")} />
          <VCentered>(9).</VCentered>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD6}
            alt="R2-D2 with “D(6)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(3)", "D(6)", "C"]} />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Cry audibly for reception (4).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgQ}
            alt="R2-D2 with the letter Q on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(4)", "Q", "K", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Not opposed to hiding in Scarif orbit (3).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgB}
            alt="R2-D2 with the letter B on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgB}
            alt="R2-D2 with the letter B on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["CCC", "BB", "AA"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Show us involved in absurd claim (7).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgI}
            alt="R2-D2 with the letter I on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgI}
            alt="R2-D2 with the letter I on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "A", "II", "N", "A"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Royal band turning somber ending into knight’s debut (4).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgP}
            alt="R2-D2 with the letter P on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgH}
            alt="R2-D2 with the letter H on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgG}
            alt="R2-D2 with the letter G on its body"
          />
          <CopyTable fill={["C", "D(4)", "P", "A", "H", "K", "A", "G"]} />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks className={NO_COPY_CLASS}>____</Blanks>
          <Blanks className={NO_COPY_CLASS}>___</Blanks>
          <Blanks className={NO_COPY_CLASS}>_______</Blanks>
          <Blanks className={NO_COPY_CLASS}>____</Blanks>
          <CopyableBlanks structure={"____".split("")} />
          <CopyableBlanks structure={"___".split("")} />
          <CopyableBlanks structure={"_______".split("")} />
          <CopyableBlanks structure={"____".split("")} />
          <VCentered>(2).</VCentered>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["C", "K", "CC"]} />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Odd roomba reverting to machine (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgJ}
            alt="R2-D2 with the letter J on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgO}
            alt="R2-D2 with the letter O on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["J", "A", "O", "A", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Messed up escape, hemorrhaged (9).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD5}
            alt="R2-D2 with “D(5)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <CopyTable fill={["CC", "D(5)", "D(4)"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Wireless radiator leaks messy tar (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgE}
            alt="R2-D2 with the letter E on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "A", "E", "N", "A"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Drop of wine enters exhausting trading (8).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgG}
            alt="R2-D2 with the letter G on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgG}
            alt="R2-D2 with the letter G on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgI}
            alt="R2-D2 with the letter I on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD7}
            alt="R2-D2 with “D(7)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["GG", "A", "I", "D(7)", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Match goal an upset (6).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <CopyTable fill={["C", "A", "A", "N"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Warning misheard in support (3).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgQ}
            alt="R2-D2 with the letter Q on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(4)", "Q", "CC"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Ass in face online (7).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgI}
            alt="R2-D2 with the letter I on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(3)", "I", "D(4)", "C"]} />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>_________</Blanks>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>________</Blanks>
          <Blanks className={NO_COPY_CLASS}>______</Blanks>
          <Blanks className={NO_COPY_CLASS}>___</Blanks>
          <Blanks className={NO_COPY_CLASS}>_______</Blanks>
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"_________".split("")} />
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"________".split("")} />
          <CopyableBlanks structure={"______".split("")} />
          <CopyableBlanks structure={"___".split("")} />
          <CopyableBlanks structure={"_______".split("")} />
          <VCentered>(5).</VCentered>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgP}
            alt="R2-D2 with the letter P on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgF}
            alt="R2-D2 with the letter F on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgF}
            alt="R2-D2 with the letter F on its body"
          />
          <CopyTable fill={["C", "N", "A", "P", "F", "K"]} />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Rattle in Audi’s turbocharger (7).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgB}
            alt="R2-D2 with the letter B on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "B", "A", "A"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Paddle back without wife either (2).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgO}
            alt="R2-D2 with the letter O on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgE}
            alt="R2-D2 with the letter E on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgF}
            alt="R2-D2 with the letter F on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(3)", "O", "E", "F", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Finish queasy after dark ending (4).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgL}
            alt="R2-D2 with the letter L on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgH}
            alt="R2-D2 with the letter H on its body"
          />
          <CopyTable fill={["C", "D(3)", "L", "A", "H"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Note sung for myself (2).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgD2}
            alt="R2-D2 with “D(2)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgQ}
            alt="R2-D2 with the letter Q on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["D(2)", "Q", "K", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Evelyn collapses regularly (6).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["A", "N", "C"]} />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks className={NO_COPY_CLASS}>_______</Blanks>
          <Blanks className={NO_COPY_CLASS}>__</Blanks>
          <Blanks className={NO_COPY_CLASS}>____</Blanks>
          <Blanks className={NO_COPY_CLASS}>__</Blanks>
          <Blanks className={NO_COPY_CLASS}>______</Blanks>
          <CopyableBlanks structure={"_______".split("")} />
          <CopyableBlanks structure={"__".split("")} />
          <CopyableBlanks structure={"____".split("")} />
          <CopyableBlanks structure={"__".split("")} />
          <CopyableBlanks structure={"______".split("")} />
          <VCentered>(4).</VCentered>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgJ}
            alt="R2-D2 with the letter J on its body"
          />
          <CopyTable fill={["C", "AAA", "J"]} />
        </PuzzleRowGray>
        <Separator></Separator>
        <PuzzleRow>
          <Clue>Researcher is after recalled cod (7).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgO}
            alt="R2-D2 with the letter O on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <CopyTable fill={["C", "K", "D(4)", "O", "A"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>P.S.: Following retrospective yelp continues (5).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgL}
            alt="R2-D2 with the letter L on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgO}
            alt="R2-D2 with the letter O on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["A", "L", "O", "D(3)", "C"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Secret toll follows greeting (6).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD2}
            alt="R2-D2 with “D(2)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgL}
            alt="R2-D2 with the letter L on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <CopyTable fill={["C", "D(2)", "L", "D(4)"]} />
        </PuzzleRow>
        <PuzzleRow>
          <Clue>Silly Lisp error (4).</Clue>
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["N", "A", "C"]} />
        </PuzzleRow>
        <PuzzleRowGray>
          <Blanks className={NO_COPY_CLASS}>_______</Blanks>
          <Blanks className={NO_COPY_CLASS}>_____</Blanks>
          <Blanks className={NO_COPY_CLASS}>______</Blanks>
          <Blanks className={NO_COPY_CLASS}>____</Blanks>
          <CopyableBlanks structure={"_______".split("")} />
          <CopyableBlanks structure={"_____".split("")} />
          <CopyableBlanks structure={"______".split("")} />
          <CopyableBlanks structure={"____".split("")} />
          <VCentered>(4).</VCentered>
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <DroidDitto
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgB}
            alt="R2-D2 with the letter B on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable fill={["AA", "B", "C"]} />
        </PuzzleRowGray>
        <Separator></Separator>
        <Separator></Separator>
        <PuzzleRowGray>
          <ClueBlanks className={NO_COPY_CLASS}>
            _____ ______ REDACTED _________ REDACTED REDACTED __ _____ REDACTED
            ____ REDACTED ____ REDACTED for answer.
          </ClueBlanks>
          <CopyableBlanks
            structure={"_____ ______ REDACTED _________ REDACTED REDACTED __ _____ REDACTED ____ REDACTED ____ REDACTED for answer."
              .split("")
              .map((char) => (char === "_" ? char : " "))}
            fill={"_____ ______ REDACTED _________ REDACTED REDACTED __ _____ REDACTED ____ REDACTED ____ REDACTED for answer."
              .split("")
              .map((char) => (char === "_" ? " " : char))}
            fillCopyPosition="above"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD3}
            alt="R2-D2 with “D(3)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgG}
            alt="R2-D2 with the letter G on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgG}
            alt="R2-D2 with the letter G on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgI}
            alt="R2-D2 with the letter I on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgM}
            alt="R2-D2 with the letter M on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgA}
            alt="R2-D2 with the letter A on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgN}
            alt="R2-D2 with the letter N on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgD4}
            alt="R2-D2 with “D(4)” on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgO}
            alt="R2-D2 with the letter O on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgK}
            alt="R2-D2 with the letter K on its body"
          />
          <Droid
            className={NO_COPY_CLASS}
            src={imgC}
            alt="R2-D2 with the letter C on its body"
          />
          <CopyTable
            fill={[
              "D(3)",
              "A",
              "G",
              "A",
              "G",
              "I",
              "A",
              "A",
              "M",
              "A",
              "N",
              "D(4)",
              "O",
              "K",
              "C",
            ]}
          />
        </PuzzleRowGray>
      </PuzzleList>
    </>
  );
};

export default Puzzle;
