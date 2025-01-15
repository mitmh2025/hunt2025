import billie from "../assets/billie.png";
import type { InteractionGraph } from "../types";
import neutralBg from "./assets/Neutral.jpg";
import neutralSpeaker from "./assets/Neutral_Speaker.jpg";
import surprisedBg from "./assets/Surprised.jpg";
import surprisedSpeaker from "./assets/Surprised_Speaker.jpg";
import phone_number from "./assets/phone_number.png";
import audio_mp3_1 from "./audio/mp3/1.mp3";
import audio_mp3_10a from "./audio/mp3/10a.mp3";
import audio_mp3_10b from "./audio/mp3/10b.mp3";
import audio_mp3_10c from "./audio/mp3/10c.mp3";
import audio_mp3_11 from "./audio/mp3/11.mp3";
import audio_mp3_12 from "./audio/mp3/12.mp3";
import audio_mp3_2a from "./audio/mp3/2a.mp3";
import audio_mp3_2ab_p1 from "./audio/mp3/2ab-p1.mp3";
import audio_mp3_2b from "./audio/mp3/2b.mp3";
import audio_mp3_2c from "./audio/mp3/2c.mp3";
import audio_mp3_2cd_p1 from "./audio/mp3/2cd-p1.mp3";
import audio_mp3_2d from "./audio/mp3/2d.mp3";
import audio_mp3_3a from "./audio/mp3/3a.mp3";
import audio_mp3_3b from "./audio/mp3/3b.mp3";
import audio_mp3_3c from "./audio/mp3/3c.mp3";
import audio_mp3_4a from "./audio/mp3/4a.mp3";
import audio_mp3_4b from "./audio/mp3/4b.mp3";
import audio_mp3_4c from "./audio/mp3/4c.mp3";
import audio_mp3_5 from "./audio/mp3/5.mp3";
import audio_mp3_6a_p1 from "./audio/mp3/6a-p1.mp3";
import audio_mp3_6a from "./audio/mp3/6a.mp3";
import audio_mp3_6b_p1 from "./audio/mp3/6b-p1.mp3";
import audio_mp3_6b from "./audio/mp3/6b.mp3";
import audio_mp3_6c from "./audio/mp3/6c.mp3";
import audio_mp3_6cd_p1 from "./audio/mp3/6cd-p1.mp3";
import audio_mp3_6d from "./audio/mp3/6d.mp3";
import audio_mp3_7 from "./audio/mp3/7.mp3";
import audio_mp3_7a from "./audio/mp3/7a.mp3";
import audio_mp3_7b from "./audio/mp3/7b.mp3";
import audio_mp3_7c from "./audio/mp3/7c.mp3";
import audio_mp3_8 from "./audio/mp3/8.mp3";
import audio_mp3_9 from "./audio/mp3/9.mp3";
import audio_mp3_start from "./audio/mp3/start.mp3";
import audio_opus_1 from "./audio/opus/1.opus";
import audio_opus_10a from "./audio/opus/10a.opus";
import audio_opus_10b from "./audio/opus/10b.opus";
import audio_opus_10c from "./audio/opus/10c.opus";
import audio_opus_11 from "./audio/opus/11.opus";
import audio_opus_12 from "./audio/opus/12.opus";
import audio_opus_2a from "./audio/opus/2a.opus";
import audio_opus_2ab_p1 from "./audio/opus/2ab-p1.opus";
import audio_opus_2b from "./audio/opus/2b.opus";
import audio_opus_2c from "./audio/opus/2c.opus";
import audio_opus_2cd_p1 from "./audio/opus/2cd-p1.opus";
import audio_opus_2d from "./audio/opus/2d.opus";
import audio_opus_3a from "./audio/opus/3a.opus";
import audio_opus_3b from "./audio/opus/3b.opus";
import audio_opus_3c from "./audio/opus/3c.opus";
import audio_opus_4a from "./audio/opus/4a.opus";
import audio_opus_4b from "./audio/opus/4b.opus";
import audio_opus_4c from "./audio/opus/4c.opus";
import audio_opus_5 from "./audio/opus/5.opus";
import audio_opus_6a_p1 from "./audio/opus/6a-p1.opus";
import audio_opus_6a from "./audio/opus/6a.opus";
import audio_opus_6b_p1 from "./audio/opus/6b-p1.opus";
import audio_opus_6b from "./audio/opus/6b.opus";
import audio_opus_6c from "./audio/opus/6c.opus";
import audio_opus_6cd_p1 from "./audio/opus/6cd-p1.opus";
import audio_opus_6d from "./audio/opus/6d.opus";
import audio_opus_7 from "./audio/opus/7.opus";
import audio_opus_7a from "./audio/opus/7a.opus";
import audio_opus_7b from "./audio/opus/7b.opus";
import audio_opus_7c from "./audio/opus/7c.opus";
import audio_opus_8 from "./audio/opus/8.opus";
import audio_opus_9 from "./audio/opus/9.opus";
import audio_opus_start from "./audio/opus/start.opus";

