import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const DATA = [
  ["“Respect”, by Aretha Franklin", "R-E-S-P-E-C-T", "R-E-F-L-E-C-T", "F, L"],
  ["“Hot to Go”, by Chappell Roan", "H-O-T-T-O-G-O", "H-O-P-L-O-G-O", "P, L"],
  ["“SOS”, by ABBA", "S-O-S", "S-U-S", "U"],
  ["“Love”, by Nat King Cole", "L, O, V, E", "L, O, S, S", "S, S"],
  ["“T.N.T.”, by AC/DC", "T.N.T.", "T.O.E.", "O, E"],
  ["“F.U.N. Song”, from Spongebob SquarePants", "F.U.N.", "R.U.N.", "R"],
];

const StyledTable = styled.table`
  th,
  td {
    padding-right: 1em;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle presents as five sets of song lyrics with words blacked out,
        as if with static. Each set of lyrics is a rewritten version of a pop
        song that prominently features spelling within it. The spelled out
        lyrics are also obscured, both through the simulated static and through
        a number. Teams must use the lyrics in front of them to identify the
        song and the changed letters. When assembled in order, the changed
        letters provide the instruction <Mono>SPELL FOR US</Mono>.
      </p>
      <p>
        Teams are then instructed to send solvers to the Gala to perform their
        own original rewrite of “Hot to Go” using their favorite seven-letter
        word or phrase, making sure to spell the letters with their arms as
        Chapelle Roan does in her music video. When they did so, they were given
        the final answer, <PuzzleAnswer>[pending]</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <th>Original Song</th>
          <th>Original Spelled Word</th>
          <th>Respelled Word</th>
          <th>Extracted Letters</th>
        </tr>
        {DATA.map(([song, word, respelled, extracted], i) => (
          <tr key={i}>
            <td>{song}</td>
            <td>{word}</td>
            <td>{respelled}</td>
            <td>{extracted}</td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
};

export default Solution;
