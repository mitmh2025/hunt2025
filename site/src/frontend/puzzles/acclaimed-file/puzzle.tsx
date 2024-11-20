import React from "react";
import { styled } from "styled-components";

const MAGIC_I = `
A  TYPI  CAL            A  TYPI  CAL
STEREO  GRAM            STEREO  GRAM
OFTEN   CALL            OFTEN  CALL 
ED  A  MAGIC            ED  A  MAGIC
EYE US UALLY            EYE US UALLY
COM PRISES A            COM PRISES A
REPEAT  IN G            REPEAT IN  G
IMA GE  MADE            IMA GE  MADE
TO  LOOK  LI            TO LOOK   LI
KE  A     3D            KE A      3D
SCENE  USING            SCENE  USING
A  LITTLE  S            A LITTLE   S
HIFT TO MAKE            HIFT TO MAKE
A PATCH APPE            A PATCH APPE
AR  CLOSER O            AR CLOSER  O
R    FARTHER            R    FARTHER
FROM THE VIE            FROM THE VIE
WER BUT THER            WER BUT THER
E ARE  OTHER            E ARE  OTHER
TYPES  FOR E            TYPES FOR  E
XAMPLE A TEX            XAMPLE A TEX
T STEREOGRAM            T STEREOGRAM
MIGHT HIGHLI            MIGHT HIGHLI
GHT  PART OF            GHT PART  OF
A  PARAGRAPH            A  PARAGRAPH
OR A  LETTER            OR A  LETTER
OR  TWO  USI            OR TWO   USI
NG THE ILLUS            NG THE ILLUS
ION OF DEPTH            ION OF DEPTH
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Mono = styled.div`
  font-family: monospace;
  white-space: pre;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <FlexWrapper>
        <Mono>{MAGIC_I}</Mono>
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
