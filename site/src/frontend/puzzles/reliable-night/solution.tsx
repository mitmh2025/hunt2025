import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import bracelet from "./assets/bracelet.png";

const MonospacedDiv = styled.div`
  font-family: "Roboto Mono", monospace;
  white-space: pre;
`;
const Red = styled(Mono)`
  font-weight: bold;
  color: red;
`;
const Blue = styled(Mono)`
  color: blue;
`;

const Solution = () => {
  return (
    <div>
      <h2>Additional Credits</h2>
      <p>
        We’d additionally like to credit our voice actors, who performed the
        virtual witness interview after you solved this meta:
      </p>
      <ul>
        <li>Billie: Hubert Hwang</li>
        <li>Micah the Gem Cutter: Andrew Russell</li>
      </ul>
      <hr />
      <p>
        Solvers should notice that each feeder puzzle answer has exactly two
        trigrams (three characters) that each match a trigram in another answer,
        but in the opposite direction. For example, <Mono>PID</Mono> in one
        answer and <Mono>DIP</Mono> in another answer. Some of these are within
        the answer, and some trigrams “wrap” from the end of the answer to the
        beginning.
      </p>
      <p>
        Matching these trigrams up from answer to answer forms a complete chain
        of answers (as there are exactly seven matches). Visually, the answers
        can be arranged such that each forms a loop in a clockwise direction,
        and together they form a larger loop: thematically a chain-link
        bracelet.
      </p>
      <LinkedImage
        src={bracelet}
        alt="An interconnected chain of answers, with the shared three-letter trigrams highlighted in red and all other letters in blue.  The words, in clockwise order from the top, are CHIFFONIER, CREMECARAMEL, RIGHTTOBEARARMS, LAMOTTA, PIDAKALAWAR, SERENDIPSANCTUARY, and RAPOFFKEY."
      />
      <p>
        The flavor text hints that solvers should “start off,” which indicates
        the starting trigram and its direction. Starting with <Mono>OFF</Mono>,
        the shared trigrams can be read around the cycle in two directions. One
        direction gives the answer:
      </p>
      <p>
        <PuzzleAnswer>OFFER CARAT TO A LAPIDARY</PuzzleAnswer>
      </p>
      <p>
        Teams might also have arranged the answers in a stack to visualize
        trigram overlap, as below. Again starting with <Mono>OFF</Mono> and then
        reading each new trigram (shown in bold red below, with the matching
        “chain” trigram in blue), the answer appears:
      </p>
      <div>
        <MonospacedDiv>
          {"     "}
          <Blue>RA</Blue>P<Red>OFF</Red>KE<Blue>Y</Blue>
        </MonospacedDiv>
        <MonospacedDiv>
          {"     "}
          <Red>C</Red>HI<Blue>FFO</Blue>NI<Red>ER</Red>
        </MonospacedDiv>
        <MonospacedDiv>
          {"             "}
          <Blue>CRE</Blue>MEC<Red>ARA</Red>MEL
        </MonospacedDiv>
        <MonospacedDiv>
          {"          "}RIGH<Red>TTO</Red>BE<Blue>ARA</Blue>RMS
        </MonospacedDiv>
        <MonospacedDiv>
          {"           "}
          <Red>LA</Red>M<Blue>OTT</Blue>
          <Red>A</Red>
        </MonospacedDiv>
        <MonospacedDiv>
          {"     "}
          <Red>PID</Red>AK<Blue>ALA</Blue>WAR
        </MonospacedDiv>
        <MonospacedDiv>
          SEREN<Blue>DIP</Blue>SANCTU<Red>ARY</Red>
        </MonospacedDiv>
      </div>
      <h3>Author’s Note</h3>
      <p>
        The feeder answers were surprisingly constrained by the trigrams,
        because we wanted to avoid having any trigrams that weren’t part of the
        final answer shared between feeder answers. However, we worked hard to
        make sure <Mono>PIDAKALA WAR</Mono> was included so that we could make
        poop jokes.
      </p>
    </div>
  );
};

export default Solution;
