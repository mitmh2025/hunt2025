import demo from "../../../assets/demo-photo.png";
import type { InteractionGraph } from "../types";
// TODO: these probably all need to become pngs for transparency
import arcade_owner from "./assets/arcade-owner.jpg";
import roger_baseline from "./assets/roger-baseline.jpg";
import roger_eek from "./assets/roger-eek.jpg";
import roger_focused from "./assets/roger-focused.jpg";
import roger_okay from "./assets/roger-okay.jpg";

export type BoardwalkInteractionState = {
  paranoia: number;
  wins: number;
  played_skeeball: boolean;
  played_lucky_duck: boolean;
  played_pop_the_balloon: boolean;
};
export type BoardwalkInteractionResult = "photo" | "keychain" | "ticket-stub";
type BoardwalkInteractionSpeakers =
  | "billie"
  | "roger_baseline"
  | "roger_eek"
  | "roger_focused"
  | "roger_okay"
  | "arcade_owner";
type BoardwalkInteractionPlugin = "skee-ball" | "ducks" | "balloons";

const stubSoundFileset = {
  mp3: "",
  opus: "",
};

const remainingGameOptions = (state: BoardwalkInteractionState) => {
  const remaining_options = [];
  if (!state.played_skeeball) {
    remaining_options.push({
      text: "Skee-ball.  Heck yes.",
      next: "8a",
      stateEffect(state: BoardwalkInteractionState) {
        return {
          ...state,
          played_skeeball: true,
        };
      },
    });
  }
  if (!state.played_lucky_duck) {
    remaining_options.push({
      text: "This’ll be duck soup.  Literally!",
      next: "8b",
      stateEffect(state: BoardwalkInteractionState) {
        return {
          ...state,
          played_lucky_duck: true,
        };
      },
    });
  }
  if (!state.played_pop_the_balloon) {
    remaining_options.push({
      text: "If I can pop a perp, I can pop a balloon.",
      next: "8c",
      stateEffect(state: BoardwalkInteractionState) {
        return {
          ...state,
          played_pop_the_balloon: true,
        };
      },
    });
  }
  if (
    state.played_skeeball &&
    state.played_lucky_duck &&
    state.played_pop_the_balloon
  ) {
    if (state.wins === 0) {
      remaining_options.push({
        text: "Crap.  How do I convince the kid now?",
        next: "bigloss",
      });
    } else if (state.wins === 3) {
      remaining_options.push({
        text: "How’d we do?",
        next: "bigwin",
      });
    } else {
      remaining_options.push({
        text: "How’d we do?",
        next: "smallwin",
      });
    }
  }
  return remaining_options;
};

const BoardwalkInteractionGraph: InteractionGraph<
  BoardwalkInteractionState,
  BoardwalkInteractionResult,
  BoardwalkInteractionSpeakers,
  BoardwalkInteractionPlugin