export type JewelryStoreState = {
  idea1: boolean; // did we try option 6a yet?
  idea2: boolean; // did we try option 6b yet?
};
type JewelryStoreResult = "phone-number";
type JewelryStoreSpeaker =
  | "billie"
  | "gemcutter_neutral"
  | "gemcutter_surprised";

type JewleryStoreBG = "surprised";

const remainingOptions = (state: JewelryStoreState) => {
  const remaining_options = [];
  if (!state.idea1) {
    remaining_options.push({
      text: "This handsome mug’s not enough for you?",
      next: "6a",
      stateEffect(state: JewelryStoreState) {
        return {
          ...state,
          idea1: true,
        };
      },
    });
  }
  if (!state.idea2) {
    remaining_options.push({
      text: "Hm...does 50 bucks help with your memory?",
      next: "6b",
      stateEffect(state: JewelryStoreState) {
        return {
          ...state,
          idea2: true,
        };
      },
    });
  }
  remaining_options.push({
    text: "I recall you’re a gambling man. I’ve got an in on the hound races this Saturday.",
    next: "6c",
  });
  remaining_options.push({
    text: "What would you say if I could take you for a ride in Papa Finster’s slick Duesenberg?",
    next: "6d",
  });
  return remaining_options;
};

const JewelryStoreInteractionGraph: InteractionGraph<
  JewelryStoreState,
  JewelryStoreResult,
  JewelryStoreSpeaker,
  JewleryStoreBG
