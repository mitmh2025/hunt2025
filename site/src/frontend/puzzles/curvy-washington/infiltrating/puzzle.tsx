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
    "Burgle a cat",
    [
      "Cat must be furry and have ears, a tail, and four paws",
      "Prove to us the cat didn’t already belong to you",
      "Explain exactly how you burgled this cat, with evidence to substantiate",
    ],
    4,
  ],
  [
    "Copyright Infringement",
    "Record a noir knockoff of a Pixar film",
    [
      "Must be at least 1 minute long",
      "Must be in black and white",
      "Must use believable noir jargon and tropes",
      "Also email this to us, obviously",
    ],
    5,
  ],
  [
    "Counterfeiting",
    "Print your own fat stack of cash",
    [
      "Paper money custom to your team",
      "Stacks must be at least 1 inch tall, banded, and consist of many bills (minimum 3 stacks)",
      "Bills should have face of a person (preferably not a dead white guy) on front and a unique back",
      "Must have hidden watermarks or other anti-counterfeiting technology",
      "Bonus points if we can take it with us",
    ],
    3,
  ],
  [
    "Forgery",
    "Replicate a piece of on campus art",
    [
      "Chosen art must be a sculpture or mural on campus",
      "Forgery must be at least as large as the tallest team member currently in your team HQ (we will check)",
      "Any medium is acceptable but we must be able to identify the artwork.",
      "Bonus points for a gift-shop replica (smaller forgery) that we can take with us",
    ],
    5,
  ],
  [
    "Jaywalking",
    "Walk like a Jay",
    [
      <>
        Show us{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        different bird walks from the following list: Chicken, Ostrich, Peacock,
        Canada Goose, Flamingo, Pigeon, Egret, Woody the Woodpecker, Roadrunner,
        Big Bird, Mayor Turkatone (who used to hang out by Wings Over Somerville
        and chase people)
      </>,
      "A different member of your team must demonstrate each bird walk",
      "Appropriate sounds required",
      "Team members must look like said birds",
      "Cross from one side of your HQ to the other",
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
    "Launder money",
    [
      <>
        At least{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        distinct pieces of currency
      </>,
      "Each piece of currency must be from a different country",
      "Must have a distinct freshly-washed scent",
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
        <MN>5</MN>
        <MText>, whichever is larger</MText>
      </Math>
    </>,
  ],
  [
    "Piracy",
    "Earn a Pirate Certificate",
    [
      "Demonstrations of skill in archery, pistol, sailing, and fencing (no actual weapons)",
      "Archers and pistoleers must hit bullseye",
      "Sailors must tack and jibe across HQ in appropriate craft, with sail",
      "Fencers must swashbuckle with appropriate flourish",
      "Provide your own appropriate equipment (no actual weapons)",
      "Must display sufficient aptitude to pass a DAPER class",
      <strong key="yelling">NO ACTUAL WEAPONS</strong>,
    ],
    5,
  ],
  [
    "Planting Evidence",
    "Plant evidence on one of the judges",
    [
      "Must be an item at least as large as a Mystery Hunt coin (the larger and more incriminating, the better)",
      "Judge must not notice this occurring",
      "You then must loudly accuse them of an appropriate crime and insist the other judge search them",
    ],
    3,
  ],
  [
    "Rigged Gambling",
    "Put the fix in",
    [
      "Stage a race consisting of at least 5 greyhounds (must be grey)",
      "One of our judges will decide ahead of time who will win and tell one team member",
      "That greyhound must win",
      "None of the other judges must be able to detect how the race is rigged",
    ],
    4,
  ],
  [
    "Smuggling",
    "Get the goods through customs",
    [
      <>
        Select 1 team member to smuggle the goods. They must pass through
        “customs” (a limbo stick) while carrying{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        items upon their person.
      </>,
      "Each item must be at least 1 inch in every dimension (we will measure)",
      "Pockets may be used",
      "Items must not be visible when carried",
      "Bring your own items (it’s a scavenger hunt after all)",
      "The lower your smuggler can go, the better you’ll do",
      "Teams must provide their own limbo stick",
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
            <MN>3</MN>
          </MRow>
        </MFrac>
        <MSpace width={"0.3em"} />
        <MText>or</MText>
        <MSpace width={"0.3em"} />
        <MN>10</MN>
        <MText>, whichever is larger</MText>
      </Math>
    </>,
  ],
  [
    "Tax evasion",
    "Evade taxes",
    [
      <>
        Prepare at least{" "}
        <Math>
          <MI>n</MI>
        </Math>{" "}
        tax forms for your team using IRS standard forms (duplicate and
        triplicate allowed and in fact encouraged)
      </>,
      "Streamline your tax paperwork by turning it into paper airplanes",
      "Select 1 team member to evade these taxes",
      "Prosecute without mercy, and demonstrate to our judges their ability to evade",
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
            <MN>2</MN>
          </MRow>
        </MFrac>
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
        A critical part of becoming a P.I. is building up relationships with the
        criminal element to pump for information.
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
          judgement, please email info@mitmh2025.com with “WE ARE BAD BAD DUDES”
          in the subject line, and let us know your team name and any details
          for visiting your HQ.
        </p>
      </AuthorsNoteBlock>
      <p>
        The key to blending in among the seedy underbelly of MITropolis is
        building up street cred. In order to succeed, you will need to
        demonstrate feats of criminality to meet a minimum threshold of street
        cred. Larger PI training firms will need more street cred to build up a
        sufficient network of informants, naturally.
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
