import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const DATA = [
  [
    "IULIUS",
    "“Spartacus” (film with iconic scene where everyone claims to be Spartacus)",
    "SPARTACUS",
    "",
  ],
  [
    "NETTIE",
    "“Green glass door” (rule: must have a double letter); space theme, “moonwalker”: a person who has walked on the moon",
    "BUZZALDRIN, EDGARMITCHELL, DAVIDSCOTT, HARRISONSCHMITT",
    "",
  ],
  [
    "DINA",
    "Manicurist, “Oh, P.I.”: OPI nail polish names. “Slacquer”, “crème” specifies creme type nail lacquer, “orange” indicates color. Looking for a “tech expert” narrows down the nail polish name",
    "SILICONVALLEYGIRL",
    "L",
  ],
  [
    "ELENA",
    "Catio with a ton of cats with various characteristics and items (Neko Atsume reference), Buffy the Vampire Slayer mention, “one cat she would open up for”: Neko Atsume cat with same name as Buffy character",
    "WILLOW",
    "I",
  ],
  [
    "XENO",
    "“old, limp, icicle”—Olympics. “A skater or two with the most medallions” (skater(s) who have the most Olympic medals across all figure skaters, who happen to be in a pairs event)",
    "TESSAVIRTUE, SCOTTMOIR, TESSAVIRTUESCOTTMOIR, TESSAVIRTUEANDSCOTTMOIR, SCOTTMOIRTESSAVIRTUE, SCOTTMOIRANDTESSAVIRTUE",
    "T",
  ],
  [
    "SANDY",
    "“Crystal gem” (they’ll always “save the day”!) from Steven Universe",
    "GARNET, AMETHYST, PEARL, STEVEN",
    "",
  ],
  [
    "KIMBALL KINGSFORD",
    "American author who wrote “double-amputee’s memoir” in the 1920s (A Farewell to Arms). References to other books: “Rising star” (The Sun Also Rises), “[Door]bell tolls” (For Whom the Bell Tolls).",
    "ERNESTHEMINGWAY",
    "T",
  ],
  [
    "INNAN",
    "Ginger D&D DM, “Dropout”, name of campaign group (aka all of the group names, as introduced, for campaigns Brennan Lee Mulligan has DMed for Dimension 20 to date)",
    "INTREPIDHEROES, VILEVILLAINS, TINYTHIEVES, BUCCANEERBUDDIES, SYLVANSLEUTHS, HEROICHIGHSCHOOLERS, QUESTINGQUEENS, PREFRONTALPIS, AMAZINGACTIONHEROES",
    "",
  ],
  [
    "PAORA",
    "Sea shanties theme. “Sweets, tea, and liquor” -> “sugar and tea and rum”, “tonguin’”, “oh well”—all references to lyrics/title of Wellerman meme song. Looking for whaling ship (that the song is about)",
    "BILLYOTEA, BILLYOFTEA",
    "L",
  ],
  [
    "ZOWER/ZUFF",
    "Trolley stop name clues Powerpuff Girls; little girl with a red bow is Blossom, will only talk to family members",
    "BUTTERCUP, BUBBLES, PROFESSORUTONIUM",
    "E",
  ],
  [
    "EDITH",
    "“Wickid” (wiki), information archive written and curated by volunteers, “founded by [Jimbo] W(h)ales”: Wikipedia. Daily rotating exhibit = featured article of the day (on English Wikipedia main page). Feature articles from leap days (Feb 29) are what’s needed",
    "LSD, HAMILTON, PSILOCYBIN, REGENTSOFTHEUNIVERSITYOFCALIFORNIAVBAKKE, ZOOTVTOUR, BLOODONTHEFLOOR",
    "",
  ],
  [
    "RACHMAL",
    "Musician on list of people who “Didn’t Start the Fire” (mentioned in the song We Didn’t Start the Fire); ice cream clues the beloved ice cream shop near MIT, Toscanini’s",
    "TOSCANINI",
    "T",
  ],
  [
    "OGDEN",
    "MITropolis “department of education” president—president of MIT",
    "SALLYKORNBLUTH",
    "O",
  ],
  [
    "EEVEELYNE",
    "“Cafe of green tables”, someone from “Avonlea”: Anne of Green Gables character. “Pokemoniker”, various Pokemon puns, “water by ferry” (water/fairy type): name begins with a Pokemon type. The only Pokemon that starts an Anne of Green Gables character name is Marill.",
    "MARILLACUTHBERT",
    "M",
  ],
  [
    "SECURITY",
    "“I only accept commands from HQ to open this door”. Literally.",
    "HQ",
    "",
  ],
];

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 1em 0;
  th,
  td {
    padding: 0 1em;
  }
  th {
    background-color: var(--teal-300);
  }
  tr:nth-child(odd) {
    background-color: var(--teal-200);
  }
  tr:nth-child(even) {
    background-color: var(--teal-100);
  }
