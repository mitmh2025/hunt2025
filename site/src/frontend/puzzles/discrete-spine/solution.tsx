import React from "react";
import { styled } from "styled-components";
import birch from "./assets/birch.png";
import bogey from "./assets/bogey.png";
import cube from "./assets/cube.png";
import dale from "./assets/dale.png";
import ewe from "./assets/ewe.png";
import extraction1 from "./assets/extraction1.png";
import extraction2 from "./assets/extraction2.png";
import hogs from "./assets/hogs.png";
import jockey from "./assets/jockey.png";
import knee from "./assets/knee.png";
import mickey from "./assets/mickey.png";
import nano from "./assets/nano.png";
import pc from "./assets/pc.png";
import pill from "./assets/pill.png";
import pow from "./assets/pow.png";
import rooks from "./assets/rooks.png";
import ruger from "./assets/ruger.png";
import whey from "./assets/whey.png";
import worm from "./assets/worm.png";
import { FlexWrapper } from "./puzzle";

const StyledTable = styled.table`
  margin: 1em 0;
  td,
  th {
    padding: 0 8px;
  }
`;

const MonoTable = styled(StyledTable)`
  td {
    font-family: monospace;
  }
`;

const Mono = styled.span`
  font-family: monospace;
`;

const LEFT_PAGE = [
  { clue: "Female animal from which we spin wool (3)", answer: "EWE" },
  { clue: "Magic Kingdom mascot (6)", answer: "MICKEY" },
  {
    clue: "Greek prefix for small to an extraordinary degree (4)",
    answer: "NANO",
  },
  { clue: "Medicine pressed into a circle (4)", answer: "PILL" },
  { clue: "Sound that appears in a Batman fight (3)", answer: "POW" },
  {
    clue: "Chess pieces that move left, right, up, or down (5)",
    answer: "ROOKS",
  },
  { clue: "Southport Connecticut gun manufacturer (5)", answer: "RUGER" },
  { clue: "Reward for the early bird (4)", answer: "WORM" },
];
const RIGHT_PAGE = [
  { clue: "White-barked flora made into beer (5)", answer: "BIRCH" },
  { clue: "An aircraft not known to be friendly (5)", answer: "BOGEY" },
  { clue: "Broad valley that lies between hills (4)", answer: "DALE" },
  { clue: "Selfishly keeps everything for oneself (4)", answer: "HOGS" },
  { clue: "Rider of an equine beast (6)", answer: "JOCKEY" },
  { clue: "Joint that lets the lower leg rotate (4)", answer: "KNEE" },
  { clue: "Electronic device found on many desks (2, abbr.)", answer: "PC" },
  { clue: "Thin liquid made by removing milk solids (4)", answer: "WHEY" },
];

