import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper } from "../../components/StyledUI";
import img01 from "./assets/img01.png";

const StanzaData = [
  `Love is a rose
    That’s budding and bluffing
    The stuff dreams are made of
    This flightless MacGuffin
    7/7/1941`,

  `Love for the wiseguy
    It’s funny somehow
    That three at the opera
    Ends with tragic pow pow
    10/9/1990`,

  `Love asks many questions
    But replies are amiss
    It isn’t illegal
    If the prez does this
    11/5/2008`,

  `Love it’s got rhythm
    And it’s here to stay
    It’s given carte blanche
    At a stellar partay
    8/5/1951`,

  `Love soars free in the yard
    With a Mozart duet
    Say it with chocolates
    Who knows what you’ll get
    9/7/1994`,

  `Love it is alien
    You’ll go blue in the face
    If allergic to prawns
    From outer space
    6/8/2009`,

  `Love drama in court
    Black that white did arraign
    “I am so thirsty”
    Mocked Homer’s refrain
    11/8/1962`,

  `Love might be senseless
    Its hopes would be dashed
    With a problem to love all
    To the moon and back
    11/6/1995`,

  `Love needs no words
    With pleasure sounds grand
    From plowing to fighting
    Saved from no man’s land
    6/5/2011`,

  `Love is so strange
    In no room for a fight
    Like a spoonful of sugar
    Makes you high as a kite
    11/7/1964`,

  `Love’s the king of the world
    Until it runs foul
    Of corruption that’s unearthed
    By the night owl
    7/12/1997`,

  `Love fights for freedom
    Jingle-jangling chains
    The search in the dark
    Is laden with claims
    9/6/2012`,

  `Love is a blaze
    Sky-high does it seethe
    I would smell the smoke
    But it smarts when I breathe 
    8/9/1974`,

  `Love at my signal
    Will unleash hell
    That’s found in the water
    By Wichita belle
    9/10/2000`,

  `Love for a hound
    If I can dream
    Of dog fighting with rooster
    In the jet stream
    5/8/2022`,

  `Love on the beach
    is running to tune
    Sunlight shines on the staff
    With a foot hewn
    8/7/1981`,

  `Love’s just a game
    The theory is told
    By songs in Montmartre
    With red sails to behold
    9/6/2001`,

  `Love just one man
    It’s enough I would ken
    His love for the bombshell
    Becomes Death in the end
    6/11/2023`,
];

const StanzaLine = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

const RightJustified = styled(StanzaLine)`
  text-align: right;
`;

export const StyledTD = styled.td`
  padding: 1rem;
`;

export const StanzaBlock = ({ stanza }: { stanza: string }): JSX.Element => {
  const lines = stanza.split("\n").map((line) => line.trim());
  return (
    <>
      {lines.slice(0, -1).map((line, index) => (
        <StanzaLine key={index}>{line}</StanzaLine>
      ))}
      <RightJustified>{lines[lines.length - 1]}</RightJustified>
    </>
  );
};

const StanzaTable = styled.table`
  display: flex;
  justify-content: center;
`;

