import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image25 from "./assets/image25.png";
import image26 from "./assets/image26.png";
import image27 from "./assets/image27.png";
import image28 from "./assets/image28.png";
import image29 from "./assets/image29.png";
import image30 from "./assets/image30.png";
import image31 from "./assets/image31.png";
import image32 from "./assets/image32.png";
import image33 from "./assets/image33.png";
import image34 from "./assets/image34.png";
import image35 from "./assets/image35.png";
import image36 from "./assets/image36.png";
import image37 from "./assets/image37.png";
import image38 from "./assets/image38.png";
import image39 from "./assets/image39.png";
import image40 from "./assets/image40.png";
import {
  FlexWrapper,
  GRAPH_ALT_TEXT,
  ImageWrapper,
  SizedLinkedImage,
} from "./puzzle";

const Red = styled.span`
  background-color: red;
`;

const StyledTable = styled.table`
  margin-top: 1em;
  margin-bottom: 1em;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  th {
    background-color: #65413a;
    color: var(--true-white);
  }
  th,
  td {
    padding: 1px 8px;
    text-align: center;
    border: 1px solid #65413a;
  }
`;

const ColoredSquare = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  width: 56px;
  height: 56px;
  margin: auto;
`;

const EmojiImg = styled.img`
  width: 56px;
  height: 56px;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const SONG_NAMES: { characters: string; redIndex: number }[] = [
  { characters: "AFTERGLOW", redIndex: 2 },
  {
    characters: "ALL YOU HAD TO DO WAS STAY",
    redIndex: 0,
  },
  { characters: "BACK TO DECEMBER", redIndex: 8 },
  { characters: "BETTER THAN REVENGE", redIndex: 10 },
  { characters: "BETTY ", redIndex: 1 },
  { characters: "BUT DADDY I LOVE HIM ", redIndex: 10 },
  { characters: "COME BACK…BE HERE ", redIndex: 0 },
  { characters: "COME IN WITH THE RAIN ", redIndex: 5 },
  { characters: "CONEY ISLAND ", redIndex: 6 },
  { characters: "DON’T BLAME ME ", redIndex: 10 },
  { characters: "FOREVER WINTER ", redIndex: 0 },
  { characters: "GUILTY AS SIN?", redIndex: 4 },
  { characters: "IF THIS WAS A MOVIE", redIndex: 4 },
  { characters: "IMGONNAGETYOUBACK", redIndex: 0 },
  { characters: "INVISIBLE STRING", redIndex: 15 },
  { characters: "KARMA", redIndex: 2 },
  { characters: "LABYRINTH", redIndex: 6 },
  { characters: "LOML ", redIndex: 1 },
  { characters: "LOVE STORY", redIndex: 5 },
  { characters: "MARJORIE", redIndex: 2 },
  { characters: "MAROON ", redIndex: 5 },
  {
    characters: "MARY’S SONG (OH MY MY MY)",
    redIndex: 1,
  },
  { characters: "NEVER GROW UP", redIndex: 12 },
  { characters: "NOTHING NEW", redIndex: 1 },
  { characters: "QUESTION…?", redIndex: 1 },
  { characters: "…READY FOR IT?", redIndex: 2 },
  { characters: "RIGHT WHERE YOU LEFT ME", redIndex: 2 },
  { characters: "STATE OF GRACE", redIndex: 0 },
  { characters: "STAY BEAUTIFUL", redIndex: 0 },
  { characters: "SUPERSTAR", redIndex: 0 },
  { characters: "TELL ME WHY", redIndex: 5 },
  { characters: "THE OUTSIDE", redIndex: 5 },
  { characters: "THE PROPHECY", redIndex: 10 },
  { characters: "THE STORY OF US", redIndex: 4 },
  { characters: "THE VERY FIRST NIGHT", redIndex: 12 },
  { characters: "TIMELESS", redIndex: 1 },
  { characters: "‘TIS THE DAMN SEASON", redIndex: 3 },
  { characters: "WILDEST DREAMS", redIndex: 1 },
  { characters: "YOU NEED TO CALM DOWN", redIndex: 12 },
  { characters: "YOU’RE NOT SORRY", redIndex: 7 },
];

const ALBUM_TO_COLOR = {
  TAYLOR_SWIFT: "#95e8b7",
  FEARLESS: "#ebd323",
  SPEAK_NOW: "#9132c7",
  RED: "#c70f02",
  "1989": "#82deff",
  REPUTATION: "#131313",
  LOVER: "#ffbaee",
  FOLKLORE: "#adadad",
  EVERMORE: "#a67446",
  MIDNIGHTS: "#174178",
  TORTURED_POETS: "#f0ebdd",
};

