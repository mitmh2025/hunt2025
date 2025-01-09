import React from "react";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const Answer = styled.div`
  margin: 1em 0;
  div:not(:first-child) {
    margin-left: 1em;
  }
`;

const StyledTable = styled.table`
  th,
  td {
    padding: 1px 8px;
  }
`;

const TABLE_DATA: {
  story: number;
  year: number;
  country: string;
  song: string;
  motif: string;
  score: number;
  letter: string;
}[] = [
  {
    story: 13,
    year: 2006,
    country: "🇩🇪 Germany",
    song: "No No Never",
    motif: "A185",
    score: 205,
    letter: "20=T",
  },
  {
    story: 5,
    year: 2006,
    country: "🇫🇮 Finland",
    song: "Hard Rock Hallelujah",
    motif: "B756",
    score: 757,
    letter: "1=A",
  },
  {
    story: 18,
    year: 2007,
    country: "🇬🇧 UK",
    song: "Flying the Flag",
    motif: "C67",
    score: 85,
    letter: "18=R",
  },
  {
    story: 6,
    year: 2009,
    country: "🇷🇴 Romania",
    song: "The Balkan Girls",
    motif: "D177",
    score: 186,
    letter: "9=I",
  },
  {
    story: 10,
    year: 2012,
    country: "🇷🇺 Russia",
    song: "Party for Everybody",
    motif: "E55",
    score: 61,
    letter: "6=F",
  },
  {
    story: 15,
    year: 2013,
    country: "🇲🇩 Moldova",
    song: "O Mie",
    motif: "F313",
    score: 314,
    letter: "1=A",
  },
  {
    story: 12,
    year: 2013,
    country: "🇩🇰 Denmark",
    song: "Only Teardrops",
    motif: "G264",
    score: 283,
    letter: "19=S",
  },
  {
    story: 2,
    year: 2014,
    country: "🇺🇦 Ukraine",
    song: "Tick-tock",
    motif: "H162",
    score: 177,
    letter: "15=O",
  },
  {
    story: 9,
    year: 2014,
    country: "🇵🇱 Poland",
    song: "My Słowianie",
    motif: "J233",
    score: 247,
    letter: "14=N",
  },
  {
    story: 7,
    year: 2015,
    country: "🇸🇪 Sweden",
    song: "Heroes",
    motif: "K375",
    score: 382,
    letter: "7=G",
  },
  {
    story: 3,
    year: 2015,
    country: "🇦🇹 Austria",
    song: "I am Yours",
    motif: "L165",
    score: 166,
    letter: "1=A",
  },
  {
    story: 1,
    year: 2016,
    country: "🇦🇺 Australia",
    song: "Sound of Silence",
    motif: "M235",
    score: 247,
    letter: "12=L",
  },
  {
    story: 8,
    year: 2017,
    country: "🇮🇹 Italy",
    song: "Occidentali's Karma",
    motif: "N228",
    score: 230,
    letter: "2=B",
  },
  {
    story: 4,
    year: 2019,
    country: "🇦🇿 Azerbaijan",
    song: "Truth",
    motif: "P316",
    score: 317,
    letter: "1=A",
  },
  {
    story: 11,
    year: 2022,
    country: "🇦🇲 Armenia",
    song: "Snap",
    motif: "Q221",
    score: 235,
    letter: "14=N",
  },
  {
    story: 17,
    year: 2022,
    country: "🇷🇸 Serbia",
    song: "In Corpore Sano",
    motif: "R41",
    score: 50,
    letter: "9=I",
  },
  {
    story: 14,
    year: 2023,
    country: "🇭🇷 Croatia",
    song: "Mama ŠČ!",
    motif: "S191",
    score: 192,
    letter: "1=A",
  },
  {
    story: 16,
    year: 2024,
    country: "🇨🇭 Switzerland",
    song: "The Code",
    motif: "T11",
    score: 25,
    letter: "14=N",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <NotoColorEmojiFont />
      <p>
        This puzzle combines Eurovision entries and common fairytale motifs.
      </p>
      <p>
        Each (very) short story contains both the description for the staging of
        a memorable Eurovision entry, plus additional strange details.
      </p>
      <p>
        For example, in “Once upon a time there were six old women baking bread
        who were brought back from the dead by music”, the six old women baking
        bread is a description of the staging of ‘Party for Everybody’ by
        Buranovskiye Babushki (which was Russia’s entry in 2012).
      </p>
      <p>
        Identifying all of the Eurovision entries and taking the first letter of
        each song’s title in order spells out <Mono>STITH THOMPSON MOTIF</Mono>.
        This is a categorisation system for common motifs in fairytales.
      </p>
      <p>
        The additional details in each story correspond to a common motif. For
        example, “brought back from the dead by music” is E55 in the
        Stith-Thompson motif index (‘resuscitation by music’).
      </p>
      <p>
        Each country’s flag also has an associated score. For example, Russia’s
        score is 61. The difference between the score and the number in the
        motif index gives a letter to extract (in this case 61 - 55 = 6 → F).
      </p>
      <p>
        Ordering the extracted letters by the starting letter in the motif index
        (E in this case) gives the clue phrase TARIFA SONG ALBANIAN. Eneda
        Tarifa represented Albania with the song ‘Fairytale’ in Eurovision in
        2016, but its original title in Albanian was{" "}
        <PuzzleAnswer>PERRALLE</PuzzleAnswer>, which is the answer to the
        puzzle.
      </p>
      <h3>Full solution</h3>
      <p>
        (<strong>Eurovision staging description in bold</strong>,{" "}
        <i>fairytale motif in italics</i>)
      </p>
      <Answer>
        <div>
          Once upon a time there was{" "}
          <strong>a woman in a dark virtual world</strong>,{" "}
          <i>who rode naked through the streets</i>{" "}
          <strong>sitting on giant sparkly cube</strong>,{" "}
          <i>to obtain freedom for her citizens</i>.
        </div>
        <div>
          <strong>Sound of Silence, Dani Im, Australia, 2016</strong>
        </div>
        <div>
          <i>
            M235: Bargain: woman rides naked through streets to obtain freedom
            for citizens
          </i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time <i>a bee landed on</i>{" "}
          <strong>
            <i>a woman</i>
          </strong>{" "}
          <strong>
            facing into a strong wind with a man running in a giant wheel behind
            her
          </strong>
          , <i>and hence she was recognised as a disguised princess</i>.
        </div>
        <div>
          <strong>Tick-tock, Mariya Yaremchuk, Ukraine, 2014</strong>
        </div>
        <div>
          <i>H162: Recognition of disguised princess by bee lighting on her</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time <i>there was a lowly</i>{" "}
          <strong>
            <i>boy</i>
          </strong>{" "}
          <strong>
            playing the piano who cast a spell to light it on fire
          </strong>{" "}
          and <i>became king</i>.
        </div>
        <div>
          <strong>I am Yours, The Makemakes, Austria, 2015</strong>
        </div>
        <div>
          <i>L165: Lowly boy becomes king</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there were{" "}
          <strong>two robots performing laser heart surgery on</strong>{" "}
          <strong>
            <i>a man</i>
          </strong>{" "}
          <i>who sacrificed his life for his friend</i>.
        </div>
        <div>
          <strong>Truth, Chingiz, Azerbaijan, 2019</strong>
        </div>
        <div>
          <i>P316: Friend sacrifices his life for the other</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there was a <strong>band of goth metal orcs</strong>{" "}
          who encountered a colony of <i>gold-digging ants</i>.
        </div>
        <div>
          <strong>Hard Rock Hallelujah, Lordi, Finland, 2006</strong>
        </div>
        <div>
          <i>B756: Gold-digging ants</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there were{" "}
          <strong>
            woodland fairies who ere dancing among the cherry blossoms by a
            throne made from an old tree trunk
          </strong>{" "}
          before the whole group were <i>transformed into catfish</i>.
        </div>
        <div>
          <strong>The Balkan Girls, Elena, Romania, 2009</strong>
        </div>
        <div>
          <i>D177: Transformation: man (woman) to catfish</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time <strong>a man with a smaller animated friend</strong>{" "}
          <i>
            stole chickens together. The man held a mock funeral to cover the
            theft
          </i>{" "}
          and <strong>his friend copied his every move.</strong>
        </div>
        <div>
          <strong>Heroes, Mans Zelmerlow, Sweden, 2015</strong>
        </div>
        <div>
          <i>
            K375: Thieves steal chickens and have mock funeral to cover theft
          </i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there was{" "}
          <i>a leopard who was tied up in a bag and thrown into the sea</i>,{" "}
          <strong>an inexplicable gorilla appeared</strong>,{" "}
          <i>and then he floated to shore and found a mate</i>.
        </div>
        <div>
          <strong>Occidentali’s Karma, Francesco Gabbani, Italy, 2017</strong>
        </div>
        <div>
          <i>
            N228: Leopard tied in bag in water floats to shore and finds a mate
          </i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there were six young women{" "}
          <i>forced to choose between their desire</i> to <strong>dance</strong>{" "}
          <i>and their duty</i> to{" "}
          <strong>
            do chores. Four chose to spend their time dancing and singing and
            left their two friends to wash their clothes and churn the butter.
          </strong>
        </div>
        <div>
          <strong>My Słowianie, Donatan & Cleo, Poland, 2014</strong>
        </div>
        <div>
          <i>J233: Choice between desire and duty</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there were{" "}
          <strong>six old women baking bread</strong> who were{" "}
          <i>brought back from the dead by music</i>.
        </div>
        <div>
          <strong>
            Party for Everybody, Buranovskiya Babushki, Russia, 2012
          </strong>
        </div>
        <div>
          <i>E55: Resuscitation by music</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there was{" "}
          <strong>
            <i>a girl</i>
          </strong>{" "}
          <i>who had committed personal offenses against the gods</i>{" "}
          <strong>living in a house made of sheets of paper</strong>{" "}
          <i>as a punishment</i>.
        </div>
        <div>
          <strong>Snap, Rosa Linn, Armenia, 2022</strong>
        </div>
        <div>
          <i>Q221: Personal offences against gods punished</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time a <strong>barefoot girl in the golden light</strong>{" "}
          <i>enticed</i>{" "}
          <strong>two soldiers who were drumming and playing the flute</strong>{" "}
          <i>
            by offering them her love, but she was actually a witch and
            destroyed them
          </i>
          .
        </div>
        <div>
          <strong>Only Teardrops, Emmelie de Forest, Denmark, 2013</strong>
        </div>
        <div>
          <i>
            G264: La Belle Dame Sans Merci (Witch entices men with offers love
            and then deserts or destroys them)
          </i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time <i>a god cared for his favorite individuals</i>:{" "}
          <strong>a country music band surrounded by illuminated cacti</strong>.
        </div>
        <div>
          <strong>No No Never, Texas Lightning, Germany, 2006</strong>
        </div>
        <div>
          <i>A185: Deity cares for favorite individuals</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there were{" "}
          <strong>
            five tough military men wearing makeup and garish punk clothes
          </strong>{" "}
          <i>who were driven insane by</i>{" "}
          <strong>a rocket-wielding autocrat</strong> who <i>kept them awake</i>
          .
        </div>
        <div>
          <strong>Mama ŠČ!, Let 3, Croatia, 2023</strong>
        </div>
        <div>
          <i>S191: Driving insane by keeping awake</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there was <i>a fairy</i>{" "}
          <strong>
            woman with a wondrous quiff hairstyle and a dress made of stars
          </strong>{" "}
          who <i>combed the hair of children</i> and{" "}
          <strong>grew to be an incredible height</strong>.
        </div>
        <div>
          <strong>O Mie, Aliona Moon, Moldova, 2013</strong>
        </div>
        <div>
          <i>F313: Fairies comb children’s hair</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there was{" "}
          <strong>a person spinning on a tilting disc</strong> who{" "}
          <i>fell in love with another person they had never seen</i>.
        </div>
        <div>
          <strong>The Code, Nemo, Switzerland, 2024</strong>
        </div>
        <div>
          <i>T11: Falling in love with person never seen</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time there was{" "}
          <strong>
            <i>a woman</i>
          </strong>{" "}
          <i>held captive in a tower</i>,{" "}
          <strong>
            washing her hands surrounded by five attendants with towels
          </strong>
          .
        </div>
        <div>
          <strong>In Corpore Sano, Konstrakta, Serbia, 2022</strong>
        </div>
        <div>
          <i>R41: Captivity in tower</i>
        </div>
      </Answer>
      <Answer>
        <div>
          Once upon a time <i>the gods were offended by</i>{" "}
          <strong>a crew of flight attendants</strong> because{" "}
          <i>they neglected the sacred fires</i>.
        </div>
        <div>
          <strong>Flying the Flag, Scooch, UK, 2007</strong>
        </div>
        <div>
          <i>C67: Tabu: neglect of sacred fires </i>
        </div>
      </Answer>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Story</th>
            <th>Year</th>
            <th>Country</th>
            <th>Song</th>
            <th>Motif Index</th>
            <th>Score</th>
            <th>Letter</th>
          </tr>
          {TABLE_DATA.map(
            ({ story, year, country, song, motif, score, letter }) => (
              <tr key={story}>
                <td>{story}</td>
                <td>{year}</td>
                <td>{country}</td>
                <td>{song}</td>
                <td>{motif}</td>
                <td>{score}</td>
                <td>{letter}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
