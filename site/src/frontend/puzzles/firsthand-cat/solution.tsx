import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const Table = styled.table`
  border-collapse: collapse;
  margin: 10px;
  td,
  th {
    text-align: center;
    vertical-align: middle;
    border: 1px solid #ccc;
    border-collapse: collapse;
    padding: 4px;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        The puzzle asks you to find a way to pair pokemon together in order to
        beat each opponent. Each pokemon is unevolved; the mechanism of evolving
        the pokemon provides a mechanism to transform a word. If you use that
        transformation on another pokemon’s nickname, you can get a word related
        to each pokemon trainer’s title. Taking the shared letters of the result
        and the name, and ordering by shared pokemon, gives the final answer:{" "}
        <PuzzleAnswer>CHOKING HAZARD</PuzzleAnswer>
      </p>
      <HScrollTableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Pokémon 1</th>
              <th>Pokémon 2</th>
              <th>Transformation</th>
              <th>Result</th>
              <th>Title</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DIAL the Smoliv</td>
              <td>KHAN the Paras</td>
              <td>Append ECT to the end</td>
              <td>
                <Mono>DIALECT</Mono>
              </td>
              <td>Linguist</td>
              <td>Jessica</td>
              <td>C</td>
            </tr>
            <tr>
              <td>KHAN the Paras</td>
              <td>EEPY the Staryu</td>
              <td>Replace end with phonetic opposite</td>
              <td>
                <Mono>COUGH</Mono>
              </td>
              <td>Allergist</td>
              <td>Sarah</td>
              <td>H</td>
            </tr>
            <tr>
              <td>EEPY the Staryu</td>
              <td>DRIB the Phanpy</td>
              <td>Remove PY from the end, add DON to the front</td>
              <td>
                <Mono>DONEE</Mono>
              </td>
              <td>Beneficiary</td>
              <td>Sofia</td>
              <td>O</td>
            </tr>
            <tr>
              <td>DRIB the Phanpy</td>
              <td>SIN the Ekans</td>
              <td>Reverse word, take example, reverse, C → K</td>
              <td>
                <Mono>WORK</Mono>
              </td>
              <td>Laborer</td>
              <td>Puck</td>
              <td>K</td>
            </tr>
            <tr>
              <td>SIN the Ekans</td>
              <td>ANNA the Natu</td>
              <td>N → X</td>
              <td>
                <Mono>SIX</Mono>
              </td>
              <td>West End Actress</td>
              <td>Pip</td>
              <td>I</td>
            </tr>
            <tr>
              <td>ANNA the Natu</td>
              <td>GAIT the Girafarig</td>
              <td>Invert Palindrome</td>
              <td>
                <Mono>NAAN</Mono>
              </td>
              <td>Breadmaker</td>
              <td>John</td>
              <td>N</td>
            </tr>
            <tr>
              <td>GAIT the Girafarig</td>
              <td>HAIG the Aipom</td>
              <td>AI → AMBI</td>
              <td>
                <Mono>GAMBIT</Mono>
              </td>
              <td>Chess Master</td>
              <td>Glinda</td>
              <td>G</td>
            </tr>
            <tr>
              <td>HAIG the Aipom</td>
              <td>PAL the Piplup</td>
              <td>I → RIN</td>
              <td>
                <Mono>HARING</Mono>
              </td>
              <td>Street Artist</td>
              <td>Huxley</td>
              <td>H</td>
            </tr>
            <tr>
              <td>PAL the Piplup</td>
              <td>ZAP the Dunsparce</td>
              <td>Duplicate first Two Letters</td>
              <td>
                <Mono>PAPAL</Mono>
              </td>
              <td>Cardinal</td>
              <td>Mario</td>
              <td>A</td>
            </tr>
            <tr>
              <td>ZAP the Dunsparce</td>
              <td>OPEN the Kabuto</td>
              <td>Append PS to the end</td>
              <td>
                <Mono>ZAPPS</Mono>
              </td>
              <td>Potato Chip Fan</td>
              <td>Zelda</td>
              <td>Z</td>
            </tr>
            <tr>
              <td>OPEN the Kabuto</td>
              <td>JASPER the Abra</td>
              <td>Second word in magic phrase</td>
              <td>
                <Mono>SESAME</Mono>
              </td>
              <td>Tahini Vendor</td>
              <td>Girard</td>
              <td>A</td>
            </tr>
            <tr>
              <td>JASPER the Abra</td>
              <td>SMALE the Jigglypuff</td>
              <td>J → W, P → T</td>
              <td>
                <Mono>WASTER</Mono>
              </td>
              <td>Slacker</td>
              <td>Arthur</td>
              <td>R</td>
            </tr>
            <tr>
              <td>SMALE the Jigglypuff</td>
              <td>DIAL the Smoliv</td>
              <td>SM → D, L → LL</td>
              <td>
                <Mono>DALLE</Mono>
              </td>
              <td>AI Researcher</td>
              <td>Debra</td>
              <td>D</td>
            </tr>
          </tbody>
        </Table>
      </HScrollTableWrapper>
    </>
  );
};
export default Solution;
