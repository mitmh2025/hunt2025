import React from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
  border-spacing: 0;
  border-collapse: collapse;
  margin-right: auto;
  th,
  td {
    padding: 6px;
    border: 1px solid var(--black);
    vertical-align: top;
  }
  th {
    position: sticky;
    top: 0px;
    background-color: inherit;
  }
`;

const LetterTableElement = styled(StyledTable)`
  td {
    width: 266px;
  }
`;

const AnswerTable = styled(StyledTable)`
  tr {
    height: 21px;
  }
  td {
    width: 120px;
  }
`;

const GreenData = styled.td`
  background-color: #b6d7a8;
`;

const GrayData = styled.td`
  background-color: #d9d9d9;
`;

const LETTER_TABLE_DATA = [
  [
    "A",
    "Literal: This word appears literally in the output, or it is a literal input to some other function.",
  ],
  [
    "B",
    "Word hidden in clue: Indicates that an answer is hiding in plain sight, perhaps spanning multiple words in the clue.",
  ],
  ["C", "Definition: The definition part of the clue"],
  [
    "D",
    "Synonym: This word should be replaced with a synonym, whose length is given in parentheses.",
  ],
  [
    "E",
    "Delete specific string: Remove some specific letter or string from another word.",
  ],
  [
    "F",
    "Abbreviation: This word should be replaced by its common abbreviation.",
  ],
  ["G", "First letter: Take the first letter of some other word."],
  [
    "H",
    "Last n letters: Take the last letter or letters of some other word(s)",
  ],
  [
    "I",
    "Insert A in B: Insert what comes before this word into what comes after.",
  ],
  ["J", "Even/odd letters: Take even or odd letters from a word or phrase."],
  ["K", "Filler / linker: This word helps link the wordplay and definition."],
  ["L", "A after B: Place the preceding string after the following string."],
  ["M", "Center letter: Take the center letter of some word."],
  ["N", "Anagram: Anagram a word or phrase."],
  ["O", "Reversal: Reverse some other word or phrase."],
  ["P", "Replace letter: Replace one letter in a word with another letter."],
  ["Q", "Homophone: Replace a word with a homophone."],
];

const LetterTable = () => {
  return (
    <HScrollTableWrapper>
      <LetterTableElement>
        <thead>
          <tr>
            <th>Letter</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {LETTER_TABLE_DATA.map((row) => {
            return (
              <tr key={row[0]}>
                <td>
                  <p>{row[0]}</p>
                </td>
                <td>
                  <p>{row[1]}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </LetterTableElement>
    </HScrollTableWrapper>
  );
};

// prettier-ignore
const REGULAR_ANSWER_TABLE_DATA = [
  ["Cannibalism acknowledged secret buffet",  "Literal",  "Literal",  "Word hidden in clue",  "Definition",  "",  "",  "",  "",  "SMACK"],
  ["Universal dropping Southern comedian",  "Synonym [cosmic]",  "Delete specific string",  "Abbreviation",  "Definition",  "",  "",  "",  "",  "COMIC"],
  ["Hedberg might initially irritate",  "Definition",  "Literal",  "First letter",  "Synonym [itch]",  "",  "",  "",  "",  "MITCH"],
  ["Marijuana butts eaten by horse eventually",  "Literal",  "Last N letters",  "Insert A in B",  "ditto",  "Synonym [filly]",  "Definition",  "",  "",  "FINALLY"],
  ["Following closer to the stern",  "Definition",  "Definition",  "ditto",  "ditto",  "ditto",  "",  "",  "",  "AFTER"],
  ["Even DJ Rookie is a fool",  "Even/Odd letters",  "Literal",  "ditto",  "Filler",  "ditto",  "Definition",  "",  "",  "JOKE"],
  [],
  ["Warrior housed in Anjediva",  "Definition",  "Word hidden in clue",  "ditto",  "Literal",  "",  "",  "",  "",  "JEDI"],
  ["Survives using core samples primarily",  "Definition",  "Literal",  "Center letter",  "Literal",  "First letter",  "",  "",  "",  "IS"],
  ["One peach pit",  "Definition",  "Literal",  "Center letter",  "",  "",  "",  "",  "",  "A"],
  ["Impotent authority, even elders, heart of issue",  "Definition",  "Synonym [power]",  "Even/Odd letters",  "Literal",  "Center letter",  "ditto",  "Literal",  "",  "POWERLESS"],
  ["Break family cloth",  "Synonym [nap]",  "Synonym [kin]",  "Definition",  "",  "",  "",  "",  "",  "NAPKIN"],
  [],
  ["Vacuum mangled capes",  "Definition",  "Anagram",  "Literal",  "",  "",  "",  "",  "",  "SPACE"],
  ["Drunken revel follows returning art tourist",  "Anagram",  "Literal",  "A after B",  "Reversal",  "Literal",  "Definition",  "",  "",  "TRAVELER"],
  ["Apostle gag changed profit to loss",  "Definition",  "Synonym [puke]",  "Replace letter",  "Abbreviation",  "Filler",  "Abbreviation",  "",  "",  "LUKE"],
  [],
  ["Cry audibly for reception",  "Synonym [bawl]",  "Homophone",  "Filler",  "Definition",  "",  "",  "",  "",  "BALL"],
  ["Not opposed to hiding in Scarif orbit",  "Definition",  "ditto",  "ditto",  "Word hidden in clue",  "ditto",  "Literal",  "ditto",  "",  "FOR"],
  ["Show us involved in absurd claim",  "Definition",  "Literal",  "Insert A in B",  "ditto",  "Anagram",  "Literal",  "",  "",  "MUSICAL"],
  ["Royal band turning somber ending into knight’s debut",  "Definition",  "Synonym [ring]",  "Replace letter",  "Literal",  "Last N letters",  "Filler",  "Literal",  "First letter",  "KING"],
  [],
  ["Odd roomba reverting to machine",  "Even/Odd letters",  "Literal",  "Reversal",  "Literal",  "Definition",  "",  "",  "",  "ROBOT"],
  ["Messed up escape, hemorrhaged",  "Definition",  "ditto",  "Synonym [scram]",  "Synonym [bled]",  "",  "",  "",  "",  "SCRAMBLED"],
  ["Wireless radiator leaks messy tar",  "Definition",  "Literal",  "Delete specific string",  "Anagram",  "Literal",  "",  "",  "",  "RADIO"],
  ["Drop of wine enters exhausting trading",  "First letter",  "ditto",  "Literal",  "Insert A in B",  "Synonym [sapping]",  "Definition",  "",  "",  "SWAPPING"],
  ["Match goal an upset",  "Definition",  "Literal",  "Literal",  "Anagram",  "",  "",  "",  "",  "ANALOG"],
  ["Warning misheard in support",  "Synonym [fore]",  "Homophone",  "Definition",  "ditto",  "",  "",  "",  "",  "FOR"],
  ["Ass in face online",  "Synonym [git]",  "Insert A in B",  "Synonym [dial]",  "Definition",  "",  "",  "",  "",  "DIGITAL"],
  [],
  ["Rattle in Audi’s turbocharger",  "Definition",  "Word hidden in clue",  "Literal",  "Literal",  "",  "",  "",  "",  "DISTURB"],
  ["Paddle back without wife either",  "Synonym [row]",  "Reversal",  "Delete specific string",  "Abbreviation",  "Definition",  "",  "",  "",  "OR"],
  ["Finish queasy after dark ending",  "Definition",  "Synonym [ill]",  "A after B",  "Literal",  "Last N letters",  "",  "",  "",  "KILL"],
  ["Note sung for myself",  "Synonym [mi]",  "Homophone",  "Filler",  "Definition",  "",  "",  "",  "",  "ME"],
  ["Evelyn collapses regularly",  "Literal",  "Anagram",  "Definition",  "",  "",  "",  "",  "",  "EVENLY"],
  [],
  ["Researcher is after recalled cod",  "Definition",  "Filler",  "Synonym [post]",  "Reversal",  "Literal",  "",  "",  "",  "POSTDOC"],
  ["P.S.: Following retrospective yelp continues",  "Literal",  "A after B",  "Reversal",  "Synonym [eek]",  "Definition",  "",  "",  "",  "KEEPS"],
  ["Secret toll follows greeting",  "Definition",  "Synonym [ding]",  "A after B",  "Synonym [hi]",  "",  "",  "",  "",  "HIDING"],
  ["Silly Lisp error",  "Anagram",  "Literal",  "Definition",  "",  "",  "",  "",  "",  "SLIP"],
];

const GREY_BOX_ANSWER_TABLE_DATA = [
  ["SMACK", "Definition", "PUNCH"],
  ["COMIC", "Literal", ""],
  ["MITCH", "Literal", ""],
  ["FINALLY", "Last N letters", ""],
  ["AFTER", "A after B", ""],
  ["JOKE", "Synonym [pun]", ""],
  [],
  ["JEDI", "Definition", "ANAKIN"],
  ["IS", "Filler", ""],
  ["A", "Literal", ""],
  ["POWERLESS", "Delete specific string", ""],
  ["NAPKIN", "Literal", ""],
  [],
  ["SPACE", "Synonym [sky]", "SKYWALKER"],
  ["TRAVELER", "Synonym [walker]", ""],
  ["LUKE", "Definition", ""],
  [],
  ["BALL", "Definition", "BB"],
  ["FOR", "Filler", ""],
  ["MUSICAL", "Definition", ""],
  ["KING", "ditto", ""],
  [],
  ["ROBOT", "Definition", "DROID"],
  ["SCRAMBLED", "Anagram", ""],
  ["RADIO", "Literal", ""],
  ["SWAPPING", "Replace letter", ""],
  ["ANALOG", "Abbreviation", ""],
  ["FOR", "Filler", ""],
  ["DIGITAL", "Abbreviation", ""],
  [],
  ["DISTURB", "Definition", "RILE"],
  ["OR", "Literal", ""],
  ["KILL", "ditto", ""],
  ["ME", "ditto", ""],
  ["EVENLY", "Even/Odd letters", ""],
  [],
  ["POSTDOC", "Literal", "DOCK"],
  ["KEEPS", "ditto", ""],
  ["HIDING", "Word hidden in clue", ""],
  ["SLIP", "Definition", ""],
];

const ScrollableAnswersTable = ({ data }: { data: string[][] }) => {
  return (
    <HScrollTableWrapper>
      <AnswerTable>
        <thead>
          <tr>
            <th>Clue</th>
            <th colSpan={(data[0]?.length ?? 3) - 2}>Functions</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            if (row.length === 0) {
              return (
                <tr key={i}>
                  {data[0]?.map((_item, j) => {
                    return (
                      <GrayData key={`${i}-${j}`}>
                        <p />
                      </GrayData>
                    );
                  })}
                </tr>
              );
            } else {
              return (
                <tr key={i}>
                  {row.map((item, j) => {
                    return (
                      <GreenData key={`${i}-${j}`}>
                        <p>{item}</p>
                      </GreenData>
                    );
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </AnswerTable>
    </HScrollTableWrapper>
  );
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This is a puzzle about cryptic crosswords, with the “decryption” droids
        helping to indicate how each word in a given clue functions. There is
        exactly one droid per word in the clue, but the identities of the droids
        are obscured, and solvers must figure them out as they solve individual
        clues. The complete list of droid functions can be seen here:
      </p>
      <LetterTable />
      <p>
        Droids which indicate a multi-word phrase all performing the same
        function are squashed together slightly, e.g. “housed in” which consists
        of two words both indicating “Insert A in B”.
      </p>
      <p>
        Below each set of normal clues is a single clue highlighted in gray
        whose words are all blanks. The lengths of those blanks match the
        enumerations of the preceding clues, suggesting that the answers to
        those clues need to be inserted. The inserted words, along with one more
        row of droids, produce a new cryptic crossword clue to be solved.
      </p>
      <p>
        When all of the gray boxed clues are solved, solvers may notice that
        their answer enumerations match the lengths of the blanks in the very
        last clue at the end. This final clue is a bit special: Some of the
        words are blanks, and some are just REDACTED. The droid functions are
        given as usual, and the “definition” part of the clue is simply
        “answer”.
      </p>
      <p>
        By this point solvers will need to have uncovered all of the droid
        functions. Droids such as the anagram indicator always perform the same
        operation regardless of the corresponding word in the clue, so the words
        associated with these droids are REDACTED.
      </p>
      <p>The final clue, annotated with its functions, is:</p>
      <p>
        PUNCH [synonym] ANAKIN [first letter] SKYWALKER [first letter] [insert
        into] BB DROID [center letter of] RILE [anagram] DOCK [synonym]
        [reverse] for [linker] answer [definition].
      </p>
      <p>
        A synonym of PUNCH is JAB. The first letters of ANAKIN and SKYWALKER are
        AS, so inserting them into BB gives BASB. The center letter of DROID is
        O. Anagramming RILE gives ILER. A synonym of DOCK is MOOR, which when
        reversed gives ROOM. Assembling these pieces gives{" "}
        <PuzzleAnswer>JABBAS BOILER ROOM</PuzzleAnswer>, which is the answer.
      </p>
      <p>The complete set of regular clues, functions and answers are:</p>
      <ScrollableAnswersTable data={REGULAR_ANSWER_TABLE_DATA} />
      <p>The gray boxed clues, functions, and answers are:</p>
      <ScrollableAnswersTable data={GREY_BOX_ANSWER_TABLE_DATA} />
    </>
  );
};

export default Solution;
