import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const PicrossTablesDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: bottom;
  justify-content: space-evenly;
`;

const PicrossTable = styled.table`
  border-collapse: collapse;
  th {
    font-family: "Roboto Mono", monospace;
  }
  thead th {
    border: none;
    text-align: center;
    vertical-align: bottom;
  }
  tbody th {
    border: none;
    text-align: right;
    vertical-align: middle;
  }
  td {
    width: 27px;
    height: 27px;
    border: 1px solid black;
  }
`;

const CenteredItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SquareTable = styled.table`
  margin: 8px;
  font-family: "Roboto Mono", monospace;
  border-collapse: collapse;
  td {
    width: 32px;
    height: 32px;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
  }

  td.lightyellow {
    background-color: #ffe;
  }
  td.yellow {
    background-color: #ff8;
  }
`;
const FilledCell = styled.td`
  background-color: #888;
`;

const Solution = () => {
  return (
    <>
      <p>
        The title and flavor text both include “cross,” and the flavor refers to
        two things that are crossing. Each line of text consists of two sets of
        five strings, the strings separated by commas and the sets separated by
        a semicolon. In each line, the total number of letters before and after
        the semicolon are equal.
      </p>
      <p>
        The first aha is that this structure can be interpreted as a
        non-standard presentation of a 5×5 nonogram/picross puzzle, an idea
        reinforced by “cross” and the structure of a picross puzzle being two
        crossing streams of information, in rows and columns. Rather than
        numbers giving contiguous lengths of filled squares, each filled square
        is given a letter, with spaces between contiguous blocks.
      </p>

      <p>
        Putting the lines of text into a more standard picross presentation:
      </p>

      <PicrossTablesDiv>
        <PicrossTable>
          <thead>
            <tr>
              <th></th>
              <th>A</th>
              <th>R</th>
              <th>
                L<br />Y<br />S<br />B<br />E
              </th>
              <th>U</th>
              <th>T</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">P</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">A</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">FIISI</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">A</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">L</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </PicrossTable>

        <PicrossTable>
          <thead>
            <tr>
              <th></th>
              <th>
                T<br />I<br />N
              </th>
              <th>S</th>
              <th>
                I<br />N<br />W<br />S<br />F
              </th>
              <th>S</th>
              <th>K</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">F C C</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">S GP</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">D C</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">PP</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">K</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </PicrossTable>

        <PicrossTable>
          <thead>
            <tr>
              <th></th>
              <th>
                N<br />
                <br />M
              </th>
              <th>
                I<br />G<br />H
              </th>
              <th>
                Q<br />L<br />
                <br />A
              </th>
              <th>
                H<br />A<br />N
              </th>
              <th>
                H<br />
                <br />G
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">D</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">EYQBE</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">W L</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">SQL</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">R L</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </PicrossTable>

        <PicrossTable>
          <thead>
            <tr>
              <th></th>
              <th>
                N<br />C<br />G
              </th>
              <th>
                C<br />
                <br />F
              </th>
              <th>
                K<br />N<br />K
              </th>
              <th>
                F<br />
                <br />T
              </th>
              <th>
                M<br />Z<br />R
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">B U</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">R U</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">TRFEA</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">I</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">YGC</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </PicrossTable>

        <PicrossTable>
          <thead>
            <tr>
              <th></th>
              <th>
                R<br />
                <br />N
              </th>
              <th>
                M<br />T
              </th>
              <th>
                E<br />B<br />H<br />E
              </th>
              <th>
                D<br />X<br />G
              </th>
              <th>
                E<br />A
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">QB</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">LHF</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">DNKF</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">HK</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">L K</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </PicrossTable>
      </PicrossTablesDiv>

      <p>
        Placing two letters in each square, one from a row clue and one from a
        column clue, the solved grids are:
      </p>

      <CenteredItems>
        <SquareTable>
          <tbody>
            <tr>
              <td />
              <td />
              <FilledCell>PL</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <FilledCell>AY</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <FilledCell>FA</FilledCell>
              <FilledCell>IR</FilledCell>
              <FilledCell>IS</FilledCell>
              <FilledCell>SU</FilledCell>
              <FilledCell>IT</FilledCell>
            </tr>
            <tr>
              <td />
              <td />
              <FilledCell>AB</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <FilledCell>LE</FilledCell>
              <td />
              <td />
            </tr>
          </tbody>
        </SquareTable>

        <SquareTable>
          <tbody>
            <tr>
              <FilledCell>FT</FilledCell>
              <td />
              <FilledCell>CI</FilledCell>
              <td />
              <FilledCell>CK</FilledCell>
            </tr>
            <tr>
              <FilledCell>SI</FilledCell>
              <td />
              <FilledCell>GN</FilledCell>
              <FilledCell>PS</FilledCell>
              <td />
            </tr>
            <tr>
              <FilledCell>DN</FilledCell>
              <td />
              <FilledCell>CW</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <FilledCell>PS</FilledCell>
              <FilledCell>PS</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <FilledCell>KF</FilledCell>
              <td />
              <td />
            </tr>
          </tbody>
        </SquareTable>

        <SquareTable>
          <tbody>
            <tr>
              <td />
              <td />
              <FilledCell>DQ</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <FilledCell>EN</FilledCell>
              <FilledCell>YI</FilledCell>
              <FilledCell>QL</FilledCell>
              <FilledCell>BH</FilledCell>
              <FilledCell>EH</FilledCell>
            </tr>
            <tr>
              <td />
              <FilledCell>WG</FilledCell>
              <td />
              <FilledCell>LA</FilledCell>
              <td />
            </tr>
            <tr>
              <td />
              <FilledCell>SH</FilledCell>
              <FilledCell>QA</FilledCell>
              <FilledCell>LN</FilledCell>
              <td />
            </tr>
            <tr>
              <FilledCell>RM</FilledCell>
              <td />
              <td />
              <td />
              <FilledCell>LG</FilledCell>
            </tr>
          </tbody>
        </SquareTable>

        <SquareTable>
          <tbody>
            <tr>
              <FilledCell>BN</FilledCell>
              <td />
              <td />
              <td />
              <FilledCell>UM</FilledCell>
            </tr>
            <tr>
              <FilledCell>RC</FilledCell>
              <td />
              <td />
              <td />
              <FilledCell>UZ</FilledCell>
            </tr>
            <tr>
              <FilledCell>TG</FilledCell>
              <FilledCell>RC</FilledCell>
              <FilledCell>FK</FilledCell>
              <FilledCell>EF</FilledCell>
              <FilledCell>AR</FilledCell>
            </tr>
            <tr>
              <td />
              <td />
              <FilledCell>IN</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <FilledCell>YF</FilledCell>
              <FilledCell>GK</FilledCell>
              <FilledCell>CT</FilledCell>
              <td />
            </tr>
          </tbody>
        </SquareTable>

        <SquareTable>
          <tbody>
            <tr>
              <td />
              <td />
              <td />
              <FilledCell>QD</FilledCell>
              <FilledCell>BE</FilledCell>
            </tr>
            <tr>
              <td />
              <td />
              <FilledCell>LE</FilledCell>
              <FilledCell>HX</FilledCell>
              <FilledCell>FA</FilledCell>
            </tr>
            <tr>
              <FilledCell>DR</FilledCell>
              <FilledCell>NM</FilledCell>
              <FilledCell>KB</FilledCell>
              <FilledCell>FG</FilledCell>
              <td />
            </tr>
            <tr>
              <td />
              <FilledCell>HT</FilledCell>
              <FilledCell>KH</FilledCell>
              <td />
              <td />
            </tr>
            <tr>
              <FilledCell>LN</FilledCell>
              <td />
              <FilledCell>KE</FilledCell>
              <td />
              <td />
            </tr>
          </tbody>
        </SquareTable>
      </CenteredItems>

      <p>
        The first of these grids forms a cross, appropriately, and the filled
        digraphs arranged in reading order read “
        <Mono>PLAYFAIR IS SUITABLE</Mono>.”
      </p>

      <p>
        The remaining four grids do not form legible messages. These are
        ciphered, and the first grid explains how to decipher them. The Playfair
        cipher must be used, and particularly a keyed Playfair cipher. The key
        for each grid is the tarot suit depicted in its arrangement of filled
        cells; along with cluing picross, the title and flavor are also
        tarot-themed, and the first grid’s message hints at the suits. The suits
        in order of the grids are <Mono>WANDS</Mono>, <Mono>PENTACLES</Mono>,{" "}
        <Mono>CUPS</Mono>, and <Mono>SWORDS</Mono>.
      </p>

      <p>
        Going along with the puzzle structure so far, the Playfair cipher
        encrypts and decrypts messages in two-letter chunks by use of a 5×5
        table of letters. As an example, a playfair grid keyed with{" "}
        <Mono>WANDS</Mono> would be
      </p>

      <CenteredItems>
        <SquareTable>
          <tbody>
            <tr>
              <td>W</td>
              <td>A</td>
              <td>N</td>
              <td>D</td>
              <td>S</td>
            </tr>
            <tr>
              <td>B</td>
              <td>C</td>
              <td>E</td>
              <td>F</td>
              <td>G</td>
            </tr>
            <tr>
              <td>H</td>
              <td>IJ</td>
              <td>K</td>
              <td>L</td>
              <td>M</td>
            </tr>
            <tr>
              <td>O</td>
              <td>P</td>
              <td>Q</td>
              <td>R</td>
              <td>T</td>
            </tr>
            <tr>
              <td>U</td>
              <td>V</td>
              <td>X</td>
              <td>Y</td>
              <td>Z</td>
            </tr>
          </tbody>
        </SquareTable>
      </CenteredItems>

      <p>Note that I and J are treated as identical.</p>

      <p>
        To decrypt a digraph, the two letters are found in the grid, then
        changed to letters in their respective rows that altogether form the
        four corners of a rectangle. For example, decoding the first digraph in
        the second grid, <Mono>FT</Mono>, results in <Mono>GR</Mono>
      </p>

      <CenteredItems>
        <SquareTable>
          <tbody>
            <tr>
              <td>W</td>
              <td>A</td>
              <td>N</td>
              <td>D</td>
              <td>S</td>
            </tr>
            <tr>
              <td>B</td>
              <td>C</td>
              <td>E</td>
              <td className="lightyellow">F</td>
              <td className="yellow">G</td>
            </tr>
            <tr>
              <td>H</td>
              <td>IJ</td>
              <td>K</td>
              <td>L</td>
              <td>M</td>
            </tr>
            <tr>
              <td>O</td>
              <td>P</td>
              <td>Q</td>
              <td className="yellow">R</td>
              <td className="lightyellow">T</td>
            </tr>
            <tr>
              <td>U</td>
              <td>V</td>
              <td>X</td>
              <td>Y</td>
              <td>Z</td>
            </tr>
          </tbody>
        </SquareTable>
      </CenteredItems>

      <p>
        If the letters of the digraph are in the same column, each is shifted up
        one row (wrapping around), and if in the same row, each is shifted left
        one column.
      </p>

      <p>Decrypting the four grids results in the messages:</p>

      <ul>
        <li>WANDS: Grace James Tanabata tale</li>
        <li>PENTACLES: Superboss in Golden Sun sequel</li>
        <li>CUPS: Chainsaw Man’s eldest Horseman</li>
        <li>SWORDS: Track five from The Allnighter</li>
      </ul>

      <p>These are clues with the answers</p>

      <ul>
        <li>WANDS: Star Lovers</li>
        <li>PENTACLES: Star Magician</li>
        <li>CUPS: Death Devil</li>
        <li>SWORDS: Lover’s Moon</li>
      </ul>

      <p>
        Give or take an apostrophe, these answers are each formed of two major
        arcana of the tarot. (Note: Golden Sun: The Lost Age contains four
        superbosses, but only one fits the answer constraint, which can be
        determined from the other three unambiguous answers.) The major arcana
        all have canonical numbering, with the names used to answer the clues
        pinning down the particular numbering used (the author referenced the
        Rider-Waite-Smith deck). These numbers can be taken as alphabetic
        indices, so that each clue gives another digraph.
      </p>

      <ul>
        <li>WANDS: QF</li>
        <li>PENTACLES: QA</li>
        <li>CUPS: MO</li>
        <li>SWORDS: FR</li>
      </ul>

      <p>
        <Mono>QFQAMOFR</Mono> is not legible, so in one final step, these
        digraphs must be put back in the original language of the puzzle by
        re-encrypting them through the same Playfair grids.
      </p>

      <ul>
        <li>WANDS: RE</li>
        <li>PENTACLES: UN</li>
        <li>CUPS: IT</li>
        <li>SWORDS: ED</li>
      </ul>

      <p>
        Taken in sequence, these form the answer to the puzzle:{" "}
        <PuzzleAnswer>REUNITED</PuzzleAnswer>, which is what the two halves of
        each digraph were after the picrosses were solved.
      </p>
    </>
  );
};

export default Solution;
