import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { Haiku } from "./puzzle";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 1px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Each haiku in this puzzle references an artwork found along the main
        section of The Borderline, a collection of murals in the tunnel between
        Building 66 and E17.
      </p>
      <p>
        Each haiku has one line that does not follow the expected 5/7/5 pattern.
        If you find the artwork that the haiku references, you’ll discover that
        there is an error in each haiku; correcting the error will also correct
        the number of syllables. As a further solving assist, the haiku are
        given in alphabetical order by replaced word:
      </p>
      <Haiku $indent={false}>
        cacti cannot speak
        <br />
        but this one does, screaming <s>“Bollocks!”</s> <strong>AAH</strong>
        <br />
        behind a dragon (1)
      </Haiku>
      <Haiku $indent={true}>
        black and white <s>aliens</s> <strong>CHILDREN</strong>
        <br />
        one pointing in the distance
        <br />
        one seated to look (2)
      </Haiku>
      <Haiku $indent={false}>
        lady liberty
        <br />
        belongs in this spot, her torch
        <br />
        literally <s>electrical</s> <strong>FIRE</strong> (2)
      </Haiku>
      <Haiku $indent={true}>
        she gazes upward
        <br />
        two <s>tigers</s> <strong>FISH</strong> swimming—or flying—
        <br />a zodiac sign (4)
      </Haiku>
      <Haiku $indent={false}>
        green hair, green guitar
        <br />
        she and her blue ladies sing
        <br />
        “dear to me <s>heart</s> <strong>FLOWERS</strong>” (4)
      </Haiku>
      <Haiku $indent={true}>
        cacti cannot speak
        <br />
        so this one holds up a sign
        <br />
        offering <s>prickly</s> <strong>FREE</strong> hugs (3)
      </Haiku>
      <Haiku $indent={false}>
        cacti cannot speak
        <br />
        but if you draw a mouth, they’ll
        <br />
        ask for a <s>slaughterhouse</s> <strong>HIGH</strong> five (3)
      </Haiku>
      <Haiku $indent={true}>
        seems like <s>ant</s> <strong>IRON</strong> man
        <br />
        is now a postman, bearing
        <br />
        mail for MIT (2)
      </Haiku>
      <Haiku $indent={false}>
        hissing snake lunges,
        <br />
        topples a <s>communications</s> <strong>JENGA</strong> tower
        <br />
        it just lost the game (2)
      </Haiku>
      <Haiku $indent={true}>
        birdman wields a flare
        <br />
        in backwards cap and jersey
        <br />
        calling twice, “<s>boldly</s> <strong>LET’S</strong> go!” (4)
      </Haiku>
      <Haiku $indent={false}>
        mechanical heart
        <br />
        does she hold life or machine?
        <br />
        <s>gasoline</s> <strong>LIGHT</strong> streams through the cracks (1)
      </Haiku>
      <Haiku $indent={true}>
        amid purple hair
        <br />
        <s>computer</s> <strong>LIGHTNING</strong> bugs captivate them
        <br />
        one face blue, one red (6)
      </Haiku>
      <Haiku $indent={false}>
        above the human
        <br />
        made of cells and intestines
        <br />
        <s>hairs</s> <strong>MUSHROOMS</strong> grow on a (2)
      </Haiku>
      <Haiku $indent={true}>
        huge <s>donkey</s> <strong>NAUTILUS</strong> looms
        <br />
        behind red rooster brooding
        <br />
        in cookery nest (2)
      </Haiku>
      <Haiku $indent={false}>
        hair in two pigtails
        <br />
        she finds warmth and comfort in
        <br />
        her puffy <s>purple</s> <strong>PINK</strong> coat (2)
      </Haiku>
      <Haiku $indent={true}>
        <s>eight-</s>
        <strong>SEVEN</strong>-armed creature—
        <br />
        a purple cephalopod?—
        <br />
        floats above a fox (5)
      </Haiku>
      <Haiku $indent={false}>
        ignoring HIPAA
        <br />
        patient info in clear view
        <br />
        weight: <s>five</s> <strong>SEVERAL</strong> tons (1)
      </Haiku>
      <Haiku $indent={true}>
        heap of soda cans
        <br />
        crushed caffeine, then crushed metal
        <br />
        casts a tired <s>dice</s> <strong>SHADOW</strong> (2)
      </Haiku>
      <Haiku $indent={false}>
        cacti cannot speak
        <br />
        nor can they steer a <s>horse</s> <strong>SKATEBOARD</strong>
        <br />
        globs of water, spilled (10)
      </Haiku>
      <Haiku $indent={true}>
        the <s>galaxy</s> <strong>STATA</strong> center
        <br />
        colored in muted red tones
        <br />
        not so true to life (2)
      </Haiku>
      <Haiku $indent={false}>
        behind an island,
        <br />
        volcano-backed <s>whale</s> <strong>TURTLE</strong> swims
        <br />
        through the inky void (6)
      </Haiku>
      <Haiku $indent={true}>
        a cape full of moons
        <br />
        and a moon sword; pocket <s>calculator</s> <strong>WATCH</strong>
        <br />
        reads eight twenty-five (3)
      </Haiku>
      <Haiku $indent={false}>
        trapped in a sandglass
        <br />a fallen emoji <s>glowers</s> <strong>WINKS</strong>
        <br />
        and sticks out its tongue (3)
      </Haiku>
      <p>
        Arrange the corrected words in order of where their murals are found
        from top to bottom of the ramp (as suggested in the flavor text) and
        take the given index:
      </p>
      <StyledTable>
        <tr>
          <th>Correct Word</th>
          <th>Letter</th>
        </tr>
        <tr>
          <td>WATCH (3)</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>SHADOW (2)</td>
          <td>
            <Mono>H</Mono>
          </td>
        </tr>
        <tr>
          <td>JENGA (2)</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>FLOWERS (4)</td>
          <td>
            <Mono>W</Mono>
          </td>
        </tr>
        <tr>
          <td>CHILDREN (2)</td>
          <td>
            <Mono>H</Mono>
          </td>
        </tr>
        <tr>
          <td>AAH (1)</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>LIGHT (1)</td>
          <td>
            <Mono>L</Mono>
          </td>
        </tr>
        <tr>
          <td>TURTLE (6)</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>NAUTILUS (2)</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>LIGHTNING (6)</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>SKATEBOARD (10)</td>
          <td>
            <Mono>D</Mono>
          </td>
        </tr>
        <tr>
          <td>STATA (2)</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>FISH (4)</td>
          <td>
            <Mono>H</Mono>
          </td>
        </tr>
        <tr>
          <td>FREE (3)</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>IRON (2)</td>
          <td>
            <Mono>R</Mono>
          </td>
        </tr>
        <tr>
          <td>PINK (2)</td>
          <td>
            <Mono>I</Mono>
          </td>
        </tr>
        <tr>
          <td>LET’S (4)</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>FIRE (2)</td>
          <td>
            <Mono>I</Mono>
          </td>
        </tr>
        <tr>
          <td>SEVEN (5)</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>HIGH (3)</td>
          <td>
            <Mono>G</Mono>
          </td>
        </tr>
        <tr>
          <td>SEVERAL (1)</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>MUSHROOMS (2)</td>
          <td>
            <Mono>U</Mono>
          </td>
        </tr>
        <tr>
          <td>WINKS (3)</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
      </StyledTable>
      <p>
        These letters spell out <Mono>THE WHALE AND THE RISING SUN</Mono>, which
        references a gorgeous mural not already used, and which neatly completes
        the final haiku:
      </p>
      <Haiku $indent={false}>
        yet unexamined
        <br />
        <PuzzleAnswer>THE WHALE AND THE RISING SUN</PuzzleAnswer>
        <br />
        the answer you seek
      </Haiku>
    </>
  );
};

export default Solution;
