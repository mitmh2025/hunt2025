import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import assembled_solution from "./assets/solution/The-Mark-assembly.svg";
import candidate_chips from "./assets/solution/The-Mark-candidate-chips-FQGDUK-PLAZYC-ORBEJN-HMSTVI.svg";
import answer_chips_chivipane from "./assets/solution/The-Mark-candidate-partial-chivipane-~~~~~~-P~A~~C-~~~E~N-H~~~VI-1.svg";
import answer_chips_flyer from "./assets/solution/The-Mark-candidate-partial-flyer-F~~~~~-~L~~Y~-~R~E~~-~~~~~~-1.svg";
import answer_chips_hmsalcaston from "./assets/solution/The-Mark-candidate-partial-hmsalcaston-~~~~~~-~LA~~C-O~~~~N-HMST~~-1.svg";
import answer_chips_jugalbone from "./assets/solution/The-Mark-candidate-partial-jugalbone-~~G~U~-~LA~~~-O~BEJN-~~~~~~-1.svg";
import answer_chips_morthond from "./assets/solution/The-Mark-candidate-partial-morthond-~~~D~~-~~~~~~-OR~~~N-HM~T~~-1.svg";
import checks_bg from "./assets/solution/The-Mark-shell.svg";

const Aside = styled.aside`
  background-color: #e3eef8;
  margin: 1em 0;
  padding: 0 1em 1em 1em;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const BigramSplitsTable = styled.table`
  border: none;
  td {
    min-width: 120px;
    text-align: center;
    padding: 0 1em;
    font-family: monospace;
  }
`;
const BigramSplits = ({ options }: { options: string[] }) => {
  return (
    <BigramSplitsTable>
      <tbody>
        <tr>
          {options.map((option) => {
            return <td key={option}>{option}</td>;
          })}
        </tr>
      </tbody>
    </BigramSplitsTable>
  );
};

const ChipBreakdownShared = styled.table`
  border-collapse: collapse;
  border: 1px solid var(--black);
  td {
    font-family: monospace;
    border: 1px solid var(--black);
    width: 70px;
    text-align: center;
  }
`;
const LetterGroupsTable = styled(ChipBreakdownShared)`
  td.overflown {
    background-color: red;
    font-size: 12px;
  }
`;
const LetterGroups = ({ groups }: { groups: string[] }) => {
  return (
    <LetterGroupsTable>
      <tbody>
        <tr>
          {groups.map((group) => {
            const overflown = group.length > 6;
            const classes = overflown ? "overflown" : undefined;
            return (
              <td className={classes} key={group}>
                {group}
              </td>
            );
          })}
        </tr>
      </tbody>
    </LetterGroupsTable>
  );
};

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1em;
`;

const ChipCandidates = ({
  bigramSplits,
  groups,
}: {
  bigramSplits: string[];
  groups: string[];
}) => {
  return (
    <CenteredDiv>
      <BigramSplits options={bigramSplits} />
      <LetterGroups groups={groups} />
    </CenteredDiv>
  );
};

const ChipBreakdownTable = styled(ChipBreakdownShared)`
  td {
    width: 70px;
  }
  td:nth-child(1) {
    background-color: lightyellow;
  }
  td:nth-child(2) {
    background-color: lightcoral;
  }
  td:nth-child(3) {
    background-color: lightblue;
  }
  td:nth-child(4) {
    background-color: lightgreen;
  }
`;
const ChipBreakdown = ({ groups }: { groups: string[] }) => {
  return (
    <CenteredDiv>
      <ChipBreakdownTable>
        <tbody>
          <tr>
            {groups.map((group) => {
              return <td key={group}>{group}</td>;
            })}
          </tr>
        </tbody>
      </ChipBreakdownTable>
    </CenteredDiv>
  );
};

type AnswerShapeDefinition = {
  answer: string;
  image: string;
  alt: string;
  widthScale: number;
};

