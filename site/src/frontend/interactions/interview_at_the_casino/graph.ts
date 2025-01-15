import billie from "../assets/billie.png";
import { type InteractionGraph } from "../types";
import audio_mp3_1_p1 from "./audio/mp3/1-p1.mp3";
import audio_mp3_1 from "./audio/mp3/1.mp3";
import audio_mp3_10a_p1 from "./audio/mp3/10a-p1.mp3";
import audio_mp3_10a from "./audio/mp3/10a.mp3";
import audio_mp3_10b_p1 from "./audio/mp3/10b-p1.mp3";
import audio_mp3_10b from "./audio/mp3/10b.mp3";
import audio_mp3_11_perfect_p1 from "./audio/mp3/11-perfect-p1.mp3";
import audio_mp3_11_perfect_p2 from "./audio/mp3/11-perfect-p2.mp3";
import audio_mp3_11_perfect_p3 from "./audio/mp3/11-perfect-p3.mp3";
import audio_mp3_11_perfect from "./audio/mp3/11-perfect.mp3";
import audio_mp3_11_strong_p1 from "./audio/mp3/11-strong-p1.mp3";
import audio_mp3_11_strong_p2 from "./audio/mp3/11-strong-p2.mp3";
import audio_mp3_11_strong from "./audio/mp3/11-strong.mp3";
import audio_mp3_11_weak_p1 from "./audio/mp3/11-weak-p1.mp3";
import audio_mp3_11_weak_p2 from "./audio/mp3/11-weak-p2.mp3";
import audio_mp3_11_weak_p3 from "./audio/mp3/11-weak-p3.mp3";
import audio_mp3_11_weak_p4 from "./audio/mp3/11-weak-p4.mp3";
import audio_mp3_11_weak from "./audio/mp3/11-weak.mp3";
import audio_mp3_11 from "./audio/mp3/11.mp3";
import audio_mp3_2a_p1 from "./audio/mp3/2a-p1.mp3";
import audio_mp3_2a_p2 from "./audio/mp3/2a-p2.mp3";
import audio_mp3_2a_p3 from "./audio/mp3/2a-p3.mp3";
import audio_mp3_2a from "./audio/mp3/2a.mp3";
import audio_mp3_2b_p1 from "./audio/mp3/2b-p1.mp3";
import audio_mp3_2b from "./audio/mp3/2b.mp3";
import audio_mp3_3a_p1 from "./audio/mp3/3a-p1.mp3";
import audio_mp3_3a from "./audio/mp3/3a.mp3";
import audio_mp3_3b_p1 from "./audio/mp3/3b-p1.mp3";
import audio_mp3_3b_p2 from "./audio/mp3/3b-p2.mp3";
import audio_mp3_3b from "./audio/mp3/3b.mp3";
import audio_mp3_4a_p1 from "./audio/mp3/4a-p1.mp3";
import audio_mp3_4a_p2 from "./audio/mp3/4a-p2.mp3";
import audio_mp3_4a from "./audio/mp3/4a.mp3";
import audio_mp3_4b_p1 from "./audio/mp3/4b-p1.mp3";
import audio_mp3_4b_p2 from "./audio/mp3/4b-p2.mp3";
import audio_mp3_4b from "./audio/mp3/4b.mp3";
import audio_mp3_5a_p1 from "./audio/mp3/5a-p1.mp3";
import audio_mp3_5a_p2 from "./audio/mp3/5a-p2.mp3";
import audio_mp3_5a from "./audio/mp3/5a.mp3";
import audio_mp3_5b_p1 from "./audio/mp3/5b-p1.mp3";
import audio_mp3_5b_p2 from "./audio/mp3/5b-p2.mp3";
import audio_mp3_5b from "./audio/mp3/5b.mp3";
import audio_mp3_6a_p1 from "./audio/mp3/6a-p1.mp3";
import audio_mp3_6a from "./audio/mp3/6a.mp3";
import audio_mp3_6b_p1 from "./audio/mp3/6b-p1.mp3";
import audio_mp3_6b from "./audio/mp3/6b.mp3";
import audio_mp3_7a_p1 from "./audio/mp3/7a-p1.mp3";
import audio_mp3_7a_p2 from "./audio/mp3/7a-p2.mp3";
import audio_mp3_7a from "./audio/mp3/7a.mp3";
import audio_mp3_7b_p1 from "./audio/mp3/7b-p1.mp3";
import audio_mp3_7b_p2 from "./audio/mp3/7b-p2.mp3";
import audio_mp3_7b from "./audio/mp3/7b.mp3";
import audio_mp3_8a_p1 from "./audio/mp3/8a-p1.mp3";
import audio_mp3_8a from "./audio/mp3/8a.mp3";
import audio_mp3_8b_p1 from "./audio/mp3/8b-p1.mp3";
import audio_mp3_8b from "./audio/mp3/8b.mp3";
import audio_mp3_9a_p1 from "./audio/mp3/9a-p1.mp3";
import audio_mp3_9a_p2 from "./audio/mp3/9a-p2.mp3";
import audio_mp3_9a from "./audio/mp3/9a.mp3";
import audio_mp3_9b_p1 from "./audio/mp3/9b-p1.mp3";
import audio_mp3_9b_p2 from "./audio/mp3/9b-p2.mp3";
import audio_mp3_9b from "./audio/mp3/9b.mp3";
import audio_mp3_final from "./audio/mp3/final.mp3";
import audio_mp3_start from "./audio/mp3/start.mp3";
import audio_opus_1_p1 from "./audio/opus/1-p1.opus";
import audio_opus_1 from "./audio/opus/1.opus";
import audio_opus_10a_p1 from "./audio/opus/10a-p1.opus";
import audio_opus_10a from "./audio/opus/10a.opus";
import audio_opus_10b_p1 from "./audio/opus/10b-p1.opus";
import audio_opus_10b from "./audio/opus/10b.opus";
import audio_opus_11_perfect_p1 from "./audio/opus/11-perfect-p1.opus";
import audio_opus_11_perfect_p2 from "./audio/opus/11-perfect-p2.opus";
import audio_opus_11_perfect_p3 from "./audio/opus/11-perfect-p3.opus";
import audio_opus_11_perfect from "./audio/opus/11-perfect.opus";
import audio_opus_11_strong_p1 from "./audio/opus/11-strong-p1.opus";
import audio_opus_11_strong_p2 from "./audio/opus/11-strong-p2.opus";
import audio_opus_11_strong from "./audio/opus/11-strong.opus";
import audio_opus_11_weak_p1 from "./audio/opus/11-weak-p1.opus";
import audio_opus_11_weak_p2 from "./audio/opus/11-weak-p2.opus";
import audio_opus_11_weak_p3 from "./audio/opus/11-weak-p3.opus";
import audio_opus_11_weak_p4 from "./audio/opus/11-weak-p4.opus";
import audio_opus_11_weak from "./audio/opus/11-weak.opus";
import audio_opus_11 from "./audio/opus/11.opus";
import audio_opus_2a_p1 from "./audio/opus/2a-p1.opus";
import audio_opus_2a_p2 from "./audio/opus/2a-p2.opus";
import audio_opus_2a_p3 from "./audio/opus/2a-p3.opus";
import audio_opus_2a from "./audio/opus/2a.opus";
import audio_opus_2b_p1 from "./audio/opus/2b-p1.opus";
import audio_opus_2b from "./audio/opus/2b.opus";
import audio_opus_3a_p1 from "./audio/opus/3a-p1.opus";
import audio_opus_3a from "./audio/opus/3a.opus";
import audio_opus_3b_p1 from "./audio/opus/3b-p1.opus";
import audio_opus_3b_p2 from "./audio/opus/3b-p2.opus";
import audio_opus_3b from "./audio/opus/3b.opus";
import audio_opus_4a_p1 from "./audio/opus/4a-p1.opus";
import audio_opus_4a_p2 from "./audio/opus/4a-p2.opus";
import audio_opus_4a from "./audio/opus/4a.opus";
import audio_opus_4b_p1 from "./audio/opus/4b-p1.opus";
import audio_opus_4b_p2 from "./audio/opus/4b-p2.opus";
import audio_opus_4b from "./audio/opus/4b.opus";
import audio_opus_5a_p1 from "./audio/opus/5a-p1.opus";
import audio_opus_5a_p2 from "./audio/opus/5a-p2.opus";
import audio_opus_5a from "./audio/opus/5a.opus";
import audio_opus_5b_p1 from "./audio/opus/5b-p1.opus";
import audio_opus_5b_p2 from "./audio/opus/5b-p2.opus";
import audio_opus_5b from "./audio/opus/5b.opus";
import audio_opus_6a_p1 from "./audio/opus/6a-p1.opus";
import audio_opus_6a from "./audio/opus/6a.opus";
import audio_opus_6b_p1 from "./audio/opus/6b-p1.opus";
import audio_opus_6b from "./audio/opus/6b.opus";
import audio_opus_7a_p1 from "./audio/opus/7a-p1.opus";
import audio_opus_7a_p2 from "./audio/opus/7a-p2.opus";
import audio_opus_7a from "./audio/opus/7a.opus";
import audio_opus_7b_p1 from "./audio/opus/7b-p1.opus";
import audio_opus_7b_p2 from "./audio/opus/7b-p2.opus";
import audio_opus_7b from "./audio/opus/7b.opus";
import audio_opus_8a_p1 from "./audio/opus/8a-p1.opus";
import audio_opus_8a from "./audio/opus/8a.opus";
import audio_opus_8b_p1 from "./audio/opus/8b-p1.opus";
import audio_opus_8b from "./audio/opus/8b.opus";
import audio_opus_9a_p1 from "./audio/opus/9a-p1.opus";
import audio_opus_9a_p2 from "./audio/opus/9a-p2.opus";
import audio_opus_9a from "./audio/opus/9a.opus";
import audio_opus_9b_p1 from "./audio/opus/9b-p1.opus";
import audio_opus_9b_p2 from "./audio/opus/9b-p2.opus";
import audio_opus_9b from "./audio/opus/9b.opus";
import audio_opus_final from "./audio/opus/final.opus";
import audio_opus_start from "./audio/opus/start.opus";
import bg_annoyed from "./images/bg-annoyed.png";
import bg_neutral from "./images/bg-neutral.png";
import bg_pleased from "./images/bg-pleased.png";
import shark1_annoyed from "./images/shark1-annoyed.png";
import shark1_neutral from "./images/shark1-neutral.png";
import shark1_pleased from "./images/shark1-pleased.png";
import shark2_annoyed from "./images/shark2-annoyed.png";
import shark2_neutral from "./images/shark2-neutral.png";
import shark2_pleased from "./images/shark2-pleased.png";

