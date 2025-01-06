import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import map from "./assets/map.png";
import note from "./assets/note.png";

const BENCH_DATA = [
  {
    location: "Outside 1-390",
    bench: "欠",
    trans_bench: "LACK",
    rad1: "瓦",
    ans1: "blank TILE",
    rad2: "二",
    ans2: "it takes TWO",
    composed: "瓷",
    translation: "PORCELAIN",
    bird: "chiCkadee",
    letter: "C",
  },
  {
    location: "Outside 1-132",
    bench: "金",
    trans_bench: "GOLD",
    rad1: "夕",
    ans1: "EVENING news",
    rad2: "口",
    ans2: "smash MOUTH",
    composed: "銘",
    translation: "INSCRIPTION",
    bird: "wateRthrush",
    letter: "R",
  },
  {
    location: "2nd floor stairwell at 1/5 intersection",
    bench: "艸",
    trans_bench: "GRASS",
    rad1: "几",
    ans1: "pivot TABLE",
    rad2: "又",
    ans2: "think AGAIN",
    composed: "芟",
    translation: "SCYTHE",
    bird: "whYdah",
    letter: "Y",
  },
  {
    location: "Outside Hart Gallery in 5-1",
    bench: "頁",
    trans_bench: "LEAF",
    rad1: "米",
    ans1: "RICE university",
    rad2: "犬",
    ans2: "hot DOG",
    composed: "類",
    translation: "CLASS",
    bird: "gooSe",
    letter: "S",
  },
  {
    location: "South side of lobby 7 3rd floor",
    bench: "豸",
    trans_bench: "BADGER",
    rad1: "土",
    ans1: "EARTH angel",
    rad2: "艮",
    ans2: "without STOPPING",
    composed: "墾",
    translation: "CULTIVATE",
    bird: "antThrush",
    letter: "T",
  },
  {
    location: "Outside Pappalardo Labs north entrance",
    bench: "廴",
    trans_bench: "LONG STRIDE",
    rad1: "毛",
    ans1: "FUR coat",
    rad2: "聿",
    ans2: "BRUSH with fate",
    composed: "毽",
    translation: "SHUTTLECOCK",
    bird: "blackthrOat",
    letter: "O",
  },
  {
    location: "Door to President’s Courtyard from 10-0",
    bench: "虫",
    trans_bench: "INSECT",
    rad1: "弓",
    ans1: "BOW tie",
    rad2: "厶",
    ans2: "PRIVATE sector",
    composed: "強",
    translation: "STRONG",
    bird: "oriOle",
    letter: "O",
  },
  {
    location: "Between 10-485 and Edgerton Alley",
    bench: "木",
    trans_bench: "TREE",
    rad1: "魚",
    ans1: "FISH and chips",
    rad2: "曰",
    ans2: "SAY you love me",
    composed: "櫓",
    translation: "SCULL",
    bird: "quaiL",
    letter: "L",
  },
  {
    location: "8-3 infinite near entrance to 6-C",
    bench: "斤",
    trans_bench: "AXE",
    rad1: "車",
    ans1: "shopping CART",
    rad2: "日",
    ans2: "the whale and the rising SUN",
    composed: "暫",
    translation: "TEMPORARY",
    bird: "antPecker",
    letter: "P",
  },
  {
    location: "Lobby at 6-1 entrance from Eastman Court",
    bench: "王",
    trans_bench: "JADE",
    rad1: "火",
    ans1: "FIRE extinguisher",
    rad2: "白",
    ans2: "WHITE house",
    composed: "煌",
    translation: "BRILLIANT",
    bird: "spInebill",
    letter: "I",
  },
  {
    location: "2-3 Stairwell next to Chord sculpture",
    bench: "糸",
    trans_bench: "SILK",
    rad1: "子",
    ans1: "destiny’s CHILD",
    rad2: "丿",
    ans2: "forward SLASH",
    composed: "孫",
    translation: "GRANDCHILD",
    bird: "shelDgoose",
    letter: "D",
  },
  {
    location: "Building 2 entrance from Killian near 2-135",
    bench: "癶",
    trans_bench: "FOOTSTEPS",
    rad1: "木",
    ans1: "palm TREE",
    rad2: "豆",
    ans2: "pinto BEAN",
    composed: "橙",
    translation: "ORANGE",
    bird: "chouGh",
    letter: "G",
  },
  {
    location: "Outside 2-255",
    bench: "⼑",
    trans_bench: "KNIFE",
    rad1: "食",
    ans1: "let them EAT cake",
    rad2: "臼",
    ans2: "brick and MORTAR",
    composed: "餡",
    translation: "FILLING",
    bird: "bIttern",
    letter: "I",
  },
  {
    location: "Outside 2-380",
    bench: "言",
    trans_bench: "SPEECH",
    rad1: "身",
    ans1: "student BODY",
    rad2: "寸",
    ans2: "hedwig and the angry INCH",
    composed: "謝",
    translation: "THANK",
    bird: "stiNt",
    letter: "N",
  },
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  th,
  td {
    border: solid black;
    padding: 0 8px;
  }
`;

const CenteredDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        After developing all the pictures, solvers notice that each picture
        portrays Katrina at a specific location within the MIT campus main
        group. Some photos depict Katrina next to specific benches; these can be
        used to form 14 groups of 3 pictures each—one at the bench and two
        approaching the bench.
      </p>

      <p>
        Some photos depict Katrina reaching under the bench; if solvers decide
        to follow her lead and investigate under the benches, they’ll find a
        note taped to the underside of the bench. When the meta page unlocks,
        this is made more explicit as the flavor tells solvers to “get out there
        and find what she left at the dead drops!”
      </p>

      <p>
        In the notes, the agent codename is always a bird, and the signature is
        always three rectangles(ish) stacked in various ways; the messages
        themselves are story snippets that help reveal that Katrina’s been
        probing a wide network of informants.
      </p>

      <p>Example note:</p>

      <CenteredDiv>
        <LinkedImage
          src={note}
          alt="A handwritten note that says: WHYDAH— Papa’s mad. REAL mad. Watch yer back, lassie. The signature is three vertically-stacked boxes."
        />
      </CenteredDiv>

      <p>
        Separately, solvers may realize that each answer word contains exactly
        one Kangxi radical (e.g., Hedwig and the Angry INCH); this is lightly
        clued by the name of the meta (Chinatown) and more strongly clued in
        conjunction with the rectangles in the signatures, which illustrate how
        the three radicals in a group can be composed into a single character.
        The primary translation of each character is the same length as the bird
        name and shares exactly one letter.
      </p>

      <AuthorsNoteBlock>
        <h2>Notes on composition and translation</h2>
        <p>
          Some of the radicals used in these character compositions differ
          between traditional and simplified Chinese; the “traditional photos”
          in the flavor text indicates that traditional Chinese is to be used
          for this puzzle.
        </p>

        <p>
          Because exact 1-to-1 translation is tricky, solvers might sometimes
          use tools that give alternate translations or synonyms; there is only
          one translation for each character for which the mechanic could apply.
          Several of the translations are unique to aid in identifying the
          mechanic.
        </p>
      </AuthorsNoteBlock>

      <CenteredDiv>
        <LinkedImage
          src={map}
          alt="A map of MIT’s main group with dots at benches with notes and arrows indicating auxiliary location photos, color coded by floor."
        />
      </CenteredDiv>

      <p>
        In the above image, each grouping of two arrows plus a circle shows the
        groups of the photos of Katrina. In each group, the circle represents
        the bench, and the two arrows show the location+direction of Katrina in
        the other two photos in the group.
      </p>

      <p>
        Read in a horseshoe starting at the tip of building 1 and ending at the
        tip of building 2, the extracted letter gives{" "}
        <PuzzleAnswer>CRY STOOL PIDGIN</PuzzleAnswer>, which is what solvers
        need to do to indicate to Katrina that they know she’s a police
        informant.
      </p>

      <p>
        A table of the radicals, birds, and character compositions with English
        translation is provided below in east-to-west order.
      </p>

      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Location</th>
            <th colSpan={2}>Bench Radical</th>
            <th colSpan={4}>Location Radicals</th>
            <th colSpan={2}>Composed Character</th>
            <th>Bird From Note</th>
            <th></th>
          </tr>

          {BENCH_DATA.map(
            (
              {
                location,
                bench,
                trans_bench,
                rad1,
                ans1,
                rad2,
                ans2,
                composed,
                translation,
                bird,
                letter,
              },
              i,
            ) => (
              <tr key={`bench-${i}`}>
                <td>{location}</td>
                <td>{bench}</td>
                <td>{trans_bench}</td>
                <td>{rad1}</td>
                <td>{ans1}</td>
                <td>{rad2}</td>
                <td>{ans2}</td>
                <td>{composed}</td>
                <td>
                  <Mono>{translation}</Mono>
                </td>
                <td>
                  <Mono>{bird}</Mono>
                </td>
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