const MORE_GRAPH_ALT_TEXT =
  "From left to right, top to bottom, the nodes read:";

const IMAGE_ROWS = [
  {
    width: 66.7,
    src: image29,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Clean",
      "Karma",
      "imgonnagetyouback",
      "State of Grace",
      "Don’t Blame Me",
      "Look What You Made Me Do",
      "ivy",
      "the 1",
      "Run",
      "Better Man",
    ].join(", ")}`,
  },
  {
    width: 62.9,
    src: image30,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Sparks Fly",
      "The Story of Us",
      "But Daddy I Love Him",
      "Maroon",
      "The Lucky One",
      "All Too Well (10 Minute Version)",
      "Lover",
      "Call It What You Want",
      "Chloe or Sam or Sophia or Marcus",
    ].join(", ")}`,
  },
  {
    width: 78.7,
    src: image31,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "New Year’s Day",
      "Babe",
      "I Don’t Wanna Live Forever",
      "London Boy",
      "Superstar",
      "loml",
      "You’re Not Sorry",
      "Invisible string",
      "innocent",
      "Vigilante Shit",
      "Invisible",
      "The Archer",
      "Dancing with Our Hands Tied",
    ].join(", ")}`,
  },
  {
    width: 75.2,
    src: image32,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Bye Bye Baby",
      "The Last Time",
      "Getaway Car",
      "Anti-Hero",
      "Delicate",
      "Mr. Perfectly Fine",
      "Foolish One",
      "Back to December",
      "Tell Me Why",
      "coney island",
      "Love Story",
      "The Other Side of the Door",
      "Everything Has Changed",
    ].join(", ")}`,
  },
  {
    width: 90.6,
    src: image33,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Fortnight",
      "Florida!!!",
      "Midnight Rain",
      "Haunted",
      "‘tis the damn season",
      "…Ready for it?",
      "Guilty as Sin?",
      "Death By a Thousand Cuts",
      "Carolina",
      "Ours",
      "Our Song",
      "Hits Different",
    ].join(", ")}`,
  },
  {
    width: 84.7,
    src: image34,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Starlight",
      "Don’t You",
      "You’re Losing Me",
      "Who’s Afraid of Little Old Me?",
      "Enchanted",
      "right where you left me",
      "Stay Beautiful",
      "Question…?",
      "marjorie",
      "Never Grow Up",
      "It’s Nice to Have a Friend",
      "Fifteen",
      "no body, no crime",
      "it’s time to go",
    ].join(", ")}`,
  },
  {
    width: 66.5,
    src: image35,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Lavender Haze",
      "This Love",
      "exile",
      "Afterglow",
      "Wildest Dreams",
      "Come Back…Be Here",
      "I Can See You",
      "Last Kiss",
      "Mean",
    ].join(", ")}`,
  },
  {
    width: 72.8,
    src: image36,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Teardrops on My Guitar",
      "Breathe",
      "The Bolter",
      "Forever Winter",
      "Timeless",
      "Labyrinth",
      "That’s When",
      "Stay Stay Stay",
    ].join(", ")}`,
  },
  {
    width: 71.9,
    src: image37,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "peace",
      "long story short",
      "We Are Never Ever Getting Back Together",
      "Bejeweled",
      "evermore",
      "Change",
      "You Need To Calm Down",
      "If This Was a Movie",
      "All You Had to Do Was Stay",
      "The Prophecy",
      "thanK you aIMee",
    ].join(", ")}`,
  },
  {
    width: 82.1,
    src: image38,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "Miss Americana & the Heartbreak Prince",
      "Fearless",
      "Dress",
      "Peter",
      "Tim McGraw",
      "The Man",
      "happiness",
      "Come In with the Rain",
      "Better than Revenge",
      "betty",
      "Marys Song (Oh My My My)",
      "seven",
      "cardigan",
      "The Tortured Poets Department",
      "The Best Day",
    ].join(", ")}`,
  },
  {
    width: 66.4,
    src: image39,
    alt: `${GRAPH_ALT_TEXT} ${MORE_GRAPH_ALT_TEXT} ${[
      "gold rush",
      "the lakes",
      "Is It Over Now?",
      "Daylight",
      "Red",
      "Now That We Don’t Talk",
      "22",
      "Style",
      "Nothing New",
      "The Outside",
      "The Very First Night",
      "So It Goes…",
      "You Are In Love",
    ].join(", ")}`,
  },
];

