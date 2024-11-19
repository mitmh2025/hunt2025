import React from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";

const ClueHead = styled.h3`
  margin: 0;
  padding: 0;
`;

export const GRID: string[][] = [
  [".", "1", ".", "2", ".", "3", ".", "4", ".", "5", ".", "6", "."],
  ["7", "", "", "", ".", "8", "", "", "", "", "", "", ""],
  [".", "", ".", "", ".", "", ".", "", ".", "", ".", "", "."],
  ["9", "", "", "", "", "", ".", "10", "", "", "", "", "11"],
  [".", "", ".", ".", ".", "", ".", "", ".", "", ".", ".", ""],
  ["12", "", "", "13", "", "", "", "", "", "", "", "", ""],
  ["", ".", ".", "", ".", ".", ".", ".", ".", "", ".", ".", ""],
  ["14", "", "", "", "", "15", "", "16", "", "", "", "17", ""],
  ["", ".", ".", "", ".", "", ".", "", ".", ".", ".", "", "."],
  ["18", "19", "", "", "", "", ".", "20", "", "21", "", "", ""],
  [".", "", ".", "", ".", "", ".", "", ".", "", ".", "", "."],
  ["22", "", "", "", "", "", "", "", ".", "23", "", "", ""],
  [".", "", ".", "", ".", "", ".", "", ".", "", ".", "", "."],
];

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        We packed some things extra full; now it’s your turn.
      </p>
      <Crossword labels={GRID} />

      <ClueHead>Across</ClueHead>
      <table>
        <tbody>
          <tr>
            <td>7.</td>
            <td>Alf’s oddly strong plower is what we’re crazy like</td>
          </tr>
          <tr>
            <td>8.</td>
            <td>Toxic blackthorn bush poisoned dear Leon</td>
          </tr>
          <tr>
            <td>9.</td>
            <td>Doogie actor initially had a rotten rating in entry sitcom</td>
          </tr>
          <tr>
            <td>10.</td>
            <td>Some lazily feign or enact neglect</td>
          </tr>
          <tr>
            <td>12.</td>
            <td>Honest bit in outrageous letter for hunk</td>
          </tr>
          <tr>
            <td>14.</td>
            <td>
              Display type of convertible, surprisingly last after market call
              conclusion
            </td>
          </tr>
          <tr>
            <td>18</td>
            <td>Investigate exotic headland arches</td>
          </tr>
          <tr>
            <td>20</td>
            <td>Wickerwork concerned exchanging rook for knight</td>
          </tr>
          <tr>
            <td>22</td>
            <td>Smile – it costs nothing after ring!</td>
          </tr>
          <tr>
            <td>23</td>
            <td>Aye, one Spanish cheer returned by degenerate race</td>
          </tr>
        </tbody>
      </table>

      <ClueHead>Down</ClueHead>
      <table>
        <tbody>
          <tr>
            <td>1.</td>
            <td>Recently, apartment in London taken by owner facing east</td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Lumberjack brings up former lover in Arkansas</td>
          </tr>
          <tr>
            <td>3.</td>
            <td>Steal back fin from bats or lads</td>
          </tr>
          <tr>
            <td>4.</td>
            <td>I feel strange after starting to relax, giving reprieve</td>
          </tr>
          <tr>
            <td>5.</td>
            <td>Captures diamonds packed up in purse ran sneakily</td>
          </tr>
          <tr>
            <td>6.</td>
            <td>
              Disheartened banker takes deed currency contents and it comes to a
              head
            </td>
          </tr>
          <tr>
            <td>11.</td>
            <td>Singing Merman blows top from biblical city</td>
          </tr>
          <tr>
            <td>12.</td>
            <td>
              Pot hot spots are coming back, almost like nightclubs on the edges
            </td>
          </tr>
          <tr>
            <td>13.</td>
            <td>Grays and beiges and tans rule assorted footwear</td>
          </tr>
          <tr>
            <td>15.</td>
            <td>
              A scale provided by Democrat reverend Al dropped 2000 pounds
            </td>
          </tr>
          <tr>
            <td>16.</td>
            <td>Shoot up stalwart alien</td>
          </tr>
          <tr>
            <td>17.</td>
            <td>
              When two hands meet in November, old love Loretta, forsaken,
              finally goes after a piece of tail
            </td>
          </tr>
          <tr>
            <td>19.</td>
            <td>God of love is upset over smell</td>
          </tr>
          <tr>
            <td>21.</td>
            <td>Leon is head over heels for Carol</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Puzzle;