const CHIP_LAYOUTS_DATASET: AnswerShapeDefinition[] = [
  {
    answer: "MORTHOND",
    image: answer_chips_morthond,
    alt: "Five cheques (one white, two blue, and two green) arranged into a hexagonal packing, with the cheques placed and rotated such that MORTHOND can be spelled by starting at the bottom-right green cheque, and traveling upwards across letters MO to a blue cheque, then left-and-slightly-down across letters RT to the second green cheque, then left-and-slightly-down again across letters HO to the second blue cheque, then upwards across letters ND to the white cheque.",
    widthScale: 5,
  },
  {
    answer: "CHIVIPANE",
    image: answer_chips_chivipane,
    alt: "Five cheques (two red, one blue, and two green) arranged into a hexagonal packing, with the cheques placed and rotated such that CHIVIPANE can be spelled by starting at the first red cheque at the bottom left, and traveling upwards across letter CH to a green cheque, then right-and-slightly-down across letters IV to the second green cheque, then upwards across letters IP to the red cheque, then left-and-slightly-up across letter AN to the blue cheque, then upwards across letter E to the edge of the blue cheque.",
    widthScale: 3.5,
  },
  {
    answer: "HMSALCASTON",
    image: answer_chips_hmsalcaston,
    alt: "Six cheques (two red, one blue, and three green) arranged in a hexagonal grid such that HMSALCASTON can be spelled by starting at a green cheque, traveling upwards across HM to a second green cheque, then left and slightly down across letters SA towards a red cheque, then up across letters LC towards the second red cheque, then up again across letters AS towards the third green cheque, then left and slightly down across letters TO towards the blue cheque, then upwards across the letter N toward the edge of the blue cheque.",
    widthScale: 5,
  },
  {
    answer: "FLYER",
    image: answer_chips_flyer,
    alt: "Three cheques (one blue, one red, one white) arranged in a single column in that order, with the cheques placed and rotated such that FLYER can be spelled by starting at the bottom white cheque and traveling upwards across letters FL to the red cheque, then upwards again across letters YE to the blue cheque, then towards the top-right of the blue cheque across the letter R.",
    widthScale: 2,
  },
  {
    answer: "JUGALBONE",
    image: answer_chips_jugalbone,
    alt: "Four cheques (one white, one red, two blue) arranged in a dense hexagonal packing of two columns, with the right column raised slightly above the left column, with the cheques placed and rotated such that JUGALBONE can be spelled by starting at one blue cheque at the bottom-left and traveling upwards across letters JU towards the white cheque, then right-and-slightly-up across letters GA to the red cheque, then down across letters LB to the second blue cheque, then left-and-slightly-down across letters ON back to the first blue cheque, then left-and-slightly-up across the letter E towards the edge of the blue cheque.",
    widthScale: 3.5,
  },
];

const AnswerShape = ({ shape }: { shape: AnswerShapeDefinition }) => {
  const { answer, image, alt, widthScale } = shape;
  const imgWidth = widthScale * 50;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "300px",
      }}
    >
      <div style={{ fontFamily: "monospace" }}>{answer}</div>
      <div style={{ width: `${imgWidth}px` }}>
        <LinkedImage src={image} alt={alt} />
      </div>
    </div>
  );
};

const AnswerShapes = ({ dataset }: { dataset: AnswerShapeDefinition[] }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {dataset.map((entry) => {
        return <AnswerShape key={entry.answer} shape={entry} />;
      })}
    </div>
  );
};

