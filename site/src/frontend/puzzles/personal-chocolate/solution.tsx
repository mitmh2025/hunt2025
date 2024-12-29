import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import chart1 from "./assets/chart1.png";
import chart2 from "./assets/chart2.png";
import chart3 from "./assets/chart3.png";

const FlexWrapper = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: space-around;
  gap: 16px;
`;

const SizedImage = styled(LinkedImage)<{ $width: number }>`
  display: block;
  width: ${({ $width }) => $width}px;
`;

const BEER_DATA = [
  {
    order: "1",
    pronunciation: "traveling group seven",
    beer: "Caravan",
    brewery: "Uinta",
  },
  {
    order: "2",
    pronunciation: "just juiced five eight",
    beer: "Fresh Squeezed",
    brewery: "Deschutes",
  },
  {
    order: "3",
    pronunciation: "angry seven",
    beer: "Furious",
    brewery: "Surly",
  },
  {
    order: "4",
    pronunciation: "sled dog breed five",
    beer: "Husky",
    brewery: "Alaskan",
  },
  {
    order: "5",
    pronunciation: "namesake of july six",
    beer: "Julius",
    brewery: "Tree House",
  },
  {
    order: "6",
    pronunciation: "noon food five",
    beer: "Lunch",
    brewery: "Maine",
  },
  {
    order: "7",
    pronunciation: "great indian king eight",
    beer: "Maharaja",
    brewery: "Avery",
  },
  {
    order: "8",
    pronunciation: "above you eight",
    beer: "Overhead",
    brewery: "Kane",
  },
  {
    order: "9",
    pronunciation: "unending nine",
    beer: "Perpetual",
    brewery: "Tröegs Independent",
  },
  {
    order: "10",
    pronunciation: "tree sap five",
    beer: "Resin",
    brewery: "Sixpoint",
  },
  {
    order: "11",
    pronunciation: "cosmic dirt five four",
    beer: "Space Dust",
    brewery: "Elysian",
  },
  {
    order: "12",
    pronunciation: "delicious five",
    beer: "Tasty",
    brewery: "Manhattan",
  },
  {
    order: "13",
    pronunciation: "pre-olympian five",
    beer: "Titan",
    brewery: "Great Divide",
  },
  {
    order: "14",
    pronunciation: "marine missile seven",
    beer: "Torpedo",
    brewery: "Sierra Nevada",
  },
  {
    order: "15",
    pronunciation: "not falsehood five",
    beer: "Truth",
    brewery: "Rhinegeist",
  },
  {
    order: "16",
    pronunciation: "great britain flag five four",
    beer: "Union Jack",
    brewery: "Firestone Walker",
  },
  {
    order: "17",
    pronunciation: "ancient swede six",
    beer: "Viking",
    brewery: "Ekim",
  },
  {
    order: "18",
    pronunciation: "twist suddenly six",
    beer: "Wrench",
    brewery: "Industrial Arts",
  },
];

const PHONEMES_DATA = [
  { order: "1", ipa: "/tɹu ve læŋ gɹɑp su vɑn/", vowels: "u e æ ɑ u ɑ" },
  { order: "2", ipa: "/d͡ʒist d͡ʒæst fɑv ut/", vowels: "i æ ɑ u" },
  { order: "3", ipa: "/oŋ gɹɑ sæ (...) vun/", vowels: "o ɑ æ ... u" },
  { order: "4", ipa: "/slɑd dog bɹɑd fæv/", vowels: "ɑ o ɑ æ" },
  { order: "5", ipa: "/nim sæk əv d͡ʒʌ lɑ sæks/", vowels: "i æ ə ʌ ɑ æ" },
  { order: "6", ipa: "/non fɑd (...) fuv/", vowels: "o ɑ … u" },
  { order: "7", ipa: "/gɹut en dæ ɑn kuŋ ɑt/", vowels: "u e æ ɑ u ɑ" },
  { order: "8", ipa: "/e buv jɑ æt/", vowels: "e u ɑ æ" },
  { order: "9", ipa: "/in un dæŋ nɑn/", vowels: "i u æ ɑ" },
  { order: "10", ipa: "/tɹo sɑp (...) fuv/", vowels: "o ɑ ... u" },
  { order: "11", ipa: "/kiz mɛk diɹt fuv fɑɹ/", vowels: "i ɛ i u ɑ" },
  { order: "12", ipa: "/dɑ loʃ ɑs fæv/", vowels: "ɑ o ɑ æ" },
  { order: "13", ipa: "/pɹu i lɛm pʌ ɑn fæv/", vowels: "u i ɛ ʌ ɑ æ" },
  { order: "14", ipa: "/mu ɹin mɛs ʌl sɑ væn/", vowels: "u i ɛ ʌ ɑ æ" },
  { order: "15", ipa: "/nit fuls hæd fɑv/", vowels: "i u æ ɑ" },
  { order: "16", ipa: "/gɹɛt bɹʌt ən flɛg fæv fɑɹ/", vowels: "ɛ ʌ ə ɛ æ ɑ" },
  { order: "17", ipa: "/on ʃɑnt swæd (...) suks/", vowels: "o ɑ æ ... u" },
  { order: "18", ipa: "/twist sɛ din lu sʌks/", vowels: "i ɛ i u ʌ" },
];

const EXTRACTION_DATA = [
  {
    brewery: "Tree House",
    order: "5",
    pronunciation: "/nim sæk əv d͡ʒʌ lɑ sæks/",
    vowels: "i æ ə ʌ ɑ æ",
    extraction: "/b/",
  },
  {
    brewery: "Sixpoint",
    order: "10",
    pronunciation: "/tɹo sɑp (...) fuv/",
    vowels: "o ɑ ... u",
    extraction: "/i/",
  },
  {
    brewery: "Ekim",
    order: "17",
    pronunciation: "/on ʃɑnt swæd (...) suks/",
    vowels: "o ɑ æ ... u",
    extraction: "/j/",
  },
  {
    brewery: "Uinta",
    order: "1",
    pronunciation: "/tɹu ve læŋ gɹɑp su vɑn/",
    vowels: "u e æ ɑ u ɑ",
    extraction: "/ɑ/",
  },
  {
    brewery: "Industrial Arts",
    order: "18",
    pronunciation: "/twist sɛ din lu sʌks/",
    vowels: "i ɛ i u ʌ",
    extraction: "/n/",
  },
  {
    brewery: "Great Divide",
    order: "13",
    pronunciation: "/pɹu i lɛm pʌ ɑn fæv/",
    vowels: "u i ɛ ʌ ɑ æ",
    extraction: "/s/",
  },
  {
    brewery: "Firestone Walker",
    order: "16",
    pronunciation: "/gɹɛt bɹʌt ən flɛg fæv fɑɹ/",
    vowels: "ɛ ʌ ə ɛ æ ɑ",
    extraction: "/e/",
  },
  {
    brewery: "Sierra Nevada",
    order: "14",
    pronunciation: "/mu ɹin mɛs ʌl sɑ væn/",
    vowels: "u i ɛ ʌ ɑ æ",
    extraction: "/s/",
  },
  {
    brewery: "Avery",
    order: "7",
    pronunciation: "/gɹut en dæ ɑn kuŋ ɑt/",
    vowels: "u e æ ɑ u ɑ",
    extraction: "/ɑ/",
  },
  {
    brewery: "Elysian",
    order: "11",
    pronunciation: "/kiz mɛk diɹt fuv fɑɹ/",
    vowels: "i ɛ i u ɑ",
    extraction: "/ŋ/",
  },
  {
    brewery: "Kane",
    order: "8",
    pronunciation: "/e buv jɑ æt/",
    vowels: "e u ɑ æ",
    extraction: "/ɔ/",
  },
  {
    brewery: "Alaskan",
    order: "4",
    pronunciation: "/slɑd dog bɹɑd fæv/",
    vowels: "ɑ o ɑ æ",
    extraction: "/ɹ/",
  },
  {
    brewery: "Surly",
    order: "3",
    pronunciation: "/oŋ gɹɑ sæ (...) vun/",
    vowels: "o ɑ æ ... u",
    extraction: "/j/",
  },
  {
    brewery: "Deschutes",
    order: "2",
    pronunciation: "/d͡ʒist d͡ʒæst fɑv ut/",
    vowels: "i æ ɑ u",
    extraction: "/u/",
  },
  {
    brewery: "Rhinegeist",
    order: "15",
    pronunciation: "/nit fuls hæd fɑv/",
    vowels: "i u æ ɑ",
    extraction: "/z/",
  },
  {
    brewery: "Maine",
    order: "6",
    pronunciation: "/non fɑd (...) fuv/",
    vowels: "o ɑ ... u",
    extraction: "/i/",
  },
  {
    brewery: "Manhattan",
    order: "12",
    pronunciation: "/dɑ loʃ ɑs fæv/",
    vowels: "ɑ o ɑ æ",
    extraction: "/ɹ/",
  },
  {
    brewery: "Tröegs Independent",
    order: "9",
    pronunciation: "/in un dæŋ nɑn/",
    vowels: "i u æ ɑ",
    extraction: "/z/",
  },
];

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 0 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is provided as 18 rows of audio files, and an image of draft
        beer taps featuring 18 different brewing companies’ logos. The audio
        files feature someone very carefully enunciating nonsense-sounding
        syllables. Phonetic IPA transcriptions are included for accessibility.
      </p>
      <p>It is helpful to realize that IPA is a common acronym for both:</p>
      <ul>
        <li>
          International Phonetic Alphabet, the linguistics standard for
          Latin-alphabet-centric human users to write and read phonetic
          transcriptions of human speech
        </li>
        <li>India Pale Ale, a common type of beer.</li>
      </ul>
      <p>
        One major part of this puzzle uses IPA beers and the other part uses
        phonetic IPA.
      </p>
      <h3>IPA beers: using the consonant data, solve clues to beer names</h3>
      <p>
        Solvers may notice that there are quite a few consonantal repetitions
        amongst the final 1-2 syllables of each row, with especially “f*v” and
        “f*r” showing up many times. If you ignore the vowels and just pay
        attention to the consonants, these ending words sound similar to saying
        various integers in the 1-10 range, e.g. “saa-van” → seven, “foov” →
        five, or “tunn” → ten. (Note: Vowels do not necessarily differ 100% of
        the time from the word’s correct pronunciation.)
      </p>
      <p>
        Sounding out each clue in its entirety, one can contextually figure out
        a “correct” sounding pronunciation, preserving the consonants and
        ignoring the vowels, that forms an enumerated clue. For example, the
        clue that sounds like “true vey lang gropp soo vonn” can be corrected to
        “traveling group seven”, which clues CARAVAN.
      </p>
      <p>
        However, some clues are too ambiguous to solve without additional
        constraints. For example, the clue sounding like “dah loash oss fahv”
        has many possible answers.
      </p>
      <p>
        Returning to the beer theme, every clue points to an IPA-style beer
        produced by one of the provided breweries. With this constraint, we can
        map audio files 1:1 with breweries. Solvers will also find that the beer
        names are ordered alphabetically.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Audio file #</th>
            <th>“Corrected” clue pronunciation</th>
            <th>IPA beer name</th>
            <th>Brewery</th>
          </tr>
          {BEER_DATA.map(({ order, pronunciation, beer, brewery }, i) => (
            <tr key={`beer-${i}`}>
              <td>{order}</td>
              <td>{pronunciation}</td>
              <td>{beer}</td>
              <td>{brewery}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <h3>Phonetic IPA: extract phonemes by charting vowels</h3>
      <p>
        Recall that the pronunciations were broken up syllabically (one vowel
        per syllable), and that the original vowels in the audio files were
        never used in solving the “corrected” clues in the previous section.
        Here are the phonetic IPA transcriptions and their vowels.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Audio file #</th>
            <th>IPA transcription</th>
            <th>IPA vowels</th>
          </tr>
          {PHONEMES_DATA.map(({ order, ipa, vowels }, i) => (
            <tr key={`phonemes-${i}`}>
              <td>{order}</td>
              <td>{ipa}</td>
              <td>{vowels}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        <i>
          In the rightmost column, (...) denotes where the audio is split into
          multiple pieces.
        </i>
      </p>
      <p>
        IPA vowels are visualized on a 2D chart where one axis represents how
        far forward/back the vowel resonates in your vocal tract, and the other
        axis represents the embouchure of how open/closed one’s mouth is.
        Different renditions of the chart may vary in aspect ratio, but the
        relative positions of the vowels are consistent. This particular chart
        is from{" "}
        <a
          href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet_chart"
          target="_blank"
          rel="noreferrer"
        >
          Wikipedia
        </a>
        .
      </p>
      <FlexWrapper>
        <SizedImage
          $width={500}
          src={chart1}
          alt="The IPA General American vowel chart"
        />
      </FlexWrapper>
      <p>
        The flavor text clues “an incomprehensible chart that someone has drawn
        symbols on”. If you play connect-the-dots with each audio clip’s vowels
        on the IPA vowel chart, you will get something that looks like another
        IPA phoneme! When the audio is split across multiple files, it denotes
        picking up the pen to start a new stroke, as shown in the /k/ drawing
        below.
      </p>
      <FlexWrapper>
        <SizedImage
          $width={400}
          src={chart2}
          alt="The IPA General American vowel chart, with a lowercase letter d drawn on top with straight lines, connect-the-dots style"
        />
        <SizedImage
          $width={400}
          src={chart3}
          alt="The IPA General American vowel chart, with a lowercase letter k drawn on top with straight lines, connect-the-dots style"
        />
      </FlexWrapper>
      <p>
        <i>
          Note: The green circles on these charts represent the GAE (General
          American English) subset, which this puzzle’s pronunciations and data
          have been restricted to a further subset of. It is not necessary for
          solvers to realize that the data is restricted to the GAE subset of
          IPA; the visualization was just used for clarity during our
          construction process.
        </i>
      </p>
      <p>
        After drawing a phoneme from each audio file, reorder the data by the
        beer taps from the image.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Brewery</th>
            <th>Audio file #</th>
            <th>IPA transcription</th>
            <th>Vowels from audio</th>
            <th>IPA phoneme “drawn” on chart</th>
          </tr>
          {EXTRACTION_DATA.map(
            ({ brewery, order, pronunciation, vowels, extraction }, i) => (
              <tr key={`extraction-${i}`}>
                <td>{brewery}</td>
                <td>{order}</td>
                <td>{pronunciation}</td>
                <td>{vowels}</td>
                <td>{extraction}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        This yields the IPA gloss <Mono>/bijɑnsesɑŋɔɹjuziɹz/</Mono>.
      </p>
      <p>
        Sounding it out loud: <Mono>BEYONCE SONG OR USE EARS</Mono>.
      </p>
      <p>
        The final answer is <PuzzleAnswer>LISTEN</PuzzleAnswer>.
      </p>
      <h3>Author’s note</h3>
      <p>
        Phonotactics fun fact: Just because a syllable uses a dialect’s phonemes
        doesn’t mean it can be pronounced in that dialect; for example, try
        saying /mji/ (“myee”). We had to be careful about which vowels we were
        swapping around.
      </p>
      <p>
        rfong: I was totally incompetent at IPA vowel transcription when we
        first started developing this puzzle, despite coming up with the idea.
        So I trained to get better at constructing and proofing data for this
        puzzle by playing IPA Wordle variants every day for months! If you liked
        this puzzle (or at least liked its concept), you may enjoy{" "}
        <a href="https://heardle.glitch.me/" target="_blank" rel="noreferrer">
          Heardle
        </a>{" "}
        and{" "}
        <a
          href="https://nascl.rc.nau.edu/gramle/"
          target="_blank"
          rel="noreferrer"
        >
          Gramle
        </a>
        .
      </p>
      <p>
        Our original concept for this puzzle was: “Two whales are at a bar. One
        says: [vowel noises]”, and we were going to dress up as whales. We were
        really attached to the whale idea but couldn’t figure out how to bring
        them into the current iteration of the puzzle.
      </p>
      <p>
        Thanks especially to Hubert for helping push us to make a more
        interesting puzzle!
      </p>
      <h3>Asset attribution</h3>
      <p>
        The{" "}
        <a
          href="https://www.freepik.com/free-vector/beer-taps-with-black-handles-realistic-equipment_33891868.htm"
          target="_blank"
          rel="noreferrer"
        >
          beer tap vector image
        </a>{" "}
        was designed by{" "}
        <a
          href="https://www.freepik.com/author/upklyak"
          target="_blank"
          rel="noreferrer"
        >
          upklyak on Freepik
        </a>
        .
      </p>
    </>
  );
};

export default Solution;
