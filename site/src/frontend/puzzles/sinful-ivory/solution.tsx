import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
  border-collapse: collapse;
  tr {
    border-bottom: 1px solid var(--true-black);
  }
  th,
  td {
    padding: 0px 8px;
  }
`;

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <HScrollTableWrapper>
      <StyledTable>{children}</StyledTable>
    </HScrollTableWrapper>
  );
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>The solver is presented with 13 “glitched” baseball cards.</p>
      <p>
        As well as baseball, the title, flavor text and emoji icons point us to
        the real theme of the puzzle: absurdist online fantasy baseball game,{" "}
        <a
          href="https://www.blaseball.wiki/w/Main_Page"
          target="_blank"
          rel="noreferrer"
        >
          Blaseball
        </a>
        . Each card represents both a real-world player (clued mainly by the
        clue text but also supported by the background image) and a Blaseball
        player (clued by the “career clock” pie chart and anagram terms).
      </p>
      <p>The baseball player clues are mechanically straightforward.</p>
      <p>
        For the Blaseball players, each clock indicates a player’s team
        allegiance
        <sup id="antifootnote">
          <a href="#footnote">1</a>
        </sup>{" "}
        through the history of Blaseball read like a clock (starting at 12
        o’clock and proceeding clockwise around back to the top). Teams in
        Blaseball have a canonical emoji and background color that are unique to
        them, and the notches indicate the 26 total seasons of Blaseball. Gaps
        indicate periods when that player was not affiliated with any team - or
        possibly did not exist at all.
      </p>
      <p>
        For example, in card one, Tiana Wheeler started with the Yellowstone
        Magic (the sparkles emoji on red). Wheeler was “Redacted” and removed
        from the Magic’s lineup in Season β16, re-appearing and joining the
        Kansas City Breath Mints (the green sliver) some time later, before
        moving back to the Magic. Wheeler moved to the Canada Moist Talkers (a
        dark blue emoji on light blue background) after Season β23. After season
        β24, they (and all other players) were removed from their existing team
        for a league-wide reset.
      </p>
      <p>
        The anagrammed terms are end-of-season “blessings” that directly
        targeted/affected the player. They are most important at a later stage,
        but solving some of the anagrams may also help you to identify the theme
        of the puzzle and identify some of the Blaseball players as a result.
      </p>
      <p>
        The Blaseball players have the same enumeration as their partner MLB
        players (which may assist with solving once noticed), and the common
        letters spell out the message <Mono>INDEX MAIN POS INTO BLESSING</Mono>.
      </p>
      <Table>
        <tr>
          <th></th>
          <th>MLB Player</th>
          <th>Blaseball Player</th>
          <th>Common Letters</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Vinny Rottino</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Tiana_Wheeler"
              target="_blank"
              rel="noreferrer"
            >
              Tiana Wheeler
            </a>
          </td>
          <td>IN</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Eduardo Núñez</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Kennedy_Loser"
              target="_blank"
              rel="noreferrer"
            >
              Kennedy Loser
            </a>
          </td>
          <td>DE</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Rex Hudler</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Alx_Keming"
              target="_blank"
              rel="noreferrer"
            >
              Alx Keming
            </a>
          </td>
          <td>X</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Yimi García</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Esme_Ramsey"
              target="_blank"
              rel="noreferrer"
            >
              Esme Ramsey
            </a>
          </td>
          <td>MA</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Chuck Hinton</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Jacob_Winner"
              target="_blank"
              rel="noreferrer"
            >
              Jacob Winner
            </a>
          </td>
          <td>IN</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Pedro Valdés</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Paula_Turnip"
              target="_blank"
              rel="noreferrer"
            >
              Paula Turnip
            </a>
          </td>
          <td>P</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Royce Lewis</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Combs_Estes"
              target="_blank"
              rel="noreferrer"
            >
              Combs Estes
            </a>
          </td>
          <td>OS</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Domonic Brown</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Basilio_Mason"
              target="_blank"
              rel="noreferrer"
            >
              Basilio Mason
            </a>
          </td>
          <td>IN</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Pete Fairbanks</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Math_Velazquez"
              target="_blank"
              rel="noreferrer"
            >
              Math Velazquez
            </a>
          </td>
          <td>T</td>
        </tr>
        <tr>
          <td>10</td>
          <td>José Tábata</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Foxy_Pebble"
              target="_blank"
              rel="noreferrer"
            >
              Foxy Pebble
            </a>
          </td>
          <td>OB</td>
        </tr>
        <tr>
          <td>11</td>
          <td>Blaze Alexander</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Aldon_Cashmoney"
              target="_blank"
              rel="noreferrer"
            >
              Aldon Cashmoney
            </a>
          </td>
          <td>LE</td>
        </tr>
        <tr>
          <td>12</td>
          <td>Dennys Reyes</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Famous_Owens"
              target="_blank"
              rel="noreferrer"
            >
              Famous Owens
            </a>
          </td>
          <td>SS</td>
        </tr>
        <tr>
          <td>13</td>
          <td>Sterling Stryker</td>
          <td>
            <a
              href="https://www.blaseball.wiki/w/Pitching_Machine_(Season_22_birth)"
              target="_blank"
              rel="noreferrer"
            >
              Pitching Machine
            </a>
          </td>
          <td>ING</td>
        </tr>
      </Table>
      <p>
        Directed by this instruction, we must solve the blessings for each
        player and find the unclued blessing. The blessings are given in each
        image in alphabetical order, once solved.
      </p>
      <Table>
        <tr>
          <th></th>
          <th>Anagrammed Blessings</th>
          <th>Missing Blessing</th>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <div>Defense Practice</div>
            <div>Dirty Bulk</div>
            <div>Little Swap</div>
            <div>Precognition</div>
            <div>Quenched</div>
            <div>Strange Attractor</div>
            <div>?</div>
          </td>
          <td>The Nut Button</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <div>Absolute Zero</div>
            <div>Falling Stars</div>
            <div>Handful Alternate Trust</div>
            <div>?</div>
          </td>
          <td>The Rack</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <div>Darkside Flip</div>
            <div>?</div>
            <div>Roster Flip</div>
          </td>
          <td>Mass Attraction</td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <div>A Blood Type</div>
            <div>Cinnamon Challenge</div>
            <div>?</div>
            <div>Haunted</div>
            <div>Subtractor Avoidance</div>
          </td>
          <td>Early Riser</td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <div>Batting Practice</div>
            <div>Bird Brain</div>
            <div>?</div>
          </td>
          <td>Humblebrag</td>
        </tr>
        <tr>
          <td>6</td>
          <td>
            <div>?</div>
            <div>Fired Up</div>
            <div>Liability</div>
            <div>Rotation Alternate Trust</div>
            <div>Sponge Blob</div>
          </td>
          <td>Center of Attention</td>
        </tr>
        <tr>
          <td>7</td>
          <td>?</td>
          <td>The Plan? Hit from the Mound</td>
        </tr>
        <tr>
          <td>8</td>
          <td>
            <div>Baserunning Flotation Bubble</div>
            <div>Defense Flotation Bubble</div>
            <div>Hitting Flotation Bubble</div>
            <div>?</div>
            <div>Wind Sprints</div>
            <div>Xenomorph</div>
          </td>
          <td>Shot Caller</td>
        </tr>
        <tr>
          <td>9</td>
          <td>
            <div>Baserunning Flotation Bubble</div>
            <div>Defense Flotation Bubble</div>
            <div>Defense Practice</div>
            <div>Hitting Flotation Bubble</div>
            <div>?</div>
            <div>Replacement Elbows</div>
            <div>Season 22: Gachapon</div>
          </td>
          <td>Mind Trick</td>
        </tr>
        <tr>
          <td>10</td>
          <td>?</td>
          <td>Cinnamon Roll</td>
        </tr>
        <tr>
          <td>11</td>
          <td>
            <div>Blind Date</div>
            <div>Fired Up</div>
            <div>?</div>
            <div>Middle of the Pack</div>
            <div>Popular By Association</div>
          </td>
          <td>Hot Sauce Bar</td>
        </tr>
        <tr>
          <td>12</td>
          <td>
            <div>Fired Up</div>
            <div>?</div>
            <div>Targeted Evolution</div>
            <div>Season 13: Hitting Flotation Bubble</div>
          </td>
          <td>Non-Dominant Arms</td>
        </tr>
        <tr>
          <td>13</td>
          <td>?</td>
          <td>Darkside Flip</td>
        </tr>
      </Table>
      <p>
        The final step is indexing the MLB player’s most played fielding
        position in the majors (using baseball’s traditional notation when
        scoring: pitcher = 1, catcher = 2, etc.) into the missing blessing to
        get the final answer. In many cases players have played multiple
        positions, but the “main” position for each is the position for which
        they have played most major league games according to Baseball
        Reference. In the ambiguous entries (primarily the outfielders), the
        position was directly given in the clue text on the card.
      </p>
      <Table>
        <tr>
          <th></th>
          <th>Players</th>
          <th>Position</th>
          <th>Blessing</th>
          <th>Letter</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Vinny Rottino / Tiana Wheeler</td>
          <td>LF = 7</td>
          <td>The Nut Button</td>
          <td>B</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Eduardo Núñez / Kennedy Loser</td>
          <td>3B = 5</td>
          <td>The Rack</td>
          <td>A</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Rex Hudler / Alx Keming</td>
          <td>2B = 4</td>
          <td>Mass Attraction</td>
          <td>S</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Yimi García / Esme Ramsey</td>
          <td>P = 1</td>
          <td>Early Riser</td>
          <td>E</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Chuck Hinton / Jacob Winner</td>
          <td>LF = 7</td>
          <td>Humblebrag</td>
          <td>B</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Pedro Valdés / Paula Turnip</td>
          <td>RF = 9</td>
          <td>Center of Attention</td>
          <td>A</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Royce Lewis / Combs Estes</td>
          <td>3B = 5</td>
          <td>The Plan? Hit from the Mound</td>
          <td>L</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Domonic Brown / Basilio Mason</td>
          <td>LF = 7</td>
          <td>Shot Caller</td>
          <td>L</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Pete Fairbanks / Math Velazquez</td>
          <td>P = 1</td>
          <td>Mind Trick</td>
          <td>M</td>
        </tr>
        <tr>
          <td>10</td>
          <td>José Tábata / Foxy Pebble</td>
          <td>LF = 7</td>
          <td>Cinnamon Roll</td>
          <td>O</td>
        </tr>
        <tr>
          <td>11</td>
          <td>Blaze Alexander / Aldon Cashmoney</td>
          <td>SS = 6</td>
          <td>Hot Sauce Bar</td>
          <td>U</td>
        </tr>
        <tr>
          <td>12</td>
          <td>Dennys Reyes / Famous Owens</td>
          <td>P = 1</td>
          <td>Non-Dominant Arms</td>
          <td>N</td>
        </tr>
        <tr>
          <td>13</td>
          <td>Sterling Stryker / Pitching Machine</td>
          <td>P = 1</td>
          <td>Darkside Flip</td>
          <td>D</td>
        </tr>
      </Table>
      <p>
        The final answer is: <PuzzleAnswer>BASEBALL MOUND</PuzzleAnswer>.
      </p>
      <p id="footnote">
        <sup>
          <a href="#antifootnote">1</a>
        </sup>{" "}
        Author’s note: On some occasions, Blaseball players could play for other
        teams (and accrue stats for them) while never being officially rostered
        to that team. Tiana Wheeler played half a game for the Baltimore Crabs
        thanks to their{" "}
        <a
          href="https://www.blaseball.wiki/w/Carcinization"
          target="_blank"
          rel="noreferrer"
        >
          Carcinization
        </a>{" "}
        modification that could briefly steal an opponent’s best player, and
        Combs Estes made several posthumous appearances by{" "}
        <a
          href="https://www.blaseball.wiki/w/Inhabitation"
          target="_blank"
          rel="noreferrer"
        >
          inhabiting
        </a>{" "}
        Haunted players. It was a matter of judgement as to when the player was
        actually rostered to which team so I hope these incidents which I chose
        to ignore didn’t cause confusion while solving.
      </p>
    </>
  );
};

export default Solution;
