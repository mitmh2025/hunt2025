import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import image01 from "./assets/1.png";

const HighlightSpan = styled.span`
  background: yellow;
`;

const StyledTableCell = styled.td`
  border: 2px solid grey;
  padding: 12px;
`;

const StyledTableHeaderCell = styled.th`
  border: 2px solid grey;
  padding: 12px;
`;

const Solution = () => {
  return (
    <>
      <p>
        The title: “Paw Print Detective” clues Paw Print Genetics which is the
        canonical dataset for this puzzle.
      </p>
      <p>
        In the flavor we note “The <HighlightSpan>blasted</HighlightSpan>{" "}
        animals got to him. Which of these{" "}
        <em>
          <HighlightSpan>familiar canines</HighlightSpan>
        </em>{" "}
        was the one to do him in?”
      </p>
      <p>
        This suggests an approach to use BLAST on the provided sequences and
        focus on the results pertaining to <em>Canis familiaris</em> otherwise
        known as dog. The italics in the flavor hint at genus and species which
        are commonly italicized. The paw print in the tile and the images of the
        suspects clue this as well.
      </p>
      <p>
        Using BLAST on the sequence and observing the highest scoring hit gives
        you an output that looks like this (using the first sequence as an
        example):
      </p>
      <LinkedImage
        src={image01}
        alt="a genetic sequence and various information is displayed after applying BLAST to the sequence "
      ></LinkedImage>
      <p>
        There are a few things to notice:{" "}
        <ol>
          <li>Each sequence is 256 in length</li>
          <li>
            There is a single mismatch in the given sequence relative to the
            database
          </li>
          <li>
            The sequenece matches extremely well to an mRNA of a real gene
          </li>
        </ol>
      </p>
      <p>
        Using facts 1 and 2, you can interpret each string as a 256 letter
        string where location of the mismatch can be mapped to a letter using
        ASCII encoding. In order to sort the resulting letters in the correct
        order, solvers must determine which dog each sequence maps to for which
        we consult our suspect cards. Each suspect is listed as a carrier for a
        particular disease. Googling the diseases together with “dog or paw
        print” should help you arrive at Paw Print Genetics pages associated
        with these diseases.The final aha is that the provided mutation is the
        causal genetic variant which is associated with the disease. For
        instance, Hemophilia A is caused, in German Shepards, by a genetic
        mutation on chromosome X which is a G -{">"} A substitution in the
        Coagulation Factor F8 gene. This exact mutation is given in the sequence
        and could be linked by the chromosomal position or gene name match. The
        suspect image signifies a specific breed which can be used as a
        disambiguation (in cases where multiple mutations cause the same gene
        phenotype) and confirmation of the causal mutation. The image is of one
        of the dog breeds where this mutation has been identified by
        researchers. For confirmation that you got the correct genes you may
        note that the chromosomal coordinates of the genes are given in
        increasing chromosome order: X, then 1-31. Compiling this information
        for each sequence results in the following table:
      </p>
      <table>
        <thead>
          <tr>
            <StyledTableHeaderCell>Sequence #</StyledTableHeaderCell>
            <StyledTableHeaderCell>Gene</StyledTableHeaderCell>
            <StyledTableHeaderCell>Disease</StyledTableHeaderCell>
            <StyledTableHeaderCell>Breed</StyledTableHeaderCell>
            <StyledTableHeaderCell>Position of Mutation</StyledTableHeaderCell>
            <StyledTableHeaderCell>ASCII Letter</StyledTableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StyledTableCell>1</StyledTableCell>
            <StyledTableCell>F8</StyledTableCell>
            <StyledTableCell>Hemophilia A</StyledTableCell>
            <StyledTableCell>German Shepherd</StyledTableCell>
            <StyledTableCell>71</StyledTableCell>
            <StyledTableCell>G</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>2</StyledTableCell>
            <StyledTableCell>SLC2A9</StyledTableCell>
            <StyledTableCell>Hyperuricosuria</StyledTableCell>
            <StyledTableCell>Yorkie-Poo</StyledTableCell>
            <StyledTableCell>101</StyledTableCell>
            <StyledTableCell>e</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>3</StyledTableCell>
            <StyledTableCell>LGI2</StyledTableCell>
            <StyledTableCell>BFJE</StyledTableCell>
            <StyledTableCell>Lagotto Romagnolo</StyledTableCell>
            <StyledTableCell>116</StyledTableCell>
            <StyledTableCell>t</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>4</StyledTableCell>
            <StyledTableCell>SLC37A2</StyledTableCell>
            <StyledTableCell>Craniomandibular Osteopathy</StyledTableCell>
            <StyledTableCell>Labradoodle</StyledTableCell>
            <StyledTableCell>67</StyledTableCell>
            <StyledTableCell>C</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>5</StyledTableCell>
            <StyledTableCell>PKP1</StyledTableCell>
            <StyledTableCell>Ectodermal Dysplasia</StyledTableCell>
            <StyledTableCell>Chesapeake Bay Retriever</StyledTableCell>
            <StyledTableCell>111</StyledTableCell>
            <StyledTableCell>o</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>6</StyledTableCell>
            <StyledTableCell>SPTB</StyledTableCell>
            <StyledTableCell>Elliptocytosis</StyledTableCell>
            <StyledTableCell>Chow Chow</StyledTableCell>
            <StyledTableCell>100</StyledTableCell>
            <StyledTableCell>d</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>7</StyledTableCell>
            <StyledTableCell>SEL1L</StyledTableCell>
            <StyledTableCell>Progressive early onset ataxia</StyledTableCell>
            <StyledTableCell>Beagle</StyledTableCell>
            <StyledTableCell>111</StyledTableCell>
            <StyledTableCell>o</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>8</StyledTableCell>
            <StyledTableCell>COL1A1</StyledTableCell>
            <StyledTableCell>Osteogenesis imperfecta</StyledTableCell>
            <StyledTableCell>Golden Retriever</StyledTableCell>
            <StyledTableCell>110</StyledTableCell>
            <StyledTableCell>n</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>9</StyledTableCell>
            <StyledTableCell>NDRG1</StyledTableCell>
            <StyledTableCell>Inherited polyneuropathy</StyledTableCell>
            <StyledTableCell>Alaskan Husky</StyledTableCell>
            <StyledTableCell>65</StyledTableCell>
            <StyledTableCell>A</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>10</StyledTableCell>
            <StyledTableCell>ITGA10</StyledTableCell>
            <StyledTableCell>Chondrodysplasia</StyledTableCell>
            <StyledTableCell>Karelian Bear Dog</StyledTableCell>
            <StyledTableCell>116</StyledTableCell>
            <StyledTableCell>t</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>11</StyledTableCell>
            <StyledTableCell>COL7A1</StyledTableCell>
            <StyledTableCell>Dystrophic Epidermolysis Bullosa</StyledTableCell>
            <StyledTableCell>Goldendoodle</StyledTableCell>
            <StyledTableCell>68</StyledTableCell>
            <StyledTableCell>D</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>12</StyledTableCell>
            <StyledTableCell>F7</StyledTableCell>
            <StyledTableCell>Hypoproconvertinemia</StyledTableCell>
            <StyledTableCell>Beagle</StyledTableCell>
            <StyledTableCell>111</StyledTableCell>
            <StyledTableCell>o</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>13</StyledTableCell>
            <StyledTableCell>COL4A4</StyledTableCell>
            <StyledTableCell>Familial Nephropathy</StyledTableCell>
            <StyledTableCell>English Cocker Spaniel</StyledTableCell>
            <StyledTableCell>103</StyledTableCell>
            <StyledTableCell>g</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>14</StyledTableCell>
            <StyledTableCell>CNGB3</StyledTableCell>
            <StyledTableCell>
              Achromatopsia, Cone degeneration 2
            </StyledTableCell>
            <StyledTableCell>German Shorthaired Pointer</StyledTableCell>
            <StyledTableCell>73</StyledTableCell>
            <StyledTableCell>I</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>15</StyledTableCell>
            <StyledTableCell>SOD1</StyledTableCell>
            <StyledTableCell>Degenerative Myelopathy</StyledTableCell>
            <StyledTableCell>Australian Stumpy Tail Cattle Dog</StyledTableCell>
            <StyledTableCell>68</StyledTableCell>
            <StyledTableCell>D</StyledTableCell>
          </tr>
        </tbody>
      </table>
      <p>
        This reads, in sequence order, <Mono>GET CODON AT DOG ID</Mono>.{" "}
      </p>
      <p>
        Once we match the suspects to our sequences we can perform the task from
        above. The ID gives us a coordinate in the sequence where we get the
        codon, or 3 bases, at the corresponding position. For the F8 gene, at
        position 56, the codon is GCC which can then be translated to Amino
        Acids to obtain the letter A. Completing the task for each sequence you
        get the phrase <Mono>ANSWER IS SLEDDER</Mono> in sequence order. You can
        see the data in the table below resulting in the answer to the puzzle:{" "}
        <PuzzleAnswer>SLEDDER</PuzzleAnswer>.
      </p>
      <table>
        <thead>
          <tr>
            <StyledTableHeaderCell>Sequence #</StyledTableHeaderCell>
            <StyledTableHeaderCell>Gene</StyledTableHeaderCell>
            <StyledTableHeaderCell>Position of Mutation</StyledTableHeaderCell>
            <StyledTableHeaderCell>Letter</StyledTableHeaderCell>
            <StyledTableHeaderCell>ID of matching DOG</StyledTableHeaderCell>
            <StyledTableHeaderCell>CODON</StyledTableHeaderCell>
            <StyledTableHeaderCell>Translation of Codon</StyledTableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StyledTableCell>1</StyledTableCell>
            <StyledTableCell>F8</StyledTableCell>
            <StyledTableCell>71</StyledTableCell>
            <StyledTableCell>G</StyledTableCell>
            <StyledTableCell>56</StyledTableCell>
            <StyledTableCell>GCC</StyledTableCell>
            <StyledTableCell>A</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>2</StyledTableCell>
            <StyledTableCell>SLC2A9</StyledTableCell>
            <StyledTableCell>101</StyledTableCell>
            <StyledTableCell>e</StyledTableCell>
            <StyledTableCell>40</StyledTableCell>
            <StyledTableCell>AAT</StyledTableCell>
            <StyledTableCell>N</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>3</StyledTableCell>
            <StyledTableCell>LGI2</StyledTableCell>
            <StyledTableCell>116</StyledTableCell>
            <StyledTableCell>T</StyledTableCell>
            <StyledTableCell>6</StyledTableCell>
            <StyledTableCell>AGC</StyledTableCell>
            <StyledTableCell>S</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>4</StyledTableCell>
            <StyledTableCell>SLC37A2</StyledTableCell>
            <StyledTableCell>67</StyledTableCell>
            <StyledTableCell>C</StyledTableCell>
            <StyledTableCell>67</StyledTableCell>
            <StyledTableCell>TGG</StyledTableCell>
            <StyledTableCell>W</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>5</StyledTableCell>
            <StyledTableCell>PKP1</StyledTableCell>
            <StyledTableCell>111</StyledTableCell>
            <StyledTableCell>o</StyledTableCell>
            <StyledTableCell>1</StyledTableCell>
            <StyledTableCell>GAA</StyledTableCell>
            <StyledTableCell>E</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>6</StyledTableCell>
            <StyledTableCell>SPTB</StyledTableCell>
            <StyledTableCell>100</StyledTableCell>
            <StyledTableCell>d</StyledTableCell>
            <StyledTableCell>27</StyledTableCell>
            <StyledTableCell>AGG</StyledTableCell>
            <StyledTableCell>R</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>7</StyledTableCell>
            <StyledTableCell>SEL1L</StyledTableCell>
            <StyledTableCell>111</StyledTableCell>
            <StyledTableCell>o</StyledTableCell>
            <StyledTableCell>30</StyledTableCell>
            <StyledTableCell>ATT</StyledTableCell>
            <StyledTableCell>I</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>8</StyledTableCell>
            <StyledTableCell>COL1A1</StyledTableCell>
            <StyledTableCell>110</StyledTableCell>
            <StyledTableCell>n</StyledTableCell>
            <StyledTableCell>21</StyledTableCell>
            <StyledTableCell>TCC</StyledTableCell>
            <StyledTableCell>S</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>9</StyledTableCell>
            <StyledTableCell>NDRG1</StyledTableCell>
            <StyledTableCell>65</StyledTableCell>
            <StyledTableCell>A</StyledTableCell>
            <StyledTableCell>7</StyledTableCell>
            <StyledTableCell>TCT</StyledTableCell>
            <StyledTableCell>S</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>10</StyledTableCell>
            <StyledTableCell>ITGA10</StyledTableCell>
            <StyledTableCell>116</StyledTableCell>
            <StyledTableCell>t</StyledTableCell>
            <StyledTableCell>55</StyledTableCell>
            <StyledTableCell>CTG</StyledTableCell>
            <StyledTableCell>L</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>11</StyledTableCell>
            <StyledTableCell>COL7A1</StyledTableCell>
            <StyledTableCell>68</StyledTableCell>
            <StyledTableCell>D</StyledTableCell>
            <StyledTableCell>60</StyledTableCell>
            <StyledTableCell>GAA</StyledTableCell>
            <StyledTableCell>E</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>12</StyledTableCell>
            <StyledTableCell>F7</StyledTableCell>
            <StyledTableCell>111</StyledTableCell>
            <StyledTableCell>o</StyledTableCell>
            <StyledTableCell>11</StyledTableCell>
            <StyledTableCell>GAC</StyledTableCell>
            <StyledTableCell>D</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>13</StyledTableCell>
            <StyledTableCell>COL4A4</StyledTableCell>
            <StyledTableCell>103</StyledTableCell>
            <StyledTableCell>g</StyledTableCell>
            <StyledTableCell>25</StyledTableCell>
            <StyledTableCell>GAT</StyledTableCell>
            <StyledTableCell>D</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>14</StyledTableCell>
            <StyledTableCell>CNGB3</StyledTableCell>
            <StyledTableCell>73</StyledTableCell>
            <StyledTableCell>I</StyledTableCell>
            <StyledTableCell>113</StyledTableCell>
            <StyledTableCell>GAG</StyledTableCell>
            <StyledTableCell>E</StyledTableCell>
          </tr>
          <tr>
            <StyledTableCell>15</StyledTableCell>
            <StyledTableCell>SOD1</StyledTableCell>
            <StyledTableCell>68</StyledTableCell>
            <StyledTableCell>D</StyledTableCell>
            <StyledTableCell>18</StyledTableCell>
            <StyledTableCell>AGA</StyledTableCell>
            <StyledTableCell>R</StyledTableCell>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Solution;
