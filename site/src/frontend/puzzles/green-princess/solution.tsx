import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const MonoUL = styled.ul`
  font-family: "Roboto Mono", monospace;
`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  font-family: sans-serif;
  td {
    text-align: center;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    border: 1px solid #ccc;
    border-collapse: collapse;
  }
`;

const HighlitCell = styled.td`
  background-color: #fff1c1;
`;

// lowercase is no highlight
// uppercase is highlit
const GRID_HIGHLIGHTS_CAPS_STRING = `
p b a S t e n g h y n g v b a f E b a M
l b h e H p b z z r a p r z r a L g o A
N G O Z I E O K O N J O I W E A L A h R
g g M u r e R r v f d h v g r n E o v K
g z b E e B R Y A N E S T E V E N S O N
r c h m G m y r L n u r n q b s O l b R
h a b j v A s l T I M H C O O K K b h O
j b h y q o N r f b S x v a q g U b c B
W I L L I A M T M C R A V E N y L r n E
f r h f r f v k S y r g N g r e L j b R
e q M A T T T D A M O N i D v t M r a r
e r x r l g b q r p I v c u B r A e i i
g u D R E W R H O U S T O N f E N p j u
k q e m h t v r v x t s H u d r R w x m
k M I C H A E L R B L O O M B E R G e r
`.trim();
const GRID_HIGHLIGHTS_CAPS_ROWS = GRID_HIGHLIGHTS_CAPS_STRING.split("\n");
const GRID_HIGHLIGHTS_CAPS = GRID_HIGHLIGHTS_CAPS_ROWS.map((row) =>
  row.split(" "),
);

const HighlitTable = ({ grid }: { grid: string[][] }) => {
  const rows = grid.map((row, i) => {
    const cells = row.map((cell, j) => {
      const upper = cell.toUpperCase();
      if (cell === upper) {
        return <HighlitCell key={j}>{upper}</HighlitCell>;
      } else {
        return <td key={j}>{upper}</td>;
      }
    });
    return <tr key={i}>{cells}</tr>;
  });
  return (
    <Table>
      <tbody>{rows}</tbody>
    </Table>
  );
};

const Solution = () => {
  return (
    <>
      <p>
        The first part of the puzzle does not require any input answers, and
        it’s to do the word search. Solvers can find the following strings in
        the word search, going every which way:
      </p>

      <MonoUL>
        <li>DREWRHOUSTON</li>
        <li>ELLENOKULLMAN</li>
        <li>MEGANTSMITH</li>
        <li>MATTTDAMON</li>
        <li>TIMHCOOK</li>
        <li>SHERYLISANDBERG</li>
        <li>MICHAELRBLOOMBERG</li>
        <li>WILLIAMTMCRAVEN</li>
        <li>BRYANESTEVENSON</li>
        <li>NGOZIEOKONJOIWEALA</li>
        <li>MARKNROBER</li>
      </MonoUL>

      <HighlitTable grid={GRID_HIGHLIGHTS_CAPS} />

      <p>
        These are all MIT commencement speakers (2013-2023). The letters between
        the first and last names in year order spell <Mono>ROT THIRTEEN</Mono>.
        (Solvers will discover those are not their middle initials.) Solvers
        must take all the letters of the word search not used by the above words
        and rot-13 them to get a message.
      </p>
      <p>The remaining letters are:</p>
      <p>
        <Mono>
          PBATENGHYNGVBAF BA LBHE PBZZRAPRZRAG OHG GURER VF DHVGR N OVG ZBER
          CHMMYR NURNQ BS LBH ABJ VS LBH JBHYQ OR FB XVAQ GB CYRNFR HFR N FVK
          YRGGRE JBEQ IVTRARER XRL GB QRPVCURE GUR SBYYBJVAT HURGKIGTDCJMAJEC
        </Mono>
      </p>
      <p>After ROT13 they spell out:</p>
      <p>
        <Mono>
          CONGRATULATIONS ON YOUR COMMENCEMENT BUT THERE IS QUITE A BIT MORE
          PUZZLE AHEAD OF YOU NOW IF YOU WOULD BE SO KIND TO PLEASE USE A SIX
          LETTER WORD VIGENERE KEY TO DECIPHER THE FOLLOWING UHETXVTGQPWZNWRP
        </Mono>
      </p>
      <p>
        Now solvers must use the diagram with the columns and the dome, which
        tells them to take six answers with the appropriate first letters (e.g.
        an answer starting with L), and extract the third letter of each, to get
        a word (<Mono>COPPER</Mono>, which happens to be nicely dome-related).
      </p>
      <p>
        This step is intentionally a little unconstrained (there are 2 answers
        in the round starting with L, several with S and A, but only 1 with C) -
        the constraint is that they must form a 6-letter word per the
        instructions. Solvers are expected to brute force this step with less
        than 6 feeders (most likely 2-3), and will probably start realizing that
        something is weird with the feeders in this round.
      </p>
      <p>
        Solvers then use this word as a key to decrypt{" "}
        <Mono>UHETXVTGQPWZNWRP</Mono> into{" "}
        <PuzzleAnswer>ST PETERS BASILICA</PuzzleAnswer>, the final answer, and
        also a great dome.
      </p>
    </>
  );
};

export default Solution;
