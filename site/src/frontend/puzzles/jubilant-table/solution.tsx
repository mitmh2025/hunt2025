import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const MEGATABLE: [
  string,
  string,
  string,
  string,
  string,
  string,
  ReactNode,
  string,
  string,
][] = [
  [
    "",
    "Papa [drive-in movie theater]",
    "",
    "",
    "",
    "",
    "",
    "Casablanca quotes in movie order",
    "43",
  ],
  [
    "1",
    "I have an old photograph… [____________] for her. Perfect late-late show.",
    "?",
    "",
    "-",
    "YOU PLAYED IT",
    <>
      Beyon<strong>D A SH</strong>adow of a Doubt
    </>,
    "“You played it for her.”",
    "53",
  ],
  [
    "2",
    "I was a little sad when we traded in the old A for the J… ",
    "●",
    "",
    ".",
    "",
    "",
    "“I heard a story once… I’ve heard a lot of stories in my time.”",
    "48",
  ],
  [
    "3",
    "And I was right… And the next step will be to [____________]… ",
    "?",
    "",
    "-",
    "THE BLACK MARKET",
    <>
      Give This Gri<strong>D A SH</strong>ake
    </>,
    "“… next step will be to the black market.”",
    "5",
  ],
  [
    "4",
    "You understood intuitively the rhythm of this game… ",
    "● /",
    "C",
    ".",
    "",
    "",
    "“Come to my office in the morning. I’ll be there at ten.”",
    "30",
  ],
  [
    "5",
    "What I love about my favorite harvesting tool… [____________]… ",
    "?",
    "",
    "-",
    "YOUR WINNINGS SIR",
    <>
      Splits Use<strong>D AS H</strong>istory
    </>,
    "“Your winnings, sir.”",
    "12",
  ],
  [
    "6",
    "Getting the numbers wrong… ",
    "▬",
    "",
    "-",
    "",
    "",
    "“Yes, I have the letters. But I intend on using them myself.”",
    "16",
  ],
  [
    "7",
    "You always got choices in this life… ",
    "▬ /",
    "O",
    "-",
    "",
    "",
    "“Maybe not today, maybe not tomorrow, but soon.”",
    "51",
  ],
  [
    "8",
    "It doesn’t matter how we got here… But it’s been a [____________].",
    "?",
    "",
    ".",
    "BEAUTIFUL FRIENDSHIP",
    <>
      Can-<strong>DO T</strong>ransmissions
    </>,
    "“… beautiful friendship.”",
    "41",
  ],
  [
    "",
    "Carter [newsstand]",
    "",
    "",
    "",
    "",
    "",
    "Historical events, chronological",
    "37",
  ],
  [
    "9",
    "I walked out of there feeling like a million bucks… ",
    "▬",
    "",
    "-",
    "",
    "",
    "The Great Molasses Flood, 1919",
    "19",
  ],
  [
    "10",
    "I feel like a walk today… The [____________] job was part of the cleanup… ",
    "?",
    "",
    ".",
    "PEARL STREET",
    <>
      Weir<strong>DO T</strong>hreaded Doodads
    </>,
    "Sacco and Vanzetti case, 1920",
    "45",
  ],
  [
    "11",
    "When it started to look like gang warfare… I never saw the [____________] myself… ",
    "? /",
    "L",
    ".",
    "LITTLE GREEN HOUSE",
    <>
      Garden Anec<strong>DOT</strong>es
    </>,
    "Teapot Dome Scandal, 1921-23",
    "3",
  ],
  [
    "12",
    "Fall finally fell eight years later… ",
    "●",
    "",
    ".",
    "",
    "",
    "Wall Street crash, 1929",
    "38",
  ],
  [
    "13",
    "My friends also had projects further uptown… ",
    "▬",
    "",
    "-",
    "",
    "",
    "Opening of Empire State Building, 1931",
    "46",
  ],
  [
    "14",
    "Building castles in the sky… And the [____________] didn’t look much better.",
    "?",
    "",
    ".",
    "PINEWOOD LADDER",
    <>
      To <strong>DO: T</strong>ile That Rectangle
    </>,
    "Lindbergh kidnapping, 1932",
    "34",
  ],
  [
    "15",
    "What goes up must come down… ",
    "● /",
    "L",
    ".",
    "",
    "",
    "Hindenburg disaster, 1937",
    "11",
  ],
  [
    "16",
    "Here comes the boss now… I believe one of them is holding a Mickey Mouse [____________]… ",
    "?",
    "",
    ".",
    "DRINKING CUP",
    <>
      Engagements an<strong>D OT</strong>her Crimes
    </>,
    "World’s Fair time capsule, 1939",
    "10",
  ],
  [
    "",
    "Gladys [music hall]",
    "",
    "",
    "",
    "",
    "",
    "“You’re the Top” lyrics, by Cole Porter",
    "22",
  ],
  [
    "17",
    "The man reappears with a little box… ",
    "▬ /",
    "A",
    "-",
    "",
    "",
    "“the Louvre Museum”",
    "29",
  ],
  [
    "18",
    "Do you want to wrap it up?… I thought he wrote [____________].",
    "?",
    "",
    ".",
    "WALTZES AND MARCHES",
    <>
      Caccian<strong>DO T</strong>rio Misterioso
    </>,
    "“melody from a symphony by Strauss”",
    "23",
  ],
  [
    "19",
    "Oh no, our leadfooted gopher is at the lunch counter… ",
    "▬",
    "",
    "-",
    "",
    "",
    "“You’re Mickey Mouse”",
    "20",
  ],
  [
    "20",
    "Must be answering a call… That’s put back the smile on [____________].",
    "? /",
    "R",
    ".",
    "LA GIOCONDA",
    <>
      As the World Turan<strong>DOT</strong>
    </>,
    "“the smile on the Mona Lisa”",
    "25",
  ],
  [
    "21",
    "I guess that place has bottomless coffee… ",
    "●",
    "",
    ".",
    "",
    "",
    "“the time of a Derby winner”/”turkey dinner”",
    "14",
  ],
  [
    "22",
    "No, I don’t want lunch… Now let’s see you move those [____________].",
    "? /",
    "A",
    "-",
    "NIMBLE FEET",
    <>
      Absolutely Not Balder<strong>DASH</strong>
    </>,
    "“nimble tread on the feet of Fred Astaire”",
    "47",
  ],
  [
    "23",
    "He really didn’t want to go… ",
    "●",
    "",
    ".",
    "",
    "",
    "“O’Neill drama”/“Whistler’s mama”",
    "6",
  ],
  [
    "24",
    "How far away was that hitching post?… It’s been a long day, and I still have all those [____________] and whatnot to get round… ",
    "?",
    "",
    "-",
    "VERMEERS AND REMBRANDTS",
    <>
      A <strong>DASH</strong> of Color
    </>,
    "“an old Dutch master”",
    "17",
  ],
  [
    "",
    "Baby [art museum]",
    "",
    "",
    "",
    "",
    "",
    "Paintings featuring jewelry, chronological",
    "28",
  ],
  [
    "25",
    "If you wanted everybody who is anybody… ",
    "▬ /",
    "W",
    "-",
    "",
    "",
    "The Arnolfini Portrait, Jan van Eyck, 1434",
    "9",
  ],
  [
    "26",
    "The room’s too quiet… I suppose that was how they used to wear them in [____________]… ",
    "?",
    "",
    ".",
    "LA SERENISSIMA",
    <>
      abstract art and poems / concerning a pale blue <strong>DOT</strong> / and
      many more friends
    </>,
    "Portrait of a Young Venetian Woman, Albrecht Dürer, 1505",
    "32",
  ],
  [
    "27",
    "A lady is trying to convince me… ",
    "● /",
    "I",
    ".",
    "",
    "",
    "The Girl with a Pearl Earring, Johannes Vermeer, 1665",
    "52",
  ],
  [
    "28",
    "A terribly energetic young couple… a black lace gown with a matching veil and a [____________].",
    "?",
    "",
    ".",
    "RED SASH",
    <>
      Fin<strong>D OT</strong>her Ways of Seeing
    </>,
    "The Duchess of Alba, Francisco Goya, 1797",
    "4",
  ],
  [
    "29",
    "There’s a woman over there holding a rather fancy fan… She’s in an astonishing [____________]… .",
    "?",
    "",
    "-",
    "STATE OF UNDRESS",
    <>
      A Map an<strong>D A SH</strong>ade (or Four)
    </>,
    "La Grande Odalisque, Jean-Auguste-Dominique Ingres, 1814",
    "33",
  ],
  [
    "30",
    "That was not a very constructive thought… ",
    "●",
    "",
    ".",
    "",
    "",
    "Portrait of Madame X, John Singer Sargent, 1884",
    "36",
  ],
  [
    "31",
    "Oh and here is Phebe at last… ",
    "● /",
    "L",
    ".",
    "",
    "",
    "Portrait of Adele Bloch-Bauer I, Gustav Klimt, 1907",
    "18",
  ],
  [
    "32",
    "Well, I guess they saved the best for last… And is that an actual [____________]?… ",
    "?",
    "",
    "-",
    "DEAD BIRD",
    <>
      Cross <strong>DASH</strong> Word
    </>,
    "Self-Portrait with Thorn Necklace and Hummingbird, Frida Kahlo, 1940",
    "42",
  ],
  [
    "",
    "Katrina [street with brownstones]",
    "",
    "",
    "",
    "",
    "",
    "Back Bay streets, alphabetical and east to west",
    "13",
  ],
  [
    "33",
    "I had to get out of there, clear my head… I’ve been to [____________]… ",
    "?",
    "",
    ".",
    "LEAFY ARLINGTON",
    <>
      We Can <strong>DO T</strong>his All Day
    </>,
    "Arlington",
    "26",
  ],
  [
    "34",
    "I wish I could do this in the thief’s shoes… ",
    "● /",
    "D",
    ".",
    "",
    "",
    "Berkeley",
    "24",
  ],
  [
    "35",
    "Now this is a type designed to grab your attention… Brought to you by [____________]… ",
    "?",
    "",
    ".",
    "C FOR CLARENDON",
    <>
      <strong>DO T</strong>he Packing
    </>,
    "Clarendon",
    "2",
  ],
  [
    "36",
    "People don’t understand how far-reaching their victory was… ",
    "▬",
    "",
    "-",
    "",
    "",
    "Dartmouth",
    "54",
  ],
  [
    "37",
    "I’ve learned so little… [____________]--those who journey to this place… ",
    "? /",
    "R",
    ".",
    "PHILLIPS EXETER",
    <>
      Sounds like a Do<strong>DO T</strong>o Me
    </>,
    "Exeter",
    "8",
  ],
  [
    "38",
    "Not far away now. Best hold fire for a moment… ",
    "▬",
    "",
    "-",
    "",
    "",
    "Fairfield",
    "35",
  ],
  [
    "39",
    "I look down and continue the passage… ",
    "▬",
    "",
    "-",
    "",
    "",
    "Gloucester",
    "49",
  ],
  [
    "40",
    "Why should this name be here?… I suppose there’s [____________]… ",
    "? /",
    "O",
    "-",
    "HEREFORD CATTLE",
    <>
      It’s All Cheep (An<strong>D A SH</strong>eep) To Me
    </>,
    "Hereford",
    "15",
  ],
  [
    "",
    "Billie [train station]",
    "",
    "",
    "",
    "",
    "",
    "MBTA blue line stops, inbound",
    "40",
  ],
  [
    "41",
    "I think of this as my personal train of thought… Am I going [____________] here?… ",
    "?",
    "",
    ".",
    "DOWN A RABBIT HOLE",
    <>
      In Communica<strong>DO T</strong>onight
    </>,
    "Wonderland",
    "44",
  ],
  [
    "42",
    "I always think this is asking a lot… ",
    "●",
    "",
    ".",
    "",
    "",
    "Revere Beach",
    "31",
  ],
  [
    "43",
    "This name makes me think of a hillside dotted with sheep… And dreaming of [____________]… ",
    "?",
    "",
    ".",
    "SUFFOLK EWES",
    <>
      Good Fences Make Goo<strong>D OT</strong>herwise Incompatible Neighbors
    </>,
    "Suffolk Downs",
    "21",
  ],
  [
    "44",
    "Men, men, men… they are all the same!… ",
    "▬ /",
    "V",
    "-",
    "",
    "",
    "Orient Heights",
    "1",
  ],
  [
    "45",
    "This is always a nice place for a walk… ",
    "● /",
    "E",
    ".",
    "",
    "",
    "Wood Island",
    "39",
  ],
  [
    "46",
    "I need to look at this from different angles… I wonder whether [____________] ever touched down here… ",
    "?",
    "",
    ".",
    "LITTLE TOM",
    <>
      What <strong>DO T</strong>hey Call You?
    </>,
    "Maverick",
    "7",
  ],
  [
    "47",
    "And the motive? Our primary aim is to explain the succession… ",
    "▬",
    "",
    "-",
    "",
    "",
    "Aquarium",
    "27",
  ],
  [
    "48",
    "Well this is a fine thing, a fine state of affairs… [____________]… ",
    "? /",
    "R",
    ".",
    "TO STATE THE OBVIOUS",
    <>
      esTIMation <strong>DOT</strong> jpg
    </>,
    "State",
    "50",
  ],
];