const Solution = () => {
  return (
    <>
      <p>
        First, in the spirit of The Background Check, solvers should check the
        background of the webpage and discover hidden at the center of the
        texture, four casino chips (background cheques). The background is an
        SVG and, though not an essential step, its markup reveals the content is
        in an easily isolated definition for solver convenience:
      </p>
      <CenteredDiv>
        <div style={{ width: "600px", maxWidth: "100%" }}>
          <LinkedImage
            src={checks_bg}
            alt="Four cheques (casino chips).  Each cheque has a registration mark at the bottom of the chip.  The border contains six evenly-spaced segments around the edge, each with a single letter or number.
        The top-left cheque is primarily white, valued at 14$, and its markings clockwise from the registration mark are 2, 5, 3, 1, U, and 4.
        The top-right cheque is primarily red, valued at 25$, and its markings clockwise from the registration mark are 4, 3, 1, 6, Y, and 2.
        The bottom-left cheque is primarily blue, valued at 26$, and its markings clockwise from the registration mark are 5, 6, 1, 2, J, and 4.
        The bottom-right cheque is primarily green, valued at 28$, and its markings clockwise from the registration mark are 1, 3, 4, 5, V, and 2.
        "
          />
        </div>
      </CenteredDiv>
      <p>
        Each chip has six edge marks, labeled with either a letter or a number,
        identified in the instructions as an alphabetical ordering. Each chip
        has a preferred orientation provided by both the value text and a black
        dot. Aligning this feature with the similarly marked corner in the grid
        found on the puzzle page confirms that the chips fit perfectly, with
        edge marks aligned with edges of the hexagonal grid.
      </p>

      <p>
        From the instructions and experimentally placing tiles, the rules should
        be clear: Place chips in the provided grid and fill the edge marks with
        letters obeying the provided relative ordering, such that all answer
        phrases can be spelled out by drawing paths between chips.
      </p>

      <Aside>
        <h3>A brief aside: Solving strategies</h3>
        <p>
          The problem has significant depth and may be treated as a logic puzzle
          or as a constraint system; each solver is likely to formulate a unique
          strategy. Though many solvers are reluctant to turn to computer
          search, it is the author’s opinion that treating this as a constraint
          system and automating a search over it is a valid and rewarding
          approach. In fact, the author’s expectation is that some teams will
          gain an understanding of the puzzle and immediately assign it to
          someone savvy in search problems (and who hopefully also enjoys them!)
          in the hopes that a working tool will already exist by the time more
          answers are available. An automated approach may prove invaluable if
          attempting to solve this puzzle with missing answers.
        </p>
        <p>
          One potential solve path, treating this as a logic puzzle, is
          presented here in a series of stages each incorporating more of the
          given information: the letter-makeup of the answers, the given letters
          on each chip, the alphabetical constraints within each chip, the order
          of the edge marks around the chips, and finally the given grid. This
          is by no means the only way to approach the problem.
        </p>
      </Aside>

      <p>
        The feeders to this metapuzzle are those associated with Ferdinand’s
        time in Brazil. Though the answers in this group do not have any obvious
        commonality that ties them mechanically to one of the sub-metapuzzles,
        this assignment may be determined in several ways:
      </p>
      <ul>
        <li>
          Ferdinand uses the pseudonymous surname Marco in this story, clueing
          “Mark”. (The given name Cupim is a cut of beef relatively specific to
          Brazil, part of the character’s pure flavor convention of using names
          derived from bulls.)
        </li>
        <li>
          The use of the double barred dollar sign, identified in markup as a
          cifrão, is consistent with the currency being the (old) Brazilian
          Real.
        </li>
        <li>
          Solvers may simply have assigned the other two groupings to
          sub-metapuzzles first.
        </li>
      </ul>
      <p>The feeders (in given order) are:</p>
      <ul>
        <li>
          <Mono>MORTHOND</Mono>
        </li>
        <li>
          <Mono>CHIVIPANE</Mono>
        </li>
        <li>
          <Mono>HMS ALCASTON</Mono>
        </li>
        <li>
          <Mono>FLYER</Mono>
        </li>
        <li>
          <Mono>JUGAL BONE</Mono>
        </li>
      </ul>

      <h3>Letter adjacencies in answers</h3>
      <p>
        We start by considering only the answers themselves and the limitations
        imposed by having four chips with six edge marks each.
      </p>

      <p>
        Begin by recognizing that within each word (starting at either the first
        or second letter), each consecutive pair of two letters must be on a
        single chip (with the caveat that non-terminal double letters pose a
        special case, as they can only form a single chip bigram if part of a
        larger palindrome with total length that is a multiple of four, because
        the path must exit the same way it entered — but there are no double
        letters in the answer words). For each word, we must consider a parity —
        whether its path starts on an edge heading into a chip or at the center
        of a chip heading towards an edge.
      </p>

      <p>
        For a given choice of such parities, sets of letters that must share a
        chip can be identified by merging bigrams with common letters. For most
        parity combinations, this yields at least one group with more than six
        letters, revealing that the choice of parities is not achievable.
      </p>

      <p>
        Of the 32 potential parity combinations, only two, varying exclusively
        in the parity of FLYER, produce viable sets of letter groups:
      </p>

      <ChipCandidates
        bigramSplits={[
          "M-OR-TH-ON-D",
          "C-HI-VI-PA-NE",
          "H-MS-AL-CA-ST-ON",
          "FL-YE-R",
          "J-UG-AL-BO-NE",
        ]}
        groups={["ACFLP", "BENORY", "D", "GU", "HIMSTV", "J"]}
      />

      <ChipCandidates
        bigramSplits={[
          "M-OR-TH-ON-D",
          "C-HI-VI-PA-NE",
          "H-MS-AL-CA-ST-ON",
          "F-LY-ER",
          "J-UG-AL-BO-NE",
        ]}
        groups={["ACLPY", "BENOR", "D", "F", "GU", "HIMSTV", "J"]}
      />

      <Aside>
        <h3>A brief aside: Calculating bigram groupings</h3>
        <p>
          Searching over the 32 parity combinations for letter groupings with
          sizes never exceeding 6 is a small enough task to be done by brute
          force enumeration either by hand or with a short and easy-to-write
          script (a good strategy for a problem easily plagued by transcription
          errors!). Because just three answers are sufficient to impose
          significant constraints, it can also be done iteratively by hand in
          just a few minutes, as demonstrated here. This approach may grant some
          intuition for how constrained the space is when attempting to work
          with missing answers.
        </p>
        <p>
          Start with two options for <Mono>MORTHOND</Mono>:
        </p>
        <ChipCandidates
          bigramSplits={["MO-RT-HO-ND"]}
          groups={["HMO", "ND", "RT"]}
        />
        <ChipCandidates
          bigramSplits={["M-OR-TH-ON-D"]}
          groups={["D", "HT", "M", "NOR"]}
        />

        <p>
          With <Mono>CHIVIPANE</Mono>, this increases to four:
        </p>

        <ChipCandidates
          bigramSplits={"MO-RT-HO-ND CH-IV-IP-AN-E".split(" ")}
          groups={"AND CHMO E IPV RT".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"MO-RT-HO-ND C-HI-VI-PA-NE".split(" ")}
          groups={"AP C HIMOV NDE RT".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D CH-IV-IP-AN-E".split(" ")}
          groups={"ANOR CHT D E IPV M".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE".split(" ")}
          groups={"AP C D ENOR HITV M".split(" ")}
        />

        <p>
          But adding <Mono>HMS ALCASTON</Mono> is sufficient to render nearly
          all of the eight possible parity combinations inviable:
        </p>

        <ChipCandidates
          bigramSplits={"MO-RT-HO-ND CH-IV-IP-AN-E HM-SA-LC-AS-TO-N".split(" ")}
          groups={"ANDS CHLMORT E IPV".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"MO-RT-HO-ND CH-IV-IP-AN-E H-MS-AL-CA-ST-ON".split(" ")}
          groups={"ACDHLMNORST E IPV".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"MO-RT-HO-ND C-HI-VI-PA-NE HM-SA-LC-AS-TO-N".split(" ")}
          groups={"APS LC HIMORTV NDE".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"MO-RT-HO-ND C-HI-VI-PA-NE H-MS-AL-CA-ST-ON".split(" ")}
          groups={"ACLP DEHIMONRSTV".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D CH-IV-IP-AN-E HM-SA-LC-AS-TO-N".split(
            " ",
          )}
          groups={"CAHLMNORST D E IPV".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D CH-IV-IP-AN-E H-MS-AL-CA-ST-ON".split(
            " ",
          )}
          groups={"ACHLMNORST D E IPV".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE HM-SA-LC-AS-TO-N".split(
            " ",
          )}
          groups={"APS CL D EHIMNORTV".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE H-MS-AL-CA-ST-ON".split(
            " ",
          )}
          groups={"ACLP D ENOR HIMSTV".split(" ")}
        />

        <p>
          Adding <Mono>FLYER</Mono> brings a second option:
        </p>

        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE H-MS-AL-CA-ST-ON FL-YE-R".split(
            " ",
          )}
          groups={"ACFLP D ENORY HIMSTV".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE H-MS-AL-CA-ST-ON F-LY-ER".split(
            " ",
          )}
          groups={"ACLPY D ENOR F HIMSTV".split(" ")}
        />

        <p>
          And finally adding <Mono>JUGAL BONE</Mono> reveals there are only two
          potential choices of parity for these words:
        </p>

        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE H-MS-AL-CA-ST-ON FL-YE-R JU-GA-LB-ON-E".split(
            " ",
          )}
          groups={"ABCFGLP D ENORY HIMSTV JU".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE H-MS-AL-CA-ST-ON FL-YE-R J-UG-AL-BO-NE".split(
            " ",
          )}
          groups={"ACFLP BENORY D GU HIMSTV J ".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE H-MS-AL-CA-ST-ON F-LY-ER JU-GA-LB-ON-E".split(
            " ",
          )}
          groups={"ABCGLPY D ENOR F HIMSTV JU ".split(" ")}
        />
        <ChipCandidates
          bigramSplits={"M-OR-TH-ON-D C-HI-VI-PA-NE H-MS-AL-CA-ST-ON F-LY-ER J-UG-AL-BO-NE".split(
            " ",
          )}
          groups={"ACLPY BENOR D F GU HIMSTV J".split(" ")}
        />
      </Aside>
      <h3>The chips’ given letters</h3>
      <p>
        Separately, the chips reveal that <Mono>U</Mono>, <Mono>Y</Mono>,{" "}
        <Mono>J</Mono>, and <Mono>V</Mono> are on different chips. Combined with
        the above groupings, the complete set of six letters <Mono>HIMSTV</Mono>{" "}
        make up the green chip. To round out the 24 letters, 3 of the unseen{" "}
        <Mono>K</Mono>, <Mono>Q</Mono>, <Mono>W</Mono>, <Mono>X</Mono>, and{" "}
        <Mono>Z</Mono> will also be used. Adding this information to the
        groupings above yields:
      </p>

      <ChipBreakdown
        groups={"GU BENORY J HIMSTV ACFLP D [KQWXZ] [KQWXZ] [KQWXZ]".split(" ")}
      />
      <ChipBreakdown
        groups={"GU ACLPY J HIMSTV BENOR D F [KQWXZ] [KQWXZ] [KQWXZ]".split(
          " ",
        )}
      />

      <p>
        Both options contain an unassigned five-letter group which must be
        assigned to the blue chip with a single fixed letter, as there’s
        insufficient room elsewhere. As constrained by the answers and the four
        given letters on the chips, the potential assignments can therefore be
        expanded as follows:
      </p>

      <ChipBreakdown groups={"DGU??? BENORY ACFJLP HIMSTV".split(" ")} />
      <ChipBreakdown groups={"FGU??? ACDLPY BEJNOR HIMSTV".split(" ")} />
      <ChipBreakdown groups={"DGU??? ACFLPY BEJNOR HIMSTV".split(" ")} />
      <ChipBreakdown groups={"DFGU?? ACLPY? BEJNOR HIMSTV".split(" ")} />

      <p>
        There are thus 4 total ways of assigning the seen letters to chips,
        totaling 24 chip sets, including choice of unseen letters.
      </p>

      <h3>The chips’ given alphabetical ordering</h3>
      <p>
        We now consider the indicated alphabetical ordering, from which the
        green tile is immediately fully defined. The 6 on the red tile can only
        be a <Mono>Z</Mono>, given the provided <Mono>Y</Mono>, constraining the
        chip selection to the last option above and consequently fully defining
        the blue and red tiles. Finally since <Mono>U</Mono> is the last letter
        alphabetically on the white chip, we can exclude <Mono>W</Mono> and{" "}
        <Mono>X</Mono>, concluding the missing letters here are <Mono>K</Mono>{" "}
        and <Mono>Q</Mono>.
      </p>
      <p>
        (While not strictly part of the logic puzzle, a savvy solver might
        assume that a chip set that includes unresolvable ambiguity is unlikely
        to represent the correct choice and therefore exclude <Mono>W</Mono> and{" "}
        <Mono>X</Mono> from consideration early on. This assumption is borne out
        and might save a small amount of time.)
      </p>
      <p>The chip set is therefore:</p>
      <LinkedImage
        src={candidate_chips}
        alt="The four cheques as above, but this time with all letters.
      In clockwise order from the registration mark, the white cheque has markings F, Q, G, D, U, K;
      the red cheque has markings P, L, A, Z, Y, C;
      the blue cheque has markings O, R, B, E, J, N;
      the green cheque has markings H, M, S, T, V, I."
      />

      <h3>Chip geometry and constructability of answers</h3>
      <p>
        We have only thus far demonstrated that this set has the necessary
        letter combinations to construct all of the answers. We have not
        considered the chips’ geometry and, specifically, if attempting to
        construct an answer creates an internal collision. With all answers, the
        chip set is fully determined by this stage and this test offers no
        additional filtering, but with partial information, this stage can still
        prove an invaluable step.
      </p>

      <p>The answers lay out as follows:</p>
      <AnswerShapes dataset={CHIP_LAYOUTS_DATASET} />

      <h3>The extents of the grid and its given registration mark</h3>
      <p>It is finally necessary to invoke constraints from the grid itself.</p>

      <p>
        The problem is reduced to fitting the above constructions together
        within the grid (permitting identical overlaps). By this point, a degree
        of informed brute force will complete the assembly. Paper cut-outs or a
        digital whiteboard application are likely to prove effective. Computer
        search is also an option (Solvers employing such a method would likely
        have done so from much earlier in the solve path, but it is also a much
        easier problem to implement at this late stage). Excellent starting
        points include the given registration mark or the rather large{" "}
        <Mono>HMS ALCASTON</Mono>.
      </p>

      <p>
        A unique assembly exists. Pleasingly (and as solvers may have predicted,
        though it is not explicitly required), the only assembly that produces
        paths for all five answers and is consistent with the registration mark
        leaves no empty hexes.
      </p>
      <LinkedImage
        src={assembled_solution}
        alt="A densely-packed hexagonal grid with seven columns of three cheques each.
          The cheques in the second, fourth, and sixth column are placed slightly higher than the ones in the first, third, fifth, and seventh columns.
          The cheques in each column, from top to bottom, are:
          blue, green, blue;
          white, blue, red;
          red, green, red;
          white, blue, green;
          green, red, blue;
          blue, green, green;
          and white, red, blue.
          The rotations of the chips allow all five feeder answers to be traced continuously across the assembled whole."
      />

      <h3>Extraction</h3>
      <p>
        Having assembled the grid, only the chips’ values remain unused. Turning
        to the as-yet-unused clue to “count your stacks,” solvers simply need to
        total the values in each column, at which time they will likely
        recognize the totals fall in the ASCII range of capital letters. Left to
        right, they spell <Mono>PANDORA</Mono>.
      </p>

      <Aside>
        <h3>
          A brief aside: Logic puzzles as metas and solving with partial
          information
        </h3>
        <p>
          Some solvers will no doubt object to the use of a logic puzzle that
          essentially requires all answers as a metapuzzle. This is a
          philosophical choice that we’re unlikely to settle, but nonetheless it
          is constructive to examine the thinking behind some decisions.
        </p>
        <p>
          With any missing answer, the chip set is not fully defined prior to
          grid assembly, though it will be quite well constrained, with between
          2 and 76 chip sets (including combinatorics) for a single missing
          answer. Solvers will find they have multiple - often closely related -
          constructions for each answer. While the assembly is only unique with
          all answers present, the puzzle is still tractable with a missing
          answer if some assumptions are made, such as:
        </p>

        <ul>
          <li>The grid is fully defined</li>
          <li>All letters are fully defined</li>
          <li>
            Columns all sum to the capital ASCII range (a constraint predictable
            from the range of achievable sums, even without any known columns)
          </li>
        </ul>

        <p>
          Even so, solving in these conditions is quite difficult and almost
          certainly requires computer search.
        </p>
        <p>
          A more likely avenue when approaching this with a missing answer is a
          side-solve. An existing partial set of answers imposes significant
          constraints on the letter adjacencies in missing answers, which may be
          added to what is already known about an unsolved puzzle.
        </p>
        <p>
          Because of the limitations of designing a logic puzzle as a meta, the
          puzzle was designed to be, in some sense, easier than it could have
          been as a stand-alone puzzle. Notably, the givens were specifically
          chosen so that the chip set is uniquely determined prior to grid
          assembly, though this is by no means necessary for the puzzle’s
          operation (or even common among constructions with unique solutions).
          This was done both because test-solvers preferred (and often expected)
          this intermediate validation and because doing so severely constrained
          the space of chip sets with answers missing.
        </p>
      </Aside>
    </>
  );
};

export default Solution;
