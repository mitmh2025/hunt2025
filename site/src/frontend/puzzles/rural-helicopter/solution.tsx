import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import image01 from "./assets/1.png";

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
        The puzzle presents as a series of strings of As, Cs, Ts, and Gs, along
        with several pictures of dogs identified as “suspects”, listed along
        with a disease. In the flavor, we note “The blasted animals got to him.
        Which of these <em>familiar canines</em> was the one to do him in?”
      </p>
      <p>
        “Blasted” combined with the genetic sequences hints at{" "}
        <a
          href="https://blast.ncbi.nlm.nih.gov/Blast.cgi"
          target="_blank"
          rel="noreferrer"
        >
          BLAST, the Basic Local Alignment Search Tool
        </a>
        . BLAST, operated by the National Library of Medicine at the National
        Center for Biotechnology Information and part of the National Institutes
        for Health, allows users to search by genetic sequence. The italicized “
        <em>familiar canines</em>” evokes the species name for the common dog,{" "}
        <em>Canis familiaris</em>, which is traditionally italicized in
        scientific texts.
      </p>
      <p>
        Searching each sequence in BLAST and observing the highest scoring hit
        will give you an output similar to that below:
      </p>
      <LinkedImage
        src={image01}
        alt="a genetic sequence and various information is displayed after applying BLAST to the sequence "
      ></LinkedImage>
      <p>
        There are a few things to notice:{" "}
        <ol>
          <li>Each sequence is 256 in length.</li>
          <li>
            Each sequence matches extremely closely to a portion of a real gene
            found in domestic dogs.
          </li>
          <li>Each sequence contains one mismatch.</li>
        </ol>
      </p>
      <p>
        By treating the mismatch’s point in the sequence as a number between 1
        and 256, each sequence has a number encoded within it. By applying ASCII
        encoding to these numbers, solvers receive a message.
      </p>
      <p>
        <HScrollTableWrapper>
          <table>
            <thead>
              <tr>
                <StyledTableHeaderCell>Sequence</StyledTableHeaderCell>
                <StyledTableHeaderCell>Gene</StyledTableHeaderCell>
                <StyledTableHeaderCell>Name of gene</StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Position of mismatch
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  ASCII encoded letter
                </StyledTableHeaderCell>
              </tr>
            </thead>
            <tbody>
              <tr>
                <StyledTableCell>1</StyledTableCell>
                <StyledTableCell>F8</StyledTableCell>
                <StyledTableCell>
                  Coagulation factor VIII F8 transcript variant X1 mRNA
                </StyledTableCell>
                <StyledTableCell>71</StyledTableCell>
                <StyledTableCell>G</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>2</StyledTableCell>
                <StyledTableCell>SLC2A9</StyledTableCell>
                <StyledTableCell>
                  solute carrier family 2 member 9 protein variant O (SLC2A9)
                </StyledTableCell>
                <StyledTableCell>101</StyledTableCell>
                <StyledTableCell>e</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>3</StyledTableCell>
                <StyledTableCell>LGI2</StyledTableCell>
                <StyledTableCell>
                  leucine rich repeat LGI family member 2
                </StyledTableCell>
                <StyledTableCell>116</StyledTableCell>
                <StyledTableCell>t</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>4</StyledTableCell>
                <StyledTableCell>SLC37A2</StyledTableCell>
                <StyledTableCell>
                  solute carrier family 37 member 2
                </StyledTableCell>
                <StyledTableCell>67</StyledTableCell>
                <StyledTableCell>C</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>5</StyledTableCell>
                <StyledTableCell>PKP1</StyledTableCell>
                <StyledTableCell>plakophilin 1</StyledTableCell>
                <StyledTableCell>111</StyledTableCell>
                <StyledTableCell>o</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>6</StyledTableCell>
                <StyledTableCell>SPTB</StyledTableCell>
                <StyledTableCell>spectrin beta, erythrocytic</StyledTableCell>
                <StyledTableCell>100</StyledTableCell>
                <StyledTableCell>d</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>7</StyledTableCell>
                <StyledTableCell>SEL1L</StyledTableCell>
                <StyledTableCell>
                  SEL1L adaptor subunit of ERAD E3 ubiquitin ligase
                </StyledTableCell>
                <StyledTableCell>111</StyledTableCell>
                <StyledTableCell>o</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>8</StyledTableCell>
                <StyledTableCell>COL1A1</StyledTableCell>
                <StyledTableCell>collagen type I alpha 1 chain</StyledTableCell>
                <StyledTableCell>110</StyledTableCell>
                <StyledTableCell>n</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>9</StyledTableCell>
                <StyledTableCell>NDRG1</StyledTableCell>
                <StyledTableCell>N-myc downstream regulated 1</StyledTableCell>
                <StyledTableCell>65</StyledTableCell>
                <StyledTableCell>A</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>10</StyledTableCell>
                <StyledTableCell>ITGA10</StyledTableCell>
                <StyledTableCell>integrin subunit alpha 10</StyledTableCell>
                <StyledTableCell>116</StyledTableCell>
                <StyledTableCell>t</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>11</StyledTableCell>
                <StyledTableCell>COL7A1</StyledTableCell>
                <StyledTableCell>
                  collagen type VII alpha 1 chain
                </StyledTableCell>
                <StyledTableCell>68</StyledTableCell>
                <StyledTableCell>D</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>12</StyledTableCell>
                <StyledTableCell>F7</StyledTableCell>
                <StyledTableCell>coagulation factor VII (F7)</StyledTableCell>
                <StyledTableCell>111</StyledTableCell>
                <StyledTableCell>o</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>13</StyledTableCell>
                <StyledTableCell>COL4A4</StyledTableCell>
                <StyledTableCell>
                  collagen type IV alpha 4 chain
                </StyledTableCell>
                <StyledTableCell>103</StyledTableCell>
                <StyledTableCell>g</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>14</StyledTableCell>
                <StyledTableCell>CNGB3</StyledTableCell>
                <StyledTableCell>
                  cyclic nucleotide gated channel subunit beta 3
                </StyledTableCell>
                <StyledTableCell>73</StyledTableCell>
                <StyledTableCell>I</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>15</StyledTableCell>
                <StyledTableCell>SOD1</StyledTableCell>
                <StyledTableCell>superoxide dismutase 1</StyledTableCell>
                <StyledTableCell>68</StyledTableCell>
                <StyledTableCell>D</StyledTableCell>
              </tr>
            </tbody>
          </table>
        </HScrollTableWrapper>
      </p>
      <p>
        This spells out <Mono>GET CODON AT DOG ID</Mono>. Each dog “suspect” has
        an ID number and an associated disease. The title “Paw Print Detective”
        clues{" "}
        <a
          href="https://www.pawprintgenetics.com/"
          target="_blank"
          rel="noreferrer"
        >
          Paw Print Genetics
        </a>
        , a canine genetic testing company and database, which is the canonical
        dataset for this puzzle. Googling the diseases together with “paw print”
        should help solvers arrive at Paw Print Genetics pages associated with
        these diseases. The final aha is that the provided mutation is the
        causal genetic variant associated with the disease. For instance, in
        German Shepherds, Hemophilia A is caused by a genetic mutation on
        chromosome X, which is a G → A substitution in the Coagulation Factor F8
        gene. This exact mutation is given in the sequence and can be linked by
        matching the chromosomal position or gene name. The suspect image
        signifies a specific breed where this mutation has been identified by
        researchers, which can be used to disambiguate in cases where multiple
        mutations cause the same gene phenotype and to confirm the causal
        mutation. For confirmation that you got the correct genes, you may note
        that the chromosomal coordinates of the genes are given in increasing
        chromosome order: X, then 1-31.
      </p>
      <p>
        Once we match the suspects to our sequences, we can get the codon. A
        codon is a sequence of three nucleotides which form a genetic code unit
        in a DNA or RNA molecule. Every codon can be referred to by a single
        letter. The ID gives us a coordinate in the sequence to extract the
        codon. For example, for the F8 gene, the codon at position 56 is GCC
        which can then be translated to amino acids to obtain the letter A. By
        converting the codon at each ID’s position into its canonical letter,
        solvers are told that the ANSWER IS <PuzzleAnswer>SLEDDER</PuzzleAnswer>
        .
      </p>
      <p>
        <HScrollTableWrapper>
          <table>
            <thead>
              <tr>
                <StyledTableHeaderCell>Sequence #</StyledTableHeaderCell>
                <StyledTableHeaderCell>Gene</StyledTableHeaderCell>
                <StyledTableHeaderCell>Disease</StyledTableHeaderCell>
                <StyledTableHeaderCell>Dog Breed</StyledTableHeaderCell>
                <StyledTableHeaderCell>Dog ID</StyledTableHeaderCell>
                <StyledTableHeaderCell>CODON</StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Translation of Codon
                </StyledTableHeaderCell>
              </tr>
            </thead>
            <tbody>
              <tr>
                <StyledTableCell>1</StyledTableCell>
                <StyledTableCell>F8</StyledTableCell>
                <StyledTableCell>Hemophilia A</StyledTableCell>
                <StyledTableCell>German Shepherd</StyledTableCell>
                <StyledTableCell>56</StyledTableCell>
                <StyledTableCell>GCC</StyledTableCell>
                <StyledTableCell>A</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>2</StyledTableCell>
                <StyledTableCell>SLC2A9</StyledTableCell>
                <StyledTableCell>Hyperuricosuria</StyledTableCell>
                <StyledTableCell>Yorkshire Terrier</StyledTableCell>
                <StyledTableCell>40</StyledTableCell>
                <StyledTableCell>AAT</StyledTableCell>
                <StyledTableCell>N</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>3</StyledTableCell>
                <StyledTableCell>LGI2</StyledTableCell>
                <StyledTableCell>BFJE</StyledTableCell>
                <StyledTableCell>Lagotto Romagnolo</StyledTableCell>
                <StyledTableCell>6</StyledTableCell>
                <StyledTableCell>AGC</StyledTableCell>
                <StyledTableCell>S</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>4</StyledTableCell>
                <StyledTableCell>SLC37A2</StyledTableCell>
                <StyledTableCell>Craniomandibular Osteopathy</StyledTableCell>
                <StyledTableCell>Aussiedoodle</StyledTableCell>
                <StyledTableCell>67</StyledTableCell>
                <StyledTableCell>TGG</StyledTableCell>
                <StyledTableCell>W</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>5</StyledTableCell>
                <StyledTableCell>PKP1</StyledTableCell>
                <StyledTableCell>Ectodermal Dysplasia</StyledTableCell>
                <StyledTableCell>Chesapeake Bay Retriever</StyledTableCell>
                <StyledTableCell>1</StyledTableCell>
                <StyledTableCell>GAA</StyledTableCell>
                <StyledTableCell>E</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>6</StyledTableCell>
                <StyledTableCell>SPTB</StyledTableCell>
                <StyledTableCell>Elliptocytosis</StyledTableCell>
                <StyledTableCell>Chow Chow</StyledTableCell>
                <StyledTableCell>27</StyledTableCell>
                <StyledTableCell>AGG</StyledTableCell>
                <StyledTableCell>R</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>7</StyledTableCell>
                <StyledTableCell>SEL1L</StyledTableCell>
                <StyledTableCell>
                  Progressive early onset ataxia
                </StyledTableCell>
                <StyledTableCell>Finnish Hound</StyledTableCell>
                <StyledTableCell>30</StyledTableCell>
                <StyledTableCell>ATT</StyledTableCell>
                <StyledTableCell>I</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>8</StyledTableCell>
                <StyledTableCell>COL1A1</StyledTableCell>
                <StyledTableCell>Osteogenesis imperfecta</StyledTableCell>
                <StyledTableCell>Golden Retriever</StyledTableCell>
                <StyledTableCell>21</StyledTableCell>
                <StyledTableCell>TCC</StyledTableCell>
                <StyledTableCell>S</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>9</StyledTableCell>
                <StyledTableCell>NDRG1</StyledTableCell>
                <StyledTableCell>Inherited polyneuropathy</StyledTableCell>
                <StyledTableCell>Alaskan Malamute</StyledTableCell>
                <StyledTableCell>7</StyledTableCell>
                <StyledTableCell>TCT</StyledTableCell>
                <StyledTableCell>S</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>10</StyledTableCell>
                <StyledTableCell>ITGA10</StyledTableCell>
                <StyledTableCell>Chondrodysplasia</StyledTableCell>
                <StyledTableCell>Karelian Bear Dog</StyledTableCell>
                <StyledTableCell>55</StyledTableCell>
                <StyledTableCell>CTG</StyledTableCell>
                <StyledTableCell>L</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>11</StyledTableCell>
                <StyledTableCell>COL7A1</StyledTableCell>
                <StyledTableCell>
                  Dystrophic Epidermolysis Bullosa
                </StyledTableCell>
                <StyledTableCell>Goldendoodle</StyledTableCell>
                <StyledTableCell>60</StyledTableCell>
                <StyledTableCell>GAA</StyledTableCell>
                <StyledTableCell>E</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>12</StyledTableCell>
                <StyledTableCell>F7</StyledTableCell>
                <StyledTableCell>Hypoproconvertinemia</StyledTableCell>
                <StyledTableCell>Beagle</StyledTableCell>
                <StyledTableCell>11</StyledTableCell>
                <StyledTableCell>GAC</StyledTableCell>
                <StyledTableCell>D</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>13</StyledTableCell>
                <StyledTableCell>COL4A4</StyledTableCell>
                <StyledTableCell>Familial Nephropathy</StyledTableCell>
                <StyledTableCell>English Cocker Spaniel</StyledTableCell>
                <StyledTableCell>24</StyledTableCell>
                <StyledTableCell>GAT</StyledTableCell>
                <StyledTableCell>D</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>14</StyledTableCell>
                <StyledTableCell>CNGB3</StyledTableCell>
                <StyledTableCell>
                  Achromatopsia, Cone degeneration 2
                </StyledTableCell>
                <StyledTableCell>German Shorthaired Pointer</StyledTableCell>
                <StyledTableCell>113</StyledTableCell>
                <StyledTableCell>GAG</StyledTableCell>
                <StyledTableCell>E</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell>15</StyledTableCell>
                <StyledTableCell>SOD1</StyledTableCell>
                <StyledTableCell>Degenerative Myelopathy</StyledTableCell>
                <StyledTableCell>Bichon Frisé</StyledTableCell>
                <StyledTableCell>18</StyledTableCell>
                <StyledTableCell>AGA</StyledTableCell>
                <StyledTableCell>R</StyledTableCell>
              </tr>
            </tbody>
          </table>
        </HScrollTableWrapper>
      </p>
      <p>Image credits:</p>
      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <StyledTableHeaderCell>ID</StyledTableHeaderCell>
              <StyledTableHeaderCell>Breed</StyledTableHeaderCell>
              <StyledTableHeaderCell>Attribution</StyledTableHeaderCell>
            </tr>
          </thead>
          <tbody>
            <tr>
              <StyledTableCell>56</StyledTableCell>
              <StyledTableCell>German Sheperd</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:German-shepherd-4040871920.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hans Kemperman
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>40</StyledTableCell>
              <StyledTableCell>Yorkshire Terrier</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Imageyorkie.png"
                  target="_blank"
                  rel="noreferrer"
                >
                  Gandalfelrojo2
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>6</StyledTableCell>
              <StyledTableCell>Lagotto Romagnolo</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Lagotto_Romagnolo.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sandra Schmidt
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>67</StyledTableCell>
              <StyledTableCell>Aussiedoodle</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://www.flickr.com/photos/50697352@N00/8692169446"
                  target="_blank"
                  rel="noreferrer"
                >
                  F. D. Richards
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>1</StyledTableCell>
              <StyledTableCell>Chesapeake Bay Retriever</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://www.flickr.com/photos/laurajess/4817141966"
                  target="_blank"
                  rel="noreferrer"
                >
                  Laura Jess
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>27</StyledTableCell>
              <StyledTableCell>Chow Chow</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:01_Chow_Chow.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Prayitno
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>30</StyledTableCell>
              <StyledTableCell>Finnish Hound</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Finnish_Hound.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  EtäKärppä
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>21</StyledTableCell>
              <StyledTableCell>Golden Retriever</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Golden_Retriever_2019.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Johannnes89
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>7</StyledTableCell>
              <StyledTableCell>Alaskan Malamute</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Alaskan_Malamute_Biyaalsm-Attk.JPG"
                  target="_blank"
                  rel="noreferrer"
                >
                  Carina Wicke
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>55</StyledTableCell>
              <StyledTableCell>Karelian Bear Dog</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Karelski_pies_na_nied%C5%BAwiedzie_sylwetka.JPG"
                  target="_blank"
                  rel="noreferrer"
                >
                  Fraczek.marcin
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>60</StyledTableCell>
              <StyledTableCell>Goldendoodle</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Golden_Doodle_Standing_(HD).jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Gullpavon
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>11</StyledTableCell>
              <StyledTableCell>Beagle</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Beagle_standing_next_to_a_door.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Slyronit
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>24</StyledTableCell>
              <StyledTableCell>English Cocker Spaniel</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:%22Bill%22_-_Cocker_spaniel_anglais_2.JPG"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jean-Pol Grandmont
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>113</StyledTableCell>
              <StyledTableCell>German Shorthaired Pointer</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Duitse_staande_korthaar_10-10-2.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bonnie van den Born
                </a>
              </StyledTableCell>
            </tr>
            <tr>
              <StyledTableCell>18</StyledTableCell>
              <StyledTableCell>Bichon Frise</StyledTableCell>
              <StyledTableCell>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Bichon_Fris%C3%A9_-_studdogbichon.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Heike Andres
                </a>
              </StyledTableCell>
            </tr>
          </tbody>
        </table>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
