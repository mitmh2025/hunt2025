import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { ROUNDS } from "./puzzle-components/Spoilers";

const EXTRACTION_TABLE: [string, string, string, string][] = [
  ["Comma", "ANBERSANND", "AMPERSAND (9)", "AND (3)"],
  ["Semicolon", "JNTLMIN", "GENTLEMAN (9)", "SIR (3)"],
  ["Colon", "KAMPURR", "CAMPER (6)", "VAN (3)"],
  ["Question Mark", "KEESH", "QUICHE (6)", "PIE (3)"],
  ["Exclamation Mark", "FYOOREE", "FURY (4)", "IRE (3)"],
  ["Apostrophe", "BLOSM", "BLOSSOM (7)", "BUD (3)"],
  ["Period", "SODD", "SOD (3)", "TURF (4)"],
  ["Hyphen", "PHIB", "FIB (3)", "LIE (3)"],
];

const StyledTable = styled.table`
  margin-bottom: 1em;
`;

const Subheader = styled.td`
  text-align: center;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle is presented on an interactive webpage, presenting the annual
        Massachusetts State Spelling Bee, being overseen by judges Merriam,
        Webster and Dexter. Words are grouped into rounds themed around
        punctuation and are unlocked one-by-one by spelling all words in a round
        correctly. Solvers can proceed straightforwardly, spelling the prompted
        words correctly. Submitting the correct spelling outputs a checkmark and
        colors the answer green, and submitting incorrectly outputs a cross,
        coloring the answer to emphasize where the solver was wrong (coloring
        the letters green from left-to-right, until it reaches the first
        incorrect letter, which is coloured red; the remaining letters are
        uncoloured). If a solver spells a word incorrectly, they must restart
        the round.
      </p>
      <p>
        Solving each round allows the solvers to progress onto the next.
        However, completing the spelling bee only presents a confirmation
        message stating one of the judges is “solty”. The only leading clue as
        to what must be done is hinted at in the “USE” audio, which uses the
        spelling words in a sentence. These sentences include a diverse, yet
        completely absurd list of statements about American history, religion
        and business. Key clues include “When I lived in Hampshire”, “my land in
        Newburyport”, “I will call my friend Bonaparte and George the Third”,
        “thirteen states”, and “I was born in 1747 January 22.”
      </p>
      <p>
        These clues indicate that the 3 judges are George Merriam, Noah Webster
        and Timothy Dexter, 3 notable historical figures who operated out of
        Massachusetts (at least partially in Webster’s case) and were all
        concurrently alive around the beginning of the 19th century. Merriam &
        Webster clue that the words must spelled according to the
        Merriam-Webster dictionary (of which the company is based out of
        Massachusetts), while the word definitions are directly adapted from the
        dictionary. Searching up judge Dexter, the puzzle title, the flavor and
        the deranged phrases reveals that the puzzle is based on{" "}
        <em>A Pickle for the Knowing Ones</em>, an autobiographical book written
        by disturbed and inept, yet incredibly successful 19th century
        businessman Timothy Dexter.
      </p>
      <p>
        The life of Dexter is worth looking into simply because of how
        completely absurd it is, but his autobiography provides a deep view into
        his pseudo-intellectual perspective on the world. The book is infamous
        for its horrendous spelling, grammar, punctuation, and choice of topic,
        with rambling paragraphs and nonsensical advice: “To mankind at Large
        the time is Com at Last the grat day of Regoising what is that why I
        will tell you thous three kings is Rased…”. A further example of this
        ridiculous composition is in the second edition of the book, where,
        after complaints of a lack of punctuation, he included an appendix:
        “fouder mister printer the Nowing ones complane of my book the fust
        edition had no stops I put in A Nuf here and thay may peper and solt it
        as they plese”, preceded by a block of assorted punctuation. A key
        observation is that “salt” here is spelled as “solt”, indicating that
        the previous flavor text describing a “solty” judge must be referring to
        Dexter.
      </p>
      <p>
        All the spelling bee words in the puzzle are words that are horribly
        misspelled in <em>A Pickle for the Knowing Ones</em>, with each
        associated sentence usage being an excerpt from the book (some words may
        have varying misspellings, so the sentences help disambiguate them). The
        flavor at the top of the puzzle suggests to use the fourth edition of
        the book (accessible via the Project Gutenberg website) since
        misspellings and excerpts vary between editions. By submitting the words
        into the spelling bee as misspelled by Dexter, solvers will be presented
        with alternate confirmation text, where, instead of a check or cross, a
        question mark is output, and the text remains uncoloured. Solving each
        round using these spellings presents solvers with an additional audio
        clip of Merriam and Webster, each speaking a number, e.g. (7 / 3). These
        clips are phrased as if Webster is correcting Merriam.
      </p>
      <p>
        Solving the entire spelling bee using only Dexter’s spellings results in
        a much more incredulous confirmation message, “Congratulations? You
        have…won the spelling bee? Judge Dexter applauds you, but the other
        judges’ notes are filled with red marks. Merriam doesn’t understand what
        he is hearing and Webster can’t find the right words.” Solvers must
        notice how the incorrect spelling formatting works (emphasizing the
        first incorrect letter in red) and manually apply it to the
        Dexter-spelling of each word (or alternatively, solvers may add an extra
        letter to the end of each misspelling to trick the webpage into
        highlighting the red letter).
      </p>
      <StyledTable>
        <tr>
          <th>Word</th>
          <th>Incorrect spelling</th>
          <th>
            Exerpt from <em>A Pickle</em>
          </th>
          <th>First incorrect letter</th>
        </tr>
        {ROUNDS.map(({ name, puzzles }, i) => (
          <React.Fragment key={i}>
            <tr>
              <Subheader colSpan={4}>
                <strong>{name}</strong>
              </Subheader>
            </tr>
            {puzzles.map(({ answerA, answerB, excerpt, extraction }, j) => (
              <tr key={j}>
                <td>{answerA}</td>
                <td>{answerB}</td>
                <td>{excerpt}</td>
                <td>{extraction}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </StyledTable>
      <p>
        Extracting the first misspelled letter of each word, solvers get a
        string of letters for each round: BLOSM, KAMPURR, ANBERSANND, FYOOREE,
        PHIB, SODD, KEESH, JNTLMIN. Each string of letters is associated with a
        corresponding enumeration given by Merriam and Webster. The final flavor
        text and the roles of each judge clues how to transform each string to
        fit these enumerations. First, solvers should identify that the strings
        are phonetically misspelled words, whose correct spelling matches the
        enumerations given by Merriam (the one who gives the word to be spelled
        correctly), who “doesn’t understand what he is hearing”. Next, each of
        these words can be substituted by a synonym, using the enumerations
        given by Webster (the one who gives the word meanings), who “can’t find
        the right words”. This word transformation mechanic is clued where
        Webster is “correcting” Merriam’s enumerations. The result of these
        transformations is a list of short words: BUD, VAN, AND, IRE, LIE, TURF,
        PIE, SIR.
      </p>
      <p>
        These words don’t appear to make any sense on their own, but given the
        theme of misspelling, and that these words are all monosyllabic, these
        words may need to be rearranged to form the answer. Solvers must notice
        that the 8 punctuation marks that each round is themed around match the
        punctuation marks in the block of punctuation at the end of the
        autobiography, clued by “solty” (see appendix). As the rounds are given
        in alphabetical order, solvers must re-order the rounds according to the
        book.
      </p>
      <StyledTable>
        <tr>
          <th>Round</th>
          <th>Extraction</th>
          <th>Correct Spelling</th>
          <th>Synonym</th>
        </tr>
        {EXTRACTION_TABLE.map(([round, extraction, spelling, synonym], i) => (
          <tr key={i}>
            <td>{round}</td>
            <td>{extraction}</td>
            <td>{spelling}</td>
            <td>{synonym}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Completing the entire spelling bee using Dexter’s spelling provides an
        alternate confirmation message, which provides an enumeration from
        Dexter. Since this enumeration is spoken by Dexter (the one who gives
        the usage of each misspelled word), this must be the enumeration for the
        final answer string, which should be read as if spelled horribly.
      </p>
      <p>
        AND SIR VAN PIE IRE BUD TURF LIE → <Mono>ANSWER</Mono>{" "}
        <PuzzleAnswer>VAMPIRE BUTTERFLY</PuzzleAnswer> (6 7 9)
      </p>
      <h3>
        Appendix: Punctuation excerpt from{" "}
        <em>A Pickle for the Knowing Ones</em>
      </h3>
      <p>
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
        <br />
        <Mono>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Mono>
      </p>
      <p>
        <Mono>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;</Mono>
        <br />
        <Mono>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;</Mono>
        <br />
        <Mono>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;</Mono>
        <br />
        <Mono>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;</Mono>
        <br />
        <Mono>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;</Mono>
      </p>
      <p>
        <Mono>::::::::::::::::::::::::::::::::::::::</Mono>
        <br />
        <Mono>::::::::::::::::::::::::::::::::::::::</Mono>
        <br />
        <Mono>::::::::::::::::::::::::::::::::::::::</Mono>
        <br />
        <Mono>::::::::::::::::::::::::::::::::::::::</Mono>
      </p>
      <p>
        <Mono>??????????????????????????????????????</Mono>
        <br />
        <Mono>??????????????????????????????????????</Mono>
        <br />
        <Mono>??????????????????????????????????????</Mono>
        <br />
        <Mono>??????????????????????!???????????????</Mono>
      </p>
      <p>
        <Mono>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</Mono>
        <br />
        <Mono>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</Mono>
        <br />
        <Mono>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</Mono>
        <br />
        <Mono>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</Mono>
      </p>
      <p>
        <Mono>’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’</Mono>
        <br />
        <Mono>’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’</Mono>
        <br />
        <Mono>’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’</Mono>
        <br />
        <Mono>’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’</Mono>
      </p>
      <p>
        <Mono>......................................</Mono>
        <br />
        <Mono>......................................</Mono>
        <br />
        <Mono>......................................</Mono>
        <br />
        <Mono>......................................</Mono>
      </p>
      <p>
        <Mono>--------------------------------------</Mono>
        <br />
        <Mono>--------------------------------------</Mono>
        <br />
        <Mono>--------------------------------------</Mono>
      </p>
    </>
  );
};

export default Solution;
