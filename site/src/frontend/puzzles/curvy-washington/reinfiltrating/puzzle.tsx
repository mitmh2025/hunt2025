import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  Math,
  MFrac,
  MI,
  MN,
  MO,
  MRow,
  MSpace,
  MText,
} from "../../../components/MathML";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";

const TEAM_SIZE: [string, number][] = [
  [">100", 39],
  ["76–100", 34],
  ["51–75", 29],
  ["26–50", 24],
  ["1–25", 19],
];

type Feat =
  | [string, string, ReactNode[], number]
  | [string, string, ReactNode[], number, ReactNode];

const FEATS: Feat[] = [
  [
    "Cat Burglary",
    "Demonstrate your agility",
    [
      <>
        <Math>
          <MI>n</MI>
        </Math>{" "}
        members of your team must sneak from one side of your HQ(s) to the other
      </>,
      "Cat burglars must not touch the floor—this is a second story job",
      "Must be sneaky",
    ],
    3,
    <>
      <Math>
        <MText>where</MText>
        <MSpace width={"0.3em"} />
        <MI>n</MI>
        <MO>=</MO>
        <MFrac>
          <MRow>
            <MText>your reported team size</MText>
          </MRow>
          <MRow>
            <MN>10</MN>
          </MRow>
        </MFrac>
      </Math>
    </>,
  ],
  [
    "Copyright Infringement",
    "Create some unlicensed D&M merchandise",
    [
      "Must use the D&M logo according to the branding guidelines of D&M International Inc., LLC",
      "Must have 5 distinct knock-off products in different verticals (beauty, healthcare, technology, clothing, etc.)",
      "Will be judged on quality and whether our judges can distinguish them from the real thing",
      "Bonus points if we can confiscate them",
    ],
    4,
  ],
  [
    "Counterfeiting",
    "Make the Shadow Diamond",
    [
      "Must be the size of a softball, faceted, and weigh at least 8oz",
      "Must be able to see through it (more clarity is worth more)",
      "Must be faceted (well cut stones are also worth more)",
      "Must be cursed",
      "Bonus points if we can take it with us",
    ],
    5,
  ],
  [
    "Forgery",
    "Forge this year’s Mystery Hunt Coin",
    [
      "provide a STEP file",
      "coin diameter should be between 1.5 and 3 inches",
      "only one side needs to have detail",
      "must reflect the theme and story of the Hunt",
      "should include at least 2 depths of relief",
    ],
    4,
  ],
  [
    "Jaywalking",
    "Walk like a J",
    [
      <>
        Show us{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        team members that can walk across your team HQ while keeping their body
        in the shape of a J
      </>,
      "Their names must all contain J",
      "They must say words starting with J while they walk",
    ],
    3,
    <>
      <Math>
        <MText>where</MText>
        <MSpace width={"0.3em"} />
        <MI>n</MI>
        <MO>=</MO>
        <MFrac>
          <MRow>
            <MText>your reported team size</MText>
          </MRow>
          <MRow>
            <MN>10</MN>
          </MRow>
        </MFrac>
        <MSpace width={"0.3em"} />
        <MText>or</MText>
        <MSpace width={"0.3em"} />
        <MN>10</MN>
        <MText>, whichever is smaller</MText>
      </Math>
    </>,
  ],
  [
    "Money Laundering",
    "Provide paper receipts totaling exactly $100.00. What a coincidence…",
    [
      "Must be real receipts from legitimate businesses (no forgeries on this one)",
      <>
        Must be made up of at least{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        unique receipts
      </>,
      "Must all be for innocuous products",
    ],
    4,
    <>
      <Math>
        <MText>where</MText>
        <MSpace width={"0.3em"} />
        <MI>n</MI>
        <MO>=</MO>
        <MFrac>
          <MRow>
            <MText>your reported team size</MText>
          </MRow>
          <MRow>
            <MN>10</MN>
          </MRow>
        </MFrac>
      </Math>
    </>,
  ],
  [
    "Piracy",
    "“You wouldn’t download a car” (Spoiler alert: you would)",
    [
      "Must be 3D-printed or otherwise custom manufactured within last 24 hours",
      "Must have pirate logo",
      "Must race against our car down a ramp",
      "Must provide a ramp",
      "Race winners score more points",
    ],
    5,
  ],
  [
    "Planting Evidence",
    "Provide evidence of plants",
    [
      <>
        Must show{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        living plants of{" "}
        <Math>
          <MI>x</MI>
        </Math>{" "}
        different species in your HQ.
      </>,
    ],
    4,
    <>
      <div>
        <Math>
          <MText>where</MText>
          <MSpace width={"0.3em"} />
          <MI>n</MI>
          <MO>=</MO>
          <MFrac>
            <MRow>
              <MText>your reported team size</MText>
            </MRow>
            <MRow>
              <MN>7</MN>
            </MRow>
          </MFrac>
          <MText>, rounded down</MText>
        </Math>
      </div>
      <div>
        <Math>
          <MText>and</MText>
          <MSpace width={"0.3em"} />
          <MI>x</MI>
          <MO>=</MO>
          <MFrac>
            <MRow>
              <MText>your reported team size</MText>
            </MRow>
            <MRow>
              <MN>5</MN>
            </MRow>
          </MFrac>
          <MText>, rounded down</MText>
        </Math>
      </div>
    </>,
  ],
  [
    "Rigged Gambling",
    "Make a loaded die",
    [
      <>
        <Math>
          <MI>n</MI>
        </Math>
        -sided die with numbers 1-
        <Math>
          <MI>n</MI>
        </Math>{" "}
        on each face
      </>,
      "Must roll highest number between 50-75% of the time",
      "No obvious external weights",
    ],
    5,
    <>
      <Math>
        <MText>where</MText>
        <MSpace width={"0.3em"} />
        <MI>n</MI>
        <MO>=</MO>
        <MFrac>
          <MRow>
            <MText>your reported team size</MText>
          </MRow>
          <MRow>
            <MN>10</MN>
          </MRow>
        </MFrac>
        <MSpace width={"0.3em"} />
        <MText>or</MText>
        <MSpace width={"0.3em"} />
        <MN>6</MN>
        <MText>, whichever is greater</MText>
      </Math>
    </>,
  ],
  [
    "Smuggling",
    "Snuggling",
    [
      <>
        Fit{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        team members into a space of size{" "}
        <Math>
          <MI>x</MI>
        </Math>{" "}
        without anyone touching the floor outside the space
      </>,
      "All team members must be completely within the space",
      "You must create a space delineation and we will measure it",
    ],
    3,
    <>
      <div>
        <Math>
          <MText>where</MText>
          <MSpace width={"0.3em"} />
          <MI>n</MI>
          <MO>=</MO>
          <MFrac>
            <MRow>
              <MText>your reported team size</MText>
            </MRow>
            <MRow>
              <MN>5</MN>
            </MRow>
          </MFrac>
          <MText>, rounded down</MText>
        </Math>
      </div>
      <div>
        <Math>
          <MText>and</MText>
          <MSpace width={"0.3em"} />
          <MI>x</MI>
          <MO>=</MO>
          <MFrac>
            <MRow>
              <MI>n</MI>
            </MRow>
            <MRow>
              <MN>2</MN>
            </MRow>
          </MFrac>
          <MText>sq. ft.</MText>
        </Math>
      </div>
    </>,
  ],
  [
    "Tax evasion",
    "“Tacks” Evasion",
    [
      "Create a piece of art using thumbtacks and negative space",
      "Must represent your dislike of wasteful government spending",
      <>
        Must use{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        thumbtacks
      </>,
      "Bonus points if we can take it back with us",
    ],
    5,
    <>
      <Math>
        <MText>where</MText>
        <MSpace width={"0.3em"} />
        <MI>n</MI>
        <MO>≥</MO>
        <MText>your reported team size</MText>
        <MO>*</MO>
        <MN>3</MN>
      </Math>
    </>,
  ],
];

const StyledTable = styled.table`
  margin-bottom: 1em;
  border-collapse: collapse;
  tr:not(:last-child) {
    border-bottom: 1px solid black;
  }
  th,
  td {
    text-align: left;
    padding-right: 1em;
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Did you think you could just recruit a few informants and be set for
        life? Being a P.I. requires sustaining these relationships.
      </p>
      <AuthorsNoteBlock>
        <p>
          This is a scavenger hunt, which requires solvers to acquire materials
          and demonstrate skills for our judges. Successfully completing this
          will not award an answer used in any metapuzzle, but will award 1
          🔍Clue.
        </p>
        <p>
          Judging will occur in person in your team’s headquarters. To request
          judgment, please email info@mitmh2025.com with “WRETCHED HIVE OF SCUM
          AND VILLAINY” in the subject line, and let us know your team name and
          any details for visiting your HQ.
        </p>
      </AuthorsNoteBlock>
      <p>
        The mean streets of MITropolis may change, but the currency stays the
        same. In order to succeed, you will need to demonstrate feats of
        criminality to meet a minimum threshold of street cred. Larger P.I.
        training firms will need more street cred to earn a 🔍 Clue.
      </p>
      <StyledTable>
        <tr>
          <th>Team Size</th>
          <th>Street Cred Needed</th>
        </tr>
        {TEAM_SIZE.map(([size, cred], i) => (
          <tr key={i}>
            <td>{size}</td>
            <td>{cred}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Your criminal peers are discerning. For each feat of criminality, you
        may earn up to a maximum amount of street cred. You will be judged on
        credibility, gumption (effort), and moxie (skill).
      </p>
      <StyledTable>
        <tr>
          <th>Criminal Act</th>
          <th>Feat to Demonstrate</th>
          <th>Minimum Requirements</th>
          <th>Maximum Street Cred</th>
        </tr>
        {FEATS.map(([act, feat, reqs, cred, formula], i) => (
          <tr key={i}>
            <td>
              <strong>{act}</strong>
            </td>
            <td>{feat}</td>
            <td>
              <ul>
                {reqs.map((req, j) => (
                  <li key={j}>{req}</li>
                ))}
              </ul>
              {formula ?? <></>}
            </td>
            <td>{cred}</td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
};

export default Puzzle;
