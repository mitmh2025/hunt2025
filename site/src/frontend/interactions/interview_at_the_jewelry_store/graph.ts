import demo from "../../../assets/demo-photo.png";
import type { InteractionGraph } from "../types";

type JewelryStoreState = {
  idea1: boolean; // did we try option 6a yet?
  idea2: boolean; // did we try option 6b yet?
};
type JewelryStoreResult = "";
type JewelryStoreSpeaker = "billie" | "gemcutter";

const stubSoundFileset = {
  mp3: "",
  opus: "",
};

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
  JewelryStoreSpeaker
> = {
  starting_node: "start",
  starting_state: {
    idea1: false,
    idea2: false,
  },
  background: "", // TODO: get a background image
  speaker_states: {
    billie: {
      label: "Billie",
      image: demo, // TODO: get pose images
    },
    gemcutter: {
      label: "Micah",
      image: demo, // TODO: get pose images
    },
  },
  nodes: [
    {
      id: "start",
      speaker: "billie",
      text: "I headed over to the Jaded Jeweler’s after hours to figure out what Gladys Finster was doing frequenting a competitor’s store.  I’m old pals with the owner, Micah Flint, since he appraised some broad’s inheritance for a case of mine.  May have browsed a bit myself, but I’m sure not a regular customer.",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "1",
    },
    {
      id: "1",
      speaker: "gemcutter",
      text: "Back again so soon, O’Ryan?  Got another piece for me to look over?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000 + 15000, // 5 second line, 15 seconds voting time?
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
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "2ab-p1",
    },
    {
      id: "2b",
      speaker: "billie",
      text: "Naw, nothing so straightforward as that case.  Now I’m trying to follow the footsteps of a woman.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "2ab-p1",
    },
    {
      id: "2c",
      speaker: "billie",
      text: "I seem to remember you doing a bit more than looking last time.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "2cd-p1",
    },
    {
      id: "2d",
      speaker: "billie",
      text: "I can’t just come to see my favorite gem cutter?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "2cd-p1",
    },
    {
      id: "2ab-p1",
      speaker: "gemcutter",
      text: "A woman, huh?  And you think this lady came through here?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000 + 15000,
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
      speaker: "gemcutter",
      text: "Pretty words for a pretty PI...But what are you really here for?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000 + 15000,
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
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "5",
    },
    {
      id: "3b",
      speaker: "billie",
      text: "Yeah, I’m tracking down a dame who came in here earlier today.  She’d’ve come in here knowing exactly what she wanted.  A bossy type.  You couldn’t miss her.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "5",
    },
    {
      id: "3c",
      speaker: "billie",
      text: "Yeah, I’m tracking down a woman who came in here earlier today.  Someone who knows the jewel lingo.  You’d’ve pegged her for the competition easy.  You couldn’t miss her.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "5",
    },
    {
      id: "4a",
      speaker: "billie",
      text: "I’m tracking down a woman who came in here.  Tall, slender, with dark hair.  Looks like she draws a lot of water.  You couldn’t miss her.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "5",
    },
    {
      id: "4b",
      speaker: "billie",
      text: "I’m tracking down a dame who came in here earlier today.  She’d’ve come in here knowing exactly what she wanted.  A bossy type.  You couldn’t miss her.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "5",
    },
    {
      id: "4c",
      speaker: "billie",
      text: "I’m tracking down a woman who came in here earlier today.  Someone who knows the jewel lingo.  You’d’ve pegged her for the competition easy.  You couldn’t miss her.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "5",
    },

    // All dialog branches have converged here.
    {
      id: "5",
      speaker: "gemcutter",
      text: "Ah, yes, I think I remember a lady like that.  Maybe you can help jog my memory.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000 + 15000,
      choices: remainingOptions,
    },

    {
      id: "6a",
      speaker: "billie",
      text: "This handsome mug’s not enough for you?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "6a-p1",
    },
    {
      id: "6a-p1",
      speaker: "gemcutter",
      text: "You’re an eyeful, Billie, but when I look at that face my memory just flies outta my head.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      choices: remainingOptions,
    },
    {
      id: "6b",
      speaker: "billie",
      text: "Hm...does 50 bucks help with your memory?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "6b-p1",
    },
    {
      id: "6b-p1",
      speaker: "gemcutter",
      text: "Pah, money!  Billie, I thought we were friends.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      choices: remainingOptions,
    },
    {
      id: "6c",
      speaker: "billie",
      text: "I recall you’re a gambling man. I’ve got an in on the hound races this Saturday.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "6cd-p1",
    },
    {
      id: "6d",
      speaker: "billie",
      text: "What would you say if I could take you for a ride in Papa Finster’s slick Duesenberg?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "6cd-p1",
    },
    // All paths have now converged on 6cd-p1
    {
      id: "6cd-p1",
      speaker: "gemcutter",
      text: "You know me well, Billie.  I’ll hold you to that date!... I remember that woman now.  A real looker of a lady.  Sleek hair, sharp dress, _definitely_ in the chips.  She slipped in the door quick, then started giving orders.  She was acting like the boss of this place, but she also kept looking around like she didn’t want to be seen.  She wanted men’s rings and I sold her a beaut of a gold band.  18K, dome edge, high polish...",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 20000,
      next: "7",
    },
    {
      id: "7",
      speaker: "billie",
      text: "That sounds like Gladys alright, but why is she buying a ring from another jewelry store?  She can have any ring she wants made by Finster’s and keep it a surprise for her dear old fiance – unless she blabbed about it herself.  Why’s she skulking into another jewel joint?",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 20000 + 15000,
      choices: [
        {
          text: "*Whistles* Nice ring.  Her finace’s a lucky man.  Did she mention his name?  Or how about her own?",
          next: "7a",
        },
        {
          text: "Yep, that sounds like the woman I’m looking for.  Did she leave a name?",
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
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "8",
    },
    {
      id: "7b",
      speaker: "billie",
      text: "Yep, that sounds like the woman I’m looking for.  Did she leave a name?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "8",
    },
    {
      id: "7c",
      speaker: "billie",
      text: "See? Your mind’s like a steel trap.  Surely you have the lady’s name stored up there too.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "8",
    },
    {
      id: "8",
      speaker: "gemcutter",
      text: "You know I can’t give out customers’ names, even for you.  But the name she gave me was an obvious fake.  And because I like you, Billie, I’ll tell you this: she ordered an engraving on the ring: “To Ferdie. Bless your heart. -G”. Now I’m not saying her fiance is “Ferdie” and I’m not saying her name starts with “G”.  But I’m not not saying that either.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 20000,
      next: "9",
    },
    // The script has no line 10.
    {
      id: "9",
      speaker: "billie",
      text: "That makes a cute nickname for Ferdinand Carter. That can’t be a coincidence. Gladys really did buy her fiance a ring here. What’s her game?",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000 + 15000,
      choices: [
        {
          text: "Thanks – you’ve been a gem!  I knew I could count on you.",
          next: "10a",
        },
        {
          text: "Yep, that's definitely her.  Thanks, you’ve been a help!",
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
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "11",
    },
    {
      id: "10b",
      speaker: "billie",
      text: "Yep, that's definitely her.  Thanks, you’ve been a help!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "11",
    },
    {
      id: "10c",
      speaker: "billie",
      text: "I’m not saying that helped.  But I’m not not saying that either.  I’ll see you around.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "11",
    },

    {
      id: "11",
      speaker: "gemcutter",
      text: "When your mystery lady is found, I do expect you to come back and take me out on that date you promised! Give me a call when you’re free.  Otherwise I’ll have to play the detective and track you down.  Good luck and keep yourself safe!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 20000,
      next: "12",
    },
    {
      id: "12",
      speaker: "billie",
      text: "Pennsylvania 6-5000. Better tack this up on the pinboard so I don’t lose it.  *sighs* But my date will have to wait. Tracing Gladys here has opened up more questions than it answered.  We’ve got a lot more sleuthing to do following our mysterious lady along her paper trail.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 20000,
      finalState(_state: JewelryStoreState) {
        return "";
      },
    },
  ],
};

export default JewelryStoreInteractionGraph;