const HalfPiano = (): JSX.Element => {
  return <EmojiImg src={image25} alt="Half of a piano emoji" />;
};

const Piano = (): JSX.Element => {
  return <EmojiImg src={image26} alt="A piano emoji" />;
};

const HalfGuitar = (): JSX.Element => {
  return <EmojiImg src={image27} alt="Half of a guitar emoji" />;
};

const Guitar = (): JSX.Element => {
  return <EmojiImg src={image28} alt="A guitar emoji" />;
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Looking at the context clues of the puzzle (Eras, Colors, Dresses), the
        solver may come to a conclusion that this puzzle is themed around Taylor
        Swift and the Eras Tour.
      </p>
      <p>
        There are 11 nodes at the top, each one representing an era/album in
        canonical order. Each node in a graph represents a song from that era.
      </p>
      <LinkedImage
        src={image1}
        alt="Eleven squares, each a different color, in a row. From left to right, colors are: teal, yellow, purple, red, light blue, black, pimk, gray, brown, dark blue, and off-white."
      />
      <p>
        Looking at the starting node of each graph, there is an emoji—the solver
        may be able to deduce some song titles based on the emoji (e.g.
        Starlight) and some may be trickier.
      </p>
      <p>
        For filling in the grid, a good assumption to make would be that the
        songs/nodes are connected in a certain way by lyrics. This can also be
        figured out by some of the transformations between nodes (e.g pres.
        part. suggesting to turn a lyric into a present participle form).
      </p>
      <p>
        After some investigation around some of these emoji songs and lyrics,
        along with a lyric searcher such as{" "}
        <a
          href="https://shaynak.github.io/taylor-swift/"
          target="_blank"
          rel="noreferrer"
        >
          this one
        </a>
        , teams may discover many songs have other titles within the lyrics of
        the songs.
      </p>
      <p>
        An example would be the first node connection 🧼 → Dark Blue Node (song
        from Midnights) would be Clean → Karma (“And I keep my side of the
        street <u>clean</u>”). The complete solution of each graph can be found
        at the bottom of this page.
      </p>
      <p>
        For the starting nodes (emojis), no era/album color is given—this may
        suggest that the albums of these songs are important to find. The solver
        may then discover there is exactly one song from each album (11 nodes
        and 11 albums).
      </p>
      <p>
        Some nodes have a combination of colors. These are songs that arguably
        belong to more than one era, or are unofficially part of an era or eras.
      </p>
      <p>
        Within some nodes of each graph, there are songs/nodes with a red
        border. These can be alphabetically filled into the list of blanks after
        the graphs, and a letter, marked in red, can be extracted from each.
        These letters can be then read vertically down within each graph to form
        a string of extracted letters.
      </p>
      <p>
        There is also a final song in each graph - represented by either a
        guitar or piano (or half-guitar or half-piano). An important note is
        that these do not match 1 song to 1 album, but they are in alphabetical
        order for confirmation, suggesting that the graphs may need to be
        rearranged.
      </p>
      <FlexWrapper>
        {SONG_NAMES.map(({ characters, redIndex }, i) => (
          <div key={`row-${i}`}>
            {characters
              .split("")
              .map((char, j) =>
                redIndex === j ? (
                  <Red key={`char-${i}-${j}`}>{char}</Red>
                ) : (
                  <span key={`char-${i}-${j}`}>{char}</span>
                ),
              )}
          </div>
        ))}
      </FlexWrapper>
      <StyledTable>
        <tr>
          <th>Starting Node Emojis</th>
          <th>Starting Node Song</th>
          <th>Starting Node Album</th>
          <th>Starting Node Era</th>
          <th>Extracted Letters</th>
          <th>Final Song</th>
          <th>Final Song Era</th>
          <th>Symbol</th>
        </tr>
        <tr>
          <td>🧼</td>
          <td>Clean</td>
          <td>1989</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR["1989"]} />
          </td>
          <td>RISE</td>
          <td>Better Man</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.RED} />
          </td>
          <td>
            <HalfPiano />
          </td>
        </tr>
        <tr>
          <td>✨✈️</td>
          <td>Sparks Fly</td>
          <td>Speak Now</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.SPEAK_NOW} />
          </td>
          <td>SIN</td>
          <td>Chloe or Sam or Sophia or Marcus</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.TORTURED_POETS} />
          </td>
          <td>
            <Piano />
          </td>
        </tr>
        <tr>
          <td>🕛🎊📅</td>
          <td>New Year’s Day</td>
          <td>Reputation</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.REPUTATION} />
          </td>
          <td>SONG</td>
          <td>Dancing With Our Hands Tied</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.REPUTATION} />
          </td>
          <td>
            <Guitar />
          </td>
        </tr>
        <tr>
          <td>👋👋👶</td>
          <td>Bye Bye Baby</td>
          <td>Fearless</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.FEARLESS} />
          </td>
          <td>DMIS</td>
          <td>Everything Has Changed</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.RED} />
          </td>
          <td>
            <HalfGuitar />
          </td>
        </tr>
        <tr>
          <td>1️⃣4️⃣📅</td>
          <td>Fortnight</td>
          <td>The Tortured Poets Department</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.TORTURED_POETS} />
          </td>
          <td>SET</td>
          <td>Hits Different</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.MIDNIGHTS} />
          </td>
          <td>
            <Guitar />
          </td>
        </tr>
        <tr>
          <td>⭐💡</td>
          <td>Starlight</td>
          <td>Red</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.RED} />
          </td>
          <td>GSURP</td>
          <td>it’s time to go</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.EVERMORE} />
          </td>
          <td>
            <HalfPiano />
          </td>
        </tr>
        <tr>
          <td>🟪🌫️</td>
          <td>Lavender Haze</td>
          <td>Midnights</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.MIDNIGHTS} />
          </td>
          <td>TIC</td>
          <td>Mean</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.SPEAK_NOW} />
          </td>
          <td>
            <HalfGuitar />
          </td>
        </tr>
        <tr>
          <td>😢😢🎸</td>
          <td>Teardrops on My Guitar</td>
          <td>Taylor Swift</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.TAYLOR_SWIFT} />
          </td>
          <td>FIN</td>
          <td>Stay Stay Stay</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.RED} />
          </td>
          <td>
            <HalfGuitar />
          </td>
        </tr>
        <tr>
          <td>✌️</td>
          <td>Peace</td>
          <td>Folklore</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.FOLKLORE} />
          </td>
          <td>CHAC</td>
          <td>thanK you aIMee</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.TORTURED_POETS} />
          </td>
          <td>
            <HalfGuitar />
          </td>
        </tr>
        <tr>
          <td>👸🗽➕💔🤴</td>
          <td>Miss Americana & the Heartbreak Prince</td>
          <td>Lover</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.LOVER} />
          </td>
          <td>INEA</td>
          <td>The Best Day</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.FEARLESS} />
          </td>
          <td>
            <Piano />
          </td>
        </tr>
        <tr>
          <td>🥇💨</td>
          <td>Gold Rush</td>
          <td>Evermore</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR.EVERMORE} />
          </td>
          <td>OUS</td>
          <td>You Are In Love</td>
          <td>
            <ColoredSquare $color={ALBUM_TO_COLOR["1989"]} />
          </td>
          <td>
            <Piano />
          </td>
        </tr>
      </StyledTable>
      <p>
        As there is one emoji/starting song per album, each graph can be sorted
        by era order (at the top of the puzzle) to give a new clue instruction.
      </p>
      <p>
        The extracted string (in eras order) is:{" "}
        <Mono>FIND MISSING SURPRISE SONG IN EACH ACOUSTIC SET</Mono>
      </p>
      <p>
        Looking at the Eras Tour, there is a unique acoustic set every night,
        this consists of one song being played on guitar and one song on piano.
        Occasionally, there are mashups, meaning two or three songs are lumped
        into the one acoustic song for an instrument.
      </p>
      <p>
        As suggested by the guitar and piano emojis and the clue phrase, we have
        extracted surprise songs from different nights.
      </p>
      <p>
        The full list of Surprise Songs can be found{" "}
        <a
          href="https://en.wikipedia.org/wiki/The_Eras_Tour#Surprise_songs"
          target="_blank"
          rel="noreferrer"
        >
          on Wikipedia
        </a>
        .
      </p>
      <p>
        A half-guitar or half-piano suggests that those specific songs are part
        of a mashup and will make the process of assigning songs to a night
        unique. The clue phrase also suggests finding each missing surprise
        song. Our extracted surprise songs can be mapped to 7 nights from the
        Eras Tour.
      </p>
      <p>
        The dresses at the end of the puzzle help us to order each night. These
        dresses represent 7 unique dresses worn for the acoustic set in the Eras
        Tour, and it so happens that for each of our extracted nights, Taylor
        wears a unique one of these 7 dresses.
      </p>
      <p>
        The music notes can then be used to index into the missing surprise
        songs and extract the final solution,{" "}
        <Mono>
          <strong>LUCKIER</strong>
        </Mono>
        !
      </p>
      <StyledTable>
        <tr>
          <th>Extracted Surprise Songs</th>
          <th>Eras Tour Night</th>
          <th>Dress Color</th>
          <th>Missing Surprise Song</th>
          <th>Notes</th>
          <th>Letter</th>
        </tr>
        <tr>
          <td>
            <div>
              <strong>Everything Has Changed</strong>
            </div>
            <div>(Guitar Mashup)</div>
            <br />
            <div>
              <strong>Chloe or Sam or Sophia or Marcus</strong>
            </div>
            <div>(Piano)</div>
          </td>
          <td>Lyon, June 3, 2024</td>
          <td>Orange</td>
          <td>
            <div>
              <strong>Glitch</strong>
            </div>
            <div>(Guitar Mashup)</div>
          </td>
          <td>2</td>
          <td>L</td>
        </tr>
        <tr>
          <td>
            <div>
              <strong>You Are in Love</strong>
            </div>
            <div>(Piano)</div>
          </td>
          <td>Los Angeles, August 4, 2024</td>
          <td>Maroon</td>
          <td>
            <div>
              <strong>Our Song</strong>
            </div>
            <div>(Guitar)</div>
          </td>
          <td>2</td>
          <td>U</td>
        </tr>
        <tr>
          <td>
            <div>
              <strong>thanK you aIMee</strong>
            </div>
            <div>(Guitar mashup)</div>
            <br />
            <div>
              <strong>Mean</strong>
            </div>
            <div>(Guitar mashup)</div>
          </td>
          <td>London, June 22, 2024</td>
          <td>Blue (sleeveless)</td>
          <td>
            <div>
              <strong>Castles Crumbling</strong>
            </div>
            <div>(Piano)</div>
          </td>
          <td>1</td>
          <td>C</td>
        </tr>
        <tr>
          <td>
            <div>
              <strong>Hits Different</strong>
            </div>
            <div>(Guitar)</div>
          </td>
          <td>Chicago - June 4, 2023</td>
          <td>Yellow</td>
          <td>
            <div>
              <strong>The Moment I Knew</strong>
            </div>
            <div>(Piano)</div>
          </td>
          <td>11</td>
          <td>K</td>
        </tr>
        <tr>
          <td>
            <div>
              <strong>Dancing with Our Hands Tied</strong>
            </div>
            <div>(Guitar)</div>
          </td>
          <td>Rio de Janiero, November 19, 2023</td>
          <td>Dark blue (with sleeves)</td>
          <td>
            <div>
              <strong>Bigger Than The Whole Sky</strong>
            </div>
            <div>(Piano)</div>
          </td>
          <td>2</td>
          <td>I</td>
        </tr>
        <tr>
          <td>
            <div>
              <strong>The Best Day</strong>
            </div>
            <div>(Piano)</div>
          </td>
          <td>Philadelphia, May 14, 2023</td>
          <td>Green</td>
          <td>
            <div>
              <strong>Hey Stephen</strong>
            </div>
            <div>(Guitar)</div>
          </td>
          <td>6</td>
          <td>E</td>
        </tr>
        <tr>
          <td>
            <div>
              <strong>Stay Stay Stay</strong>
            </div>
            <div>(Guitar mashup</div>
            <br />
            <div>
              <strong>it’s time to go</strong>
            </div>
            <div>(Piano mashup)</div>
            <br />
            <div>
              <strong>Better Man</strong>
            </div>
            <div>(Piano mashup)</div>
          </td>
          <td>Gelsenkirchen, July 19, 2024</td>
          <td>Pink</td>
          <td>
            <div>
              <strong>Paper Rings</strong>
            </div>
            <div>(Guitar mashup)</div>
          </td>
          <td>5</td>
          <td>R</td>
        </tr>
      </StyledTable>
      {IMAGE_ROWS.map(({ width, src, alt }, i) => (
        <ImageWrapper key={`solution-graph-${i}`}>
          <SizedLinkedImage $width={width} src={src} alt={alt} />
        </ImageWrapper>
      ))}
      <p>
        Here’s a large graph example with most connections which helped me to
        construct the puzzle (missing songs like ME!, Mean, the 1, run etc. as
        they appear too many times)
      </p>
      <LinkedImage
        src={image40}
        alt="A very large directed graph with nodes of all eleven colors from the series of squares above."
      />
    </>
  );
};

export default Solution;
