import React from "react";
import { styled } from "styled-components";

const Red = styled.span`
  color: red;
  font-weight: bold;
`;
const Green = styled.span`
  color: green;
  font-weight: bold;
`;
const Blue = styled.span`
  color: blue;
  font-weight: bold;
`;

const RedTD = styled.td`
  color: white;
  background-color: red;
`;
const GreenTD = styled.td`
  color: white;
  background-color: green;
`;
const BlueTD = styled.td`
  color: white;
  background-color: blue;
`;

const MutedTD = styled.td`
  background-color: darkgrey;
`;

const Solution = () => {
  return (
    <>
      <p>THIS SOLUTION NEEDS TO BE UPDATED WITH THE FINAL TITLES OF PUZZLES</p>

      <table>
        <thead>
          <tr>
            <th>Puzzle title</th>
            <th>Feeder answer</th>
            <th>Length</th>
            <th>RGB + Crayola Color</th>
            <th>R</th>
            <th>G</th>
            <th>B</th>
            <th>Codepoint</th>
            <th>Unicode character</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Red>U</Red>ndoing Wear and Tear
            </td>
            <td>
              <Blue>B</Blue>ATH BRICK
            </td>
            <td>9</td>
            <BlueTD>B + Brick (Red)</BlueTD>
            <MutedTD>198</MutedTD>
            <MutedTD>45</MutedTD>
            <BlueTD>66</BlueTD>
            <td>66</td>
            <td>B</td>
          </tr>
          <tr>
            <td>
              <Red>N</Red>urturing Flock
            </td>
            <td>
              <Blue>B</Blue>IRD ORCHID
            </td>
            <td>10</td>
            <BlueTD>B + Orchid</BlueTD>
            <MutedTD>226</MutedTD>
            <MutedTD>156</MutedTD>
            <BlueTD>210</BlueTD>
            <td>210</td>
            <td>Ò</td>
          </tr>
          <tr>
            <td>
              <Red>I</Red>ncreasing the Odds
            </td>
            <td>
              <Green>G</Green>REEDY PIGGY
            </td>
            <td>11</td>
            <GreenTD>G + Piggy (Pink)</GreenTD>
            <MutedTD>253</MutedTD>
            <GreenTD>215</GreenTD>
            <MutedTD>228</MutedTD>
            <td>215</td>
            <td>×</td>
          </tr>
          <tr>
            <td>
              <Red>C</Red>orner Kick
            </td>
            <td>
              <Red>R</Red>YAN FLAMINGO
            </td>
            <td>12</td>
            <RedTD>R + (Pink) Flamingo</RedTD>
            <RedTD>242</RedTD>
            <MutedTD>116</MutedTD>
            <MutedTD>253</MutedTD>
            <td>242</td>
            <td>ò</td>
          </tr>
          <tr>
            <td>
              <Red>O</Red>vergrowth
            </td>
            <td>
              <Blue>B</Blue>REGENZ FOREST
            </td>
            <td>13</td>
            <BlueTD>B + Forest (Green)</BlueTD>
            <MutedTD>95</MutedTD>
            <MutedTD>167</MutedTD>
            <BlueTD>119</BlueTD>
            <td>119</td>
            <td>w</td>
          </tr>
          <tr>
            <td>
              <Red>D</Red>ownright Backwards
            </td>
            <td>
              <Green>G</Green>UIANA CHESTNUT
            </td>
            <td>14</td>
            <GreenTD>G + Chestnut</GreenTD>
            <MutedTD>185</MutedTD>
            <GreenTD>78</GreenTD>
            <MutedTD>72</MutedTD>
            <td>78</td>
            <td>N</td>
          </tr>
          <tr>
            <td>
              <Red>E</Red>ducational Rite of Passage
            </td>
            <td>
              <Red>R</Red>AW ANTIQUE BRASS
            </td>
            <td>15</td>
            <RedTD>R + Antique Brass</RedTD>
            <RedTD>200</RedTD>
            <MutedTD>138</MutedTD>
            <MutedTD>101</MutedTD>
            <td>200</td>
            <td>È</td>
          </tr>
          <tr>
            <td>
              <Red>S</Red>ilent Protector
            </td>
            <td>
              <Green>G</Green>UARDIAN LAVENDER
            </td>
            <td>16</td>
            <GreenTD>G + Lavender</GreenTD>
            <MutedTD>251</MutedTD>
            <GreenTD>174</GreenTD>
            <MutedTD>210</MutedTD>
            <td>174</td>
            <td>®</td>
          </tr>
        </tbody>
      </table>

      <p>Solution steps:</p>
      <ol>
        <li>Sort by answer lengths (9 to 16).</li>
        <li>
          Read puzzle title first letters for instruction “<code>UNICODES</code>
          .” This confirms the sort method and will be useful in the final step.
        </li>
        <li>
          Recognize answers start with “R,” “G,” and “B,” hinting at RGB for the
          “Art Gallery.” This also implies you will somehow get colors.
        </li>
        <li>
          The flavor text indicates “shady.” Based on both “RGB” and “shady”,
          realize that the answer phrases (excluding their first word) all
          reference current Crayola Crayon standard colors (from the 120 colors
          or below sets). The names of the colors exclude the obvious color
          words like “pink,” “green,” “red,” etc. The wikipedia page{" "}
          <a href="https://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors">
            https://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors
          </a>{" "}
          is a helpful reference.
        </li>
        <li>
          Identify the RGB values for each color. Select the channel value
          matching the first letter of the answer. The other two color channel
          values are not used. For example, the RGB values for “R-word + (Pink)
          Flamingo” are (242, 88, 64). The R value is 242.
        </li>
        <li>
          Use the puzzle title first letter hint “<code>UNICODES</code>” and the
          two flavor text hints of “characters” and “supplement.” to look up the
          Unicode character corresponding to the color-selected codepoint.
          Specifically, you need to use the Unicode Basic Latin (normal
          alphabet) and Unicode Latin-1 Supplement, which together cover
          codepoints from 0 to 255. You can use the <code>CHAR()</code> function
          in Google Sheets to look up the character, or just find them among the
          list at{" "}
          <a href="https://en.wikipedia.org/wiki/List_of_Unicode_characters#Latin_script">
            https://en.wikipedia.org/wiki/List_of_Unicode_characters#Latin_script
          </a>
          .
        </li>
        <li>
          Doing this process for the eight feeder puzzles yields{" "}
          <code>BÒ× òwNÈ®</code>, from which you can visually extract the basic
          latin characters <code>BOX OWNER</code>.
        </li>
      </ol>
    </>
  );
};

export default Solution;