export type CasinoState = {
  points: number;
};
export type CasinoResult = "ace-of-spades" | "ace-of-diamonds" | "joker";
type CasinoSpeaker =
  | "billie"
  | "shark_one_neutral"
  | "shark_one_annoyed"
  | "shark_one_pleased"
  | "shark_two_neutral"
  | "shark_two_annoyed"
  | "shark_two_pleased";
type CasinoBackground = "pleased" | "annoyed";

const incrementPoints = (state: CasinoState) => {
  return {
    ...state,
    points: state.points + 1,
  };
};
const decrementPoints = (state: CasinoState) => {
  return {
    ...state,
    points: state.points - 1,
  };
};

// These lines are labeled with choices, so they become variables so I don't duplicate the line
const line_2a =
  "I’m Billie…Diamond.  I enjoy a good wager, and got a tip that Ferdinand Carter is the man to gamble with this side of the Mississippi.";
const line_2b =
  "I’m Billie O’Ryan, a detective investigating Ferdinand Carter’s involvement in the Shadow Diamond’s disappearance.";
const line_3a =
  "That’s me.  I’m the Rogue, and I didn’t gain this reputation by going in blind.  Tell me what you know about this Carter.";
const line_3b =
  "Rumors speak loudly, but a gentleman never shows all his cards.";
