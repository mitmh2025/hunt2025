import React from "react";
import { styled } from "styled-components";

const StyledTable = styled.table`
  th,
  td {
    padding: 0px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This is a Star Trek puzzle, specifically Star Trek time travel episodes.
        Solvers are told in the flavor text that they are looking for “someone
        almost completely different” which hints at the fact that each of these
        descriptions of an event from a Star Trek episode (or movie) has had one
        character whose name has been replaced with that of a different Trek
        character. The original character name and the one that replaces it both
        have the same enumeration and share exactly one letter in the same
        position (e.g., WORF replaced by WINN extracts to a W).
      </p>
      <p>
        The original order of the clues is determined by alphabetical order of
        the replaced character’s names, and the extraction order is determined
        by the air date ordering of each of these episodes/movies. This final
        ordering is hinted at by “reconstruct the timeline” and also clarified
        by the graphic below the clues that shows a timeline of when each series
        was on the air plus approximate movie release dates (where the
        horizontal part of the timeline is our time, and the vertical component
        of the chart is approximate in-universe time setting), and each
        episode/movie is highlighted by in blue with a number to give the
        extraction order. There is an identical chart on the Star Trek page on{" "}
        <a
          href="https://en.wikipedia.org/wiki/Star_Trek#History_and_production"
          target="_blank"
          rel="noreferrer"
        >
          Wikipedia
        </a>
        , which the timeline diagram in this puzzle is based off of.
      </p>
      <StyledTable>
        <tr>
          <th>Given Order</th>
          <th>Original Character</th>
          <th>Replaced By</th>
          <th>Letter</th>
          <th>Episode / Movie Name</th>
          <th>Series</th>
          <th>Air date</th>
        </tr>
        <tr>
          <td>1</td>
          <td>BONES</td>
          <td>BRULL</td>
          <td>B</td>
          <td>The City on the Edge of Forever</td>
          <td>The Original Series</td>
          <td>Apr 6 1967</td>
        </tr>
        <tr>
          <td>8</td>
          <td>SAREK</td>
          <td>TIRON</td>
          <td>R</td>
          <td>Yesteryear</td>
          <td>The Animated Series</td>
          <td>Sep 15 1973</td>
        </tr>
        <tr>
          <td>9</td>
          <td>SULU</td>
          <td>HUGH</td>
          <td>U</td>
          <td>The Voyage Home</td>
          <td>movie (The Original Series)</td>
          <td>Nov 26 1986</td>
        </tr>
        <tr>
          <td>12</td>
          <td>VASH</td>
          <td>ROSS</td>
          <td>S</td>
          <td>Captain’s Holiday</td>
          <td>The Next Generation</td>
          <td>Apr 2 1990</td>
        </tr>
        <tr>
          <td>2</td>
          <td>CRUSHER</td>
          <td>BOOTHBY</td>
          <td>H</td>
          <td>First Contact</td>
          <td>movie (The Next Generation)</td>
          <td>Nov 22 1996</td>
        </tr>
        <tr>
          <td>13</td>
          <td>WORF</td>
          <td>WINN</td>
          <td>W</td>
          <td>The Sound of Her Voice</td>
          <td>Deep Space Nine</td>
          <td>Jun 10 1998</td>
        </tr>
        <tr>
          <td>5</td>
          <td>PARIS</td>
          <td>DOLIM</td>
          <td>I</td>
          <td>Timeless</td>
          <td>Voyager</td>
          <td>Nov 18 1998</td>
        </tr>
        <tr>
          <td>10</td>
          <td>T’POL</td>
          <td>T’ANA</td>
          <td>T</td>
          <td>Carpenter Street</td>
          <td>Enterprise</td>
          <td>Nov 26 2003</td>
        </tr>
        <tr>
          <td>7</td>
          <td>RHYS</td>
          <td>KHAN</td>
          <td>H</td>
          <td>Light and Shadows</td>
          <td>Discovery</td>
          <td>Feb 28 2019</td>
        </tr>
        <tr>
          <td>4</td>
          <td>MURF</td>
          <td>CHEF</td>
          <td>F</td>
          <td>Time Amok</td>
          <td>Prodigy</td>
          <td>Jan 20 2022</td>
        </tr>
        <tr>
          <td>3</td>
          <td>GUINAN</td>
          <td>CRETAK</td>
          <td>A</td>
          <td>Watcher</td>
          <td>Picard</td>
          <td>Mar 24 2022</td>
        </tr>
        <tr>
          <td>11</td>
          <td>TENDI</td>
          <td>TUVOK</td>
          <td>T</td>
          <td>Crisis Point 2: Paradoxus</td>
          <td>Lower Decks</td>
          <td>Oct 13 2022</td>
        </tr>
        <tr>
          <td>6</td>
          <td>PIKE</td>
          <td>LORE</td>
          <td>E</td>
          <td>Those Old Scientists</td>
          <td>Strange New Worlds</td>
          <td>July 22 2023</td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;
