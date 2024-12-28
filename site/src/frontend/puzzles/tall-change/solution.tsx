import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";

const TableCell = styled.td`
  border: 2px solid grey;
  padding: 12px;
`;

const Solution = () => {
  return (
    <>
      <p>
        You’re shown a bunch of dresses. The puzzle title “Mitropolitan House of
        Fashion” should clue that the puzzlers should identify the house of
        fashion that made each dress.
      </p>
      <p>
        Below the dresses are some garment bags with spaces for letters. The
        garment bags are grouped, with symbols above the groups. The symbols
        should clue Met gala themes from 2024 to 2017 (see above).{" "}
      </p>
      <p>
        The icons along with the number of blanks will unambiguously indicate
        where the designers fit in the grid. All the information about the
        outfits, the designers, and which MET gala it was worn to is shown in
        the table at the bottom of this solution.{" "}
      </p>
      <p>
        After entering everything into the garment bags, the puzzler should see
        this: <table></table>
      </p>

      <p>
        Reading the highlighted letters in column-then-row order, you get the
        clue phrase “WHO WORE THAT”.{" "}
      </p>
      <p>
        This clues that you should use the names of the celebrity that wore the
        outfit. Reading the first letters of the celebrity names in the order
        given by the garment bags, you get the phrase WORK IT AT OUR GALA.
      </p>
      <p>
        After going to the gala and suitably working it, puzzlers were given the
        answer <strong>SERENDIP SANCTUARY</strong>.
      </p>
      <h3>Summary Diagram</h3>
      <p>
        (given in a garment bag order){" "}
        <table>
          <th>
            <tr>
              <TableCell>Look</TableCell>
              <TableCell>Theme Icon</TableCell>
              <TableCell>Theme name and date</TableCell>
              <TableCell>Designer</TableCell>
              <TableCell>Celebrity</TableCell>
            </tr>
          </th>
          <tbody>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                Rei Kawakubo/Comme des Garçons: Art of the In-Between 2017
              </TableCell>
              <TableCell>Thom Browne</TableCell>
              <TableCell>Wiz Khalifa</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                Rei Kawakubo/Comme des Garçons: Art of the In-Between 2017
              </TableCell>
              <TableCell>Burberry</TableCell>
              <TableCell>Olivia Cooke</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                Heavenly Bodies: Fashion and the Catholic Imagination 2018
              </TableCell>
              <TableCell>Maison Margiela</TableCell>
              <TableCell>Rihanna</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                Heavenly Bodies: Fashion and the Catholic Imagination 2018
              </TableCell>
              <TableCell>Versace</TableCell>
              <TableCell>Kim Kardashian</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>In America: A Lexicon of Fashion 2021</TableCell>
              <TableCell>Dolce & Gabbana</TableCell>
              <TableCell>Iman</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>In America: A Lexicon of Fashion 2021</TableCell>
              <TableCell>Haider Ackermann</TableCell>
              <TableCell>Timothee Chalamet</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Karl Lagerfeld: A Line of Beauty 2023</TableCell>
              <TableCell>Versace</TableCell>
              <TableCell>Anne Hathaway</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Karl Lagerfeld: A Line of Beauty 2023</TableCell>
              <TableCell>Robert Wun</TableCell>
              <TableCell>Tems</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Sleeping Beauties: Reawakening Fashion 2024</TableCell>
              <TableCell>Balmain</TableCell>
              <TableCell>Olivier Rousteing</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Sleeping Beauties: Reawakening Fashion 2024</TableCell>
              <TableCell>Tory Burch</TableCell>
              <TableCell>Uma Thurman</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>In America: An Anthology of Fashion 2022</TableCell>
              <TableCell>Givenchy</TableCell>
              <TableCell>Rosalia</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>In America: An Anthology of fashion 2022</TableCell>
              <TableCell>Versace</TableCell>
              <TableCell>Gigi Hadid</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Camp: Notes on Fashion 2019</TableCell>
              <TableCell>Thom Browne</TableCell>
              <TableCell>Amy Fine Collins</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Camp: Notes on Fashion 2019</TableCell>
              <TableCell>Brandon Maxwell</TableCell>
              <TableCell>Lady Gaga</TableCell>
            </tr>
            <tr>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Camp: Notes on Fashion 2019</TableCell>
              <TableCell>Altuzarra</TableCell>
              <TableCell>Awkwafina</TableCell>
            </tr>
          </tbody>
        </table>
      </p>
    </>
  );
};

export default Solution;