const line_4a =
  "I’m just looking for a good game. And Carter’s reputation precedes him. But reputation’s just talk sometimes.";
const line_4b =
  "Well, Carter is known for things besides his reputation for gambling.";
const line_5a =
  "I don’t care about the Shadow Diamond, if that’s what you mean. I only want to gamble with the most interesting players.";
const line_5b =
  "I’ll square with you.  My interest in Carter was piqued by the Shadow Diamond.  Most jewelry merchants I’ve met shun gambling dens like this.";
const line_6a =
  "Buy this round and I might let it slip how an observant gambler might tip the scales against the house.";
const line_6b =
  "You’ve been so helpful to this traveler. The next round’s on me.";
const line_7a =
  "I’m sure you want to stay on the right side of the law. I don’t have time for bluffs.";
const line_7b = "I’ll level with you. I really could use a break on this case.";
const line_8a =
  "Maybe I just wanted you to underestimate me.  Sometimes it’s best to keep your opponent guessing.  So about Carter.";
const line_8b =
  "No skin off my back.  It’s called an expense account.  So drinks are on me.  Now about Carter.";
const line_9a =
  "So Carter is a regular.  Interesting behavior for a respected jeweler.  But he must be good for it – as long as he has the Shadow Diamond.";
const line_9b =
  "So the man likes to gamble.  I guess he can afford to with the Shadow Diamond backing him.";
const line_10a =
  "Buy this round, and I won’t tell the pit boss about that card counter in the corner signaling you.";
const line_10b = "Yeah, I could use another. The next round’s on Papa.";
// These choices are used in multiple nodes (where the branches converge) so again we avoid writing everything twice
const choices_4 = [
  {
    text: `Bet Out: "${line_4a}"`,
    next: "4a",
    stateEffect: incrementPoints,
  },
  {
    text: `Slowplay: "${line_4b}"`,
    next: "4b",
    stateEffect: decrementPoints,
  },
];
const choices_5 = [
  {
    text: `Raise: "${line_5a}"`,
    next: "5a",
    stateEffect: incrementPoints,
  },
  {
    text: `Call: "${line_5b}"`,
    next: "5b",
    stateEffect: decrementPoints,
  },
];
const choices_6 = [
  {
    text: `All-In: "${line_6a}"`,
    next: "6a",
    stateEffect: incrementPoints,
  },
  {
    text: `Fold: "${line_6b}"`,
    next: "6b",
    stateEffect: decrementPoints,
  },
];
const choices_8 = [
  {
    text: `Raise: "${line_8a}"`,
    next: "8a",
    stateEffect: incrementPoints,
  },
  {
    text: `Call: "${line_8b}"`,
    next: "8b",
    stateEffect: decrementPoints,
  },
];
const choices_9 = [
  {
    text: `Bet Out: "${line_9a}"`,
    next: "9a",
    stateEffect: incrementPoints,
  },
  {
    text: `Slowplay: "${line_9b}"`,
    next: "9b",
    stateEffect: decrementPoints,
  },
];
const choices_10 = [
  {
    text: `All-In: "${line_10a}"`,
    next: "10a",
    stateEffect: incrementPoints,
  },
  {
    text: `Fold: "${line_10b}"`,
    next: "10b",
    stateEffect: incrementPoints,
  },
];

