import React from "react";
import { styled } from "styled-components";

const ALL_HAIKU: [string, string, string][] = [
  [
    "cacti cannot speak",
    "but this one does, screaming “Bollocks!”",
    "behind a dragon (1)",
  ],
  [
    "black and white aliens",
    "one pointing in the distance",
    "one seated to look (2)",
  ],
  [
    "lady liberty",
    "belongs in this spot, her torch",
    "literally electrical (2)",
  ],
  ["she gazes upward", "two tigers swimming—or flying—", "a zodiac sign (4)"],
  [
    "green hair, green guitar",
    "she and her blue ladies sing",
    "“dear to me heart” (4)",
  ],
  [
    "cacti cannot speak",
    "so this one holds up a sign",
    "offering prickly hugs (3)",
  ],
  [
    "cacti cannot speak",
    "but if you draw a mouth, they’ll",
    "ask for a slaughterhouse five (3)",
  ],
  ["seems like ant man", "is now a postman, bearing", "mail for MIT (2)"],
  [
    "hissing snake lunges,",
    "topples a communications tower",
    "it just lost the game (2)",
  ],
  [
    "birdman wields a flare",
    "in backwards cap and jersey",
    "calling twice, “boldly go!” (4)",
  ],
  [
    "mechanical heart",
    "does she hold life or machine?",
    "gasoline streams through the cracks (1)",
  ],
  [
    "amid purple hair",
    "computer bugs captivate them",
    "one face blue, one red (6)",
  ],
  ["above the human", "made of cells and intestines", "hairs grow on a (2)"],
  ["huge donkey looms", "behind red rooster brooding", "in cookery nest (2)"],
  [
    "hair in two pigtails",
    "she finds warmth and comfort in",
    "her puffy purple coat (2)",
  ],
  ["eight-armed creature—", "a purple cephalopod?—", "floats above a fox (5)"],
  ["ignoring HIPAA", "patient info in clear view", "weight: five tons (1)"],
  [
    "heap of soda cans",
    "crushed caffeine, then crushed metal",
    "casts a tired dice (2)",
  ],
  [
    "cacti cannot speak",
    "nor can they steer a horse",
    "globs of water, spilled (10)",
  ],
  [
    "the galaxy center",
    "colored in muted red tones",
    "not so true to life (2)",
  ],
  [
    "behind an island,",
    "volcano-backed whale swims",
    "through the inky void (6)",
  ],
  [
    "a cape full of moons",
    "and a moon sword; pocket calculator",
    "reads eight twenty-five (3)",
  ],
  [
    "trapped in a sandglass",
    "a fallen emoji glowers",
    "and sticks out its tongue (3)",
  ],
];

const LAST_HAIKU: [string, string, string] = [
  "yet unexamined",
  "____  ____  ____  ____  ____  ____",
  "the answer you seek",
];

export const Haiku = styled.p<{ $indent: boolean; $margin?: number }>`
  margin-left: ${({ $indent }) => ($indent ? 80 : 0)}px;
  margin-top: ${({ $margin }) => $margin ?? 1}em;
`;

const FlavorText = styled.p`
  margin-bottom: 2em;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <FlavorText className="puzzle-flavor">
        underneath Ames Street / hidden artwork captivates / from top to bottom
      </FlavorText>
      {ALL_HAIKU.map(([line1, line2, line3], index) => (
        <Haiku key={index} $indent={index % 2 === 1}>
          {line1}
          <br />
          {line2}
          <br />
          {line3}
        </Haiku>
      ))}
      <Haiku $indent={false} $margin={3}>
        {LAST_HAIKU[0]}
        <br />
        {LAST_HAIKU[1]}
        <br />
        {LAST_HAIKU[2]}
      </Haiku>
    </>
  );
};

export default Puzzle;