const PuzzleGridCSV = `,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,, ,,,,,,, ,,,,,,,,,, ,,,, ,,,,,,,
,,,,,, ,,,,,,, ,,,,,,,,,, ,,,, ,,,,,,,
,,,,,, ,,,,,,, ,,,,,,,,,, ,,, , , , , , , , ,
,, , , , , , , , , , ,, ,,,,,,,,,, ,,,, ,,,,,,,
,,,,,, ,,,,,,, ,,,,,,,,,, ,,,, ,,,,,,,
,,,,,, ,,,,,,, ,,, , , , , , , , , ,,,,,,,,,,
,,,,,, ,,,,,,, ,,,,,,,,,, ,,,,,,,,,,,
,,,,,, ,,,,,,, ,,,,,,,,,, ,,,,,,,,,,,
,,,,,, ,,,,,,, ,,,,,,,,,, ,,,,,,,,,,,
,,,,,,,,,,,, , , , , ,,,, ,,, ,,,,,,,,,, ,
,,,,,,,,,,,,, ,,,,,,, ,,,,,,,,,,,,, ,
,,, ,,,,,,,,,,,,,,,,, ,,,,,,,,,,,,, ,
,,, ,,,,, ,,,,,,,,,,,, ,,, , , , , , , , , , , , 
,,, ,,,,, ,,,,,,, , , , , , , ,,,,,,,,,,,, ,
,,, ,, , , , , , , , , ,,,,,,, ,,,,,,,,,,,,, ,
,,, ,,,,, ,,,,,,, ,,,,, ,,,,, ,,,,,,,, ,
,,, ,,,,, ,,,,,,, ,,,,, ,,,,, ,,,,,,,,,
,,, ,,,,, ,,,,,,, ,,,,, ,,,,, ,,,,,,,,,
,,, ,,,,,,,, , , , , , ,,,,,,,,, ,,,,,,,,,
,,, ,,,,,,,,,,,, ,,, , , , , , , , , , , ,,,,,,
 , , , , , , , ,,,,,,,,,,,,,,,,,, ,,,,,,,,,
,,, ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,, ,,,,,,, ,,,,,,,,,,,,,,,,,,,,,,
,,,,, ,,,,,,, ,,,,,,,, ,,,,,,, ,,,,,,,
,,,,, ,,, , , , , , , , ,,,,, ,,,, , , , , , , , , ,,
,,,,, ,,,,,,, ,,,,,,,, ,,,,,,, ,,,,,,,
,,,,, ,,,,,,, ,,,,, , , , , , ,,,,, ,,,,,,,
,,,,, ,,,,,,, ,,,,,,,, ,,,,,,, ,,,,,,,
,,,,, ,,,,,,, ,,,,,,,, ,,,,,,, ,,,,,,,
,,, , , , , , , , ,,,,,,,,,, ,,,,,,,,,,,,,,
,,,,, ,,,,,,,,,,,,,,, ,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,, ,,,,,,,,,,,,,,,,,,,,
,,,,,, , , , , , , , , , , ,,,, ,,,,,,,,,,,,,,
,,,,,,,,,,,,,, ,,,,,, ,,,,,,,, ,,,,,,
,,,,,,,,,,,,,, ,,,, , , , , , , , ,,, ,,,,,,
,,,,,,, ,,,,,,, ,,,,,, ,,,,,,,, ,,,,,,
,,,,,,, ,,,,,,, ,,,,,, ,,,,,,,, ,,,,,,
,,,,,,, ,,,,,,, ,,,,,,,,,,,,,, ,,,,,,
 , , , , , , , , , , ,,,,,,,,,,,,,, , , , , , , ,,,,
,,,,,,, ,,,,,,,,,,,,,,,,,,,,, ,,,,,,
,,,,,,, ,,,,,,,,,,,,,,,,,,,,,,,,,,,`;

const PuzzleGridFill: string[][] = PuzzleGridCSV.split("\n").map((row) =>
  row.split(","),
);

const GridTD = styled.td`
  border: 1px solid black;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <LinkedImage
        alt="Many pairs of criss-crossing Oscar statues, with crossword-style boxes overlaid on them"
        src={img01}
        className={NO_COPY_CLASS}
      />
      <table className={COPY_ONLY_CLASS}>
        {PuzzleGridFill.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => {
              if (cell === " ") {
                return <GridTD key={cellIndex}>&nbsp;</GridTD>;
              } else {
                return <td key={cellIndex}></td>;
              }
            })}
          </tr>
        ))}
      </table>
      <HScrollTableWrapper>
        <StanzaTable>
          <tbody>
            {StanzaData.map((stanza, index) => {
              if (index % 3 === 0) {
                return (
                  <tr key={index}>
                    <StyledTD>
                      <StanzaBlock stanza={stanza} />
                    </StyledTD>
                    {
                      <StyledTD>
                        <StanzaBlock stanza={StanzaData[index + 1] ?? ""} />
                      </StyledTD>
                    }
                    {
                      <StyledTD>
                        <StanzaBlock stanza={StanzaData[index + 2] ?? ""} />
                      </StyledTD>
                    }
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </StanzaTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Puzzle;
