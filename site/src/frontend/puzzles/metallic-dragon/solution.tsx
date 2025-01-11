import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const StyledTableCell = styled.td`
  border: 2px solid black;
  max-width: 240px;
  text-align: center;
`;

const StyledDiv = styled.div`
  display: block;
`;

const MarginedDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Solution = () => {
  return (
    <>
      <MarginedDiv>
        This puzzle is presented as an old-school dumb phone interface that can
        be played as a text adventure. Each room contains a sentence of text
        with one word capitalized and a list of commands that can be used to
        progress through the text adventure. Each command is actually a set of
        numbers, where the numbers spell out the cardinal directions NORTH
        (66784), EAST (3278), SOUTH (76884), and WEST (9378) on a phone keypad.
        Mapping out the rooms and their connections yields the following grid.
        Each location has a hinting at a location, and a capitalized word that
        does not make sense in the context of the sentence.
      </MarginedDiv>

      <StyledTable>
        <tr>
          <StyledTableCell>
            <StyledDiv>
              When you fly in the Presidential airplane, you wake up REST in the
              morning.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              Almost every atom of helium has an equal number of protons COD
              neutrons.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              A Tesla sedan model can be tricked out with a light-up COGNATED
              console.
            </StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>
              The large asteroid Vesta is not considered terrestrial planet
              number DITE.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              The morale at the Jackson residence stayed high, never going down
              the UVAE.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              It&apos;s SCRUB every night for dinner at the Navy special ops
              team barracks.
            </StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>
              On this rugby union pitch, there are three forwards and DOTS
              backs.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              You don&apos;t need a belay device when hiking the North or South
              SHOP of the Grand Canyon.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              Clouds consist ME a suspension of particles in the atmosphere.
            </StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>
              If you stand on the surface of the sun, your DACE will definitely
              get burned.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              The darkness of a black GOLF is more empty than the vast emptiness
              of space.
            </StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>
              A medieval animal pound can hold more than DOUR sheep, sometimes
              up to 20.
            </StyledDiv>
          </StyledTableCell>
        </tr>
      </StyledTable>
      <MarginedDiv>
        The locations hinted at in each of the descriptions clue that each
        location represents a key on a phone keypad.
      </MarginedDiv>
      <StyledTable>
        <tr>
          <StyledTableCell>
            <StyledDiv>1 Presidential airplane (Air Force One)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>2 Helium atom (atomic number 2)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>3 Tesla sedan (model 3)</StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>4 Asteroid Vesta (officially called 4 Vesta)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>5 Jackson residence (of Jackson 5)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>6 Navy special ops team (SEAL Team 6)</StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>7 Rugby union pitch (rugby sevens)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>8 Belay device (figure 8)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>9 Cloud (cloud 9)</StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>* The sun (a star)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>0 Emptiness (zero)</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv># Medieval animal pound (pound)</StyledDiv>
          </StyledTableCell>
        </tr>
      </StyledTable>
      <MarginedDiv>
        The phone keypad, old-school styling of the puzzle presentation, the
        directions used to move between locations, and the puzzle title (Word
        Yore) hint to you that the capitalized words in each description should
        be treated as textonyms from T9 predictive text. Mapping out and
        translating the textonyms from each room gives the cluephrase{" "}
        <Mono>
          PERT AND ANIMATED FIVE TUBE PASTA FOUR RIMS OF FACE HOLE FOUR
        </Mono>
        . The translated word makes the sentence at each location make sense as
        a confirmation.
      </MarginedDiv>
      <StyledTable>
        <tr>
          <StyledTableCell>
            <StyledDiv>REST PERT</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>COD AND</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>COGNATED ANIMATED</StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>DITE FIVE</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>UVAE TUBE</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>SCRUB PASTA</StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>DOTS FOUR</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>SHOP RIMS</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>ME OF</StyledDiv>
          </StyledTableCell>
        </tr>

        <tr>
          <StyledTableCell>
            <StyledDiv>DACE FACE</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>GOLF HOLE</StyledDiv>
          </StyledTableCell>
          <StyledTableCell>
            <StyledDiv>DOUR FOUR</StyledDiv>
          </StyledTableCell>
        </tr>
      </StyledTable>
      <MarginedDiv>
        Taking the clue phrase as clues gives <Mono>PERKY ZITI LIPS</Mono>.
        Re-applying the textonym mechanic gives you the partial{" "}
        <Mono>REPLY WITH KISS</Mono>. Entering KISS into the answer checker
        tells you to email a kiss to HQ, which will respond with the instruction
        “Go touch GRASS”, where <PuzzleAnswer>GRASS</PuzzleAnswer> is the puzzle
        answer.
      </MarginedDiv>
    </>
  );
};

export default Solution;
