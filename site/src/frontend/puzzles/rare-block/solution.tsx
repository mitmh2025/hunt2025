import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import solution1 from "./assets/solution1.jpg";
import solution2 from "./assets/solution2.jpg";

const StyledUl = styled.ul`
  font-family: "Roboto Mono", monospace;
`;

const Flex = styled.div`
  display: flex;
  & > * {
    flex: 0 0 50%;
  }
`;

const Highlight = styled.span`
  background-color: var(--gold-200);
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Upon arriving at the Gala, solvers were told they could not complete
        their call as the exchange had been “tied up all day” and scheduled to
        visit the central phone office and report back what they learned.
      </p>
      <p>
        At the central office, a harried worker pointed them toward a
        malfunctioning switchboard with the plea “we really need a Switchboard
        Hero.”
      </p>
      <p>
        The switchboard behaves as a three-player physical rhythm game in the
        style of Taiko no Tatsujin (or perhaps Whack-a-Mole). When the players
        perform acceptably well at the game, the player-operator (wearing
        headphones) is able to successfully transcribe the following incoming
        call requests (a copy of the “troubleshooting worksheet” is provided at
        the end of this solution page):
      </p>
      <ul>
        <li>Coulomb-12367</li>
        <li>Cambridge-62491</li>
        <li>Pioneer-34173</li>
        <li>Spectrum-23453</li>
        <li>Dictionary-71236</li>
        <li>Hyacinth-71364</li>
        <li>Kornbluth-21865</li>
        <li>Songwriter-28234</li>
        <li>Solidworks-62259</li>
        <li>Gladstone-98432</li>
      </ul>
      <p>
        Indexing the phone numbers into the exchanges (eg, extracting the first,
        second, third, sixth and seventh letters from COULOMB) yields:
      </p>
      <StyledUl>
        <li>COUMB</li>
        <li>IABEC</li>
        <li>ONPRO</li>
        <li>PECTE</li>
        <li>NDICO</li>
        <li>THANC</li>
        <li>OKTLB</li>
        <li>OTONG</li>
        <li>WOODK</li>
        <li>ENDAL</li>
      </StyledUl>
      <p>
        (The phone number provided at the start of the puzzle, Carousel-18576,
        yields <Mono>CLUES</Mono> to confirm the mechanic.)
      </p>
      <p>
        Reading this list in order results in a set of historic Boston-area
        telephone exchanges, each with one letter missing (highlighted below):
      </p>
      <StyledUl>
        <li>
          CO<Highlight>L</Highlight>UMBIA
        </li>
        <li>
          BE<Highlight>A</Highlight>CON
        </li>
        <li>
          PRO<Highlight>S</Highlight>PECT
        </li>
        <li>
          ENDICOT<Highlight>T</Highlight>
        </li>
        <li>
          HANCO<Highlight>C</Highlight>K
        </li>
        <li>
          T<Highlight>A</Highlight>LBOT
        </li>
        <li>
          <Highlight>L</Highlight>ONGWOOD
        </li>
        <li>
          KENDAL<Highlight>L</Highlight>
        </li>
      </StyledUl>
      <p>
        The missing letters spell the answer, <Mono>LAST CALL</Mono>. Returning
        to the Gala with the passphrase, the phone behind the bar rings and
        delivers the final puzzle answer,{" "}
        <PuzzleAnswer>DOWN A RABBIT HOLE</PuzzleAnswer>.
      </p>
      <h3>Author’s Note</h3>
      <p>
        First of all, thanks to Death & Mayhem for letting me take 8 months to
        build this crazy contraption that brings together so many things I
        dearly love, and to Chris Pentacoff, Sarah Leadbeater, and Will Tymowski
        for designing and fabricating the wood cabinets to house the game.
      </p>
      <p>
        The story behind this puzzle’s title is too good not to share. My
        grandfather-in-law had a small workshop at home not unlike mine, and in
        roughly 1950 he named it “Communicado” specifically so that when he
        needed to hide there, he could tell his kids “I’m incommunicado
        tonight”—a nearly perfect title for a puzzle about thwarted and broken
        communication that similarly had me hiding out for many late nights in
        my workshop.
      </p>
      <Flex>
        <LinkedImage
          src={solution1}
          alt="Diodes & Microcircuits Telephone. Switchboard troubleshooting worksheet. (technician use only). Remember: Record all incoming switchboard requests accurately. Without this information our troubleshooters will be unable to find a solution. Coulomb. Cambridge. Pioneer. Spectrum. Dictionary. Hyacinth. Kornbluth. Songwriter. Solidworks. Gladstone. © D&M Telephone, a wholly owned subsidiary of Diodes and Microcircuits."
        />
        <LinkedImage
          src={solution2}
          alt="A diagram of the aforementioned historic telephone exchanges, showing which neighborhoods of the greater Boston area each exchange covers."
        />
      </Flex>
    </>
  );
};

export default Solution;
