import React from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { PuzzleAnswer } from "../../components/StyledUI";

const Columns = styled.div`
  margin: 1em 0;
  font-family: "Roboto Mono", monospace;
`;

const PreformattedDiv = styled.div`
  white-space: pre;
`;

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1em;
`;

const HOUSE_EMPTY = [
  "......____......",
  ".....______..__.",
  "....________.__.",
  "...____________.",
  ".._____________.",
  ".______________.",
  "________________",
  "___..______..___",
  "___..__..__..___",
  "_______.._______",
  "_______.._______",
  "_______.._______",
].map((row) => row.split("").map((char) => (char === "_" ? "" : char)));

const HOUSE_KEY_EMPTY = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const HOUSE_KEY = [
  "7",
  "6",
  "13",
  "14",
  "8",
  "0",
  "4",
  "11",
  "1",
  "2",
  "9",
  "5",
  "10",
  "15",
  "12",
  "3",
];

const HOUSE_1 = [
  "......ISTA......",
  ".....RTEDCL..EA.",
  "....RINGOUTT.HE.",
  "...HERBGARDENTO.",
  "..DAYTHEMINTHAD.",
  ".GOTTENREALLYOU.",
  "TOFCONTROLANDTHE",
  "ROS..EMARYW..ASA",
  "LMO..ST..DE..ADB",
  "UTTHETH..YMEISDO",
  "INGWELL..IMUSTBU",
  "YSOMESA..GENEXTX",
].map((row) => row.split("").map((char) => (char === "_" ? "" : char)));

const HOUSE_2 = [
  "......THER......",
  ".....OSEGAR..DE.",
  "....NISSTART.IN.",
  "...GTOLOOKREALL.",
  "..YWONDERFULAST.",
  ".HEROSESAREINFU.",
  "LLBLOOMANDTHESCE",
  "NTO..FTHEMW..AFT",
  "SDO..WN..TH..EPA",
  "THTOTHE..KITCHEN",
  "GARDENW..HEREITE",
  "NDTHECA..RROTSXX",
].map((row) => row.split("").map((char) => (char === "_" ? "" : char)));

const HOUSE_3 = [
  "......FINA......",
  ".....LLYMAK..IN.",
  "....GSOMEPRO.GR.",
  "...ESSINTHEORCH.",
  "..ARDBEYONDTHEW.",
  ".ALLEDCOURTYARD.",
  "THEPEARTREESAREF",
  "RUI..TINGFO..RTH",
  "EFI..RS..TT..IME",
  "ANDTHEC..RABAPPL",
  "EIPUTIN..LASTYEA",
  "RISTHRI..VINGXXX",
].map((row) => row.split("").map((char) => (char === "_" ? "" : char)));

const HOUSE_4 = [
  "......TRAN......",
  ".....SFORMA..KE.",
  "....YPHRASEI.NT.",
  "...OAPERMUTATIO.",
  "..NBYNUMBERINGT.",
  ".HELETTERSINALP.",
  "HABETICALORDERAN",
  "DIF..THEREI..SMO",
  "RET..HA..NO..NEI",
  "NSTANCE..OFTHESA",
  "MELETTE..RFROMLE",
  "FTTORIG..HTXXXXX",
].map((row) => row.split("").map((char) => (char === "_" ? "" : char)));

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is based on solving irregular columnar transposition
        ciphers. The puzzle consists of three plaintext messages and four
        encrypted messages.
      </p>
      <p>
        Three of the encrypted messages are anagrams of the three plaintext
        messages and have exactly the same letter frequency counts. The
        flavourtext leads us to consider columnar transposition ciphers, which
        are a common type of structured anagram.
      </p>
      <p>
        However, the messages are 141 letters long, which is not a favourable
        number for a regular box. We’ll need to work out the structure of the
        transposition from first principles.
      </p>
      <p>
        A good place to start is the end of the plaintext messages, where the
        last three characters are XTX, SXX, XXX.
      </p>
      <p>
        In the encrypted messages, the final letter in each is X, S, X, so that
        must correspond to the third to last position of the plaintext.
        Similarly the other final letters in the plaintext are at positions 115
        and 37 in the encrypted messages.
      </p>
      <p>
        Letters that are next to each other in the ciphertext are in the same
        column in the transposition grid, so we can start to construct this by
        taking short snippets of the cipher that immediately precede the
        positions we’ve found:
      </p>
      <Columns>
        <PreformattedDiv>
          THE{"   "}SCE{"   "}REF
        </PreformattedDiv>
        <PreformattedDiv>
          ASA{"   "}AFT{"   "}RTH
        </PreformattedDiv>
        <PreformattedDiv>
          ADB{"   "}EPA{"   "}IME
        </PreformattedDiv>
        <PreformattedDiv>
          SDO{"   "}HEN{"   "}PPL
        </PreformattedDiv>
        <PreformattedDiv>
          TBU{"   "}ITE{"   "}YEA
        </PreformattedDiv>
        <PreformattedDiv>
          XTX{"   "}SXX{"   "}XXX
        </PreformattedDiv>
      </Columns>
      <p>
        At this point we might notice that we have sections of words from
        earlier in the messages appearing, for example the end of KITCHEN in
        message 2, and the middle of CRABAPPLE in message 3. Now we can iterate,
        finding those positions in the ciphertext and building out the
        transposition grid as we go.
      </p>
      <p>
        The twist is that this isn’t a regular shape, and we realise that some
        squares in the grid aren’t used. The final grid shape looks like this:
      </p>
      <StyledCrossword labels={HOUSE_EMPTY} labelsForEmptyCopy={null} />
      <p>Which is a picture of a house.</p>
      <p>
        We also have the key: the permutation to use to read out the columns:
        [7, 6, 13, 14, 8, 0, 4, 11, 1, 2, 9, 5, 10, 15, 12, 3]
      </p>
      <p>
        Now we can decrypt the final message, where we didn’t have the plaintext
        version. It says:
      </p>
      <p>
        <i>
          Transform a key phrase into a permutation by numbering the letters in
          alphabetical order and if there is more than one instance of the same
          letter from left to right xxxxx
        </i>
      </p>
      <p>
        This suggests that we need to reverse this process to recover the key
        phrase used to create the permutation.
      </p>
      <p>
        We might suppose that HOUSE is contained in the phrase, and that the end
        of the permutation is the most likely place for it to go considering the
        numerical values. Once that is placed we can fill in the final letters
        with a bit of trial and error to give the answer:{" "}
        <PuzzleAnswer>LITTLE GREEN HOUSE</PuzzleAnswer>.
      </p>
      <p>
        Technically the house shape is recoverable with just one
        plain/ciphertext pair, but three were included to make it easier to get
        started. Well done if you solved it with just one, though!
      </p>
      <h3>Full solution</h3>
      <StyledCrossword
        labels={[HOUSE_KEY_EMPTY, ...HOUSE_EMPTY]}
        fill={[HOUSE_KEY, ...HOUSE_1]}
        labelsForEmptyCopy={null}
      />
      <StyledCrossword
        labels={[HOUSE_KEY_EMPTY, ...HOUSE_EMPTY]}
        fill={[HOUSE_KEY, ...HOUSE_2]}
        labelsForEmptyCopy={null}
      />
      <StyledCrossword
        labels={[HOUSE_KEY_EMPTY, ...HOUSE_EMPTY]}
        fill={[HOUSE_KEY, ...HOUSE_3]}
        labelsForEmptyCopy={null}
      />
      <p>Final message:</p>
      <StyledCrossword
        labels={[HOUSE_KEY_EMPTY, ...HOUSE_EMPTY]}
        fill={[HOUSE_KEY, ...HOUSE_4]}
        labelsForEmptyCopy={null}
      />
      <StyledCrossword
        labels={[HOUSE_KEY_EMPTY, HOUSE_KEY_EMPTY]}
        fill={[
          "LITTLEGREENHOUSE".split(""),
          [
            "7",
            "6",
            "13",
            "14",
            "8",
            "0",
            "4",
            "11",
            "1",
            "2",
            "9",
            "5",
            "10",
            "15",
            "12",
            "3",
          ],
        ]}
        labelsForEmptyCopy={null}
      />
    </>
  );
};

export default Solution;