const ALT_TEXT = "An angular glyph written in thick black lines.";

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is themed around the video game Tunic. The presentation is
        meant to mimic a two-page spread of the in-game manual, which featured
        handwritten notes on top of the printed page, as we see here.
      </p>
      <p>
        The symbols in the puzzle are from the invented writing system in Tunic.
        This is a phonetic representation of English, with each glyph giving at
        most one consonant sound and at most one vowel sound. Consonants are
        encoded by the inner segments of each glyph, and vowels by the outer
        segments. There are a number of fan-made references for how the writing
        system works, including{" "}
        <a
          href="https://tunic.fandom.com/wiki/Tunic_Script"
          target="_blank"
          rel="noreferrer"
        >
          this fan wiki
        </a>{" "}
        and{" "}
        <a
          href="https://steamuserimages-a.akamaihd.net/ugc/2527155798048137885/458A241CBEDAD1B7DE658B6F499E1F388605A1CF/"
          target="_blank"
          rel="noreferrer"
        >
          this Steam guide
        </a>
        .
      </p>
      <p>
        The printed lines are clues and enumerations. These clues and their
        answers are:
      </p>
      <StyledTable>
        <tr>
          <th colSpan={2}>Left page</th>
          {LEFT_PAGE.map(({ clue, answer }, i) => (
            <tr key={`left-${i}`}>
              <td>{clue}</td>
              <td>{answer}</td>
            </tr>
          ))}
          <th colSpan={2}>Right page</th>
          {RIGHT_PAGE.map(({ clue, answer }, i) => (
            <tr key={`left-${i}`}>
              <td>{clue}</td>
              <td>{answer}</td>
            </tr>
          ))}
        </tr>
      </StyledTable>
      <p>The handwritten list names a number of locations in the game:</p>
      <ol>
        <li>Eastern Vault</li>
        <li>Ruined Atoll</li>
        <li>West Garden</li>
        <li>Frog’s Domain</li>
        <li>Quarry</li>
        <li>Under The Well</li>
        <li>Cathedral</li>
        <li>Swamp</li>
      </ol>
      <p>
        With this established, the solver has three lists of eight. What must be
        done next is to determine how to match up the items in these lists, with
        the numbered list of locations ultimately giving an ordering.
      </p>
      <p>
        A feature of the Tunic writing system is that each glyph is a partial
        set of edges of a cube, seen from a fixed perspective. This is somewhat
        obscured by the printed version of the writing which has the splitting
        horizontal line but is more clear in the handwritten version. The title,
        “Find Other Ways Of Seeing,” and the flavortext mentioning a change of
        perspective, both clue that the glyphs should be viewed from different
        angles (or equivalently, rotated). If the answers to each printed clue
        are written in Tunic glyphs, for each answer, there is a consistent 3D
        rotation of each glyph that transforms the answer to an answer on the
        opposing page.
      </p>
      <p>
        The rotations can be composed of 90-degree rotations around the three
        primary axes, illustrated here:
      </p>
      <img
        src={cube}
        alt="A cube with all six rotations labeled: clockwise and counter-clockwise over the X-, Y-, and Z-axes"
      />
      <MonoTable>
        <tr>
          <th>Left Answer</th>
          <th>Rotation</th>
          <th>Right Answer</th>
        </tr>
        <tr>
          <td>
            EWE <img src={ewe} alt={ALT_TEXT} />
          </td>
          <td>Y</td>
          <td>
            KNEE <img src={knee} alt={ALT_TEXT} />
          </td>
        </tr>
        <tr>
          <td>
            MICKEY <img src={mickey} alt={ALT_TEXT} />
          </td>
          <td>X′ Y Y</td>
          <td>
            JOCKEY <img src={jockey} alt={ALT_TEXT} />
          </td>
        </tr>
        <tr>
          <td>
            NANO <img src={nano} alt={ALT_TEXT} />
          </td>
          <td>Z X′</td>
          <td>
            PC <img src={pc} alt={ALT_TEXT} />
          </td>
        </tr>
        <tr>
          <td>
            PILL <img src={pill} alt={ALT_TEXT} />
          </td>
          <td>Z Z</td>
          <td>
            DALE <img src={dale} alt={ALT_TEXT} />
          </td>
        </tr>
        <tr>
          <td>
            POW <img src={pow} alt={ALT_TEXT} />
          </td>
          <td>X</td>
          <td>
            WHEY <img src={whey} alt={ALT_TEXT} />
          </td>
        </tr>
        <tr>
          <td>
            ROOKS <img src={rooks} alt={ALT_TEXT} />
          </td>
          <td>X X Z′</td>
          <td>
            HOGS <img src={hogs} alt={ALT_TEXT} />
          </td>
        </tr>
        <tr>
          <td>
            RUGER <img src={ruger} alt={ALT_TEXT} />
          </td>
          <td>Y Z′</td>
          <td>
            BOGEY <img src={bogey} alt={ALT_TEXT} />
          </td>
        </tr>
        <tr>
          <td>
            WORM <img src={worm} alt={ALT_TEXT} />
          </td>
          <td>Y Z Z</td>
          <td>
            BIRCH <img src={birch} alt={ALT_TEXT} />
          </td>
        </tr>
      </MonoTable>
      <p>
        Once connected by a rotation, the clue pairs can also be connected to
        one of the game locations in the numbered list. As the flavor says, this
        process “isn’t automatic,” which is to say, it’s manual. The{" "}
        <a href="https://book.tunic.wiki/" target="_blank" rel="noreferrer">
          Tunic in-game instruction manual
        </a>{" "}
        can be found online. The eight locations listed are all in the table of
        contents in the manual, each having its own page or two-page spread. In
        each pair of clues, one word in the left clue appears in one of the
        named sections in Latin script, and one word in the right clue appears
        in the same manual section in Tunic script. For example, “gun” in the
        RUGER clue and “known” in the BOGEY clue both appear in the Quarry
        manual section. The puzzle itself is formatted with the same aspect
        ratio as a two-page spread in the manual. The eight hand-drawn circles
        give the location of the eight Latin-script key words on the page.
        Finding the Tunic script key words from the right-page clues is not
        necessary, but acts as a confirmation. The key words (italicized) are
        found in the manual sections, in location list order:
      </p>
      <StyledTable>
        <tr>
          <td>1. Eastern Vault</td>
          <td>
            <em>Magic</em> kingdom mascot
          </td>
          <td>
            Rider of an equine <em>beast</em>
          </td>
        </tr>
        <tr>
          <td>2. Ruined Atoll</td>
          <td>
            Reward for the early <em>bird</em>
          </td>
          <td>
            White-barked <em>flora</em> made into beer
          </td>
        </tr>
        <tr>
          <td>3. West Garden</td>
          <td>
            Sound that appears in a Batman <em>fight</em>
          </td>
          <td>
            Thin liquid <em>made</em> by removing milk solids
          </td>
        </tr>
        <tr>
          <td>4. Frog’s Domain</td>
          <td>
            Female animal from which we <em>spin</em> wool
          </td>
          <td>
            Joint that lets the lower leg <em>rotate</em>
          </td>
        </tr>
        <tr>
          <td>5. Quarry</td>
          <td>
            Southport Connecticut <em>gun</em> manufacturer
          </td>
          <td>
            An aircraft not <em>known</em> to be friendly
          </td>
        </tr>
        <tr>
          <td>6. Under The Well</td>
          <td>
            Medicine pressed into a <em>circle</em>
          </td>
          <td>
            Broad valley that <em>lies</em> between hills
          </td>
        </tr>
        <tr>
          <td>7. Cathedral</td>
          <td>
            Greek prefix for small to an <em>extraordinary</em> degree
          </td>
          <td>
            Electronic <em>device</em> found on many desks
          </td>
        </tr>
        <tr>
          <td>8. Swamp</td>
          <td>
            Chess pieces that move <em>left</em> right up or down
          </td>
          <td>
            Selfishly keeps <em>everything</em> for oneself
          </td>
        </tr>
      </StyledTable>
      <p>
        Combined with the earlier step, this provides an ordered list of eight
        glyph rotations.
      </p>
      <ol>
        <li>X′ Y Y</li>
        <li>Y Z Z </li>
        <li>X</li>
        <li>Y</li>
        <li>Y Z′</li>
        <li>Z Z</li>
        <li>Z X′</li>
        <li>X X Z′</li>
      </ol>
      <p>
        Finally, the voice clip saying the nonsense words “reechailei zeipu
        lehnor vur” (ɹiʧaɪleɪ zeɪpu lənɔr vɜr) can be transcribed into eight
        Tunic glyphs, and each can be rotated using the ordered list of
        rotations previously, one rotation per glyph.
      </p>
      <FlexWrapper>
        <img
          src={extraction1}
          alt="A series of angular glyphs written in thich black lines."
        />
        <div>↓</div>
        <img
          src={extraction2}
          alt="A series of angular glyphs written in thich black lines."
        />
      </FlexWrapper>
      <p>
        This transforms the glyphs into a meaningful sequence saying “carmine
        obi three four,” which clues the final answer of the puzzle,{" "}
        <Mono>
          <strong>RED SASH</strong>
        </Mono>
        .
      </p>
    </>
  );
};

export default Solution;