const SHORTHAND_TO_COLOR: Record<string, string> = {
  R: "#e06666",
  r: "#f4cccc",
  O: "#f6b26b",
  o: "#fce5cd",
  Y: "#ffd966",
  y: "#fff2cc",
  G: "#93c47d",
  g: "#dee9d5",
  B: "#6d9eeb",
  b: "#cfdaf5",
  P: "#8b7ebe",
  p: "#d8d3e7",
  a: "#cccccc",
};

const MEGATABLE_COLORS = `
RRRRRRRRR
rraarrrrr
rraarrrrr
rraarrrrr
rraarrrrr
rr  rrrrr
rr  rrrrr
rr  rrrrr
rraarrrrr
OOOOOOOOO
ooaaooooo
ooaaooooo
ooaaooooo
oo  ooooo
oo  ooooo
oo  ooooo
oo  ooooo
ooaaooooo
YYYYYYYYY
yyaayyyyy
yy  yyyyy
yy  yyyyy
yy  yyyyy
yyaayyyyy
yyaayyyyy
yy  yyyyy
yy  yyyyy
GGGGGGGGG
gg  ggggg
ggaaggggg
ggaaggggg
gg  ggggg
gg  ggggg
gg  ggggg
gg  ggggg
ggaaggggg
BBBBBBBBB
bbaabbbbb
bbaabbbbb
bb  bbbbb
bb  bbbbb
bb  bbbbb
bbaabbbbb
bbaabbbbb
bbaabbbbb
PPPPPPPPP
pp  ppppp
pp  ppppp
pp  ppppp
pp  ppppp
ppaappppp
pp  ppppp
pp  ppppp
pp  ppppp
`
  .split("\n")
  .slice(1, -1)
  .map((row) =>
    row.split("").map((char) => SHORTHAND_TO_COLOR[char] ?? "white"),
  );

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 1em 0;
  th,
  td {
    padding: 0 8px;
  }
`;

const StyledTd = styled.td<{ $color: string }>`
  background-color: ${({ $color }) => $color};
`;

const StyledSpan = styled.span<{ $color: string }>`
  background-color: ${({ $color }) => $color};
`;

const LargeMorseText = styled.span`
  font-size: 24px;