`;

const Dossier = styled.div`
  margin: 1em 0;
  font-family: "Roboto Mono", monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The chat interface on the page has only one button, which lets you say
        hello. But no matter how many times you click it, the character listed
        says they will not talk to “you”, they will only talk to “Spartacus”. If
        you change your team name to “Spartacus” and then press the button,
        however, the character will talk to you, as if you were that person.
      </p>
      <p>
        In sequence you encounter a series of characters, each with a clue for
        who you need to “be” (what you need to change your team name to) for
        them to talk to you:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Character</th>
            <th>Clue</th>
            <th>Valid answer options</th>
            <th>Guaranteed letters</th>
          </tr>
          {DATA.map(([character, clue, validOptions, letters], i) => (
            <tr key={i}>
              <td>{character}</td>
              <td>{clue}</td>
              <td>
                {validOptions
                  ?.split(",")
                  .map((option, j) => <Mono key={j}>{option}</Mono>)}
              </td>
              <td>
                <Mono>{letters}</Mono>
              </td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        The first letters of each of the names (in all caps) for each of the
        characters spell the clue phrase <Mono>INDEX SKIP ZEROES</Mono>.
      </p>
      <p>
        When you get to the end and meet the intelligence agent, you are given a
        “case file” to download: a text file with a “dossier number” at the top
        and a list of “aliases”—every name that the team has used over the
        course of the puzzle.
      </p>
      <p>
        The dossier number has the same number of digits as the length of the
        list of names. Using the clue phrase, you index into the names by the
        number given (zero indexes you simply skip, or don’t give a letter). The
        exact number is programmatically generated to spell out the puzzle’s
        answer using the names that the team chose, so it will vary from team to
        team based on the number of incorrect answers and which correct answers
        they chose. For example:
      </p>
      <Dossier>
        <div>DOSSIER #006201600383800010</div>
        <br />
        <div>DEATHANDMAYHEM</div>
        <div>SPARTACUS</div>
        <div>
          BUZZA<strong>L</strong>DRIN
        </div>
        <div>
          S<strong>I</strong>LICONVALLEYGIRL
        </div>
        <div>WILLOW</div>
        <div>
          <strong>T</strong>ESSAVIRTUE
        </div>
        <div>
          GARNE<strong>T</strong>
        </div>
        <div>FSCOTTFITZGERALD</div>
        <div>ERNESTHEMINGWAY</div>
        <div>
          VI<strong>L</strong>EVILLAINS
        </div>
        <div>
          BILLYOT<strong>E</strong>A
        </div>
        <div>
          BU<strong>T</strong>TERCUP
        </div>
        <div>
          REGENTS<strong>O</strong>FTHEUNIVERSITYOFCALIFORNIAVBAKKE
        </div>
        <div>TOSCANINI</div>
        <div>KORNBLUTH</div>
        <div>SALLYKORNBLUTH</div>
        <div>
          <strong>M</strong>ARILLACUTHBERT
        </div>
        <div>HQ</div>
      </Dossier>
      <p>
        Taking the letters at those indexes spells out the final answer, and the
        name of Billie’s old partner: <PuzzleAnswer>LITTLE TOM</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
