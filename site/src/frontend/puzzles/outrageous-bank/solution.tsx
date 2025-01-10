import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const DATA = [
  ["English", "https://www.youtube.com/watch?v=Mx8s6ZACZFU"],
  ["French", "https://www.youtube.com/watch?v=6GsPLAslPIA"],
  ["Romanian", "https://www.youtube.com/watch?v=-zVSIPxJRIw"],
  ["Catalan", "https://www.youtube.com/watch?v=jOupGCVtLhw"],
  ["Spanish", "https://www.youtube.com/watch?v=dhsy6epaJGs"],
  ["Italian", "https://www.youtube.com/watch?v=juqyzgnbspY"],
  ["German", "https://www.youtube.com/watch?v=tjBCjfB3Hq8"],
  ["Dutch", "https://www.youtube.com/watch?v=HnWZnrkh3FI"],
];

const EXTRACTION_TABLE = [
  [
    "M",
    "Romanian",
    "Goat",
    "MEEE",
    "MEME",
    "O idee care se răspândește prin imitație în cadrul unui grup social",
    "Meme",
    "An idea that spreads through imitation within a social group",
  ],
  [
    "A",
    "Catalan",
    "Turkey",
    "GLÚ GLÚ GLÚ",
    "GLA",
    "Llavor d'alzina",
    "Acorn",
    "Oak seed",
  ],
  [
    "K",
    "German",
    "Tractor",
    "BRUMM",
    "KRUMM",
    "Nicht gerade, in Form",
    "Crooked",
    "Not straight in shape",
  ],
  [
    "E",
    "French",
    "Bull",
    "MUU",
    "MUE",
    "Perte périodique de plumes ou d'une couche externe",
    "Molt",
    "Periodic loss of feathers or an outer layer",
  ],
  [
    "V",
    "Italian",
    "Lamb",
    "BEEE",
    "BEVE",
    "Cosa si fa quando si ha sete",
    "Drink",
    "What one does when one is thirsty",
  ],
  [
    "I",
    "Romanian",
    "Pigeon",
    "GRU GRU",
    "GRI",
    "Culoare între alb și negru",
    "Grey",
    "Color between white and black",
  ],
  [
    "D",
    "Spanish",
    "Cat",
    "MIAO",
    "MIDO",
    "Lo que hago dos veces para cortar una vez",
    "I measure",
    "What I do twice to cut once",
  ],
  [
    "E",
    "Spanish",
    "Chick",
    "PIO",
    "PIE",
    "Doce pulgadas",
    "Foot",
    "Twelve inches",
  ],
  [
    "O",
    "English",
    "Goat",
    "MAH",
    "MAO",
    "Founder of the PRC",
    "Mao",
    "Founder of the PRC",
  ],
  [
    "I",
    "Spanish",
    "Cow",
    "MOO",
    "MIO",
    "Lo que no es tuyo",
    "Mine",
    "What is not yours",
  ],
  [
    "N",
    "Romanian",
    "Dog",
    "HAM HAM",
    "HAN",
    "Loc pitoresc pentru cazare și mic dejun",
    "Inn",
    "Picturesque place for bed and breakfast",
  ],
  [
    "O",
    "French",
    "Bull",
    "MUU",
    "MOU",
    "Cède facilement au toucher",
    "Soft",
    "Yields easily to touch",
  ],
  [
    "T",
    "Italian",
    "Cow",
    "MOOO",
    "MOTO",
    "Termine breve per un potente veicolo a due ruote",
    "Motorcycle",
    "Short word for a powerful two-wheeled vehicle",
  ],
  [
    "H",
    "English",
    "Turkey",
    "GOBBLE GOBBLE",
    "HOBBLE",
    "Limp",
    "Hobble",
    "Limp",
  ],
  [
    "E",
    "Catalan",
    "Chick",
    "PIU",
    "PEU",
    "Unitat bàsica de vers",
    "Foot",
    "Basic unit of verse",
  ],
  [
    "R",
    "Dutch",
    "Tractor",
    "BROEM",
    "BROER",
    "Hij is niet je zus",
    "Brother",
    "He is not your sister",
  ],
  [
    "L",
    "Spanish",
    "Rooster",
    "COCOROCO",
    "COCO LOCO",
    "Cóctel playero colombiano con tres licores",
    "Coco Loco",
    "Colombian beach cocktail with three liquors",
  ],
  [
    "A",
    "Dutch",
    "Hen",
    "TOK TOK",
    "TAK",
    "Een deel van een boom of struik",
    "Branch",
    "A part of a tree or shrub",
  ],
  [
    "N",
    "French",
    "Chick",
    "PIOU",
    "PION",
    "La pièce d'échecs la moins puissante",
    "Pawn",
    "The least powerful chess piece",
  ],
  [
    "G",
    "English",
    "Cat",
    "MEW",
    "MEG",
    "Nickname for Margaret",
    "Meg",
    "Nickname for Margaret",
  ],
  [
    "U",
    "German",
    "Pigeon",
    "GURR",
    "GURU",
    "Spirituell Lehrer",
    "Guru",
    "Spiritual teacher",
  ],
  ["A", "English", "Chick", "CHEEP", "CHEAP", "Tawdry", "Cheap", "Tawdry"],
  [
    "G",
    "Dutch",
    "Hen",
    "TOK TOK",
    "GOK",
    "Een keuze zonder het juiste antwoord te weten",
    "Guess",
    "A choice without knowing the right answer",
  ],
  [
    "E",
    "Catalan",
    "Bull",
    "MUU",
    "MEU",
    "Pertànyent a mi",
    "Mine",
    "Belonging to me",
  ],
];

