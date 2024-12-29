import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 0px 8px;
  }
`;

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <HScrollTableWrapper>
      <StyledTable>{children}</StyledTable>
    </HScrollTableWrapper>
  );
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is based on “social networks”, which can refer to social
        networking platforms, or to graphs showing the relationships between
        individuals, usually drawn as dots connected by lines. The title
        “Networking Event” is meant to hint at this.
      </p>
      <p>
        The first step is to find the answer to the clues. If you find certain
        key answers like M) PHASE BOOK or C) TICK TALK, they will help you
        figure out that these are misheard versions of social networking
        platforms. If you find all the answers you will see that the lengths of
        the social networking platforms match the lengths of the words in the
        given word bank (except for one entry: BLUE BLOODS).
      </p>
      <p>
        Next, look at USELESS EXAMPLE, which is a diagram of a social network or
        social graph. The nodes are labeled with all the unique letters in
        USELESS EXAMPLE. Also, USELESS and EXAMPLE are the same length which
        equals the number of lines in the diagram. If you take the pairs of
        corresponding letters, i.e. the nth letter from each word, you get: U-E,
        S-X, E-A, etc. which give the connections shown in the diagram, drawn as
        straight lines.
      </p>
      <p>
        This shows you how to make network graphs from pairs of words of the
        same length. By taking the names of the social networking platforms and
        pairing them with words from the word bank, you get fully connected
        network graphs (there is only one word that will pair with each social
        networking platform).
      </p>
      <p>
        The font used for the letters at the beginning of each clue are actually
        network graphs as well. The network graphs made from the word pairs are
        each isomorphic to one of these letters. The table below shows the clue
        answers, networking platforms and extracted letters.
      </p>
      <Table>
        <tr>
          <th>Clue</th>
          <th>Clue answer</th>
          <th>Platform</th>
          <th>Paired word</th>
          <th>Graph</th>
        </tr>
        <tr>
          <td>A</td>
          <td>WATT ZAP</td>
          <td>WHATSAPP</td>
          <td>SWINTHIN</td>
          <td>O</td>
        </tr>
        <tr>
          <td>B</td>
          <td>CHER CHAT</td>
          <td>SHARECHAT</td>
          <td>ROSOCHATE</td>
          <td>B</td>
        </tr>
        <tr>
          <td>C</td>
          <td>TICK TALK</td>
          <td>TIKTOK</td>
          <td>BONOMO</td>
          <td>E</td>
        </tr>
        <tr>
          <td>D</td>
          <td>INSTA-GRAHAM</td>
          <td>INSTAGRAM</td>
          <td>KINGS ROOK</td>
          <td>S</td>
        </tr>
        <tr>
          <td>E</td>
          <td>DUMB BLUR</td>
          <td>TUMBLR</td>
          <td>UBUNTU</td>
          <td>E</td>
        </tr>
        <tr>
          <td>F</td>
          <td>SNAP CHAAT</td>
          <td>SNAPCHAT</td>
          <td>THINNISH</td>
          <td>P</td>
        </tr>
        <tr>
          <td>G</td>
          <td>LYE KEY</td>
          <td>LIKEE</td>
          <td>KEELY</td>
          <td>R</td>
        </tr>
        <tr>
          <td>H</td>
          <td>READ IT</td>
          <td>REDDIT</td>
          <td>ED WOOD</td>
          <td>E</td>
        </tr>
        <tr>
          <td>I</td>
          <td>LINK TIN</td>
          <td>LINKEDIN</td>
          <td>BAD BLAKE</td>
          <td>O</td>
        </tr>
        <tr>
          <td>J</td>
          <td>VYIN’</td>
          <td>VINE</td>
          <td>ENVY</td>
          <td>W</td>
        </tr>
        <tr>
          <td>K</td>
          <td>U-TUBE</td>
          <td>YOUTUBE</td>
          <td>BUG EYED</td>
          <td>N</td>
        </tr>
        <tr>
          <td>L</td>
          <td>TWIT, SHH</td>
          <td>TWITCH</td>
          <td>BOW WOW</td>
          <td>E</td>
        </tr>
        <tr>
          <td>M</td>
          <td>PHASE BOOK</td>
          <td>FACEBOOK</td>
          <td>CRAB CAKE</td>
          <td>D</td>
        </tr>
        <tr>
          <td>N</td>
          <td>WEIGH BOWE</td>
          <td>WEIBO</td>
          <td>DWEEB</td>
          <td>T</td>
        </tr>
        <tr>
          <td>O</td>
          <td>THE REDS</td>
          <td>THREADS</td>
          <td>DREAMER</td>
          <td>H</td>
        </tr>
        <tr>
          <td>P</td>
          <td>BEE REEL</td>
          <td>BEREAL</td>
          <td>ERODED</td>
          <td>E</td>
        </tr>
        <tr>
          <td>Q</td>
          <td>VY BRR</td>
          <td>VIBER</td>
          <td>REESE</td>
          <td>F</td>
        </tr>
        <tr>
          <td>R</td>
          <td>NECK STORE</td>
          <td>NEXTDOOR</td>
          <td>TRI INDEX</td>
          <td>O</td>
        </tr>
        <tr>
          <td>S</td>
          <td>DIS CHORD</td>
          <td>DISCORD</td>
          <td>CORONER</td>
          <td>N</td>
        </tr>
        <tr>
          <td>T</td>
          <td>COUP</td>
          <td>KOO</td>
          <td>SKY</td>
          <td>Z</td>
        </tr>
        <tr>
          <td>U</td>
          <td>PARIS, COPE</td>
          <td>PERISCOPE</td>
          <td>AROMATICS</td>
          <td>S</td>
        </tr>
        <tr>
          <td>V</td>
          <td>CUE QUEUE</td>
          <td>QQ</td>
          <td>AL</td>
          <td>A</td>
        </tr>
        <tr>
          <td>W</td>
          <td>CORE AAH</td>
          <td>QUORA</td>
          <td>ARRAY</td>
          <td>Y</td>
        </tr>
        <tr>
          <td>X</td>
          <td>EX</td>
          <td>X</td>
          <td>W</td>
          <td>I</td>
        </tr>
        <tr>
          <td>Y</td>
          <td>MICE PACE</td>
          <td>MYSPACE</td>
          <td>ESP TEST</td>
          <td>N</td>
        </tr>
        <tr>
          <td>Z</td>
          <td>PINCH REST</td>
          <td>PINTEREST</td>
          <td>SPONGEBOB</td>
          <td>G</td>
        </tr>
      </Table>
      <p>
        Taken in clue order, the extracted letters spell:
        OBESEPREOWNEDTHEFONZSAYING, which can be read as: Obese, pre-owned, “The
        Fonz” saying. This gives: FAT USED AYYY.
      </p>
      <p>
        Using the same mis-heard mechanic as used in the clues, gives the
        correct answer: <PuzzleAnswer>FAT TUESDAY</PuzzleAnswer>.
      </p>
      <p>
        <Mono>FAT TUESDAY</Mono> can be paired with the last remaining entry
        from the word bank, BLUE BLOODS, to form a network graph that is 11
        nodes connected in a string. This does not correspond to any letters in
        the font, but rather to the bead necklace pictured at the bottom of the
        puzzle. The necklace is meant to look like a Mardi Gras bead necklace
        and is an appropriate reward for Fat Tuesday, and serves to confirm that
        you have found the right answer. Fat Tuesday could also be considered a
        large “Networking Event”.
      </p>
    </>
  );
};

export default Solution;