`;

const Green = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <StyledSpan $color="#00ff00" aria-label="Page ordering clue">
      {children}
    </StyledSpan>
  );
};

const Olive = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <StyledSpan $color="#6aa84f" aria-label="Chapter ordering clue">
      {children}
    </StyledSpan>
  );
};

const Blue = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <StyledSpan $color="#4a86e8" aria-label="Distinctive chapter feature">
      {children}
    </StyledSpan>
  );
};

const Cyan = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <StyledSpan $color="#00ffff" aria-label="Time of day">
      {children}
    </StyledSpan>
  );
};

const Orange = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <StyledSpan $color="#ff9900" aria-label="Mention of Rover">
      {children}
    </StyledSpan>
  );
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This metapuzzle was written as an homage to Cain’s Jawbone, a 1930s
        murder mystery puzzle that was presented as an unordered set of pages.
        The flavortext directly references Cain’s Jawbone, and solvers could
        theoretically look up the solution to the original in online forums, or
        could find the mechanic organically.
      </p>
      <p>
        The puzzle presents as an unordered set of pages that are impossible to
        parse, with some pages containing a redacted word or phrase. Pages that
        don’t have a redaction contain a Morse code character, and pages that
        have a redaction replace the morse character with a question mark. Some
        Morse code characters or question marks are followed by a slash.
      </p>
      <p>
        The first aha is that answers from this round can be plugged into the
        empty slots one for one to complete sentences sensibly. Every puzzle
        title in The Murder in MITropolis contains the substring “DOT” or
        “DASH”, allowing solvers to canonically assign a dot or dash to every
        page once they have correctly assigned a puzzle answer to a page with a
        redaction. Slashes indicate breaks between letters, but attempting to
        decode the Morse in the given page order results in nonsense.
      </p>
      <p>
        The reward for solving a puzzle is three pages. Eventually solvers will
        have 54 pages, 24 with Morse characters, 24 with question marks, and 6
        chapter pages with a character name and an illustration. The flavortext
        hints at separating the pages out into equal numbers for each different
        narrator, and re-ordering to understand the complete story over the
        course of the day. Solvers may be tempted to try to rearrange the pages
        based solely on “vibes”, or character voice and story elements. It is
        possible to make progress this way but will not allow them to solve the
        puzzle.
      </p>
      <p>
        The second aha is that each chapter contains a unique ordering
        mechanism, based on what the character was observing or doing as they
        recounted events of the day. These range in style from direct quotes
        (Casablanca in Papa’s chapter) to more oblique musings (Blue Line stops
        in Billie’s chapter). Finding each of these sorting mechanisms, and the
        elements cluing them, comprises the majority of the puzzle. The story,
        while intentionally cryptic, also becomes more tractable to understand
        once the pages are reordered, and acts as a secondary confirmation (not
        to mention telling you a lot about the background story happening in
        Hunt!)
      </p>
      <p>
        Finally, solvers must sort the chapters by the time of day beginning at
        midnight, as stated by the flavortext. Each chapter contains 2–3
        references to the time of day. If solvers don’t notice all of these due
        to the density of the text, they can also sort using the chapter page
        illustrations, which each include a full moon or a sun. All chapter
        illustrations are from the perspective of someone facing south
        (MITropolis is Boston, after all), so the sun and moon move from left to
        right.
      </p>
      <p>
        Sorting the pages correctly and reading the Morse code spells out the
        answer, <PuzzleAnswer>COLLAR A WILD ROVER</PuzzleAnswer>, an instruction
        for confronting the murderer.
      </p>
      <p>
        The table below includes excerpts from each page, the redacted answer,
        and the Morse character in the correct order. Morse letters are
        alternating grey and white backgrounds.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Solved order</th>
            <th>Page text excerpt</th>
            <th>Morse on page</th>
            <th>Extraction</th>
            <th>Morse</th>
            <th>Answer</th>
            <th>Puzzle title</th>
            <th>Sorting mechanic</th>
            <th>Given page ordering</th>
          </tr>
          {MEGATABLE.map((cells, i) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- hard-coded data
            const colors = MEGATABLE_COLORS[i]!;
            return (
              <tr key={i}>
                {cells.map((cell, j) => {
                  let children: ReactNode = cell;
                  if (j === 4) {
                    children = (
                      <LargeMorseText>
                        <strong>{cell}</strong>
                      </LargeMorseText>
                    );
                  }
                  if (j === 5) {
                    children = <Mono>{cell}</Mono>;
                  }
                  return (
                    <StyledTd $color={colors[j] ?? "white"} key={j}>
                      {children}
                    </StyledTd>
                  );
                })}
              </tr>
            );
          })}
        </StyledTable>
      </HScrollTableWrapper>
      <h3>Full worked solution</h3>
      <p>
        The narrators are, in order, Papa, Carter, Gladys, Baby, Katrina, and
        Billie.
      </p>
      <p>
        When the pages are ordered correctly, the whole text forms a complete
        narrative, recounting what happened on the day Sidecar was killed. The
        central character in this story is Rover. He is present throughout all
        of the chapters, although never central to the action.
      </p>
      <p>
        Rover, out of loyalty to Papa, keeps a watchful eye on the Shadow
        Diamond throughout the day. First, he follows Carter to the bank, where
        Carter collects the diamond, and then to the casino where Carter flashes
        the diamond to prove he’s good for his debts. After Carter delivers the
        diamond for display at the Gala, Sidecar surreptitiously removes the
        diamond from the Gala, taking it to a jewelry store for evaluation:
        Rover follows him and stakes out the store. Gladys, purchasing a ring
        for Carter but unaware Sidecar is in the back of the store, discovers
        Rover and insists he drive her home. Later, as Baby mingles at the Gala,
        she sees Rover slipping away from the Gala in pursuit of Sidecar, who
        still has the diamond. Offstage, an altercation between the two leads to
        Sidecar’s death. Katrina steps away from the Gala for a walk to clear
        her head and spots Rover in an unusual part of town for him, carrying
        the appraisal Sidecar obtained from the jeweler certifying the diamond
        as a fake, and stashing it in a secure location.
      </p>
      <p>
        In the final chapter, Billie reviews these clues revealed to them by the
        various narrators, although none seemed to appreciate the significance
        of their evidence, and pieces together the details of the case.{" "}
      </p>
      <p>
        It is not necessary for solvers to follow this story in full detail; the
        answer is given by reading the Morse code.
      </p>
      <p>The following annotations are used in the story explication:</p>
      <ul>
        <li>
          Clues that reveal the order of the pages in a chapter are highlighted
          in <Green>green</Green>.
        </li>
        <li>
          Hints that explain the chapter’s ordering mechanism are highlighted in{" "}
          <Olive>olive</Olive>.
        </li>
        <li>
          Other things which are distinctive to a chapter are highlighted in{" "}
          <Blue>blue</Blue>.
        </li>
        <li>
          Times of day that show which order the chapters come in are
          highlighted in <Cyan>cyan</Cyan>.
        </li>
        <li>
          Mentions of Rover, or of his car(s) are highlighted in{" "}
          <Orange>orange</Orange>.
        </li>
        <li>
          Context notes are <em>italicized</em>.
        </li>
      </ul>
      <p>
        <em>
          Papa looks back over Rover’s time with the company.{" "}
          <Green>
            He is watching a private midnight screening of the film Casablanca,
            which frequently intrudes on his thoughts.
          </Green>
        </em>
      </p>
      <p>
        <em>
          (Rover’s early days working for Papa. Rapport with the infant Gladys.)
        </em>
        <br />I have an old photograph from when you started. I know it by
        heart. We’d taken <Orange>the old Straight Eight</Orange> down to the
        river. You can see it sparkling in the background. She’s standing on
        your knees, wearing that <Orange>cap</Orange> which comes right down
        over her face. Play the beep, she was saying, play the beep. Such simple
        things used to entertain her. Now she’s all grown up, and it’s{" "}
        <Olive>Anything Goes</Olive>.{" "}
        <em>[Hints at the ordering mechanism for the Gladys chapter.]</em>{" "}
        You’re looking away, but it feels like you’re watching out for her.{" "}
        <em>[Because he is watching Casablanca:]</em>{" "}
        <Olive>
          I love this picture. Everything about it is perfect… everything that
          is said, and some things that are not said.
        </Olive>{" "}
        <Green>[YOU PLAYED IT] for her.</Green>{" "}
        <Cyan>Perfect late-late show.</Cyan>
      </p>
      <p>
        <em>
          (Papa stands by his decision to promote Rover within the
          organization.)
        </em>
        <br />I was a little sad when we{" "}
        <Orange>traded in the old A for the J</Orange>, but you thought it was a
        step up. And you moved up quickly. People said I must be going soft. But
        I’m not a sentimental person. There’s no place for it. There’s room for
        love. There’s room for family. The rest is business. Business is not
        about feelings, it’s about trust. She trusted you. I trusted you. And
        everyone starts out somewhere.{" "}
        <Green>
          I heard a story once. In fact, I’ve heard a lot of stories in my time.
        </Green>{" "}
        Ben Franklin left school and became a printer’s apprentice. James
        Garfield was a janitor. Snorky Capone was expelled from school and
        worked in a candy store. And see what fine, upstanding men they turned
        out to be.{" "}
      </p>
      <p>
        <em>(Papa’s approach to assessing Rover’s character.)</em> And I was
        right. I was looking at a real diamond. But still, this is a serious
        business. You don’t just take one look at a diamond and decide you have
        the next Star of Africa. First, you have to put it under a microscope.
        You have to look at it from different angles. You have to take it out of
        its setting and look at it in the light. And the{" "}
        <Green>next step will be to [THE BLACK MARKET].</Green> I’ll tell you
        something for free. There is no such thing as perfection in this
        business. What matters is what kind of imperfections you got. Are you
        true blue or are you yellow?{" "}
        <em>
          (Certain imperfections in the diamond lattice give it a valuable blue
          color; others a yellow color. Metaphorically, blue is the color of
          fidelity; yellow of cowardice and cravenness.)
        </em>
      </p>
      <p>
        <em>
          (The organization is more important than individual ambitions.)
          (“baseball”{" "}
          <a href="#baseball-footnote">
            <sup id="anti-baseball-footnote">1</sup>
          </a>{" "}
          analogy)
        </em>
        <br />
        You understood intuitively the rhythm of this game. You get a turn in
        the batter’s box, and then everyone’s eyes are on you. You step up to
        the plate, or you don’t. You get three strikes, and then you’re out.
        Distantly comes the <Cyan>sound of a single strike</Cyan>.{" "}
        <Green>Come to my office in the morning. I’ll be there at ten.</Green> I
        was known to swing the bat myself{" "}
        <em>(i.e. dole out physical punishment to unfaithful underlings)</em> in
        the old days. One man comes in, another goes out. But the team is what
        matters. And you understood that too.
      </p>
      <p>
        <em>
          (This passage is about operating an illegal lottery, an important form
          of steady income for organised crime in the era. In addition to the
          normal house cut, illegal lotteries made money in two ways: by
          pocketing the revenue which should legally have been paid in tax, and
          by paying off journalists to fix the published numbers—the “handle”—so
          that few bets were ever actually paid.)
        </em>
        <br /> What I love about my favorite harvesting tool <em>(lottery)</em>{" "}
        is that it works even if it’s not properly bent <em>(fixed)</em>. You
        can let go of the handle <em>(i.e. not fix the results)</em> and still
        get a tidy cut. You rake it in and you’ve still got plenty to fill the
        bins. <Green>[YOUR WINNINGS, SIR]</Green>. Sure, we had a broken handle{" "}
        <em>(because the journalists had stopped cooperating)</em>. But at the
        end of the day we could still make good bread. Everything was all right,
        as long as my right hand <em>[Sidecar]</em> and my left hand{" "}
        <em>[Rover]</em> worked together. It only took one person to lean in too
        heavily, and suddenly we had a mess. And then you <em>[Rover]</em> had a
        lot of pieces to pick up. I watched you do that.
      </p>
      <p>
        <em>
          (When the newspaper stopped “fixing” the handle, Papa wanted to leave
          well alone and pay winning bets as a cost of business. Sidecar tried
          to take a heavy-handed approach with the newspaper, which backfired.
          Rover smoothed things over.)
        </em>
        <br />
        Getting the numbers wrong may be regarded as a misfortune. Disrespecting
        the paperboys was harder to put right. Of course I had to shuffle him{" "}
        <em>[Sidecar]</em> out of the way for a while. Shunt him out of the way,
        you could say.{" "}
        <em>(Papa thinks a “Sidecar” sounds like something you shunt.)</em> For
        his own good. And while he was laying low I still needed someone to take
        care of the day to day. And who did I know who would{" "}
        <Orange>go everywhere with me</Orange> <em>[in the car]</em>? And, let’s
        not forget, had just put the numbers right. We really needed those
        numbers.{" "}
        <Green>Yes, I have the letters. But I intend using them myself</Green>.
      </p>
      <p>
        <em>(Things between Rover and Sidecar are coming to a head.)</em>
        <br />
        You always got choices in this life. You can get on that plane, or you
        can have what’s behind door number one. You can be a passenger, or you
        can be a driver. <Orange>And you were a driver.</Orange> They say that a
        butterfly flapping its wings can cause a hurricane. Something happens,
        you hardly notice, but it grows with time until it comes crashing down
        on you. I think that flap (over the lottery) was the beginning of a
        gathering storm. And the storm has to break.{" "}
        <Green>Maybe not today, maybe not tomorrow, but soon.</Green>{" "}
        <Cyan>This is why tomorrow, or today actually, matters</Cyan>{" "}
        <em>
          (tomorrow is the Gala, where Carter will be brought into the family)
        </em>
        . A chance to steady the ship. Batten down the hatches.
      </p>
      <p>
        <em>(End of the chapter, and of the film screening.)</em>
        <br />
        It doesn’t matter how we got here. We are where we are. Maybe you were
        the right man at the right time. Maybe it was because you are a
        sentimentalist. Maybe it was because you make my oldest laugh. Or you
        did, once upon a time. To be honest I’m pretty sure she’d still take you
        over an orange cognac <em>(a “Sidecar” cocktail)</em>. Maybe keeping you
        around was a hard-nosed business decision. Maybe it was a feeling in my
        gut. But it’s been a <Green>[BEAUTIFUL FRIENDSHIP]</Green>.{" "}
        <em>(Last line of Casablanca.)</em>
      </p>
      <hr />
      <p>
        <em>
          Carter has just collected the diamond from a safety deposit box, and
          walks to a casino where he plans to show it to the manager to prove he
          can cover his gambling debts.{" "}
          <Green>He reminisces about his life of crime.</Green> He is followed
          by an unidentified man who turns out to be Rover.
        </em>
      </p>
      <p>
        <em>(The Great Molasses Flood, Boston, 1919)</em>
        <br />I walked out of there <em>[bank]</em> feeling like a million
        bucks. Which is not a lot these days. I’ve got more than that in my
        pocket.{" "}
        <Olive>
          It took me twenty years to become an overnight sensation. I don’t have
          a lot of regrets about those years. Think about everything that’s
          happened in those twenty years. That’s a lot of history.
        </Olive>{" "}
        <Green>
          That little industrial so-called accident was a sticky business,
          obviously.
        </Green>{" "}
        But it wasn’t really our job. The anarchists blew the tank. All we did
        was get them access to the site, and empty the safe the night before.
        <Green>
          The whole office ended up in the harbor, apparently, so we didn’t have
          to go back and clean up. Unlike the city workers, who were mopping up
          for weeks. Twenty-one dead.
        </Green>{" "}
        That was a lot of innocent bystanders. Not really my style, but
        sometimes that’s the cost of business.{" "}
        <Green>
          Still, flattening a firehouse and a police station was a lucky bonus.
        </Green>
      </p>
      <p>
        <em>(Sacco and Vanzetti, Boston, 1920)</em>
        <br />I feel like a walk today. It’s <Cyan>
          a beautiful morning
        </Cyan>{" "}
        for it. And no point in getting to the joint <em>[casino]</em> too
        early. The [PEARL STREET] job was part of the cleanup. Someone told a
        very touching story, that our next job would make the Northampton Bank
        take look like some kid’s lunch money.{" "}
        <Green>It turned out to be a bunch of cobblers</Green>{" "}
        <em>
          (“a bunch of cobblers” means the story was “a load of nonsense”, but
          in this case the target of the robbery actually was cobblers, i.e.
          shoemakers)
        </em>
        ,{" "}
        <Green>
          but we took the job anyway. We made some money, but more importantly
          we squared accounts with the reds by making a couple of Galleanists
          the fall guys.
        </Green>{" "}
        No more looking over our shoulders. But old habits die hard. I’ll wait
        for an opportune moment <em>(to look back over his shoulder)</em>.
      </p>
      <p>
        <em>(The Teapot Dome scandal, Washington, D.C., 1921–23)</em>
        <br />
        When it started to look like gang warfare{" "}
        <em>
          (between anarchists and communists, referencing the last two pages)
        </em>
        , we got out of town. You can’t have anarchists running the place, that
        would be, well, I don’t know what that would be. Mind you, the new place
        was overrun by elephants and donkeys{" "}
        <em>[Republicans and Democrats]</em> running wild. Found a place tucked
        away in the corner of Trinidad, between the Old City and the arboretum.{" "}
        <em>[These are all areas of Washington, D.C.]</em> It’s good to stop and
        have a little look back every now and then{" "}
        <em>(to see if he is being followed)</em>.{" "}
        <Green>
          I never saw the <em>[LITTLE GREEN HOUSE]</em> myself, much less the
          place out in Wyoming
        </Green>
        , but I got a lot of salad from there. They had the best lettuce in
        town, even after the proverbial tempest broke. And we had our own mint.
        I was covered in green from head to toe.{" "}
        <em>
          [These are all slang terms for making money:
          salad/lettuce/mint/green.]
        </em>{" "}
        And… do I have a tail? <em>(Someone is following him.)</em> I’d better
        keep my eyes open.
      </p>
      <p>
        <em>(The stock-market crash, New York, 1929)</em>
        <br />
        Fall{" "}
        <em>
          [Albert Fall, convicted in the Teapot Dome scandal in 1929]
        </em>{" "}
        finally fell eight years later. Until then everything was shooting up.
        We couldn’t lose money if we tried.{" "}
        <Green>
          And then it all went down. Whatever you heard, it’s not true that
          people jumped out of windows.
        </Green>{" "}
        But at least one was pushed. I heard someone wrote a very sympathetic
        suicide note for him. Said he’d bought on the margin and lost
        everything. Nah, he didn’t lose his shares. He didn’t even misplace
        them. They were all in a neat pile in his desk drawer. Yes, we sold them
        at a loss. But it wasn’t our loss. I actually wonder, what if I
        deliberately tried to lose{" "}
        <Orange>
          <em>(his tail, Rover)</em>
        </Orange>
        … but I’d have to have eyes in the back of my head.
      </p>
      <p>
        <em>(Construction of Empire State Building, New York, 1931)</em>
        <br />
        My friends also had projects further uptown.{" "}
        <em>
          (Again, referencing previous page; Wall Street is downtown, the ESB is
          in midtown.)
        </em>{" "}
        Pretty ambitious projects. And they actually ended up making useful
        stuff. You would have thought I had gone legit, unless you happened to
        look over the books. Which we made sure nobody did. It was all fancy
        accountancy, you see. We had the smartest accountant you ever saw. I
        liked the guy. Smart as a whip. He drew up all the contracts and then
        handled the accounts. Project was actually on time and under budget.
        It’s just that it had an awful lot of overhead.{" "}
        <Green>In fact, it had overhead like no one had ever seen.</Green>{" "}
        <em>(i.e. was the tallest building in the world.)</em>{" "}
        <Green>
          We admired the view, cut the ribbon, and then we walked away. As of
          this writing, the actual owners have yet to see a profit.
        </Green>{" "}
        <em>(The Empire State Building first saw profits in the 1950s.)</em>{" "}
        They probably should have charged more to let that ape climb it{" "}
        <em>(in the film King Kong, 1933)</em>. See, it pays to keep a low
        profile. Something I’ve failed to do <Cyan>this morning</Cyan>.{" "}
        <em>(He still has a tail.)</em>
      </p>
      <p>
        <em>(Lindbergh kidnapping, New Jersey, 1932)</em>
        <br />
        Building castles in the sky <em>(referencing previous page)</em> is the
        actual perfect crime. Our next racket was your standard second-story
        job, which makes it about a hundred stories shorter{" "}
        <em>(the observation deck of the ESB is 102 stories)</em>. A word of
        advice.{" "}
        <Green>
          If you ever think about kidnapping an actual kid, don’t do it. You’ll
          get no sympathy from anyone, even if the parents aren’t famous.
          Whoever went down for it was obviously going to fry. Which indeed he
          did.
        </Green>{" "}
        I told them so many times that I had to keep my hands clean, but I ended
        up doing amateur carpentry wearing kid leather gloves. Those gloves were
        a total write off. And the [PINEWOOD LADDER]{" "}
        <em>(used in the Lindbergh kidnapping to access the second floor)</em>{" "}
        didn’t look much better. Okay, here we are <em>[at the casino]</em>. It
        would be prudent to behave like this is a routine visit. Just do the
        usual business. Or if I’m lucky, less of it.{" "}
        <em>[i.e. lose less than he usually does]</em>
      </p>
      <p>
        <em>
          (Hindenburg disaster, New Jersey, 1937) [this page contains a
          “baseball” reference]
        </em>
        <br />
        What goes up must come down. That’s as true on the stock market as it is
        in aviation. <Green>When that balloon burst in Manchester</Green>{" "}
        <em>[Township, NJ]</em>,{" "}
        <Green>
          it was carnage. We didn’t mean for people to get hurt, we thought
          everyone would get out in plenty of time. But it’s hard to time these
          things correctly. At least we had managed to keep most of the public
          out.
        </Green>{" "}
        They tried to pin this one on the communists too, but it was the
        capitalists really. It absolutely lit a fire under Boeing shares. Third
        base, my favorite position, and nobody playing behind.{" "}
        <em>[Terms from casino blackjack.]</em> Who would be here to play
        behind? <Cyan>It’s not even noon.</Cyan> Quick look at my hand, but
        what’s important is to look around the room. I was half expecting to see
        my shadow staring back at me. Maybe he knows he’s been made.
      </p>
      <p>
        <em>(Time-capsule at New York World’s Fair, 1939)</em>
        <br />
        Here comes the boss now. That didn’t take long. I’m not even down{" "}
        <em>[i.e. hasn’t lost money]</em>. Anyway it means I don’t have to go
        looking for him. And if he wants to look at my hand, I can show him the
        queen of diamonds <em>[not a playing card; the actual diamond]</em>. An
        old friend of mine once offered to sell me a matching pair of diamond
        rings that he thought would get a good price. He didn’t mention that I
        would have to take the hands with them. He was right about the rings.
        The stones were massive and the settings were quite exceptional. After
        I’d taken them off his hands I gave them to a fence who got a good price
        in a Paris auction. As for the other disposal job, well I knew a guy.
        They got a decent{" "}
        <Green>
          burial on an old dumping ground out in Queens, where they will rest in
          peace for 5000 years.
        </Green>{" "}
        I believe one of them is holding a Mickey Mouse [DRINKING CUP]. Things
        are looking up. <Green>The dawn of a new day.</Green>{" "}
        <em>[The motto of the 1939 fair.]</em>
      </p>
      <hr />
      <p>
        <em>
          Gladys collects an engagement ring from a jewelry store. She bumps
          into Rover, who is on a stake-out, and persuades him to drive her
          home.{" "}
          <Green>
            A passing reference puts the Cole Porter song “You’re the Top” in
            her head. She runs through the lyrics, eventually starting to make
            up new ones. This was something of a parlour game in the 1930s.
          </Green>{" "}
          <Blue>
            She is thinking about her engagement, which is about to become
            official, and the future wedding plans.
          </Blue>
        </em>
      </p>
      <p>
        The man reappears with{" "}
        <Blue>a little box which he presents with a flourish.</Blue>{" "}
        <em>
          (It’s a very little box; later she drops it into her handbag.
          Specifically, it’s an engagement ring.)
        </em>{" "}
        I expect I need to tip him. Here’s a little something for you… what was
        his name again? Jacob? Jason? Something with J. Oh yes, it’s splendid,
        I’m sure he will love it. It’s a real work of art. Not that I ever see
        real ones. <em>(Her business is selling fake jewelry.)</em> Yes, a work
        of art that is. Try it on? Oh, no, it’s not for me. It’s for him. I’m
        sure it will be fine. A work of art, that is. It belongs in the Louvre
        Museum. <Olive>Dum-di-dum.</Olive> <Green>In the Louvre Museum.</Green>
      </p>
      <p>
        Do you want to wrap it <em>[the ring]</em> up? I have about five
        minutes. I need to go home and change before <em>[the Gala]</em>. I’ll
        wait. Of course now he’ll know it didn’t come from my place. But that’s
        a good thing. This <em>[the gift wrapping]</em> is{" "}
        <Blue>a really lovely service.</Blue> What’s that <Green>melody</Green>?{" "}
        <em>(Trying to remember the next line from the song.)</em> We could try
        something like this.{" "}
        <em>
          (Her own shop could charge more for worthless jewelry if it came gift
          wrapped.)
        </em>{" "}
        Makes the experience so much nicer. And doesn’t cost anything. Here’s a
        beautiful presentation of a cheap bagatelle.{" "}
        <Green>From a symphony, it is.</Green> <em>(remembered!)</em>{" "}
        <Green>
          Did he even write symphonies? I thought he wrote [WALTZES AND
          MARCHES].
        </Green>{" "}
        <em>[“A melody from a symphony by Strauss”]</em>
      </p>
      <p>
        Oh no, <Orange>our leadfooted gopher</Orange> is at the{" "}
        <Cyan>lunch</Cyan> counter over the way. I’m sure that’s him. Yes, I can
        see his eyes in the mirror above the counter. Give him a little wink.
        Well, if he can see me, he’s not letting on.{" "}
        <em>(Rover can’t see into the shop.)</em> Why is he here? Having a meal
        on the company dime? <Green>You’re Mickey Mouse</Green>,{" "}
        <Orange>Mr. Carter</Orange>{" "}
        <em>[a generic name for a chauffeur/baggage handler]</em>.{" "}
        <Blue>Mr. Carter, hah!</Blue>{" "}
        <em>[realising that it’s also the name of her fiance]</em> He’s{" "}
        <em>[Rover is]</em> bound to see me the moment I step out of here. No,
        I’ll just pop it in my handbag. I don’t suppose there’s a back exit?
        Another customer, of course, I understand.{" "}
        <em>
          (She can’t go out the back way because someone else—Sidecar—is in the
          back of the shop.)
        </em>{" "}
        <Olive>Mr. Porter</Olive>, I could have said.{" "}
        <em>
          (A different way to reference a baggage handler, but a more apt one as
          it is also the name of the composer of You’re the Top.)
        </em>
      </p>
      <p>
        Must be answering a call. If I’m quick I can pop next door and pick up a
        boutonniere. And then if I’m buttonholed I can produce the flowers. I
        really don’t want him sticking his nose in it. Can’t have people saying
        that I don’t patronize my own shops.{" "}
        <em>
          (She has a good reason for not patronizing her own shops—they sell
          tat—but she doesn’t want it getting about.)
        </em>{" "}
        Yes, made it. Oh, I’m just looking for,{" "}
        <Blue>do you have anything that goes with white?</Blue>{" "}
        <em>(Everything goes with white, but she’s in a panic.)</em> Or
        anything. I feel much better in here.{" "}
        <Green>That’s put back the smile on [LA GIOCONDA].</Green>{" "}
        <em>[“The smile on the Mona Lisa”]</em>
      </p>
      <p>
        I guess that place has bottomless coffee. Or he has bottomless expenses.{" "}
        <Orange>Surely he has his beast with him somewhere.</Orange> And it will
        carry two as easily as one. I could be home{" "}
        <Green>faster than Sir Barton.</Green>{" "}
        <em>[“The time of a Derby winner”]</em>{" "}
        <Orange>Yes, come along, good coachman.</Orange> Leave your dinner, or
        luncheon, and all of its trimmings. <em>[“A turkey dinner”]</em>{" "}
        <Blue>I have a very oppressing engagement</Blue> which will wait no
        longer.
      </p>
      <p>
        No, I don’t want lunch. Are they even still serving?{" "}
        <Cyan>Lunch hour ended about two hours ago.</Cyan> Yes, I’m sure they
        have very fine pies here, but I’m not staying to eat with you.{" "}
        <Blue>And anyway there’s a cake waiting with my name on it.</Blue>{" "}
        <em>
          (Her engagement is being announced; a wedding cake is the inevitable
          sequel.)
        </em>{" "}
        You are picking up a prescription? Well, is the prescription ready? Oh
        you’ve already picked it up. Well, then what are we waiting for?{" "}
        <em>
          (Rover is reluctant to leave because he’s on a stake-out; he’s
          followed Sidecar here, because Sidecar has the diamond.)
        </em>{" "}
        I’ll settle up here and then wait outside.{" "}
        <Green>Now let’s see you move those [NIMBLE FEET]</Green>.{" "}
        <em>[“The nimble… feet of Fred Astaire”]</em>
      </p>
      <p>
        He really didn’t want to go. There was a time when he would have done
        anything for me. Well, that was a long time ago, and a lot has happened
        since then.{" "}
        <em>
          (It was when she was a little girl, as we saw in Papa’s chapter.)
        </em>{" "}
        How far did I get <em>[in the song lyrics]</em>? I should take care of
        the meter. The iceman cometh. Good.{" "}
        <em>(It fits the meter of the song.)</em> An arrangement. Doesn’t go.{" "}
        <em>(Doesn’t fit the meter.)</em> <Green>The iceman cometh.</Green>{" "}
        <em>[“An O’Neill drama”]</em> <Green>A grey arrangement</Green>.{" "}
        <em>[“Whistler’s Mama”, called Arrangement in Grey and Black.]</em>{" "}
        Rubbish. But it’s passing the time.
      </p>
      <p>
        How far away was that <Orange>hitching post</Orange>{" "}
        <em>[where he parked the car]</em>? Don’t you know it’s not good to keep
        a girl waiting like this? It really is too damn much. Pardon my French.{" "}
        <em>[“As the French would say, de trop”]</em> In some cities they charge
        for it <em>[parking]</em> now. That would put things right. I just want
        to put my feet up. It’s been a long day, and{" "}
        <Cyan>I still have all those</Cyan>{" "}
        <Green>[VERMEERS AND REMBRANDTS]</Green>{" "}
        <em>[“An Old Dutch master”]</em> and whatnot to get round. Ah here he
        is, finally at last.
      </p>
      <hr />
      <p>
        <em>
          Baby wanders through the Gala, which is just getting underway.{" "}
          <Green>
            Appropriately enough, it is being held in an art museum which has a
            special exhibition on “the history of jewelry in portraiture from
            the Middle Ages to the present day”.
          </Green>{" "}
          She sees Rover looking at Sidecar, and then abruptly leaving the Gala.
        </em>
      </p>
      <p>
        <em>
          (The Arnolfini Portrait, by Jan van Eyck, 1434, early Netherlandish)
        </em>
        <br />
        If you wanted everybody who is anybody, you can’t complain when
        everybody shows up. That sheepish-looking man who’s somehow spilling two
        martinis at once is a state senator. Guess he’s taking{" "}
        <Cyan>happy hour</Cyan> seriously. And here’s Silvius{" "}
        <em>
          (the love-sick shepherd from As You Like It, representing Carter)
        </em>
        , looking like a lost sheep himself{" "}
        <em>(appropriately for a shepherd)</em>. Someone please tell him she{" "}
        <em>[Gladys]</em> doesn’t care.{" "}
        <Green>
          Quite a contrast to the married couple over by the door. I’m guessing
          married: they are both wearing rings, and holding hands. How sweet.
          And she is resting her other hand ever so casually on a rather obvious
          baby bump, not in any way concealed by her high-waisted emerald gown.
          That gold necklace looks very simple, but you can tell it cost a bomb.
        </Green>{" "}
        I wonder if Peleus and Thetis will make an appearance{" "}
        <em>[in one of the paintings]</em>? Now that would be appropriate.{" "}
        <em>
          (Peleus and Thetis are the couple whose wedding started the Trojan
          War; Baby imagines herself as the goddess of Discord visiting the
          nuptials of Carter and Gladys.)
        </em>
      </p>
      <p>
        <em>(Portrait of a Young Venetian Woman, Albrecht Dürer 1505)</em>
        <br />
        The room’s too quiet. Everyone is looking over their shoulder. You can’t
        trust anyone in this town. A man in tails is wondering if he is
        overdressed.{" "}
        <Green>
          A woman in a dress with a diamond motif glances to her right with
          piercing dark eyes. Her face is framed by orange ringlets the color of
          her dress. I suppose that was how they used to wear them in [LA
          SERENISSIMA]. I do like her necklace though, sancta simplicitas. White
          on black, pearls alternating with carved jet lozenges.
        </Green>{" "}
        There’s <Orange>Hoke</Orange>{" "}
        <em>
          [Rover; an anachronistic reference: Hoke is the chauffeur in Driving
          Miss Daisy]
        </em>
        , staring daggers at you-know-who <em>[Sidecar]</em> as usual. He{" "}
        <em>[Sidecar]</em> doesn’t seem too put out for once. In fact, he looks
        miles away.{" "}
        <em>
          (Sidecar has something else on his mind; he’s trying to find a way to
          return the diamond.)
        </em>
      </p>
      <p>
        <em>
          (The Girl with a Pearl Earring, by Johannes Vermeer, 1665, Dutch
          master)
        </em>
        <br />A lady is trying to convince me that she has a gold mine down
        under somewhere. I’m more interested in trying to place her accent.
        Because it ain’t Australian.{" "}
        <Green>
          Turning away, I find myself face to face with a young woman with
          captivating eyes, so arresting that I almost didn’t notice that great
          globe of an earbob. I say face-to-face; she is turned away and
          glancing back over her shoulder. But she seems to be looking straight
          at me. She is culturally appropriating a kind of Turkish headscarf.
        </Green>{" "}
        Honestly, can’t anyone just be themselves? Or if you must be someone
        else, be someone interesting.
      </p>
      <p>
        <em>(The Duchess of Alba, by Francisco Goya, 1797, old master)</em>
        <br /> A terribly energetic young couple have a plan to solve all our
        civic problems. By installing parking meters. Do I think the mayor would
        be interested? I think you should ask him yourself.{" "}
        <Olive>
          I’m pretty sure he’s still stuck back in the middle ages.
        </Olive>{" "}
        <em>
          (The exhibition is chronological; she is saying that she passed the
          mayor several rooms back.)
        </em>{" "}
        <Green>
          The woman opposite me is wearing a black lace gown with a matching
          veil and a [RED SASH]. And a lot of bling.
        </Green>{" "}
        This place is like walking around a market in Jaipur. I suppose half of
        them <em>[the paintings]</em> are replicas. But they can still have the
        real ones in a vault somewhere.{" "}
        <Green>
          The cabochon on that woman’s finger is so huge that I can almost read
          the writing on it from here. Aida, maybe? Something with A.
        </Green>
      </p>
      <p>
        <em>
          (La Grande Odalisque, by Jean-Auguste-Dominique Ingres, 1814,
          Neoclassicist)
        </em>
        <br />
        There’s a woman over there holding a rather fancy fan made of peacock
        feathers.{" "}
        <Green>
          Her hair is severely parted, like one of those girls in a Berlin
          nightclub. And held back with a massive ruby clasp set round with
          pearls. She’s in an astonishing [STATE OF UNDRESS].
        </Green>{" "}
        I’ve never seen anything quite like it. Still, I suppose that’s what
        they’re <em>[the paintings are]</em> here for. To be seen. And what am I
        here for? Well, because of social decorum. But also being anywhere else
        would look suspicious if… if what exactly? If something went wrong. But
        what could go wrong?
      </p>
      <p>
        <em>
          (Portrait of Madame X, by John Singer Sargent, 1884, impressionist)
        </em>
        <br />
        That was not a very constructive thought. In fact, I should try to think
        less.{" "}
        <Green>
          In the corner, I see a woman resting her hand on a table. She’s
          looking away from me. She has a long black ball gown with a plunging
          neckline. Her hair is swept right up, just to be extra sure nobody
          misses those jewel-encrusted shoulder straps.
        </Green>{" "}
        It’s quite a display. I suppose display is the theme of the evening. And
        now, ladies and otherwise, here is what you have all come to see. Ah,
        but what is that? The lady, or the paper tiger?{" "}
        <em>
          (Are they more interested in seeing the bride-to-be, or the diamond?
          Baby calls it a “paper” tiger because she knows that it isn’t the real
          diamond.)
        </em>
      </p>
      <p>
        <em>
          (Portrait of Adele Bloch-Bauer I, by Gustav Klimt, 1907, Jugendstil)
        </em>
        <br />
        Oh and here is Phebe{" "}
        <em>
          [Gladys; the shepherdess who thinks she is too good for
          Silvius/Carter]
        </em>{" "}
        at last, showing more than a glimpse of stocking. As she herself might
        tiresomely drone. <em>(Because it’s a line from Anything Goes.)</em> And
        she’s dressing down <Orange>Kato</Orange>{" "}
        <em>
          [Rover; Kato, the Green Hornet’s sidekick, is another chauffeur. Not
          an anachronism; it’s from 1936.]
        </em>{" "}
        Whom she normally ignores. Now, he got here quickly.{" "}
        <em>(Last seen beside the Dürer.)</em>{" "}
        <Olive>
          Decided to skip over the Golden Age and gawp at something more modern.
        </Olive>{" "}
        <em>(Another indication that the exhibition is chronological.)</em> I
        wonder if he’d be an angel and find me some kir.{" "}
        <em>(Asks Rover to go out and run an errand.)</em> The catering here is
        a lot less cosmopolitan than the decor.{" "}
        <Cyan>Dread to think what dinner will be like.</Cyan>{" "}
        <Green>
          That is a lot of gold. She’s wearing at least four bracelets and a
          massive diamond choker. I’d like to have a closer look. But that might
          ruin the effect.
        </Green>{" "}
        <em>(Klimt paintings are best viewed from a distance.)</em> I wonder who
        she is? A Brahmin, or just pretending?
      </p>
      <p>
        <em>
          (Self-Portrait with Thorn Necklace and Hummingbird, Frida Kahlo, 1940,
          surrealist)
        </em>
        <br />
        Well, I guess they saved the best for last.{" "}
        <Green>
          That is the most striking woman I have ever seen, and she is wearing
          the most striking necklace. It looks as though she is being strangled
          by a bush. Or her neck has turned into a tree trunk and is putting
          down roots. And is that an actual [DEAD BIRD]?
        </Green>{" "}
        I’m not good at waiting. But who is? I suppose it just makes me human.
        Heaven forbid. And there goes <Orange>Hoke</Orange>. Please, please get
        back <Cyan>before dinner</Cyan>. Happy coincidence that he was stepping
        out.{" "}
        <em>
          (Learns that Rover was already about to leave; this turns out to be
          significant, as the reason he is leaving is to follow Sidecar.)
        </em>
      </p>
      <hr />
      <p>
        <em>
          Katrina has stepped away from the Gala and is walking through the Back
          Bay.{" "}
          <Green>
            Each street sign that she passes triggers a mental association with
            the name.
          </Green>{" "}
          She sees Rover pass by, then stop at a block of flats.
        </em>
      </p>
      <p>
        <em>(Arlington Street; reminds her of Arlington House in Virginia)</em>
        <br />
        <em>
          (Katrina mentions three idioms, each cluing the fact that her walk
          from Boston Common to Massachusetts Avenue is exactly one mile long.)
        </em>
        <br />I had to get out of there, clear my head.{" "}
        <Cyan>After dinner</Cyan>, <Olive>rest a while</Olive>. I am not
        following this advice. <Olive>And really I should be running.</Olive>
        Feels good to get away from there. And that other place{" "}
        <em>[Chinatown]</em>, which I’m also putting behind me. Best not to
        think about it.{" "}
        <Green>
          I’ve been to [LEAFY ARLINGTON]. I visited there when I was taking
          flowers to the cemetery for my grandpa. A house with a strange
          history.
        </Green>{" "}
        Maybe we build monuments for things we should forget.
      </p>
      <p>
        <em>(Berkeley Street; reminds her of the radiation lab in Berkeley)</em>
        <br />
        <em>
          (This is a mild anachronism; as of 1940 they had only found one
          element, neptunium. They would find plutonium in 1940 as well.)
        </em>
        <br />
        <Olive>I wish I could do this in the thief’s shoes.</Olive> But they’d
        probably be too big for me. Or would they?{" "}
        <Olive>A familiar broad silhouette rolls past me,</Olive> covered up and
        protected from the elements.{" "}
        <em>(The car, with its convertible roof up.)</em> Wonder where she’s off
        to. Why do we say something is out in the elements? Does it mean earth,
        air, fire and water? The Greeks thought everything was made of atoms.
        But they didn’t have one shred of physical evidence. Ladies and
        Gentlemen: the School of Pythagoras.{" "}
        <em>(And now spotting the street sign:)</em>{" "}
        <Green>Here’s the school where they found all those elements.</Green> No
        idea how they do that. Where do they find them?
      </p>
      <p>
        <em>
          (Clarendon: a font used for “Wanted!” posters and bold letters, such
          as on baseball caps)
        </em>
        <br />
        <em>(this page contains “baseball” references)</em>
        <br />
        <Green>
          Now this is a type designed to grab your attention. Wanted! Dead or
          alive. Or if a letter is particularly important.
        </Green>{" "}
        Tonight the Philadelphia A’s <em>[Athletics]</em> visit the Mitropolis{" "}
        <em>[Boston]</em> B’s.{" "}
        <Green>Brought to you by [C FOR CLARENDON].</Green> I can’t see the face
        of <Orange>the man in the box.</Orange> <em>(Rover, in the car… )</em>{" "}
        But I recognise his grip. Hands in firm control, almost touching.
        Probably going for a long drive. I can just picture the look of steely
        determination under the peak of his cap. A quick glance to the right to
        make sure there’s no danger on that side. He looks ahead with eyes
        firmly set.
      </p>
      <p>
        <em>
          (Dartmouth; the landmark Dartmouth College case (1819) was argued by
          Webster)
        </em>
        <br />
        <Green>
          People don’t understand how far-reaching their victory was. What they
          know about is who won it for them: the man who fought the devil.
        </Green>{" "}
        <em>[Referencing the story “The Devil and Daniel Webster”.]</em>{" "}
        <Green>
          Well, it was quite a personal victory. I suppose it helped make his
          name, though he’d already been sent up
        </Green>{" "}
        <em>[to Congress]</em>{" "}
        <Green>
          twice by then. Was taking a little sabbatical.{" "}
          <i>Vox clamantis in deserto</i>
        </Green>
        . <em>[Motto of Dartmouth College.]</em>{" "}
        <Green>But then he returned</Green> <em>[to Congress]</em>. So, it{" "}
        <em>[the car journey]</em>
        was not so long after all. <Orange>She seems to be pulling up</Orange>.
        That will be quite a maneuver. Looking for something from the stores?{" "}
        <em>(Is he on a shopping trip?)</em> A quick blast on the horn. Maybe a
        little flat there. <em>(Or does he have an apartment?)</em> If this is
        D, then I put that somewhere between F and G.{" "}
        <em>
          (The car has pulled over between Fairfield and Gloucester; she can’t
          remember the names of the streets but she knows they begin with F and
          G.)
        </em>
      </p>
      <p>
        <em>(Exeter; Webster also attended Phillips Exeter Academy)</em>
        <br />
        I’ve learned so little. I hear words from tongues who hope to please,
        but they teach me nothing.{" "}
        <em>
          (She’s checking with informants but they have no information.)
        </em>{" "}
        <Orange>
          The wheels that had been in motion are no longer turning.
        </Orange>{" "}
        <em>(The car has come to a stop now.)</em> But I have enjoyed the
        journey. <em>(At least I had a nice walk.)</em>{" "}
        <Green>
          [PHILLIPS EXETER]—those who journey to this place arrive in the guise
          of Cupid and often leave as Apollo.
        </Green>{" "}
        <em>
          (This clue asks for a school, not a university; the students start as
          children and graduate as youths, often still beardless.)
        </em>{" "}
        <Green>
          And, if they have learned anything along the way, may go on to greater
          things. A president and the sons of presidents.
        </Green>{" "}
        <em>
          [Franklin Pierce and Robert Todd Lincoln, Ulysses S. Grant, Jr., and
          Richard and Francis Cleveland all attended the school.]
        </em>{" "}
        <Green>
          Not forgetting that silver-tongued fellow who was up to scratch.
        </Green>{" "}
        <em>[Webster; “scratch” is a name for the devil.]</em> That’s twice I’ve
        thought of him.
      </p>
      <p>
        <em>(Fairfield; quotation from George Washington)</em>
        <br />
        Not far away now <em>[from where the car is parked]</em>. Best hold fire
        for a moment. <em>(Don’t want him to see me.)</em>{" "}
        <Green>Fire was the destructive evidence of British cruelty.</Green>{" "}
        <em>(Burning of Fairfield 1779)</em>{" "}
        <Green>Oh, what a beautiful meadow.</Green> <em>(“Fair field”)</em> Now,
        slow down, look ahead. <Orange>A man steps onto the curb</Orange>,
        dressed smartly but not ostentatiously. He is placing something{" "}
        <em>[probably his driving gloves]</em> into his overturned cap.{" "}
        <Cyan>It’s getting dark now; I can’t make out the details.</Cyan> He
        puts the cap under his arm. There remains something{" "}
        <em>[the letter]</em> in his hand, small, flat, white. He steps forward
        briskly, steps up, is gone. I may continue.
      </p>
      <p>
        <em>
          (Gloucester, a character who is blinded in King Lear; also “The Tailor
          of Gloucester”)
        </em>
        <br />I look down and continue the passage <em>[walking]</em>. I try to
        read between the lines. But there is so much I don’t know. About halfway
        down is <Orange>that distinctive J</Orange>{" "}
        <em>[Duesenberg model J]</em> with the long sweeping lines. But it{" "}
        <em>[the car]</em> contains nothing of interest. I reach the end{" "}
        <em>[of the block]</em> and file it away.{" "}
        <Green>
          I know this name. A classic case of blind injustice. What does this
          journey mean? Perhaps it is nothing. Yet the quality of nothing hath
          not such need to hide itself. There was a tailor there too, if you
          prefer cheerier stories.
        </Green>{" "}
        I stop and reflect <em>(look back)</em> for a moment. A man pulls on his
        gloves. I turn away.{" "}
        <em>
          (As Rover is pulling his driving gloves back on as he walks, he must
          now be empty-handed; he has cached the letter in his apartment.)
        </em>
      </p>
      <p>
        <em>
          (Hereford; reference to a song lyric from My Fair Lady—another
          anachronism (1956))
        </em>
        <br />
        <Green>
          Why should this name be here? What is he to Hecuba? It is a place
          rarely visited by hurricanes. I suppose there’s [HEREFORD CATTLE]. Is
          that where they come from?
        </Green>{" "}
        I struggle to recall any local habitation.{" "}
        <em>
          (Unlike most of the other streets, it doesn’t suggest a place in the
          United States.)
        </em>{" "}
        I will be missed, I suppose. I have vanished into airy nothing. I’ll
        find another way back in case he’s still hanging about. And then we’ll
        see what we can see. When I returned, dear, there stood a man.{" "}
        <em>
          (From a song, After The Ball, which comes into her mind because she’s
          returning to the Gala which is now finishing.)
        </em>{" "}
        A lesson there, perhaps.{" "}
        <em>(The lesson of the song is not to believe everything you see.)</em>{" "}
        Many the hopes that have vanished. I’ve come back to Chinatown after
        all.{" "}
        <em>
          (She was trying to avoid thinking about Chinatown but she started to
          think about a song which is from a revue called “A Trip to
          Chinatown”.)
        </em>
      </p>
      <hr />
      <p>
        <em>
          Billie is riding on the Boston, Revere Beach and Lynn Railroad (today
          the MBTA Blue Line). They find trains soothing and this helps as they
          piece together the clues given by the narrators of the previous
          chapters.{" "}
          <Green>Every railway station triggers an association.</Green> Billie
          is really a surrogate for present-day Mystery Hunters; to cement this
          association{" "}
          <Blue>
            their thoughts include references to quotations from 1980s pop songs
            <a href="#footnote">
              <sup id="antifootnote">2</sup>
            </a>
            .
          </Blue>
        </em>
      </p>
      <p>
        <em>(Wonderland)</em>
        <br />I think of this as my personal train of thought. And whatever the
        case may be, <Olive>
          I think just as well inbound as outbound.
        </Olive>{" "}
        Let’s go over everyone’s story again. He <em>[Carter, in chapter 2]</em>{" "}
        was walking to the casino. He turned and looked back, and saw… what did
        he see? <Orange>A man?</Orange> A figure, a shadow. Something and
        nothing. Was it a man? Or was it just men? If it was a man, was he just
        out for a stroll? Or headed to that part of town? Or was it a trick of
        the light?{" "}
        <Green>
          Am I going [DOWN A RABBIT HOLE] here? I’m in the right place for it.
        </Green>
      </p>
      <p>
        <em>(Revere Beach)</em>
        <br />
        <Green>
          I always think this is asking a lot. Plenty of people admire beaches.
          You could esteem a beach, even.
        </Green>{" "}
        A small rabble of youths stumble in, having esteemed the{" "}
        <Cyan>last drop of pleasure out of the day.</Cyan> Getting back to the
        stories. <em>[Gladys tells this story in chapter 3]</em>{" "}
        <Orange>A man</Orange> looks through the glass at a window where a woman{" "}
        <em>[Gladys]</em> can faintly be seen. Does he see her? No,{" "}
        <Blue>
          he does not really see her because he sees his own reflection
        </Blue>
        . <em>[Tom’s Diner, Suzanne Vega 1984]</em> So is the man looking at the
        woman? Or is he looking at the place where the woman is standing? What
        if he could see right through her? What would he be looking at then?{" "}
        <em>
          (They are getting close to understanding that what Rover really had
          his eye on was Sidecar, who was in the back room of the store.)
        </em>
      </p>
      <p>
        <em>(Suffolk Downs)</em>
        <br />
        <Green>
          This name makes me think of a hillside dotted with sheep.
        </Green>{" "}
        I don’t know whether they have many hills there. Or sheep, for that
        matter. There certainly aren’t any here. The platform is littered with
        discarded betting slips and form guides.{" "}
        <Blue>Racing white horses. And dreaming of [SUFFOLK EWES].</Blue>{" "}
        <em>[And dream of sheep, Kate Bush, 1985]</em> <Cyan>Bedtime.</Cyan>{" "}
        Time for one more story. <em>[Katrina’s story, chapter 5]</em>{" "}
        <Orange>A man</Orange> steps out of the car and disappears up the steps.
        The man is carrying a folded paper. The rock <em>[diamond]</em> was
        found <em>[beside Sidecar’s body]</em>, but not the paper{" "}
        <em>[although it should have been there, with the diamond]</em>. But the
        paper covers <em>[contains information about]</em> the rock…
      </p>
      <p>
        <em>(Orient Heights)</em>
        <br />
        <Orange>Men, men, men… they are all the same!</Orange>{" "}
        <em>
          (They realize that the three witnessed men on the previous three pages
          are all the same man, Rover.)
        </em>{" "}
        And always looking for the same thing <em>[the diamond]</em>! Why this
        single-minded obsession all day long? What are you hoping to do with it?
        Oh I know, I know, you’re not thinking of yourself. You’re looking out
        for everyone else’s interests.{" "}
        <em>
          (Realizes that Rover’s watch over the diamond is from a sense of
          duty.)
        </em>{" "}
        You’re acting on a higher authority.{" "}
        <Green>
          Am I forgetting my station? I’m never quite sure where this is meant
          to be. Is Ararat far enough? The train never left Europe. But the rugs
          are from further away, and the food is much further.
        </Green>{" "}
        <em>
          (The word “Orient” means East, but different Easts: the Orient Express
          only goes as far as Constantinople; oriental rugs are Arabic or
          Persian; oriental food generally means China.)
        </em>
      </p>
      <p>
        <em>(Wood Island)</em>
        <br />
        This is always a nice place for a walk. Wander aimlessly while I arrange
        my thoughts into tidy lines.{" "}
        <Green>
          Deep in the quiet [wood]—[Island;] and its sands are fair.
        </Green>{" "}
        <em>
          [Two poems of the Harlem Renaissance, by James Weldon Johnson and by
          Langston Hughes.]
        </em>{" "}
        <Green>
          I love those poems. And look for what’s between the lines.
        </Green>{" "}
        But it’s <Cyan>too dark for a stroll</Cyan>, and anyway I’m nearing my
        destination.{" "}
        <em>
          (Don’t need a walk to get my thoughts in order; I’ve almost cracked
          the case.)
        </em>{" "}
        I look down in the direction of the park. Today I am able to see not
        just the trees, but the forest.{" "}
        <em>
          (I’m putting everything together; I can “see the forest for the
          trees”.)
        </em>{" "}
        <Orange>A man</Orange> <em>[Rover]</em> walks out, in search of a drink.{" "}
        <em>(Baby’s evidence from chapter 4: she sends Rover out for kir.)</em>{" "}
        Another man <em>[Sidecar]</em> is carrying ice <em>[the diamond]. </em>
        Suppose they came together somewhere?{" "}
        <em>(Concludes that Rover killed Sidecar.)</em>
      </p>
      <p>
        <em>(Maverick)</em>
        <br />I need to look at this from different angles. Let’s set it up and
        look at it properly. Will it stand up?{" "}
        <em>
          (Will it stand up in court? I need to establish Means, Motive,
          Opportunity.)
        </em>{" "}
        I might trust my gut, but the proof of the pudding is in the eating.
        Which means? <em>(Did Rover have the means to commit the murder?)</em>{" "}
        <Orange>I am large, I contain muscles.</Orange>{" "}
        <em>(Yes he did, because he is big and strong.)</em>{" "}
        <Green>
          I wonder whether [LITTLE TOM] ever touched down here. And before him
          there was a quick-talking poker player of that name. Someone called
          James?
        </Green>{" "}
        <em>
          (Tom Cruise played Maverick in the film Top Gun; James Garner in the
          TV series “Maverick”.)
        </em>
      </p>
      <p>
        <em>(Aquarium)</em>
        <br />
        And the motive? <em>
          (Did Rover have a motive to commit the murder?)
        </em>{" "}
        <Orange>Our primary aim is to explain the succession.</Orange>{" "}
        <em>
          (Reference to The Golden Bough, where the newcomer must kill his
          predecessor.)
        </em>{" "}
        Because there must be a succession, and if Abel is unable then it must
        raise Cain. <em>(Thinks of Cain killing Abel as a sibling rivalry.)</em>{" "}
        But that’s not right. Cain was not a usurper, that was Jacob.{" "}
        <em>(A better example.)</em> Rivalries.{" "}
        <Green>
          These are fascinating things. When everything is in balance, it’s a
          whole self-contained world. The plants need the animals and the
          animals need the plants.
        </Green>{" "}
        <em>(Cain and Esau were farmers; Abel and Jacob kept animals.)</em>{" "}
        <Green>
          Everything living in harmony under the surface. And then the big fish
          eats the little fish.
        </Green>
      </p>
      <p>
        <em>(State)</em>
        <br />
        Well this is <Blue>a fine thing, a fine state of affairs.</Blue>{" "}
        <em>[Fine State of Affairs, Burton Cummings 1980]</em>{" "}
        <Green>
          What is the state of play? What was your state of mind? It might
          interest the state police. [TO STATE THE OBVIOUS].
        </Green>{" "}
        And has opportunity (finally) knocked?{" "}
        <em>(Did Rover have an opportunity to commit the murder?)</em> Where
        were you at the time of? Never mind, I know where you were. And I know
        what you did.{" "}
        <em>(Yes, because he left the Gala just after Sidecar.)</em>{" "}
        <Blue>And I know what I must do.</Blue>{" "}
        <em>[Coming Back to You, Leonard Cohen 1984]</em> This is my stop.
      </p>
      <hr />
      <p>
        <a href="#anti-baseball-footnote">
          <sup id="baseball-footnote">1</sup>
        </a>{" "}
        These pages are meant to be hard to understand, until they are placed in
        the correct context. One way to make it hard to know what the text is
        describing is to make it sound like it might be describing something
        else. In this case, baseball.
      </p>
      <p>
        <a href="#antifootnote">
          <sup id="footnote">2</sup>
        </a>{" "}
        Yes, I know that for some of today’s Hunters the 1980s might as well be
        the 1930s. Let’s say that the reference is to the origins of Hunt in the
        1980s.
      </p>
    </>
  );
};

export default Solution;