const StyledTable = styled.table`
  border-collapse: collapse;
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

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle references a series of youtube videos known as “Pulcino Pio”
        (Little Chick Cheep). These videos basically showcase a series of
        animals and highlight the noises that they make in different languages.
        For solvers that are not familiar with the songs, an image search of the
        images should find the videos. Audio identifier programs are also
        capable of identifying the instrumental version of the song.
      </p>
      <p>
        General Youtube channel:{" "}
        <a
          href="https://www.youtube.com/@pulcinopiotv/playlists"
          target="_blank"
          rel="noreferrer"
        >
          https://www.youtube.com/@pulcinopiotv/playlists
        </a>
        <ul>
          {DATA.map(([language, href], i) => (
            <li key={i}>
              {language}:{" "}
              <a href={href} target="_blank" rel="noreferrer">
                {href}
              </a>
            </li>
          ))}
        </ul>
        <p>
          The puzzle is a short movie that uses footage of the animals from the
          videos. On top of each animal is a clue phrase written in one of the
          languages. Solving the clue phrase will give you a word in the same
          language that is one letter off from the sound that that animal makes
          in that language (as spelled in the videos). Reading off these letters
          provides the instruction to <Mono>MAKE VIDEO IN OTHER LANGUAGE</Mono>.
        </p>
        <p>
          When solvers sent in a video of them performing the final chorus of
          the song in a language not used in this puzzle, they were provided
          with the final answer, <PuzzleAnswer>HEREFORD CATTLE</PuzzleAnswer>.
        </p>
        <HScrollTableWrapper>
          <StyledTable>
            <tr>
              <th></th>
              <th>Language</th>
              <th>Animal</th>
              <th>Video Sound</th>
              <th>Word</th>
              <th>Clue</th>
              <th>Translated Word</th>
              <th>Translated Clue</th>
            </tr>
            {EXTRACTION_TABLE.map(
              (
                [
                  extraction,
                  language,
                  animal,
                  sound,
                  word,
                  clue,
                  translatedWord,
                  translatedClue,
                ],
                i,
              ) => (
                <tr key={i}>
                  <td>{extraction}</td>
                  <td>{language}</td>
                  <td>{animal}</td>
                  <td>{sound}</td>
                  <td>{word}</td>
                  <td>{clue}</td>
                  <td>{translatedWord}</td>
                  <td>{translatedClue}</td>
                </tr>
              ),
            )}
          </StyledTable>
        </HScrollTableWrapper>
      </p>
    </>
  );
};

export default Solution;
