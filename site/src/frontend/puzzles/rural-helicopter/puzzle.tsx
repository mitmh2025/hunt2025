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

const StyledDiv = styled.div`
  display: block;
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
              <LinkedImage src={dog01} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 113</StyledDiv>
              <StyledDiv>
                Known Carrier: Achromatopsia, Cone degeneration 2
              </StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog02} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 6</StyledDiv>
              <StyledDiv>Known Carrier: BFJE</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog03} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 55</StyledDiv>
              <StyledDiv>Known Carrier: Chondrodysplasia</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog04} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 67</StyledDiv>
              <StyledDiv>Known Carrier: Craniomandibular Osteopathy</StyledDiv>
            </StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>
              <LinkedImage src={dog05} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 18</StyledDiv>
              <StyledDiv>Known Carrier: Degenerative Myelopathy</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog06} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 60</StyledDiv>
              <StyledDiv>
                Known Carrier: Dystrophic Epidermolysis Bullosa
              </StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog07} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 1</StyledDiv>
              <StyledDiv>Known Carrier: Ectodermal Dysplasia</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog08} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 27</StyledDiv>
              <StyledDiv>Known Carrier: Elliptocytosis</StyledDiv>
            </StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>
              <LinkedImage src={dog09} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 25</StyledDiv>
              <StyledDiv>Known Carrier: Familial Nephropathy</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog10} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 56</StyledDiv>
              <StyledDiv>Known Carrier: Hemophilia A</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog11} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 40</StyledDiv>
              <StyledDiv>Known Carrier: Hyperuricosuria</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog12} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 11</StyledDiv>
              <StyledDiv>Known Carrier: Hypoproconvertinemia</StyledDiv>
            </StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>
              <LinkedImage src={dog13} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 7</StyledDiv>
              <StyledDiv>Known Carrier: Inherited polyneuropathy</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog14} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 21</StyledDiv>
              <StyledDiv>Known Carrier: Osteogenesis imperfecta</StyledDiv>
            </StyledTableCell>
            <StyledTableCell>
              <LinkedImage src={dog15} alt={altText}></LinkedImage>
              <StyledDiv>Suspect ID: 30</StyledDiv>
              <StyledDiv>
                Known Carrier: Progressive early onset ataxia
              </StyledDiv>
            </StyledTableCell>
          </tr>
        </table>
      </p>
    </>
  );
};

export default Puzzle;
