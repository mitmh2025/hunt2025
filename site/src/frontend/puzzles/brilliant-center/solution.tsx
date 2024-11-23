import React from "react";
import { styled } from "styled-components";
import solution from "./assets/solution.pdf";

const Mono = styled.span`
  font-family: monospace;
`;

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
        <a href={solution} target="_blank" rel="noreferrer">
          Link to PDF with lines drawn
        </a>
      </p>
      <p>
        In this puzzle, you are pairing answers from column A with answers from
        column B to create whimsical alternate names for animals. Well-traveled
        examples might include <Mono>TRASH PANDA</Mono> for “raccoon” or{" "}
        <Mono>MURDER LOG</Mono> for “crocodile”. Connect clue halves by drawing
        lines between them, which will cross over exactly one letter. This
        letter is then associated with the animal found in the nature scene.
      </p>
      <p>
        <strong>Column A clue answers:</strong>
      </p>
      <StyledTable>
        <tr>
          <th>Clue</th>
          <th>Answer</th>
        </tr>
        <tr>
          <td>- .... .. ... (translation: THIS)</td>
          <td>MORSE CODE</td>
        </tr>
        <tr>
          <td>Amnesiac FFVII hero</td>
          <td>CLOUD</td>
        </tr>
        <tr>
          <td>CTRL-C, CTRL-V</td>
          <td>COPY-PASTE</td>
        </tr>
        <tr>
          <td>Darla, Angel, or Spike, e.g.</td>
          <td>VAMPIRE</td>
        </tr>
        <tr>
          <td>Fashion statement for hunters</td>
          <td>CAMOUFLAGE</td>
        </tr>
        <tr>
          <td>Game developer that created Spyro the Dragon</td>
          <td>INSOMNIAC</td>
        </tr>
        <tr>
          <td>Japanese wrestling art</td>
          <td>SUMO</td>
        </tr>
        <tr>
          <td>Like a usable air mattress</td>
          <td>INFLATED</td>
        </tr>
        <tr>
          <td>Magnify or reduce an image</td>
          <td>ZOOM</td>
        </tr>
        <tr>
          <td>Nasal discharge, to a kindergartener</td>
          <td>SNOT</td>
        </tr>
        <tr>
          <td>Notable clash in a war</td>
          <td>BATTLE</td>
        </tr>
        <tr>
          <td>O at the bottom of a letter, perhaps</td>
          <td>HUG</td>
        </tr>
        <tr>
          <td>Olaf and Sven’s movie</td>
          <td>FROZEN</td>
        </tr>
        <tr>
          <td>_ On Elm Street, where Freddy is found</td>
          <td>NIGHTMARE</td>
        </tr>
        <tr>
          <td>Pre-workout motion</td>
          <td>STRETCH</td>
        </tr>
        <tr>
          <td>Wardenclyffe Tower creator</td>
          <td>TESLA</td>
        </tr>
        <tr>
          <td>Will be tense?</td>
          <td>FUTURE</td>
        </tr>
        <tr>
          <td>Without permission, as a biography</td>
          <td>UNAUTHORIZED</td>
        </tr>
      </StyledTable>
      <p>
        <strong>Column B clue answers:</strong>
      </p>
      <StyledTable>
        <tr>
          <th>Clue</th>
          <th>Answer</th>
        </tr>
        <tr>
          <td>2024 Olympian Nedoroscik’s specialty, for short</td>
          <td>HORSE</td>
        </tr>
        <tr>
          <td>An iron one sang In-A-Gadda-Da-Vida</td>
          <td>BUTTERFLY</td>
        </tr>
        <tr>
          <td>Black and white cat variety</td>
          <td>TUXEDO</td>
        </tr>
        <tr>
          <td>"I’m A Believer" band member, autocorrected</td>
          <td>MONKEY</td>
        </tr>
        <tr>
          <td>Karen or Richard of 70’s pop</td>
          <td>CARPENTER</td>
        </tr>
        <tr>
          <td>Linguine’s wider cousin</td>
          <td>FETTUCCINE</td>
        </tr>
        <tr>
          <td>Miami football player</td>
          <td>DOLPHIN</td>
        </tr>
        <tr>
          <td>Mythical equine visible to virgins</td>
          <td>UNICORN</td>
        </tr>
        <tr>
          <td>One who perspires</td>
          <td>SWEATER</td>
        </tr>
        <tr>
          <td>Renaissance tenor cornett</td>
          <td>LIZARD</td>
        </tr>
        <tr>
          <td>Swashbuckling debtor to heartless Jones</td>
          <td>SPARROW</td>
        </tr>
        <tr>
          <td>Sylvester, Felix, or Garfield, e.g.</td>
          <td>CAT</td>
        </tr>
        <tr>
          <td>TANGY palindromic completer</td>
          <td>GNAT</td>
        </tr>
        <tr>
          <td>Tapestry maker, perhaps</td>
          <td>WEAVER</td>
        </tr>
        <tr>
          <td>This crushes scissors</td>
          <td>ROCK</td>
        </tr>
        <tr>
          <td>Tomato in a sewing kit</td>
          <td>PINCUSHION</td>
        </tr>
        <tr>
          <td>Unwelcome picnic guest</td>
          <td>ANT</td>
        </tr>
        <tr>
          <td>You might be wearing a brass one right now</td>
          <td>RAT</td>
        </tr>
      </StyledTable>
      <p>
        <strong>Animal pairings, in alphabetical order:</strong>
      </p>
      <StyledTable>
        <tr>
          <th>Whimsical name</th>
          <th>Animal</th>
          <th>Letter crossed</th>
        </tr>
        <tr>
          <td>BATTLE UNICORN</td>
          <td>rhinoceros</td>
          <td>
            <Mono>M</Mono>
          </td>
        </tr>
        <tr>
          <td>CAMOUFLAGE LIZARD</td>
          <td>chameleon</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>CLOUD HORSE</td>
          <td>alpaca</td>
          <td>
            <Mono>M</Mono>
          </td>
        </tr>
        <tr>
          <td>COPY-PASTE ANT</td>
          <td>centipede</td>
          <td>
            <Mono>I</Mono>
          </td>
        </tr>
        <tr>
          <td>FROZEN TUXEDO</td>
          <td>penguin</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>FUTURE SWEATER</td>
          <td>sheep</td>
          <td>
            <Mono>B</Mono>
          </td>
        </tr>
        <tr>
          <td>HUG MONKEY</td>
          <td>sloth</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>INFLATED PINCUSHION</td>
          <td>pufferfish</td>
          <td>
            <Mono>R</Mono>
          </td>
        </tr>
        <tr>
          <td>INSOMNIAC BUTTERFLY</td>
          <td>moth</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>MORSE CODE SPARROW</td>
          <td>woodpecker</td>
          <td>
            <Mono>I</Mono>
          </td>
        </tr>
        <tr>
          <td>NIGHTMARE WEAVER</td>
          <td>spider</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>SNOT ROCK</td>
          <td>oyster</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>STRETCH RAT</td>
          <td>ferret</td>
          <td>
            <Mono>D</Mono>
          </td>
        </tr>
        <tr>
          <td>SUMO DOLPHIN</td>
          <td>manatee</td>
          <td>
            <Mono>C</Mono>
          </td>
        </tr>
        <tr>
          <td>TESLA FETTUCCINE</td>
          <td>electric eel</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>UNAUTHORIZED CARPENTER</td>
          <td>termite</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>VAMPIRE GNAT</td>
          <td>mosquito</td>
          <td>
            <Mono>L</Mono>
          </td>
        </tr>
        <tr>
          <td>ZOOM CAT</td>
          <td>cheetah</td>
          <td>
            <Mono>U</Mono>
          </td>
        </tr>
      </StyledTable>
      <p>
        Once you have made all of the connections, the uncrossed letters in the
        array spell out <Mono>FROM PENGUIN FOLLOW GAZE CHAIN</Mono>. (The
        flavortext also hints towards this.) Starting from the penguin, follow
        each animal’s line of sight to form a chain that ends at the spider. The
        letters associated with each animal in this chain spell out{" "}
        <Mono>EDIBLE SUMMER CANINE</Mono>. Or, rather, a{" "}
        <Mono>
          <strong>HOT DOG</strong>
        </Mono>
        , which is the final answer.
      </p>
      <p>
        Author’s note: for the purposes of this puzzle, close enough is close
        enough. Is a <Mono>STRETCH RAT</Mono> a ferret, a weasel, or a stoat? Go
        with whatever animal your heart tells you, as these are all critters
        that look like… well, like a rat, but stretched out.
      </p>
      <p>
        Another author’s note: the puzzle title “Mellow Planet” is a nod to
        Mamadou Ndiaye’s masterfully wordsmithed YouTube channel, “Casual
        Geographic”
      </p>
    </>
  );
};

export default Solution;
