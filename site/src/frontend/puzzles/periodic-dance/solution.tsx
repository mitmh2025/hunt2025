import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  td,
  th {
    padding: 0px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Each puzzle clue refers to a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Super_Smash_Bros._Ultimate"
          target="_blank"
          rel="noreferrer"
        >
          Super Smash Bros. Ultimate
        </a>{" "}
        character (as confirmed by “ultimate” in title). Each character in SSBU
        has three normal{" "}
        <a
          href="https://www.ssbwiki.com/List_of_taunts_(SSBU)"
          target="_blank"
          rel="noreferrer"
        >
          taunts
        </a>{" "}
        with different directions (up, down, sideways). All the clued taunts
        contain the words “up”, “down”, or ”side” embedded in the insult. If you
        look up the taunts, every single referenced taunt contains a voiceline
        (many of which are very iconic super smash bros taunts—show me your
        moves, hi, okay). If you look at the first letter of each voiceline it
        spells out the answer:{" "}
        <Mono>
          <strong>SMASH MOUTH</strong>
        </Mono>
        .
      </p>
      <StyledTable>
        <tr>
          <th>Clue</th>
          <th>Direction</th>
          <th>Clue Explanation</th>
          <th>Clued Character</th>
          <th>Voiceline</th>
          <th>Extraction</th>
        </tr>
        <tr>
          <td>
            Are you feeling blue inside since you can’t run rings around me?
          </td>
          <td>Side</td>
          <td>Sonic is “blue” and “runs” catching “rings”.</td>
          <td>Sonic</td>
          <td>“Sonic Speed!”</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>Despite being all dressed up, a prince can’t afford shoes?</td>
          <td>Up</td>
          <td>
            Corrin is a Nohr “prince” and despite having fancy clothes walks
            around barefoot. “Prince” hints at male version.
          </td>
          <td>Corrin (male)</td>
          <td>“My path is clear!”</td>
          <td>
            <Mono>M</Mono>
          </td>
        </tr>
        <tr>
          <td>
            Is that a monster in your pocket, or can you not muster up the
            balls?
          </td>
          <td>Up</td>
          <td>
            Pokemon trainer keeps “Monsters in their pocket” and poke“balls”.
          </td>
          <td>Pokémon Trainer</td>
          <td>“All right!”</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>
            No matter how fast you race down the track, you’ll never be promoted
            to Major.
          </td>
          <td>Down</td>
          <td>
            “Captain” is rank below Major and “racing” hints at Captain Falcon.
          </td>
          <td>Captain Falcon</td>
          <td>“Show me your moves!”</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>You know why you keep falling down? Because you suck!</td>
          <td>Down</td>
          <td>
            “You suck” hints at Kirby’s sucking move. “Falling” is a double hint
            at his signature brick move (that falls down) and the “falling
            kirby” meme.
          </td>
          <td>Kirby</td>
          <td>“Hi!”</td>
          <td>
            <Mono>H</Mono>
          </td>
        </tr>
        <tr>
          <td>Your sidekick isn’t the brightest star.</td>
          <td>Side</td>
          <td>Luma is an actual star and the sidekick for Rosalina.</td>
          <td>Rosalina & Luma</td>
          <td>“Mmm hmm!”</td>
          <td>
            <Mono>M</Mono>
          </td>
        </tr>
        <tr>
          <td>
            A psychic should be a better batter, so you must be making it up.
          </td>
          <td>Up</td>
          <td>Ness is a psychic and wields a bat.</td>
          <td>Ness</td>
          <td>“Okay.”</td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
        <tr>
          <td>
            Is your mental breakdown caused by the shrooms or being kidnapped?
          </td>
          <td>Down</td>
          <td>
            Peach oversees the mu“shroom” kingdom and is always getting
            kidnapped by Bowser.
          </td>
          <td>Peach</td>
          <td>“Uh-huh!”</td>
          <td>
            <Mono>U</Mono>
          </td>
        </tr>
        <tr>
          <td>Sheng Long? Are you talking out of the side of your mouth?</td>
          <td>Side</td>
          <td>
            Sheng Long is a long running joke on a mistaken translation of
            “Shoryu” from the “Shoryuken” move said by Ryu in 1991 arcade game
          </td>
          <td>Ryu</td>
          <td>“Talk is cheap!”</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>
            Since you never pipe up, you’ll never be as good as your older
            brother.
          </td>
          <td>Up</td>
          <td>
            Pipe hints Mario Bros. Luigi has a “better” older brother (Mario).
          </td>
          <td>Luigi</td>
          <td>“Hoh, hah, hee, heh, hoo!”</td>
          <td>
            <Mono>H</Mono>
          </td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;
