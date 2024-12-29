import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image_a from "./assets/Moon_A_final.png";
import image_d from "./assets/Moon_D_final.png";
import image_o from "./assets/Moon_O_final.png";
import image_y from "./assets/Moon_Y_final.png";

const Table = styled.table`
  display: inline-block;
  border-collapse: collapse;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  overflow-x: auto;
`;

const Cell = styled.td`
  width: 30px;
  min-width: 30px;
  height: 40px;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  vertical-align: center;
  background-color: #fff;
`;

const MarginDiv = styled.div`
  margin: 16px 0px;
`;

const RedCell = styled(Cell)`
  background-color: #f2c0c0;
`;
const BlueCell = styled(Cell)`
  background-color: #c6dbf0;
`;
const YellowCell = styled(Cell)`
  background-color: #fff1c1;
`;

const SpacerSpan = styled.span`
  display: inline-block;
  margin: 0px 32px;
`;

const Spacer = () => {
  return <SpacerSpan>&gt;&gt;&gt;&gt;&gt;&gt;</SpacerSpan>;
};

const MoonPathLabel = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Solution = () => {
  return (
    <>
      <p>
        This puzzle involves lunar features–seas, bays, lakes and marshes. Using
        the enumerations and partial cryptogram information given by the
        coloring, solvers determine which feeder answers are listed in the
        initial list of seven blanks. (They will notice that the feeders are
        presented in alphabetical order.) They then match each of these with one
        of the blanks from the bank below using the matching letters (indicated
        by color).
      </p>

      <p>
        Keeping in mind the flavortext (
        <em>
          “This public relations firm wants to make a <strong>sea</strong>{" "}
          change by <strong>phasing</strong> in a <strong>quick map</strong>ping
          of the right names.”
        </em>
        ), solvers find that the words here are the (English) names of seas,
        bays, lakes, and marshes on the moon (see{" "}
        <a href="https://en.wikipedia.org/wiki/List_of_maria_on_the_Moon">
          List of maria on the Moon
        </a>
        ), and that the Lunar Quickmap is a useful tool for locating these
        features. In the order presented, the lunar features are ordered by
        location north to south, providing extra confirmation that solvers found
        the correct ones. The filled in blanks with the full matching are shown
        below.
      </p>

      <MarginDiv>
        <div>1.</div>
        <RowDiv>
          <Table>
            <tbody>
              <tr>
                <Cell>F</Cell>
                <RedCell>E</RedCell>
                <Cell>L</Cell>
                <Cell>O</Cell>
                <Cell>N</Cell>
              </tr>
            </tbody>
          </Table>

          <Spacer />

          <Table>
            <tbody>
              <tr>
                <RedCell>E</RedCell>
                <Cell>P</Cell>
                <Cell>I</Cell>
                <Cell>D</Cell>
                <RedCell>E</RedCell>
                <Cell>M</Cell>
                <Cell>I</Cell>
                <Cell>C</Cell>
                <Cell>S</Cell>
              </tr>
            </tbody>
          </Table>
        </RowDiv>
      </MarginDiv>

      <MarginDiv>
        <div>2.</div>
        <RowDiv>
          <Table>
            <tbody>
              <tr>
                <Cell>F</Cell>
                <RedCell>I</RedCell>
                <BlueCell>S</BlueCell>
                <Cell>T</Cell>
                <BlueCell>S</BlueCell>
              </tr>
            </tbody>
          </Table>
          <Spacer />
          <Table>
            <tbody>
              <tr>
                <Cell>H</Cell>
                <Cell>A</Cell>
                <Cell>P</Cell>
                <Cell>P</Cell>
                <RedCell>I</RedCell>
                <Cell>N</Cell>
                <Cell>E</Cell>
                <BlueCell>S</BlueCell>
                <BlueCell>S</BlueCell>
              </tr>
            </tbody>
          </Table>
        </RowDiv>
      </MarginDiv>

      <MarginDiv>
        <div>3.</div>
        <RowDiv>
          <Table>
            <tbody>
              <tr>
                <Cell>L</Cell>
                <Cell>I</Cell>
                <Cell>S</Cell>
                <Cell>T</Cell>
                <RedCell>E</RedCell>
                <Cell>N</Cell>
              </tr>
            </tbody>
          </Table>
          <Spacer />
          <Table>
            <tbody>
              <tr>
                <Cell>H</Cell>
                <Cell>O</Cell>
                <Cell>P</Cell>
                <RedCell>E</RedCell>
              </tr>
            </tbody>
          </Table>
        </RowDiv>
      </MarginDiv>

      <MarginDiv>
        <div>4.</div>
        <RowDiv>
          <Table>
            <tbody>
              <tr>
                <Cell>M</Cell>
                <Cell>I</Cell>
                <Cell>L</Cell>
                <Cell>L</Cell>
                <Cell>I</Cell>
                <Cell>M</Cell>
                <RedCell>E</RedCell>
                <Cell>T</Cell>
                <RedCell>E</RedCell>
                <BlueCell>R</BlueCell>
                <Cell>S</Cell>
              </tr>
            </tbody>
          </Table>
          <Spacer />
          <Table>
            <tbody>
              <tr>
                <Cell>N</Cell>
                <RedCell>E</RedCell>
                <Cell>C</Cell>
                <Cell>T</Cell>
                <Cell>A</Cell>
                <BlueCell>R</BlueCell>
              </tr>
            </tbody>
          </Table>
        </RowDiv>
      </MarginDiv>

      <MarginDiv>
        <div>5.</div>
        <RowDiv>
          <Table>
            <tbody>
              <tr>
                <RedCell>R</RedCell>
                <Cell>E</Cell>
                <Cell>D</Cell>
                <BlueCell>B</BlueCell>
                <Cell>U</Cell>
                <Cell>C</Cell>
                <Cell>K</Cell>
                <Cell>E</Cell>
                <Cell>T</Cell>
              </tr>
            </tbody>
          </Table>
          <Spacer />
          <Table>
            <tbody>
              <tr>
                <RedCell>R</RedCell>
                <Cell>A</Cell>
                <Cell>I</Cell>
                <Cell>N</Cell>
                <BlueCell>B</BlueCell>
                <Cell>O</Cell>
                <Cell>W</Cell>
                <Cell>S</Cell>
              </tr>
            </tbody>
          </Table>
        </RowDiv>
      </MarginDiv>

      <MarginDiv>
        <div>6.</div>
        <RowDiv>
          <Table>
            <tbody>
              <tr>
                <Cell>R</Cell>
                <Cell>O</Cell>
                <Cell>U</Cell>
                <Cell>N</Cell>
                <Cell>D</Cell>
                <Cell>I</Cell>
                <Cell>N</Cell>
                <Cell>G</Cell>
                <RedCell>E</RedCell>
                <Cell>R</Cell>
                <Cell>R</Cell>
                <Cell>O</Cell>
                <Cell>R</Cell>
              </tr>
            </tbody>
          </Table>
          <Spacer />
          <Table>
            <tbody>
              <tr>
                <Cell>S</Cell>
                <Cell>L</Cell>
                <RedCell>E</RedCell>
                <RedCell>E</RedCell>
                <Cell>P</Cell>
              </tr>
            </tbody>
          </Table>
        </RowDiv>
      </MarginDiv>

      <MarginDiv>
        <div>7.</div>
        <RowDiv>
          <Table>
            <tbody>
              <tr>
                <RedCell>S</RedCell>
                <Cell>T</Cell>
                <Cell>P</Cell>
                <BlueCell>E</BlueCell>
                <Cell>T</Cell>
                <BlueCell>E</BlueCell>
                <YellowCell>R</YellowCell>
                <RedCell>S</RedCell>
                <Cell>B</Cell>
                <Cell>A</Cell>
                <RedCell>S</RedCell>
                <Cell>I</Cell>
                <Cell>L</Cell>
                <Cell>I</Cell>
                <Cell>C</Cell>
                <Cell>A</Cell>
              </tr>
            </tbody>
          </Table>
          <Spacer />
          <Table>
            <tbody>
              <tr>
                <RedCell>S</RedCell>
                <Cell>U</Cell>
                <Cell>M</Cell>
                <Cell>M</Cell>
                <BlueCell>E</BlueCell>
                <YellowCell>R</YellowCell>
              </tr>
            </tbody>
          </Table>
        </RowDiv>
      </MarginDiv>

      <p>
        Using the coordinates and plotting these on the (near side) of the moon,
        then tracing the paths given spells ODAY, as shown below. The flavortext
        (
        <em>
          They assure clients that if they pay attention to{" "}
          <strong>what the products are named for</strong>, sales are sure to
          take off.
        </em>
        ) hints that solvers should call in MARCUS O’DAY, for whom the O’Day
        crater is named.
      </p>

      <MarginDiv>
        <MoonPathLabel>(5→7→1→4→6→3→5)</MoonPathLabel>
        <LinkedImage
          src={image_o}
          alt="The moon, overlaid with yellow lines between several lunar maria.  The lines connecting them appear to form the letter O."
        />
      </MarginDiv>

      <MarginDiv>
        <MoonPathLabel>(1→5→6→4→1)</MoonPathLabel>
        <LinkedImage
          src={image_d}
          alt="The moon, overlaid with yellow lines between several lunar maria.  The lines connecting them appear to form the letter D."
        />
      </MarginDiv>

      <MarginDiv>
        <MoonPathLabel>(1→2→3→6→4) / (2→6)</MoonPathLabel>
        <LinkedImage
          src={image_a}
          alt="The moon, overlaid with yellow lines between several lunar maria.  The lines connecting them appear to form the letter A."
        />
      </MarginDiv>

      <MarginDiv>
        <MoonPathLabel>(5→2) / (3→2→1)</MoonPathLabel>
        <LinkedImage
          src={image_y}
          alt="The moon, overlaid with yellow lines between several lunar maria.  The lines connecting them appear to form the letter Y."
        />
      </MarginDiv>
    </>
  );
};

export default Solution;
