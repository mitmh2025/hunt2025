import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Errata } from "../../components/StyledUI";
import image from "./assets/image.png";

const DATA: string[][] = [
  [
    "Crowd-sourced interview on Reddit, for short",
    "No particular one",
    "Well-put",
    "Kwik-E-Mart operator",
    "Cellular code",
    "Hair product",
    "Driver’s licenses, e.g.",
    "Wrath",
    "Tax org.",
    "Orbiting research hub",
    "Egyptian ___ (cat breed)",
    "Teachers’ org.",
    "Homer’s neighbor",
    "It’s not gross",
    "Actor Cage, to friends",
    "Small quibble",
    "San Francisco’s ___ Valley",
    "Type of logic gate",
    "“Fresh Air” network",
    "Lout",
    "___ Mae (Whoopi role)",
    "Poetic contraction",
    "___-Locka, Florida",
    "Nail polish brand",
    "Album of movie music (abbr.)",
    "Popular plastic for 3D printing",
    "___ favor",
    "Carly ___ Jepsen",
    "D&D, e.g.",
    "12th graders (abbr.)",
    "___ kwon do",
    "“Better Off ___” (2000s sitcom)",
    "Repeated, a fly",
    "College abroad, briefly",
    "Affirmative response",
  ],
  [
    "Part of Course 16, for short",
    "Shortly",
    "Largest continent",
    "___ were",
    "Like a worn down tire",
    "Gaunt",
    "Good source of fiber",
    "Singer Celine",
    "Just managed, with “out”",
    "Part of a die",
    "___ high note",
    "“___ delighted!”",
    "“___ 3 Lives” (1950s TV drama)",
    "Poor way for something to bode",
    "Like a doily",
    "Eye irritant, potentially",
    "Earn",
    "Bland",
    "___ marker",
    "Like an eavesdropper",
    "Do as told",
    "Norse god",
    "Mountain lion",
    "Classy",
    "Unsightly",
    "French articles",
    "Competed (for)",
  ],
  [
    "“I don’t give ___!”",
    "The Lego Movie protagonist",
    "Discworld servant clan",
    "“Give ___!”",
    "The Lion King character and others",
    "Type of orange",
    "Makes a home",
    "San Francisco footballer, for short",
    "___ Dame",
    "“What’s ___ like?”",
    "Vast quantity",
    "Speak",
    "Hindu god",
    "Indian drum",
    "Florida city",
    "All, in music",
    "Number place",
    "Retract",
    "“I wish I could ___ that”",
    "Bears in Latin",
    "Taking advantage of",
  ],
  [
    "Neighbor of Catalonia",
    "Clickwrap button title",
    "Pictures-in-picture",
    "Birthplace of Jules Verne",
    "Zero",
    "Insecure remote login protocol",
    "Tundra or Highlander",
    "One",
    "Remove a cork from",
    "Functional",
  ],
  [
    "“Ay, ___!”",
    "Keebler cookie",
    "Wicked protagonist",
    "Square matrix having to do with curvature",
    "Related molecules",
    "Be immediately obvious",
    "Eagle-headed god mentioned in the Bible",
    "Publication known for its crosswords, briefly",
    "Layered treat",
    "Audited",
    "Czech opera composer",
    "Show venue",
    "Open, as a gate",
    "High-end",
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 17th, at 8:45 PM",
            message:
              "The clue ‘“Fresh Air” network’ originally appeared twice in the list.  The second instance has been removed.",
          },
        ]}
      />
      <p className="puzzle-flavor">
        In this giant room, the floor is covered with black and white squares.
        You see wires snaking about, like adders nibbling at each other,
        underneath 36 empty tables. Noticing the tables are marked with
        different numbers, you think they could use some black squares of their
        own, so you take out a marker. However, as you go to work, you are met
        with multiple possibilities, requiring you to take into account the
        connections between them.
      </p>
      <LinkedImage
        src={image}
        alt="A very large black-and-white tiled bitmap."
      />
      {DATA.map((clues, i) => (
        <React.Fragment key={i}>
          <StyledTable>
            {clues.map((clue, j) => (
              <tr key={j}>
                <td
                  style={{
                    fontWeight: ["Zero", "One"].includes(clue)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {clue}
                </td>
              </tr>
            ))}
          </StyledTable>
          <hr />
        </React.Fragment>
      ))}
    </>
  );
};

export default Puzzle;
