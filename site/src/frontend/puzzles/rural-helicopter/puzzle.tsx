import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import dog01 from "./assets/dog01.png";
import dog02 from "./assets/dog02.png";
import dog03 from "./assets/dog03.png";
import dog04 from "./assets/dog04.png";
import dog05 from "./assets/dog05.png";
import dog06 from "./assets/dog06.png";
import dog07 from "./assets/dog07.png";
import dog08 from "./assets/dog08.png";
import dog09 from "./assets/dog09.png";
import dog10 from "./assets/dog10.png";
import dog11 from "./assets/dog11.png";
import dog12 from "./assets/dog12.png";
import dog13 from "./assets/dog13.png";
import dog14 from "./assets/dog14.png";
import dog15 from "./assets/dog15.png";

const MonoParagraph = styled.p`
  font-family: "Roboto Mono", monospace;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const StyledTableCell = styled.td`
  border: 2px solid black;
  padding: 4px;
  max-width: 240px;
  text-align: center;
`;

const Puzzle = () => {
  const altText = "a dog";
  return (
    <>
      <p className="puzzle-flavor" style={{ fontStyle: "normal" }}>
        The blasted animals got to him. Which of these <em>familiar canines</em>{" "}
        was the one to do him in?
      </p>
      <MonoParagraph>
        {">"}kennel
        CGATATTACTCAAGCTTCATTAATCTGGAGAGAGATCTAGCTTCAGGACTCATTGGCCCTCTTCTCATCTACTACAAAGAATCTGTAGATCAAAGAGGAAACCAGATGATGTCAGACAAGAGAAATGTCATCCTGTTTTCTGTATTTGATGAGAATCGAAGCTGGTACCTCACAGAGAATATGCAGCGCTTCCTCCCCAATGCAGATGTAGTGCAGCCCCATGACCCAGAGTTCCAACTCTCTAACATCATGCACA
        <br />
        {">"}kennel
        GATGGAGGCATCTCGCTCAGCGTGCTCCCCATGTACCTGAATGAGATCTCACCCAAGGAGATCCGTGGCGCTCTGGGGCAGGTGACTGCCATCTTCATCTTCATCGGTGTGTTCACCGGGCAGCTGCTGGGCCTGCCTGAGCTGCTGGGGAAGGAGAGCACCTGGCCATACCTGTTTGGAGTGATTGCTGTCCCCGCCTTGGTCCAGCTGGTGAGCCTGCCCTTTCTCCCTGAGAGCCCGCGCTTCCTGCTCTTTG
        <br />
        {">"}kennel
        GAAGCAGCTATTCAAAAAATTCAAGGAGATTTACGTGCAGGCCCCTCGCTGCTTCACGGCGGTCTCCACTGACAGGAGAGATTTCTTTTTTGCATCCAGTTTCAAAGGGAAAACATAGATTTTCGAGCACATAGTCGTTGACTTAAGTTTGTGAAGGGGGTGATGGGGGCCTTTAAAGATGTGTAGCCCTGGCTTAGAAGCAAATGGAAAGCCAAGTTCAGAGCTCTCAAATTAAGGACGCATTTGGGGAAATAGA
        <br />
        {">"}kennel
        CCTGGGAACTCACCAGAGCCTGAAGGGCAATGCAAAGGCACTCTCCACTGTCACGGCCATCATCGATGGCACTGGGTCCATAGGTGCGGCTCTGGGGCCTCTGCTGGCTGGGCTGATCTCCCCCACAGGCTGGAACAATGTCTTCTACATGCTCATCTCTGCCGACATTCTGGCCTGCCTGCTCCTCTGCCGGTTGGTGTACAAAGAGATCCTAGCCTGGAAGTCATTCCTGAACAGAGACAGAGGCTCTAGTCTG
        <br />
        {">"}kennel
        GAAGACGGGCACGTCGGGCCGCCAGCGCGTGCAGGAGCAGGTGATGATGACCGTCAAGCGGCAGAAGTCCAAGTCCTCGCAGTCGTCCACCCTGAGCCACTCCAACCGAGCTTCCATGTACGATGGCCTGGCCGACAATTACAACAACTATGGGACCACCAGCCGGAGCAGCTACTACTCCAAGATGCAGGCGGCGAATGGCTCATGGGGATATCCGATCTACAACGGGACCCTCAAGCGGGAGAATGACAACAGG
        <br />
        {">"}kennel
        TGTTACTGGAAGTGTGCCAGTTCTCGAGGGACGCGTCCGTGGCCGAAGCGTGGTTGATTGCCCAGGAGCCCTACCTGGCCAGCCGGGACTTTGGACACATGGTGGATAGTGTGGAGAAGCTGATCAGGAGGCATGAGGCTTTTGAGAAATCCACAGCCAGCTGGGCGGAGCGCTTCGCTGCCCTGGAGAAGCCCACTACGCTGGAGCTAAAAGAACGCCAGACCCCAGAGAGACCCGAGGAGGAGAGTGGGCCTCA
        <br />
        {">"}kennel
        CTGCCTCTCAGGGCTATACCGTGGCTAGAATTAAGCTTGGAGACTACCATTTCTATGGCTTTGGCACTGACGTAGACTACGAGACTGCATTTATTCATTATCGCCTAGCACCTGAGCAGCAACACAGTGCACAAGCTATGTTTAATCTGGGATATATGCATGAGAAAGGACTAGGCATTAAACAGGATATTCACCTTGCAAAACGTTTTTATGACATGGCAGCTGAAGCCAGCCCAGACGCCCAAGTACCAGTCTT
        <br />
        {">"}kennel
        GGTGCTAAGGGTGAAGCTGGTCCCCAAGGAGCCCGTGGCTCTGAAGGTCCCCAGGGCGTGCGTGGTGAGCCCGGCCCCCCTGGCCCTGCTGGTGCTGCCGGCCCTGCCGCAAACCCCGGTGCTGATGGACAGCCTGGTGCTAAAGGTGCTAACGGCGCTCCTGGCATTGCTGGTGCTCCCGGCTTCCCCGGTGCCCGAGGCCCCTCTGGACCCCAGGGCCCCAGCGGTCCTCCTGGTCCCAAGGGTAACAGCGGTG
        <br />
        {">"}crime_scene
        TTCAACTCTGAGGACATGCAGGAGATCACACAGCACTTCGCCGTCTGCCATGTGGATGCCCCTGTCCAGCAGGACGGCGCTGCCTCCTTCCCTGTGGGGTACATGTACCCCTCCATGGACCAGCTGGCCGAGATGCTTCCTGGAGTCCTCCACCAGTTTGGGCTGAAAAGCATCATTGGCATGGGAACTGGAGCAGGCGCCTACATCCTCACTCGGTTTGCTCTGAACAACCCCGAGATGGTGGAGGGCCTCGTCC
        <br />
        {">"}crime_scene
        ACCAGCCATCAGTGTGGTTCAGAAGAACTGCAGCCGGCGAGGCCAAGAGGCAGCCTGCCTTTCTGCGGCCCTTTGCTTCCAAGTGACCTCTCGCACTCCTGGCCGCTGGAATCGCTGATTCTATTTGCGGTTTACAGCATCACTAGATGAGTGGACGGCAGGGGCGCGGGCTGTGTTTGATGGCTCTGGCCAGAGGCTGTCCCCTCGGAGGCTCCAGCTCAGCGTAGGGAATGTCACCTGTGAGCAGCTGCGCTTC
        <br />
        {">"}crime_scene
        CCCCCCAGGCCTCCCAGGGCAGATGGGCCCTTCTGGCCAGGGTTTTCCTGGGGTTCCGGGAAACACAAGCCCTAAGGGTGACCGTGGGGACACCGGACCCAAAGGGGAACAGGGCCTCCCTGGAGAGCGTGGCCTGAGAGGAGATCCTGGAAGTGTGGGGAATGTGGAGCGGTTGCTGGAAACTATTGGCATCAAGACGTCTGCCCTGCGGGAGATTGTGGAGACCTGGGATGAGAGCTCTGGCAGCTTCCTGCCC
        <br />
        {">"}crime_scene
        CTCCTGTGAGGACCAGCTCCAGTCCTACATCTGCTTCTGCCCCGATGACTTCCAGGGCCGGAACTGTGAGACAGATAAGAAGGACCAGCTGATCTGTATGAATGAGAATGAAGGCTGTCAGCAGTACTGCAGTGACCACGCAGAGGCCAGGCGTTCCTGCTGGTGCCACGAGGGGTACACGCTCCAAGACGATGGAGTGTCCTGCATGCCCATAGTGGAATATCCGTGTGGAAAAATACCTGTTCTGGAGAAGAGA
        <br />
        {">"}crime_scene
        TCAGTAAGGTGTTCATTCAGGTGGATCAAGCCCTTGGCCAGAGATCCCTGGTCACTTATATTTATCCTCTTTTCTGTACAACATGCATATGGGAGTGGAAAGTAGTTTGTCGGCCCCTGTGGAGGAAGAGATTGCTCGGTGTGCCATTGCTTTCCTGAAAAAGGGTCTCGGGGTCAACCAGGACCGCCGGGGCCACAGGGTCCCATTGGACCCCTGGGACTGCCAGGACCCACAGGAATTCCAGGAGAGAAAGGGA
        <br />
        {">"}crime_scene
        CCATATCAAACACCAGACAACACACACTACTGGTTTATTACAGACATCACATGTGATATCATCTACCTTTGTAATATGCTATTAATCCAGCCCAGACTCCAGTTTATAAAAGGAGGAGACATAATGGTGGATTCAAATGAGTTAAAGAGACACTACAGGAGCTCTACAAAATTTCAGTTGGATGTTGCGTCAGTAATGCCATTTGATGTTTTTTACCTCTTCTTTGGGTTTAATCCAGTATTTAGGATGAATAGGA
        <br />
        {">"}crime_scene
        CACCATCCACTTCGTGCAGAAGGGAAGTGGGCCTGTTGTGGTATCAGGAACCATTACAGGGCTGACTAAAGGCGAGCATGGATTCCACGTCCATCAGTTTGAAGATAANACACAAGGCTGTACTAGTGCAGGTCCTCACTTTAATCCTCTGTCCAAAAAACATGGTGGGCCAAAAGATCAAGAGAGGCATGTTGGAGACCTGGGCAATGTGACTGCTGGCAAGGATGGCGTGGCCATTGTGTCCATAGAAGATTCT
      </MonoParagraph>

      <p>
        <h2>Suspect list:</h2>
        <table>
          <tr>
            <StyledTableCell>
              <LinkedImage src={dog01} alt={altText}></LinkedImage>Suspect ID:
              113 <br />
              Known Carrier: Achromatopsia, Cone degeneration 2
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog02} alt={altText}></LinkedImage>Suspect ID: 6
              <br />
              Known Carrier: BFJE
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog03} alt={altText}></LinkedImage>Suspect ID:
              55 <br />
              Known Carrier: Chondrodysplasia
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog04} alt={altText}></LinkedImage>Suspect ID:
              67 <br />
              Known Carrier: Craniomandibular Osteopathy
            </StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>
              <LinkedImage src={dog05} alt={altText}></LinkedImage>Suspect ID:
              18 <br />
              Known Carrier: Degenerative Myelopathy
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog06} alt={altText}></LinkedImage>Suspect ID:
              60 <br />
              Known Carrier: Dystrophic Epidermolysis Bullosa
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog07} alt={altText}></LinkedImage>Suspect ID: 1
              <br />
              Known Carrier: Ectodermal Dysplasia
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog08} alt={altText}></LinkedImage>Suspect ID:
              27 <br />
              Known Carrier: Elliptocytosis
            </StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>
              <LinkedImage src={dog09} alt={altText}></LinkedImage>Suspect ID:
              25 <br />
              Known Carrier: Familial Nephropathy
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog10} alt={altText}></LinkedImage>Suspect ID:
              56 <br />
              Known Carrier: Hemophilia A
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog11} alt={altText}></LinkedImage>Suspect ID:
              40 <br />
              Known Carrier: Hyperuricosuria
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog12} alt={altText}></LinkedImage>Suspect ID:
              11 <br />
              Known Carrier: Hypoproconvertinemia
            </StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>
              <LinkedImage src={dog13} alt={altText}></LinkedImage>Suspect ID: 7
              <br />
              Known Carrier: Inherited polyneuropathy
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog14} alt={altText}></LinkedImage>Suspect ID:
              21
              <br />
              Known Carrier: Osteogenesis imperfecta
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog15} alt={altText}></LinkedImage>Suspect ID:
              30
              <br />
              Known Carrier: Progressive early onset ataxia
            </StyledTableCell>
          </tr>
        </table>
      </p>
    </>
  );
};

export default Puzzle;