> = {
  starting_node: "start",
  starting_state: {
    paranoia: 0,
    wins: 0,
    played_skeeball: false,
    played_lucky_duck: false,
    played_pop_the_balloon: false,
  },
  background: "", // TODO: add background image
  speaker_states: {
    billie: {
      label: "Billie",
      image: demo, // TODO: get speaker images
    },
    roger_baseline: {
      label: "Roger",
      image: roger_baseline, // TODO
    },
    roger_eek: {
      label: "Roger",
      image: roger_eek, // TODO
    },
    roger_focused: {
      label: "Roger",
      image: roger_focused, // TODO
    },
    roger_okay: {
      label: "Roger",
      image: roger_okay, // TODO
    },
    arcade_owner: {
      label: "Arcade owner",
      image: arcade_owner, // TODO
    },
  },
  nodes: [
    {
      id: "start",
      speaker: "billie",
      text: "I found a sailor named Roger inside the arcade.  He was about to throw a ring for some old milk bottle carnie game.",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      choices: [
        {
          text: "Can I talk to you for a sec?",
          next: "1a",
        },
        {
          text: '"Ahoy, matey"?',
          next: "1b",
        },
        {
          text: "<breathe>",
          next: "1c",
        },
        {
          text: "Boo!",
          next: "1d",
          stateEffect(state: BoardwalkInteractionState) {
            return {
              ...state,
              paranoia: state.paranoia + 1,
            };
          },
        },
      ],
    },
    {
      id: "1a",
      speaker: "billie",
      text: "Can I talk to you for a sec?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000,
      next: "2",
    },
    {
      id: "1b",
      speaker: "billie",
      text: '"Ahoy, matey"?',
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000,
      next: "2",
    },
    {
      id: "1c",
      speaker: "billie",
      text: "<breathe>",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000,
      next: "2",
    },
    {
      id: "1d",
      speaker: "billie",
      text: "Boo!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000,
      next: "2",
    },
    {
      id: "2",
      speaker: "roger_eek",
      text: "Gah!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 1000,
      next: "2-p1",
    },
    {
      id: "2-p1",
      speaker: "billie",
      text: "Roger’s throw went wild, ricocheting out the door.",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 4000,
      next: "2-p2",
    },
    {
      id: "2-p2",
      speaker: "roger_eek",
      text: "Why’d you have to sneak up on me like that?  That was my last toss!  I’m in debt enough as it is!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "2-p3",
    },
    {
      id: "2-p3",
      speaker: "roger_eek",
      text: "Wait...are...are you with <whispers> the mob?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000 + 15000,
      choices: [
        {
          text: "No.  I’m Billie O’Ryan.",
          next: "2a",
        },
        {
          text: "I’m a private detective.",
          next: "2b",
        },
        {
          text: "...Of crows?",
          next: "2c",
        },
        {
          text: "Right now, technically, yes?",
          next: "2d",
          stateEffect(state) {
            return {
              ...state,
              paranoia: state.paranoia + 1,
            };
          },
        },
      ],
    },
    {
      id: "2a",
      speaker: "billie",
      text: "No.  I’m Billie O’Ryan.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "3",
    },
    {
      id: "2b",
      speaker: "billie",
      text: "I’m a private detective.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "3",
    },
    {
      id: "2c",
      speaker: "billie",
      text: "...Of crows?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "2c-p1",
    },
    {
      id: "2c-p1",
      speaker: "roger_baseline",
      text: "Caw, caw, very funny.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "3",
    },
    {
      id: "2d",
      speaker: "billie",
      text: "Right now, technically, yes?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 4000,
      next: "2d-p1",
    },
    {
      id: "2d-p1",
      speaker: "roger_baseline",
      text: "Oh I knew it!  I knew this arcade joint was a front! I’m so screwed...",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "3",
    },
    {
      id: "3",
      speaker: "roger_baseline",
      text: "What do you want from me?  I’m busted, ship’s stuck in port, there’s no work for me right now.  And I’m on a losing streak at these games that’s put me even deeper in the hole!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 12000,
      choices: [
        {
          text: "You’re in debt?  For _arcade games_?",
          next: "4a-first",
        },
        {
          text: "Why did you assume I was with the mob?",
          next: "4b-first",
        },
      ],
    },
    // Yeah, there's no flat line 4.  Whatever.
    // This diverges (covering the same points of conversation) until we get to node 5.
    // Path 1:
    {
      id: "4a-first",
      speaker: "billie",
      text: "You’re in debt?  For _arcade games_?",
      sound: stubSoundFileset, // TODO: audio (same as 4a-second)
      timeout_msec: 5000,
      next: "4a-first-p1",
    },
    {
      id: "4a-first-p1",
      speaker: "roger_baseline",
      text: "I’m stuck in port with nothin’ to do and I don’t drink and I don’t dance.  And I don’t gamble.  My mother taught me, never get into gambling, never touch tien gow nor craps nor nuttin’.",
      sound: stubSoundFileset, // TODO: audio (same as 4a-second-p1)
      timeout_msec: 8000,
      next: "4a-first-p2",
    },
    {
      id: "4a-first-p2",
      speaker: "roger_baseline",
      text: "But these games are games of _skill_!  And I swear, normally I’m a finer hand at ’em too.  It’s how I do my X-mas shopping for the nieces and nephews.",
      sound: stubSoundFileset, // TODO: audio (same as 4a-second-p2)
      timeout_msec: 8000,
      next: "4b-second",
    },
    {
      id: "4b-second",
      speaker: "billie",
      text: "Why did you assume I was with the mob?",
      sound: stubSoundFileset, // TODO: audio (same as 4b-first)
      timeout_msec: 4000,
      next: "4b-second-p1",
    },
    {
      id: "4b-second-p1",
      speaker: "roger_baseline",
      text: "I thought the owner was just being kind when she said I could have a tab open.  But I thought about it later, the way crime is in MITropolis, arcades are the perfect place to launder money!  Lots of cash moving through, lots of tourists and kiddos for cover, you’d never suspect it!",
      sound: stubSoundFileset, // TODO audio (same as 4b-first-p1)
      timeout_msec: 15000,
      next: "5",
    },
    // Path 2:
    {
      id: "4b-first",
      speaker: "billie",
      text: "Why did you assume I was with the mob?",
      sound: stubSoundFileset, // TODO: audio (same as 4b-second)
      timeout_msec: 4000,
      next: "4b-first-p1",
    },
    {
      id: "4b-first-p1",
      speaker: "roger_baseline",
      text: "I thought the owner was just being kind when she said I could have a tab open.  But I thought about it later, the way crime is in MITropolis, arcades are the perfect place to launder money!  Lots of cash moving through, lots of tourists and kiddos for cover, you’d never suspect it!",
      sound: stubSoundFileset, // TODO audio (same as 4b-second-p1)
      timeout_msec: 15000,
      next: "4a-second",
    },
    {
      id: "4a-second",
      speaker: "billie",
      text: "You’re in debt?  For _arcade games_?",
      sound: stubSoundFileset, // TODO: audio (same as 4a-second)
      timeout_msec: 5000,
      next: "4a-second-p1",
    },
    {
      id: "4a-second-p1",
      speaker: "roger_baseline",
      text: "I’m stuck in port with nothin’ to do and I don’t drink and I don’t dance.  And I don’t gamble.  My mother taught me, never get into gambling, never touch tien gow nor craps nor nuttin’.",
      sound: stubSoundFileset, // TODO: audio (same as 4a-second-p1)
      timeout_msec: 8000,
      next: "4a-second-p2",
    },
    {
      id: "4a-second-p2",
      speaker: "roger_baseline",
      text: "But these games are games of _skill_!  And I swear, normally I’m a finer hand at ’em too.  It’s how I do my X-mas shopping for the nieces and nephews.",
      sound: stubSoundFileset, // TODO: audio (same as 4a-second-p2)
      timeout_msec: 8000,
      next: "5",
    },

    {
      id: "5",
      speaker: "billie",
      text: "I’m here to ask you about a dame who came through here the other night.  Got a brooch with a bird, maybe a hat with some feathers.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "5-p1",
    },
    {
      id: "5-p1",
      speaker: "roger_eek",
      text: "Oh nooooo, I’m not talking.  With all these IOUs hangin’ over me I don’t need any more trouble!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "5-p2",
    },
    {
      id: "5-p2",
      speaker: "billie",
      text: "The kid’s not wrong about racketeering being a problem in this down.  But I’m prett-y sure this place is legit.  What’s got this kid so rattled?",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "5-p3",
    },
    {
      id: "5-p3",
      speaker: "billie",
      text: "Well, no matter why.  We need to calm him down so he’ll spill on Katrina.",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      choices: [
        {
          // TODO: This feels like it should show the actual line
          text: "<Offer to win some games for him>",
          next: "6a",
          stateEffect(state) {
            return {
              ...state,
              paranoia: state.paranoia - 1,
            };
          },
        },
        {
          // TODO: This feels like it should show the actual line
          text: "<Tell him to get a grip>",
          next: "6b",
        },
      ],
    },
    {
      id: "6a",
      speaker: "billie",
      text: "You know, Roger, I used to play some of these games back in my day. Maybe I can help you out.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 7000,
      next: "7",
    },
    {
      id: "6b",
      speaker: "billie",
      text: "Get a grip, kid. This place is legit, you’re fine. I’ll show ya.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "7",
    },

    {
      id: "7",
      speaker: "roger_baseline",
      text: "Really?  I don’t know...",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 4000,
      next: "7-p1",
    },
    {
      id: "7-p1",
      speaker: "roger_focused",
      text: "I guess, either way, if you won enough tickets, I bet the owner would take that in exchange for the debt.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 6000,
      next: "7-p2",
    },
    {
      id: "7-p2",
      speaker: "roger_okay",
      text: "Then I wouldn’t owe nothin’ to nobody!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "7-p3",
    },
    {
      id: "7-p3",
      speaker: "roger_focused",
      text: "...Except, uh, you, I guess.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 4000,
      next: "7-p4",
    },
    {
      id: "7-p4",
      speaker: "roger_baseline",
      text: "Okay.  There’s three games in this joint that make for the most prize tickets: Skee-Ball, Lucky Duck, and Pop the Balloon.  Which do you wanna try first?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 12000 + 8000,
      choices: remainingGameOptions,
    },
    // Each of these plugin nodes should
    // update state.wins based on the outcome of the game and navigate to
    // one of "first-win", "first-loss", "second-win", "second-loss",
    // "third-win", or "third-loss" accordingly.
    {
      id: "8a",
      speaker: "billie",
      text: "Skee-ball.  Heck yes.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000 + 30000,
      plugin: "skee-ball",
    },
    {
      id: "8b",
      speaker: "billie",
      text: "This’ll be duck soup.  Literally!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000 + 30000,
      plugin: "ducks",
    },
    {
      id: "8c",
      speaker: "billie",
      text: "If I can pop a perp, I can pop a balloon.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000 + 30000,
      plugin: "balloons",
    },

    // Players will reach exactly three of these result nodes exactly once, based on their game performance.
    {
      id: "first-win",
      speaker: "roger_okay",
      text: "Wow!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 1000 + 8000,
      choices: remainingGameOptions,
    },
    {
      id: "first-loss",
      speaker: "roger_focused",
      text: "Oof, that’s rough buddy.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000 + 8000,
      choices: remainingGameOptions,
    },
    {
      id: "second-win",
      speaker: "roger_okay",
      text: "Gee wilickers!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000 + 8000,
      choices: remainingGameOptions,
    },
    {
      id: "second-loss",
      speaker: "roger_focused",
      text: "Geez, we’re in dutch now.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000 + 8000,
      choices: remainingGameOptions,
    },
    {
      id: "third-win",
      speaker: "roger_okay",
      text: "...Can ya teach me how to do that?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000 + 8000,
      next: "bigwin",
    },
    {
      id: "third-loss",
      speaker: "roger_eek",
      text: "Uh...",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000 + 8000,
      choices: remainingGameOptions,
    },

    // Players will land at either "bigwin", "smallwin", or "bigloss".
    {
      id: "bigwin",
      speaker: "arcade_owner",
      text: "Golly, look at all those tickets!  Here’s the grand prize!  Let me take your picture for our winner’s wall.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "bigwin-p1",
    },
    {
      id: "bigwin-p1",
      speaker: "billie",
      text: "Er... <camera click> Actually, what if I left the grand prize with you and we cleared the tab for my friend Roger here?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 12000,
      next: "bigwin-p2",
    },
    {
      id: "bigwin-p2",
      speaker: "arcade_owner",
      text: "Oh, isn’t that kind!  Sure, I can do that.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "bigwin-p3",
    },
    {
      id: "bigwin-p3",
      speaker: "arcade_owner",
      text: "And I’ll send along a copy of that photograph!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "10",
    },

    {
      id: "smallwin",
      speaker: "arcade_owner",
      text: "Well done!  Here’s your prize.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "smallwin-p1",
    },
    {
      id: "smallwin-p1",
      speaker: "billie",
      text: "Actually, what if I left the prize with you and we cleared the tab for my friend Roger here?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 12000,
      next: "smallwin-p2",
    },
    {
      id: "smallwin-p2",
      speaker: "arcade_owner",
      text: "Oh, isn’t that kind!  Sure, I can do that.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "smallwin-p3",
    },
    {
      id: "smallwin-p3",
      speaker: "arcade_owner",
      text: "That’s more than you need for Roger’s tab.  Here’s a small prize as change.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 7000,
      next: "10",
    },

    {
      id: "bigloss",
      speaker: "billie",
      text: "Crap.  How do I convince the kid now?",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      choices: [
        {
          text: "Tell him the games are rigged and a money-laundering racket wouldn’t bother to do that.",
          next: "9a",
          stateEffect(state: BoardwalkInteractionState) {
            return {
              ...state,
              paranoia: state.paranoia - 1,
            };
          },
        },
        {
          text: "Tell him you’ve lost enough money to make up the debt.",
          next: "9b",
        },
        {
          text: "Intimidate him.",
          next: "9c",
          stateEffect(state: BoardwalkInteractionState) {
            return {
              ...state,
              paranoia: state.paranoia + 1000,
            };
          },
        },
      ],
    },
    {
      id: "9a",
      speaker: "billie",
      text: "Look.  These games are _obviously_ rigged.  That means this arcade _actually cares about making money_!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 12000,
      next: "9a-p1",
    },
    {
      id: "9a-p1",
      speaker: "billie",
      text: "If this were a front, they’d want to give legitimate customers as much incentive as possible to spend time at the arcade, to mask the laundered cash.  The prizes would just be a rounding error to them!",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 18000,
      next: "9a-p2",
    },
    {
      id: "9a-p2",
      speaker: "billie",
      text: "_Clearly_ this is just a regular crooked arcade.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      next: "9a-p3",
    },
    {
      id: "9a-p3",
      speaker: "roger_baseline",
      text: "Huh.  I guess that makes sense...",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 4000,
      next: "10",
    },

    {
      id: "9b",
      speaker: "billie",
      text: "I think I’ve lost enough money on this joint to effectively make a payment on whatever debt you owe here.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "9b-p1",
    },
    {
      id: "9b-p1",
      speaker: "roger_focused",
      text: "...Maybe?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "10",
    },

    {
      id: "9c",
      speaker: "billie",
      text: "Roger.  Buddy.  I’m clearly having a bad day.  _I’m not a fun guy to be around when I’m having a bad day._",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 12000,
      next: "9c-p1",
    },
    {
      id: "9c-p1",
      speaker: "roger_eek",
      text: "<gulp>",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 1000,
      next: "9c-p2",
    },
    {
      id: "9c-p2",
      speaker: "billie",
      text: "Tell me what you know about that dame.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 4000,
      next: "11",
    },

    {
      id: "10",
      speaker: "billie",
      text: "So.  What can you tell me about that dame who came in?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "11",
    },

    // At this point, all paths have reconverged
    {
      id: "11",
      speaker: "roger_okay",
      text: "I saw her stop by the arcade late last night.  She played one game of Redhot Racers and then she scrammed.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 8000,
      next: "11-p2",
    },
    {
      id: "11-p2",
      speaker: "roger_okay",
      text: "I’ve seen that lady before, though. In Chinatown, where my family lives. She’s been loiterin’ all over the neighborhood for a while now.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next(state: BoardwalkInteractionState) {
        if (state.paranoia <= 1) {
          return "11-details";
        } else {
          return "11-afraid";
        }
      },
    },

    {
      id: "11-details",
      speaker: "roger_okay",
      text: "She never has a reason for bein’ there–doesn’t live there, doesn’t work there, hardly ever buys anything. It’s weird.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next(state: BoardwalkInteractionState) {
        if (state.paranoia <= -1) {
          return "11-more-details";
        } else {
          return "11-afraid";
        }
      },
    },

    {
      id: "11-more-details",
      speaker: "roger_okay",
      text: "Not that long after she showed up, a huge gang war broke out in Chinatown.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 7000,
      next: "11-more-details-p1",
    },
    {
      id: "11-more-details-p1",
      speaker: "roger_focused",
      text: "Two rival gangs destroyed each other. Collateral damage too – brother-in-law got hurt. Baaaad times.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "11-more-details-p2",
    },
    {
      id: "11-more-details-p2",
      speaker: "roger_focused",
      text: "Papa Finster and his trouble boys picked up the pieces–they’ve owned the neighborhood ever since.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 10000,
      next: "11-more-details-p3",
    },
    {
      id: "11-more-details-p3",
      speaker: "roger_okay",
      text: "I think that’s all I can tell you.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "11-more-details-p4",
    },
    {
      id: "11-more-details-p4",
      speaker: "billie",
      text: "Thanks, kid.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 3000,
      next: "12",
    },
    {
      id: "11-afraid",
      speaker: "roger_focused",
      text: "...Can I go now?",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000,
      next: "11-afraid-p1",
    },
    {
      id: "11-afraid-p1",
      speaker: "billie",
      text: "...Yes.",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 2000,
      next: "12",
    },

    // And we've converged again.
    {
      id: "12",
      speaker: "billie",
      text: "Alright. We need to track where Katrina’s coming and going and what’s with these notes she’s leaving. It sounds like she’s doing a lot of that business in Chinatown.",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 15000,
      next: "12-p1",
    },
    {
      id: "12-p1",
      speaker: "billie",
      text: "Let’s set up a stakeout.",
      textBubbleType: "thought",
      sound: stubSoundFileset, // TODO: audio
      timeout_msec: 5000,
      finalState(state: BoardwalkInteractionState): BoardwalkInteractionResult {
        if (state.wins === 3) {
          return "photo";
        } else if (state.wins === 0) {
          return "ticket-stub";
        } else {
          return "keychain";
        }
      },
    },
  ],
};

export default BoardwalkInteractionGraph;