> = {
  starting_node: "start",
  starting_state: {
    idea1: false,
    idea2: false,
  },
  background: neutralBg,
  speaker_states: {
    billie: {
      label: "Billie",
      image: billie,
    },
    gemcutter_neutral: {
      label: "Micah",
      image: neutralSpeaker,
    },
    gemcutter_surprised: {
      label: "Micah",
      image: surprisedSpeaker,
    },
  },
  bg_states: {
    surprised: surprisedBg,
  },
  nodes: [
    {
      id: "start",
      speaker: "billie",
      text: "I headed over to the Jaded Jeweler’s after hours to figure out what Gladys Finster was doing frequenting a competitor’s store.  I’m old pals with the owner, Micah Flint, since he appraised some broad’s inheritance for a case of mine.  May have browsed a bit myself, but I’m sure not a regular customer.",
      textBubbleType: "thought",
      sound: {
        mp3: audio_mp3_start,
        opus: audio_opus_start,
      },
      timeout_msec: 15216,
      next: "1",
    },
    {
      id: "1",
      speaker: "gemcutter_neutral",
      text: "Back again so soon, O’Ryan?  Got another piece for me to look over?",
      sound: {
        mp3: audio_mp3_1,
        opus: audio_opus_1,
      },
      timeout_msec: 5112 + 5000, // 5 second line, 5 seconds voting time?
      choices: [
        {
          text: "Not a jewel this time, but a dame.  But she’s a real gem.",
          next: "2a",
        },
        {
          text: "Naw, nothing so straightforward as that case.  Now I’m trying to follow the footsteps of a woman.",
          next: "2b",
        },
        {
          text: "I seem to remember you doing a bit more than looking last time.",
          next: "2c",
        },
        {
          text: "I can’t just come to see my favorite gem cutter?",
          next: "2d",
        },
      ],
    },
    {
      id: "2a",
      speaker: "billie",
      text: "Not a jewel this time, but a dame.  But she’s a real gem.",
      sound: {
        mp3: audio_mp3_2a,
        opus: audio_opus_2a,
      },
      timeout_msec: 3600,
      next: "2ab-p1",
    },
    {
      id: "2b",
      speaker: "billie",
      text: "Naw, nothing so straightforward as that case.  Now I’m trying to follow the footsteps of a woman.",
      sound: {
        mp3: audio_mp3_2b,
        opus: audio_opus_2b,
      },
      timeout_msec: 5784,
      next: "2ab-p1",
    },
    {
      id: "2c",
      speaker: "billie",
      text: "I seem to remember you doing a bit more than looking last time.",
      sound: {
        mp3: audio_mp3_2c,
        opus: audio_opus_2c,
      },
      timeout_msec: 3624,
      next: "2cd-p1",
    },
    {
      id: "2d",
      speaker: "billie",
      text: "I can’t just come to see my favorite gem cutter?",
      sound: {
        mp3: audio_mp3_2d,
        opus: audio_opus_2d,
      },
      timeout_msec: 3264,
      next: "2cd-p1",
    },
    {
      id: "2ab-p1",
      speaker: "gemcutter_neutral",
      text: "A woman, huh?  And you think this lady came through here?",
      sound: {
        mp3: audio_mp3_2ab_p1,
        opus: audio_opus_2ab_p1,
      },
      timeout_msec: 4224 + 10000,
      choices: [
        {
          text: "Yeah, I’m tracking down a woman who came in here.  Tall, slender, with dark hair.  Looks like she draws a lot of water.  You couldn’t miss her.",
          next: "3a",
        },
        {
          text: "Yeah, I’m tracking down a dame who came in here earlier today.  She’d’ve come in here knowing exactly what she wanted.  A bossy type.  You couldn’t miss her.",
          next: "3b",
        },
        {
          text: "Yeah, I’m tracking down a woman who came in here earlier today.  Someone who knows the jewel lingo.  You’d’ve pegged her for the competition easy.  You couldn’t miss her.",
          next: "3c",
        },
      ],
    },
    {
      id: "2cd-p1",
      speaker: "gemcutter_surprised",
      overlay: "surprised",
      text: "Pretty words for a pretty PI...But what are you really here for?",
      sound: {
        mp3: audio_mp3_2cd_p1,
        opus: audio_opus_2cd_p1,
      },
      timeout_msec: 4848 + 10000,
      choices: [
        {
          text: "I’m tracking down a woman who came in here.  Tall, slender, with dark hair.  Looks like she draws a lot of water.  You couldn’t miss her.",
          next: "4a",
        },
        {
          text: "I’m tracking down a dame who came in here earlier today.  She’d’ve come in here knowing exactly what she wanted.  A bossy type.  You couldn’t miss her.",
          next: "4b",
        },
        {
          text: "I’m tracking down a woman who came in here earlier today.  Someone who knows the jewel lingo.  You’d’ve pegged her for the competition easy.  You couldn’t miss her.",
          next: "4c",
        },
      ],
    },
    // All six of the reachable nodes (3a,3b,3c,4a,4b,4c) all feed into node 5
    {
      id: "3a",
      speaker: "billie",
      text: "Yeah, I’m tracking down a woman who came in here.  Tall, slender, with dark hair.  Looks like she draws a lot of water.  You couldn’t miss her.",
      sound: {
        mp3: audio_mp3_3a,
        opus: audio_opus_3a,
      },
      timeout_msec: 7824,
      next: "5",
    },
    {
      id: "3b",
      speaker: "billie",
      text: "Yeah, I’m tracking down a dame who came in here earlier today.  She’d’ve come in here knowing exactly what she wanted.  A bossy type.  You couldn’t miss her.",
      sound: {
        mp3: audio_mp3_3b,
        opus: audio_opus_3b,
      },
      timeout_msec: 8496,
      next: "5",
    },
    {
      id: "3c",
      speaker: "billie",
      text: "Yeah, I’m tracking down a woman who came in here earlier today.  Someone who knows the jewel lingo.  You’d’ve pegged her for the competition easy.  You couldn’t miss her.",
      sound: {
        mp3: audio_mp3_3c,
        opus: audio_opus_3c,
      },
      timeout_msec: 8688,
      next: "5",
    },
    {
      id: "4a",
      speaker: "billie",
      text: "I’m tracking down a woman who came in here.  Tall, slender, with dark hair.  Looks like she draws a lot of water.  You couldn’t miss her.",
      sound: {
        mp3: audio_mp3_4a,
        opus: audio_opus_4a,
      },
      timeout_msec: 8064,
      next: "5",
    },
    {
      id: "4b",
      speaker: "billie",
      text: "I’m tracking down a dame who came in here earlier today.  She’d’ve come in here knowing exactly what she wanted.  A bossy type.  You couldn’t miss her.",
      sound: {
        mp3: audio_mp3_4b,
        opus: audio_opus_4b,
      },
      timeout_msec: 7848,
      next: "5",
    },
    {
      id: "4c",
      speaker: "billie",
      text: "I’m tracking down a woman who came in here earlier today.  Someone who knows the jewel lingo.  You’d’ve pegged her for the competition easy.  You couldn’t miss her.",
      sound: {
        mp3: audio_mp3_4c,
        opus: audio_opus_4c,
      },
      timeout_msec: 8136,
      next: "5",
    },

    // All dialog branches have converged here.
    {
      id: "5",
      speaker: "gemcutter_neutral",
      text: "Ah, yes, I think I remember a lady like that.  Maybe you can help jog my memory.",
      sound: {
        mp3: audio_mp3_5,
        opus: audio_opus_5,
      },
      timeout_msec: 6888 + 7000,
      choices: remainingOptions,
    },

    {
      id: "6a",
      speaker: "billie",
      text: "This handsome mug’s not enough for you?",
      sound: {
        mp3: audio_mp3_6a,
        opus: audio_opus_6a,
      },
      timeout_msec: 2856,
      next: "6a-p1",
    },
    {
      id: "6a-p1",
      speaker: "gemcutter_neutral",
      text: "You’re an eyeful, Billie, but when I look at that face my memory just flies outta my head.",
      sound: {
        mp3: audio_mp3_6a_p1,
        opus: audio_opus_6a_p1,
      },
      timeout_msec: 6552,
      choices: remainingOptions,
    },
    {
      id: "6b",
      speaker: "billie",
      text: "Hm...does 50 bucks help with your memory?",
      sound: {
        mp3: audio_mp3_6b,
        opus: audio_opus_6b,
      },
      timeout_msec: 3168,
      next: "6b-p1",
    },
    {
      id: "6b-p1",
      speaker: "gemcutter_surprised",
      overlay: "surprised",
      text: "Pah, money!  Billie, I thought we were friends.",
      sound: {
        mp3: audio_mp3_6b_p1,
        opus: audio_opus_6b_p1,
      },
      timeout_msec: 5088,
      choices: remainingOptions,
    },
    {
      id: "6c",
      speaker: "billie",
      text: "I recall you’re a gambling man. I’ve got an in on the hound races this Saturday.",
      sound: {
        mp3: audio_mp3_6c,
        opus: audio_opus_6c,
      },
      timeout_msec: 4464,
      next: "6cd-p1",
    },
    {
      id: "6d",
      speaker: "billie",
      text: "What would you say if I could take you for a ride in Papa Finster’s slick Duesenberg?",
      sound: {
        mp3: audio_mp3_6d,
        opus: audio_opus_6d,
      },
      timeout_msec: 5328,
      next: "6cd-p1",
    },
    // All paths have now converged on 6cd-p1
    {
      id: "6cd-p1",
      speaker: "gemcutter_surprised",
      overlay: "surprised",
      text: "You know me well, Billie.  I’ll hold you to that date!... I remember that woman now.  A real looker of a lady.  Sleek hair, sharp dress, _definitely_ in the chips.  She slipped through the door quick, then started giving orders.  She was acting like the boss of this place, but she also kept looking around like she didn’t want to be seen.  She wanted men’s rings and I sold her a beaut of a gold band.  18K, dome edge, high polish...",
      sound: {
        mp3: audio_mp3_6cd_p1,
        opus: audio_opus_6cd_p1,
      },
      timeout_msec: 30288,
      next: "7",
    },
    {
      id: "7",
      speaker: "billie",
      text: "That sounds like Gladys alright, but why is she buying a ring from another jewelry store?  She can have any ring she wants made by Finster’s and keep it a surprise for her dear old fiance – unless she blabbed about it herself.  Why’s she skulking into another jewel joint?",
      textBubbleType: "thought",
      sound: {
        mp3: audio_mp3_7,
        opus: audio_opus_7,
      },
      timeout_msec: 13944 + 5000,
      choices: [
        {
          text: "*Whistles* Nice ring.  Her finace’s a lucky man.  Did she mention his name?  Or how about her own?",
          next: "7a",
        },
        {
          text: "Yep, that sounds like the woman I’m looking for.  Any chance she leave a name?",
          next: "7b",
        },
        {
          text: "See? Your mind’s like a steel trap.  Surely you have the lady’s name stored up there too.",
          next: "7c",
        },
      ],
    },
    {
      id: "7a",
      speaker: "billie",
      text: "*Whistles* Nice ring.  Her finace’s a lucky man.  Did she mention his name?  Or how about her own?",
      sound: {
        mp3: audio_mp3_7a,
        opus: audio_opus_7a,
      },
      timeout_msec: 6864,
      next: "8",
    },
    {
      id: "7b",
      speaker: "billie",
      text: "Yep, that sounds like the woman I’m looking for.  Any chance she leave a name?",
      sound: {
        mp3: audio_mp3_7b,
        opus: audio_opus_7b,
      },
      timeout_msec: 4680,
      next: "8",
    },
    {
      id: "7c",
      speaker: "billie",
      text: "See? Your mind’s like a steel trap.  Surely you have the lady’s name stored up there too.",
      sound: {
        mp3: audio_mp3_7c,
        opus: audio_opus_7c,
      },
      timeout_msec: 5160,
      next: "8",
    },
    {
      id: "8",
      speaker: "gemcutter_neutral",
      text: "You know I can’t give out customers’ names, even for you.  But the name she gave me was an obvious fake.  And because I like you, Billie, I’ll tell you this: she ordered an engraving on the ring: “To Ferdie. Bless your heart. -G”. Now I’m not saying her fiance is “Ferdie” and I’m not saying her name starts with “G”.  But I’m not not saying that either.",
      sound: {
        mp3: audio_mp3_8,
        opus: audio_opus_8,
      },
      timeout_msec: 22728,
      next: "9",
    },
    // The script has no line 10.
    {
      id: "9",
      speaker: "billie",
      text: "That makes a cute nickname for Ferdinand Carter. That can’t be a coincidence. Gladys really did buy her fiance a ring here. What’s her game?",
      textBubbleType: "thought",
      sound: {
        mp3: audio_mp3_9,
        opus: audio_opus_9,
      },
      timeout_msec: 9456 + 5000,
      choices: [
        {
          text: "Thanks – you’ve been a gem!  I knew I could count on you.",
          next: "10a",
        },
        {
          text: "Yep, that’s definitely her.  Thanks, you’ve been a help!",
          next: "10b",
        },
        {
          text: "I’m not saying that helped.  But I’m not not saying that either.  I’ll see you around.",
          next: "10c",
        },
      ],
    },
    {
      id: "10a",
      speaker: "billie",
      text: "Thanks – you’ve been a gem!  I knew I could count on you.",
      sound: {
        mp3: audio_mp3_10a,
        opus: audio_opus_10a,
      },
      timeout_msec: 3696,
      next: "11",
    },
    {
      id: "10b",
      speaker: "billie",
      text: "Yep, that’s definitely her.  Thanks, you’ve been a help!",
      sound: {
        mp3: audio_mp3_10b,
        opus: audio_opus_10b,
      },
      timeout_msec: 3696,
      next: "11",
    },
    {
      id: "10c",
      speaker: "billie",
      text: "I’m not saying that helped.  But I’m not not saying that either.  I’ll see you around.",
      sound: {
        mp3: audio_mp3_10c,
        opus: audio_opus_10c,
      },
      timeout_msec: 5808,
      next: "11",
    },

    {
      id: "11",
      speaker: "gemcutter_neutral",
      text: "When your mystery lady is found, I do expect you to come back and take me out on that date you promised! Give me a call when you’re free.  Otherwise I’ll have to play the detective and track you down.  Good luck and keep yourself safe!",
      sound: {
        mp3: audio_mp3_11,
        opus: audio_opus_11,
      },
      timeout_msec: 13848,
      next: "12",
    },
    {
      id: "12",
      speaker: "billie",
      text: "Pennsylvania 6-5000. Better tack this up on the pinboard so I don’t lose it.  *sighs* But my date will have to wait. Tracing Gladys here has opened up more questions than it answered.  We’ve got a lot more sleuthing to do following our mysterious lady along her paper trail.",
      sound: {
        mp3: audio_mp3_12,
        opus: audio_opus_12,
      },
      timeout_msec: 16272,
      finalState(_state: JewelryStoreState) {
        return "phone-number";
      },
    },
  ],
};

export const jewelryStoreRewards: {
  [K in JewelryStoreResult]: { asset: string; description: string };
} = {
  "phone-number": {
    asset: phone_number,
    description:
      'A scrap of paper that says "Call me!" with a heart and the text "PEnnsylvania 6-5000"',
  },
};

export default JewelryStoreInteractionGraph;