const CasinoInteractionGraph: InteractionGraph<
  CasinoState,
  CasinoResult,
  CasinoSpeaker,
  CasinoBackground
> = {
  starting_node: "start",
  starting_state: {
    points: 0,
  },
  background: bg_neutral,
  bg_states: {
    annoyed: bg_annoyed,
    pleased: bg_pleased,
  },
  speaker_states: {
    billie: {
      label: "Billie",
      image: billie,
    },
    shark_one_annoyed: {
      label: "Shark 1",
      image: shark1_annoyed,
    },
    shark_one_neutral: {
      label: "Shark 1",
      image: shark1_neutral,
    },
    shark_one_pleased: {
      label: "Shark 1",
      image: shark1_pleased,
    },
    shark_two_annoyed: {
      label: "Shark 2",
      image: shark2_annoyed,
    },
    shark_two_neutral: {
      label: "Shark 2",
      image: shark2_neutral,
    },
    shark_two_pleased: {
      label: "Shark 2",
      image: shark2_pleased,
    },
  },
  nodes: [
    {
      id: "start",
      speaker: "billie",
      text: "I find the card sharks at the back of the casino.  With players like these, you have two choices – you can take a risk and try to bluff them, or just play it straight.",
      textBubbleType: "thought",
      sound: {
        mp3: audio_mp3_start,
        opus: audio_opus_start,
      },
      timeout_msec: 9048,
      next: "1",
    },
    {
      id: "1",
      speaker: "shark_one_neutral",
      text: "The manager tells us you’re interested in talking with us. We haven’t seen you at this fine establishment before.",
      sound: {
        mp3: audio_mp3_1,
        opus: audio_opus_1,
      },
      timeout_msec: 8328,
      next: "1-p1",
      overlay: "pleased", // TODO
    },
    {
      id: "1-p1",
      speaker: "shark_two_neutral",
      text: "We’re taking a break from the baccarat table. Happy to have a chinwag … if you play your cards right.",
      sound: {
        mp3: audio_mp3_1_p1,
        opus: audio_opus_1_p1,
      },
      timeout_msec: 5784 + 5000,
      overlay: "annoyed", // TODO
      choices: [
        {
          text: `Bluff: ${line_2a}`,
          next: "2a",
          stateEffect: incrementPoints,
        },
        {
          text: `Play It Straight: ${line_2b}`,
          next: "2b",
          stateEffect: decrementPoints,
        },
      ],
    },
    {
      id: "2a",
      speaker: "billie",
      text: line_2a,
      sound: {
        mp3: audio_mp3_2a,
        opus: audio_opus_2a,
      },
      timeout_msec: 8245,
      next: "2a-p1",
    },
    {
      id: "2a-p1",
      speaker: "shark_one_neutral",
      text: "Not THE Billie Diamond, the notorious Rakish Rogue of the Rio Rancho?",
      sound: {
        mp3: audio_mp3_2a_p1,
        opus: audio_opus_2a_p1,
      },
      timeout_msec: 7104,
      next: "2a-p2",
    },
    {
      id: "2a-p2",
      speaker: "shark_two_neutral",
      text: "I heard you broke the Casino de Monte Carlo!",
      sound: {
        mp3: audio_mp3_2a_p2,
        opus: audio_opus_2a_p2,
      },
      timeout_msec: 3336,
      next: "2a-p3",
    },
    {
      id: "2a-p3",
      speaker: "shark_one_neutral",
      text: "Oh, yes, you would enjoy playing with Carter.",
      sound: {
        mp3: audio_mp3_2a_p3,
        opus: audio_opus_2a_p3,
      },
      timeout_msec: 4920 + 5000,
      choices: [
        {
          text: `Double Down: ${line_3a}`,
          next: "3a",
          stateEffect: incrementPoints,
        },
        {
          text: `Check: ${line_3b}`,
          next: "3b",
          stateEffect: decrementPoints,
        },
      ],
    },

    {
      id: "3a",
      speaker: "billie",
      text: line_3a,
      sound: {
        mp3: audio_mp3_3a,
        opus: audio_opus_3a,
      },
      timeout_msec: 6768,
      next: "3a-p1",
    },
    {
      id: "3a-p1",
      speaker: "shark_one_neutral",
      text: "Ever since he’s been back, Carter has been gambling up a storm. He’s a regular at this casino, and he’ll play the ponies. He’s not one to turn up a good wager. Are you looking to go head to head with Ferdie?",
      sound: {
        mp3: audio_mp3_3a_p1,
        opus: audio_opus_3a_p1,
      },
      timeout_msec: 14688 + 3000,
      choices: choices_4,
    },

    {
      id: "3b",
      speaker: "billie",
      text: line_3b,
      sound: {
        mp3: audio_mp3_3b,
        opus: audio_opus_3b,
      },
      timeout_msec: 4344,
      next: "3b-p1",
    },
    {
      id: "3b-p1",
      speaker: "shark_one_neutral",
      text: "You can drop the act. But I’ll give you this – I bought your bluff at first. Buy us a round and we can discuss your real interest in Carter.",
      sound: {
        mp3: audio_mp3_3b_p1,
        opus: audio_opus_3b_p1,
      },
      timeout_msec: 9864,
      next: "3b-p2",
    },
    {
      id: "3b-p2",
      speaker: "billie",
      text: "Should have stuck with it.  Oh well.  It’s going to cost Papa a few drinks.  I can live with that.",
      textBubbleType: "thought",
      sound: {
        mp3: audio_mp3_3b_p2,
        opus: audio_opus_3b_p2,
      },
      timeout_msec: 6840 + 3000,
      choices: choices_4,
    },

    {
      id: "4a",
      speaker: "billie",
      text: line_4a,
      sound: {
        mp3: audio_mp3_4a,
        opus: audio_opus_4a,
      },
      timeout_msec: 6648,
      next: "4a-p1",
    },
    {
      id: "4a-p1",
      speaker: "shark_two_neutral",
      text: "You’re persistent, I’ll give you that",
      sound: {
        mp3: audio_mp3_4a_p1,
        opus: audio_opus_4a_p1,
      },
      timeout_msec: 2736,
      next: "4a-p2",
    },
    {
      id: "4a-p2",
      speaker: "shark_one_neutral",
      text: "Hmm, I wonder.  Maybe it’s not Carter’s gambling you’re really interested in.",
      sound: {
        mp3: audio_mp3_4a_p2,
        opus: audio_opus_4a_p2,
      },
      timeout_msec: 7128 + 3000,
      choices: choices_5,
    },

    {
      id: "4b",
      speaker: "billie",
      text: line_4b,
      sound: {
        mp3: audio_mp3_4b,
        opus: audio_opus_4b,
      },
      timeout_msec: 3744,
      next: "4b-p1",
    },
    {
      id: "4b-p1",
      speaker: "shark_two_neutral",
      text: "You’d be talking about the gem, then.",
      sound: {
        mp3: audio_mp3_4b_p1,
        opus: audio_opus_4b_p1,
      },
      timeout_msec: 2928,
      next: "4b-p2",
    },
    {
      id: "4b-p2",
      speaker: "shark_one_neutral",
      text: "Yes, most people are.  Why would you be any different?",
      sound: {
        mp3: audio_mp3_4b_p2,
        opus: audio_opus_4b_p2,
      },
      timeout_msec: 5352 + 3000,
      choices: choices_5,
    },

    {
      id: "5a",
      speaker: "billie",
      text: line_5a,
      sound: {
        mp3: audio_mp3_5a,
        opus: audio_opus_5a,
      },
      timeout_msec: 5616,
      next: "5a-p1",
    },
    {
      id: "5a-p1",
      speaker: "shark_two_neutral",
      text: "Hmm, I smell a bluff.  Bluffs make me thirsty.",
      sound: {
        mp3: audio_mp3_5a_p1,
        opus: audio_opus_5a_p1,
      },
      timeout_msec: 4056,
      next: "5a-p2",
    },
    {
      id: "5a-p2",
      speaker: "shark_one_neutral",
      text: "Yes, I’m also feeling a bit parched. I see your drink is dry too.",
      sound: {
        mp3: audio_mp3_5a_p2,
        opus: audio_opus_5a_p2,
      },
      timeout_msec: 6504 + 3000,
      choices: choices_6,
    },

    {
      id: "5b",
      speaker: "billie",
      text: line_5b,
      sound: {
        mp3: audio_mp3_5b,
        opus: audio_opus_5b,
      },
      timeout_msec: 7320,
      next: "5b-p1",
    },
    {
      id: "5b-p1",
      speaker: "shark_two_neutral",
      text: "Acquiring the Shadow Diamond was quite the coup for Carter.  I can see why the Finster woman wants to tie the knot with him.",
      sound: {
        mp3: audio_mp3_5b_p1,
        opus: audio_opus_5b_p1,
      },
      timeout_msec: 6336,
      next: "5b-p2",
    },
    {
      id: "5b-p2",
      speaker: "shark_one_neutral",
      text: "It was a gamble that paid off for him, that’s for sure. Hmm… I’m feeling a bit parched. I see your drink is dry too.",
      sound: {
        mp3: audio_mp3_5b_p2,
        opus: audio_opus_5b_p2,
      },
      timeout_msec: 9816 + 3000,
      choices: choices_6,
    },

    {
      id: "6a",
      speaker: "billie",
      text: line_6a,
      sound: {
        mp3: audio_mp3_6a,
        opus: audio_opus_6a,
      },
      timeout_msec: 4872,
      next: "6a-p1",
    },
    {
      id: "6a-p1",
      speaker: "shark_two_neutral",
      text: "Thanks, pardner. We appreciate the offer, but it’s unnecessary.  We already have it covered.  But as an expression of good will, drinks are on us.  And we’ll give you this – when Carter was here earlier, it was to see the Casino owner.",
      sound: {
        mp3: audio_mp3_6a_p1,
        opus: audio_opus_6a_p1,
      },
      timeout_msec: 15600,
      next: "11",
    },

    {
      id: "6b",
      speaker: "billie",
      text: line_6b,
      sound: {
        mp3: audio_mp3_6b,
        opus: audio_opus_6b,
      },
      timeout_msec: 3576,
      next: "6b-p1",
    },
    {
      id: "6b-p1",
      speaker: "shark_two_neutral",
      text: "Thanks.  We’ll take you up on that offer.  We never turn down a free drink.  And we hate to see a gambler tilt, so we’ll give you this – when Carter was here earlier, it was to see the Casino owner.",
      sound: {
        mp3: audio_mp3_6b_p1,
        opus: audio_opus_6b_p1,
      },
      timeout_msec: 12816,
      next: "11",
    },

    {
      id: "2b",
      speaker: "billie",
      text: line_2b,
      sound: {
        mp3: audio_mp3_2b,
        opus: audio_opus_2b,
      },
      timeout_msec: 5952,
      next: "2b-p1",
    },
    {
      id: "2b-p1",
      speaker: "shark_one_neutral",
      text: "We don’t have much time for dicks, especially ones who haven’t bought us a drink.",
      sound: {
        mp3: audio_mp3_2b_p1,
        opus: audio_opus_2b_p1,
      },
      timeout_msec: 7896 + 3000,
      choices: [
        {
          text: `Double Down: ${line_7a}`,
          next: "7a",
          stateEffect: incrementPoints,
        },
        {
          text: `Check: ${line_7b}`,
          next: "7b",
          stateEffect: decrementPoints,
        },
      ],
    },

    {
      id: "7a",
      speaker: "billie",
      text: line_7a,
      sound: {
        mp3: audio_mp3_7a,
        opus: audio_opus_7a,
      },
      timeout_msec: 4440,
      next: "7a-p1",
    },
    {
      id: "7a-p1",
      speaker: "shark_two_neutral",
      text: "I like a person who plays a strong hand.",
      sound: {
        mp3: audio_mp3_7a_p1,
        opus: audio_opus_7a_p1,
      },
      timeout_msec: 3168,
      next: "7a-p2",
    },
    {
      id: "7a-p2",
      speaker: "shark_one_neutral",
      text: "I’ve heard of you.  Word is you’re a straight shooter.  If the cards fall your way, maybe we can do business.",
      sound: {
        mp3: audio_mp3_7a_p2,
        opus: audio_opus_7a_p2,
      },
      timeout_msec: 7824 + 3000,
      choices: choices_8,
    },

    {
      id: "7b",
      speaker: "billie",
      text: line_7b,
      sound: {
        mp3: audio_mp3_7b,
        opus: audio_opus_7b,
      },
      timeout_msec: 3720,
      next: "7b-p1",
    },
    {
      id: "7b-p1",
      speaker: "shark_two_neutral",
      text: "A real gambler never shows weakness",
      sound: {
        mp3: audio_mp3_7b_p1,
        opus: audio_opus_7b_p1,
      },
      timeout_msec: 3048,
      next: "7b-p2",
    },
    {
      id: "7b-p2",
      speaker: "shark_one_neutral",
      text: "Now we know it’s worth something to you.  Big mistake, chum.",
      sound: {
        mp3: audio_mp3_7b_p2,
        opus: audio_opus_7b_p2,
      },
      timeout_msec: 6240 + 3000,
      choices: choices_8,
    },

    {
      id: "8a",
      speaker: "billie",
      text: line_8a,
      sound: {
        mp3: audio_mp3_8a,
        opus: audio_opus_8a,
      },
      timeout_msec: 7920,
      next: "8a-p1",
    },
    {
      id: "8a-p1",
      speaker: "shark_one_neutral",
      text: "Nice play.  Ever since he’s been back, Carter has been gambling up a storm.  He’s a regular at this casino, and he’ll play the ponies.",
      sound: {
        mp3: audio_mp3_8a_p1,
        opus: audio_opus_8a_p1,
      },
      timeout_msec: 10512 + 3000,
      choices: choices_9,
    },

    {
      id: "8b",
      speaker: "billie",
      text: line_8b,
      sound: {
        mp3: audio_mp3_8b,
        opus: audio_opus_8b,
      },
      timeout_msec: 6240,
      next: "8b-p1",
    },
    {
      id: "8b-p1",
      speaker: "shark_one_neutral",
      text: "Even better.  Nothing better than taking money from someone who doesn’t care if they lose it.  I’ll say Carter is a regular around here.  Buy us another round and maybe we can tell you more.",
      sound: {
        mp3: audio_mp3_8b_p1,
        opus: audio_opus_8b_p1,
      },
      timeout_msec: 13896 + 3000,
      choices: choices_9,
    },

    {
      id: "9a",
      speaker: "billie",
      text: line_9a,
      sound: {
        mp3: audio_mp3_9a,
        opus: audio_opus_9a,
      },
      timeout_msec: 8784,
      next: "9a-p1",
    },
    {
      id: "9a-p1",
      speaker: "shark_two_neutral",
      text: "Yeah, acquiring the Shadow Diamond was quite the coup for Carter. I can see why the Finster woman wants to tie the knot with him.",
      sound: {
        mp3: audio_mp3_9a_p1,
        opus: audio_opus_9a_p1,
      },
      timeout_msec: 7344,
      next: "9a-p2",
    },
    {
      id: "9a-p2",
      speaker: "shark_one_neutral",
      text: "That diamond opened many doors for him, that’s for sure. Hmm… I’m feeling a bit parched. I see your drink is dry too.",
      sound: {
        mp3: audio_mp3_9a_p2,
        opus: audio_opus_9a_p2,
      },
      timeout_msec: 3912 + 3000,
      choices: choices_10,
    },

    {
      id: "9b",
      speaker: "billie",
      text: line_9b,
      sound: {
        mp3: audio_mp3_9b,
        opus: audio_opus_9b,
      },
      timeout_msec: 5040,
      next: "9b-p1",
    },
    {
      id: "9b-p1",
      speaker: "shark_two_neutral",
      text: "You would think so.  But thinking makes me thirsty.",
      sound: {
        mp3: audio_mp3_9b_p1,
        opus: audio_opus_9b_p1,
      },
      timeout_msec: 3408,
      next: "9b-p2",
    },
    {
      id: "9b-p2",
      speaker: "shark_one_neutral",
      text: "Hmm… I’m also feeling a bit parched. I see your drink is dry too.",
      sound: {
        mp3: audio_mp3_9b_p2,
        opus: audio_opus_9b_p2,
      },
      timeout_msec: 6840 + 3000,
      choices: choices_10,
    },

    {
      id: "10a",
      speaker: "billie",
      text: line_10a,
      sound: {
        mp3: audio_mp3_10a,
        opus: audio_opus_10a,
      },
      timeout_msec: 4872,
      next: "10a-p1",
    },
    {
      id: "10a-p1",
      speaker: "shark_one_neutral",
      text: "Ha!  In that case, it would be our pleasure.  And you’d probably want to know that when Carter was here earlier, it was to see the Casino owner.",
      sound: {
        mp3: audio_mp3_10a_p1,
        opus: audio_opus_10a_p1,
      },
      timeout_msec: 11400,
      next: "11",
    },

    {
      id: "10b",
      speaker: "billie",
      text: line_10b,
      sound: {
        mp3: audio_mp3_10b,
        opus: audio_opus_10b,
      },
      timeout_msec: 3288,
      next: "10b-p1",
    },
    {
      id: "10b-p1",
      speaker: "shark_two_neutral",
      text: "I’ll be sure to thank him.  And to thank you, I’ll tell you that Carter met with the Casino owner earlier today.",
      sound: {
        mp3: audio_mp3_10b_p1,
        opus: audio_opus_10b_p1,
      },
      timeout_msec: 6744,
      next: "11",
    },

    // All paths have now converged to here.  Now we branch based on how impressed the sharks were with your risk-taking!
    {
      id: "11",
      speaker: "billie",
      text: "Why did Carter meet with the Casino owner?",
      sound: {
        mp3: audio_mp3_11,
        opus: audio_opus_11,
      },
      timeout_msec: 2640,
      next(state: CasinoState) {
        if (state.points === 5) {
          return "11-perfect";
        } else if (state.points > 0) {
          return "11-strong";
        } else {
          return "11-weak";
        }
      },
    },

    // Weak conclusion (negative points)
    {
      id: "11-weak",
      speaker: "shark_two_neutral",
      text: "That’s going to cost you.",
      sound: {
        mp3: audio_mp3_11_weak,
        opus: audio_opus_11_weak,
      },
      timeout_msec: 2400,
      next: "11-weak-p1",
    },
    {
      id: "11-weak-p1",
      speaker: "billie",
      text: "Whatever it takes. You can thank Papa for the expense account.",
      sound: {
        mp3: audio_mp3_11_weak_p1,
        opus: audio_opus_11_weak_p1,
      },
      timeout_msec: 3768,
      next: "11-weak-p2",
    },
    {
      id: "11-weak-p2",
      speaker: "shark_one_neutral",
      text: "You’re not ready for games with high stakes.  But since you’ve bought our next round of drinks, I’ll feed you this crumb: Ferdinand, like you, is in over his head.",
      sound: {
        mp3: audio_mp3_11_weak_p2,
        opus: audio_opus_11_weak_p2,
      },
      timeout_msec: 14400,
      next: "11-weak-p3",
    },
    {
      id: "11-weak-p3",
      speaker: "shark_two_neutral",
      text: "I’ve heard he’s racked up some major IOUs.  You should leave the casino before you get in similar trouble.",
      sound: {
        mp3: audio_mp3_11_weak_p3,
        opus: audio_opus_11_weak_p3,
      },
      timeout_msec: 6576,
      next: "11-weak-p4",
    },
    {
      id: "11-weak-p4",
      speaker: "shark_one_neutral",
      text: "Here, keep this souvenir as a reminder.",
      sound: {
        mp3: audio_mp3_11_weak_p4,
        opus: audio_opus_11_weak_p4,
      },
      timeout_msec: 4128,
      next: "final",
    },

    // Strong conclusion (0 < points < 5)
    {
      id: "11-strong",
      speaker: "shark_one_neutral",
      text: "You’re no minnow, I’ll give you that.  Let’s just say that even when he was young, Ferdinand had a streak of the gambler in him.  He must have picked up some bad habits on his years of travel across the Atlantic.",
      sound: {
        mp3: audio_mp3_11_strong,
        opus: audio_opus_11_strong,
      },
      timeout_msec: 15984,
      next: "11-strong-p1",
    },
    {
      id: "11-strong-p1",
      speaker: "shark_two_neutral",
      text: "He doubles down on bad beats.  He plays loose and I’ve heard he’s racked up some major IOUs.  Flashed the Shadow Diamond to the owner to show he’s good for it.",
      sound: {
        mp3: audio_mp3_11_strong_p1,
        opus: audio_opus_11_strong_p1,
      },
      timeout_msec: 9384,
      next: "11-strong-p2",
    },
    {
      id: "11-strong-p2",
      speaker: "shark_one_neutral",
      text: "Here’s my card — from one shark to another.",
      sound: {
        mp3: audio_mp3_11_strong_p2,
        opus: audio_opus_11_strong_p2,
      },
      timeout_msec: 4392,
      next: "final",
    },

    // Perfect conclusion (points == 5)
    {
      id: "11-perfect",
      speaker: "shark_one_neutral",
      text: "I can tell you don’t play games when you’re playing games, so I’ll lay my cards on the table.  Even when he was young, Ferdinand had a streak of the gambler in him.  Before he went on his years of travel across the Atlantic, he had it under control.  Moreover, he seemed to have the devil’s own luck.  But when he returned, he was a changed man – at least, a changed gambler.  Carter isn’t the man he used to be.",
      sound: {
        mp3: audio_mp3_11_perfect,
        opus: audio_opus_11_perfect,
      },
      timeout_msec: 27240,
      next: "11-perfect-p1",
    },
    {
      id: "11-perfect-p1",
      speaker: "shark_two_neutral",
      text: "He doubles down on bad beats.  His lucky streaks run drier than the Sahara.  He plays loose and I’ve heard he’s in over his head with debt.  When he was here earlier, I heard he was flashing the Shadow Diamond to show the owner he was good for it.",
      sound: {
        mp3: audio_mp3_11_perfect_p1,
        opus: audio_opus_11_perfect_p1,
      },
      timeout_msec: 13704,
      next: "11-perfect-p2",
    },
    {
      id: "11-perfect-p2",
      speaker: "billie",
      text: "Thanks.",
      sound: {
        mp3: audio_mp3_11_perfect_p2,
        opus: audio_opus_11_perfect_p2,
      },
      timeout_msec: 1104,
      next: "11-perfect-p3",
    },
    {
      id: "11-perfect-p3",
      speaker: "shark_one_neutral",
      text: "Here’s my card — from one shark to another.",
      sound: {
        mp3: audio_mp3_11_perfect_p3,
        opus: audio_opus_11_perfect_p3,
      },
      timeout_msec: 4392,
      next: "final",
    },

    {
      id: "final",
      speaker: "billie",
      text: "Hmm… This makes me wonder if the Carter & Bros. edifice is a house of cards. I think a background check of Mr. Ferdinand Carter is in order. We should see what he was up to in Europe before he returned to the States.",
      textBubbleType: "thought",
      sound: {
        mp3: audio_mp3_final,
        opus: audio_opus_final,
      },
      timeout_msec: 12360,
      finalState(state: CasinoState) {
        if (state.points === 5) {
          return "ace-of-spades";
        } else if (state.points > 0) {
          return "ace-of-diamonds";
        } else {
          return "joker";
        }
      },
    },
  ],
};

export default CasinoInteractionGraph;
