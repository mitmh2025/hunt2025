import React from "react";

const STANZAS = [
  [
    "Nine little rikishi went out to eat one day",
    "To talk about their greatest deeds—or one deed, anyway.",
    "A great success, a special score, that really cleared the bar:",
    "Each one shared the story of how he earned a gold star!",
  ],
  [
    "“I was first of all,” said Toyonoshima, “you know?",
    "A proper push was all it took that day in Tokyo.",
    "Others might have followed but I know they can’t compare",
    "I shoved him out and set the pace and earned my bit of flair!”",
  ],
  [
    "“Oh sure,” said Takayasu, “you came seven years before,",
    "But did you get two in one week? I did, that’s so much more!",
    "Three days after number one, I knocked him all askew",
    "He stumbled and, with one good slap, he gave me number two!”",
  ],
  [
    "“I remember BOTH of mine,” said Endo impishly.",
    "(His eight companions only got one off of him, you see.)",
    "“My first was such a special day, a force-out to behold,",
    "And just like that, beside my name, a little bit of gold!”",
  ],
  [
    "“My gold star is bittersweet,” said Arawashi, sad.",
    "“A second in three days, I thought, how could that turn out bad?",
    "But soon with Ls and injuries, I rarely felt success.",
    "My gold star over him was my professional apex.”",
  ],
  [
    "Takanoiwa spoke up.  “Cheer up, my friend, and see:",
    "I beat him just days after you, a special victory.",
    "For all the others lost to him so many, many times.",
    "You and I were unbeaten against him in his prime!”",
  ],
  [
    "“All right, all right,” said Abi now, “I lost against him plenty.",
    "But my first time against him, I had the strength of twenty!",
    "While clad in red I pushed him out and sent him off the side.",
    "Those future losses can’t undo my golden bit of pride.”",
  ],
  [
    "“I beat him in Nagoya,” Ichinojo reminisced, ",
    "“I grabbed him and I held on ‘til he just could not resist.",
    "I shoved him back and forced him out, and zabutons rained down,",
    "It helped that I outweighed him by a hundred fifty pounds!”",
  ],
  [
    "“Five days later, I beat him,” said Kotoshogiku,",
    "“Our sixty-third face-off, in fact; the last that we would do.",
    "I took a handful of our fights during our long careers,",
    "But only this one came with a gold star to bring me cheer.”",
  ],
  [
    "“After me,” Daieisho said, “he gave out just three more.",
    "I got in before age and injuries had shut the door.",
    "Don’t get me wrong, he was a threat on every single day:",
    "That month in Fukuoka, fourteen others he did slay.”",
  ],
  [
    "And now it’s done, their stories fade to echoes off the walls,",
    "The triumphs and the glories, before tragedies and falls.",
    "And after they engage in every athlete’s favorite hobby,",
    "They sit down at the table to enjoy some chankonabe.",
  ],
  [
    "Daieisho then Takayasu, Arawashi too;",
    "Toyonoshima and Ichinojo then ensue.",
    "Abi follows them, and then it’s Kotoshogiku,",
    "Endo and Takanoiwa polish off the stew.",
  ],
  [
    "It’s nice to walk down Memory Lane, to think of victory banners, ",
    "Though they are not the only ones with prestige in this manner!",
    "As nine of—how many was it again?—relax inside this bar,",
    "They each remember what they did to earn their gold star.",
  ],
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      {STANZAS.map((stanza, i) => (
        <p key={i}>
          {stanza.map((line, j) => (
            <React.Fragment key={j}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      ))}
    </>
  );
};

export default Puzzle;
