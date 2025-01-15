import demo from "../../../assets/demo-photo.png";
import type { InteractionGraph } from "../types";
import arcadia_speaker from "./assets/arcadia-speaker.jpg";
import roger_baseline_speaker from "./assets/roger-baseline-speaker.jpg";
import roger_eek_speaker from "./assets/roger-eek-speaker.jpg";
import roger_focused_speaker from "./assets/roger-focus-speaker.jpg";
import roger_okay_speaker from "./assets/roger-okay-speaker.jpg";
// import roger_baseline from "./assets/roger-baseline.png";
// import roger_eek from "./assets/roger-eek.png";
// import roger_focused from "./assets/roger-focus.png";
// import roger_okay from "./assets/roger-okay.png";
// import roger_arcadia_baseline from "./assets/roger-arcadia-baseline.png";
// import roger_arcadia_eek from "./assets/roger-arcadia-eek.png";
// import roger_arcadia_focused from "./assets/roger-arcadia-focus.png";
// import roger_arcadia_okay from "./assets/roger-arcadia-okay.png";
import mp3_audio_10 from "./audio/mp3/10.mp3";
import mp3_audio_11_afraid_p1 from "./audio/mp3/11-afraid-p1.mp3";
import mp3_audio_11_afraid from "./audio/mp3/11-afraid.mp3";
import mp3_audio_11_details from "./audio/mp3/11-details.mp3";
import mp3_audio_11_more_details_p1 from "./audio/mp3/11-more-details-p1.mp3";
import mp3_audio_11_more_details_p2 from "./audio/mp3/11-more-details-p2.mp3";
import mp3_audio_11_more_details_p3 from "./audio/mp3/11-more-details-p3.mp3";
import mp3_audio_11_more_details_p4 from "./audio/mp3/11-more-details-p4.mp3";
import mp3_audio_11_more_details from "./audio/mp3/11-more-details.mp3";
import mp3_audio_11_p2 from "./audio/mp3/11-p2.mp3";
import mp3_audio_11 from "./audio/mp3/11.mp3";
import mp3_audio_12_p1 from "./audio/mp3/12-p1.mp3";
import mp3_audio_12 from "./audio/mp3/12.mp3";
import mp3_audio_1a from "./audio/mp3/1a.mp3";
import mp3_audio_1b from "./audio/mp3/1b.mp3";
import mp3_audio_1c from "./audio/mp3/1c.mp3";
import mp3_audio_1d from "./audio/mp3/1d.mp3";
import mp3_audio_2_p1 from "./audio/mp3/2-p1.mp3";
import mp3_audio_2_p2 from "./audio/mp3/2-p2.mp3";
import mp3_audio_2_p3 from "./audio/mp3/2-p3.mp3";
import mp3_audio_2 from "./audio/mp3/2.mp3";
import mp3_audio_2a from "./audio/mp3/2a.mp3";
import mp3_audio_2b from "./audio/mp3/2b.mp3";
import mp3_audio_2c_p1 from "./audio/mp3/2c-p1.mp3";
import mp3_audio_2c from "./audio/mp3/2c.mp3";
import mp3_audio_2d_p1 from "./audio/mp3/2d-p1.mp3";
import mp3_audio_2d from "./audio/mp3/2d.mp3";
import mp3_audio_3 from "./audio/mp3/3.mp3";
import mp3_audio_4a_first_p1 from "./audio/mp3/4a-first-p1.mp3";
import mp3_audio_4a_first_p2 from "./audio/mp3/4a-first-p2.mp3";
import mp3_audio_4a_first from "./audio/mp3/4a-first.mp3";
import mp3_audio_4a_second_p1 from "./audio/mp3/4a-second-p1.mp3";
import mp3_audio_4a_second_p2 from "./audio/mp3/4a-second-p2.mp3";
import mp3_audio_4a_second from "./audio/mp3/4a-second.mp3";
import mp3_audio_4b_first_p1 from "./audio/mp3/4b-first-p1.mp3";
import mp3_audio_4b_first from "./audio/mp3/4b-first.mp3";
import mp3_audio_4b_second_p1 from "./audio/mp3/4b-second-p1.mp3";
import mp3_audio_4b_second from "./audio/mp3/4b-second.mp3";
import mp3_audio_5_p1 from "./audio/mp3/5-p1.mp3";
import mp3_audio_5_p2 from "./audio/mp3/5-p2.mp3";
import mp3_audio_5_p3 from "./audio/mp3/5-p3.mp3";
import mp3_audio_5 from "./audio/mp3/5.mp3";
import mp3_audio_6a from "./audio/mp3/6a.mp3";
import mp3_audio_6b from "./audio/mp3/6b.mp3";
import mp3_audio_7_p1 from "./audio/mp3/7-p1.mp3";
import mp3_audio_7_p2 from "./audio/mp3/7-p2.mp3";
import mp3_audio_7_p3 from "./audio/mp3/7-p3.mp3";
import mp3_audio_7_p4 from "./audio/mp3/7-p4.mp3";
import mp3_audio_7 from "./audio/mp3/7.mp3";
import mp3_audio_8a from "./audio/mp3/8a.mp3";
import mp3_audio_8b from "./audio/mp3/8b.mp3";
import mp3_audio_8c from "./audio/mp3/8c.mp3";
import mp3_audio_9a_p1 from "./audio/mp3/9a-p1.mp3";
import mp3_audio_9a_p2 from "./audio/mp3/9a-p2.mp3";
import mp3_audio_9a_p3 from "./audio/mp3/9a-p3.mp3";
import mp3_audio_9a from "./audio/mp3/9a.mp3";
import mp3_audio_9b_p1 from "./audio/mp3/9b-p1.mp3";
import mp3_audio_9b from "./audio/mp3/9b.mp3";
import mp3_audio_9c_p1 from "./audio/mp3/9c-p1.mp3";
import mp3_audio_9c_p2 from "./audio/mp3/9c-p2.mp3";
import mp3_audio_9c from "./audio/mp3/9c.mp3";
import mp3_audio_bigloss from "./audio/mp3/bigloss.mp3";
import mp3_audio_bigwin_p1 from "./audio/mp3/bigwin-p1.mp3";
import mp3_audio_bigwin_p2 from "./audio/mp3/bigwin-p2.mp3";
import mp3_audio_bigwin_p3 from "./audio/mp3/bigwin-p3.mp3";
import mp3_audio_bigwin from "./audio/mp3/bigwin.mp3";
import mp3_audio_first_loss from "./audio/mp3/first-loss.mp3";
import mp3_audio_first_win from "./audio/mp3/first-win.mp3";
import mp3_audio_second_loss from "./audio/mp3/second-loss.mp3";
import mp3_audio_second_win from "./audio/mp3/second-win.mp3";
import mp3_audio_smallwin_p1 from "./audio/mp3/smallwin-p1.mp3";
import mp3_audio_smallwin_p2 from "./audio/mp3/smallwin-p2.mp3";
import mp3_audio_smallwin_p3 from "./audio/mp3/smallwin-p3.mp3";
import mp3_audio_smallwin from "./audio/mp3/smallwin.mp3";
import mp3_audio_start from "./audio/mp3/start.mp3";
import mp3_audio_third_loss from "./audio/mp3/third-loss.mp3";
import mp3_audio_third_win from "./audio/mp3/third-win.mp3";
import opus_audio_10 from "./audio/opus/10.opus";
import opus_audio_11_afraid_p1 from "./audio/opus/11-afraid-p1.opus";
import opus_audio_11_afraid from "./audio/opus/11-afraid.opus";
import opus_audio_11_details from "./audio/opus/11-details.opus";
import opus_audio_11_more_details_p1 from "./audio/opus/11-more-details-p1.opus";
import opus_audio_11_more_details_p2 from "./audio/opus/11-more-details-p2.opus";
import opus_audio_11_more_details_p3 from "./audio/opus/11-more-details-p3.opus";
import opus_audio_11_more_details_p4 from "./audio/opus/11-more-details-p4.opus";
import opus_audio_11_more_details from "./audio/opus/11-more-details.opus";
import opus_audio_11_p2 from "./audio/opus/11-p2.opus";
import opus_audio_11 from "./audio/opus/11.opus";
import opus_audio_12_p1 from "./audio/opus/12-p1.opus";
import opus_audio_12 from "./audio/opus/12.opus";
import opus_audio_1a from "./audio/opus/1a.opus";
import opus_audio_1b from "./audio/opus/1b.opus";
import opus_audio_1c from "./audio/opus/1c.opus";
import opus_audio_1d from "./audio/opus/1d.opus";
import opus_audio_2_p1 from "./audio/opus/2-p1.opus";
import opus_audio_2_p2 from "./audio/opus/2-p2.opus";
import opus_audio_2_p3 from "./audio/opus/2-p3.opus";
import opus_audio_2 from "./audio/opus/2.opus";
import opus_audio_2a from "./audio/opus/2a.opus";
import opus_audio_2b from "./audio/opus/2b.opus";
import opus_audio_2c_p1 from "./audio/opus/2c-p1.opus";
import opus_audio_2c from "./audio/opus/2c.opus";
import opus_audio_2d_p1 from "./audio/opus/2d-p1.opus";
import opus_audio_2d from "./audio/opus/2d.opus";
import opus_audio_3 from "./audio/opus/3.opus";
import opus_audio_4a_first_p1 from "./audio/opus/4a-first-p1.opus";
import opus_audio_4a_first_p2 from "./audio/opus/4a-first-p2.opus";
import opus_audio_4a_first from "./audio/opus/4a-first.opus";
import opus_audio_4a_second_p1 from "./audio/opus/4a-second-p1.opus";
import opus_audio_4a_second_p2 from "./audio/opus/4a-second-p2.opus";
import opus_audio_4a_second from "./audio/opus/4a-second.opus";
import opus_audio_4b_first_p1 from "./audio/opus/4b-first-p1.opus";
import opus_audio_4b_first from "./audio/opus/4b-first.opus";
import opus_audio_4b_second_p1 from "./audio/opus/4b-second-p1.opus";
import opus_audio_4b_second from "./audio/opus/4b-second.opus";
import opus_audio_5_p1 from "./audio/opus/5-p1.opus";
import opus_audio_5_p2 from "./audio/opus/5-p2.opus";
import opus_audio_5_p3 from "./audio/opus/5-p3.opus";
import opus_audio_5 from "./audio/opus/5.opus";
import opus_audio_6a from "./audio/opus/6a.opus";
import opus_audio_6b from "./audio/opus/6b.opus";
import opus_audio_7_p1 from "./audio/opus/7-p1.opus";
import opus_audio_7_p2 from "./audio/opus/7-p2.opus";
import opus_audio_7_p3 from "./audio/opus/7-p3.opus";
import opus_audio_7_p4 from "./audio/opus/7-p4.opus";
import opus_audio_7 from "./audio/opus/7.opus";
import opus_audio_8a from "./audio/opus/8a.opus";
import opus_audio_8b from "./audio/opus/8b.opus";
import opus_audio_8c from "./audio/opus/8c.opus";
import opus_audio_9a_p1 from "./audio/opus/9a-p1.opus";
import opus_audio_9a_p2 from "./audio/opus/9a-p2.opus";
import opus_audio_9a_p3 from "./audio/opus/9a-p3.opus";
import opus_audio_9a from "./audio/opus/9a.opus";
import opus_audio_9b_p1 from "./audio/opus/9b-p1.opus";
import opus_audio_9b from "./audio/opus/9b.opus";
import opus_audio_9c_p1 from "./audio/opus/9c-p1.opus";
import opus_audio_9c_p2 from "./audio/opus/9c-p2.opus";
import opus_audio_9c from "./audio/opus/9c.opus";
import opus_audio_bigloss from "./audio/opus/bigloss.opus";
import opus_audio_bigwin_p1 from "./audio/opus/bigwin-p1.opus";
import opus_audio_bigwin_p2 from "./audio/opus/bigwin-p2.opus";
import opus_audio_bigwin_p3 from "./audio/opus/bigwin-p3.opus";
import opus_audio_bigwin from "./audio/opus/bigwin.opus";
import opus_audio_first_loss from "./audio/opus/first-loss.opus";
import opus_audio_first_win from "./audio/opus/first-win.opus";
import opus_audio_second_loss from "./audio/opus/second-loss.opus";
import opus_audio_second_win from "./audio/opus/second-win.opus";
import opus_audio_smallwin_p1 from "./audio/opus/smallwin-p1.opus";
import opus_audio_smallwin_p2 from "./audio/opus/smallwin-p2.opus";
import opus_audio_smallwin_p3 from "./audio/opus/smallwin-p3.opus";
import opus_audio_smallwin from "./audio/opus/smallwin.opus";
import opus_audio_start from "./audio/opus/start.opus";
import opus_audio_third_loss from "./audio/opus/third-loss.opus";
import opus_audio_third_win from "./audio/opus/third-win.opus";

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
      image: roger_baseline_speaker,
    },
    roger_eek: {
      label: "Roger",
      image: roger_eek_speaker,
    },
    roger_focused: {
      label: "Roger",
      image: roger_focused_speaker,
    },
    roger_okay: {
      label: "Roger",
      image: roger_okay_speaker,
    },
    arcade_owner: {
      label: "Arcade owner",
      image: arcadia_speaker,
    },
  },
  nodes: [
    {
      id: "start",
      speaker: "billie",
      text: "I found a sailor named Roger inside the arcade.  He was about to throw a ring for some old milk bottle carnie game.",
      textBubbleType: "thought",
      sound: {
        mp3: mp3_audio_start,
        opus: opus_audio_start,
      },
      timeout_msec: 6360 + 5000,
      choices: [
        {
          text: "Can I talk to you for a sec?",
          next: "1a",
        },
        {
          text: "“Ahoy, matey”?",
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
      sound: {
        mp3: mp3_audio_1a,
        opus: opus_audio_1a,
      },
      timeout_msec: 2256,
      next: "2",
    },
    {
      id: "1b",
      speaker: "billie",
      text: "“Ahoy, matey”?",
      sound: {
        mp3: mp3_audio_1b,
        opus: opus_audio_1b,
      },
      timeout_msec: 1968,
      next: "2",
    },
    {
      id: "1c",
      speaker: "billie",
      text: "<breathe>",
      sound: {
        mp3: mp3_audio_1c,
        opus: opus_audio_1c,
      },
      timeout_msec: 2184,
      next: "2",
    },
    {
      id: "1d",
      speaker: "billie",
      text: "Boo!",
      sound: {
        mp3: mp3_audio_1d,
        opus: opus_audio_1d,
      },
      timeout_msec: 1128,
      next: "2",
    },
    {
      id: "2",
      speaker: "roger_eek",
      text: "Gah!",
      sound: {
        mp3: mp3_audio_2,
        opus: opus_audio_2,
      },
      timeout_msec: 1296,
      next: "2-p1",
    },
    {
      id: "2-p1",
      speaker: "billie",
      text: "Roger’s throw went wild, ricocheting out the door.",
      textBubbleType: "thought",
      sound: {
        mp3: mp3_audio_2_p1,
        opus: opus_audio_2_p1,
      },
      timeout_msec: 3864,
      next: "2-p2",
    },
    {
      id: "2-p2",
      speaker: "roger_eek",
      text: "Why’d you have to sneak up on me like that?  That was my last toss!  I’m in debt enough as it is!",
      sound: {
        mp3: mp3_audio_2_p2,
        opus: opus_audio_2_p2,
      },
      timeout_msec: 5208,
      next: "2-p3",
    },
    {
      id: "2-p3",
      speaker: "roger_eek",
      text: "Wait...are...are you with <whispers> the mob?",
      sound: {
        mp3: mp3_audio_2_p3,
        opus: opus_audio_2_p3,
      },
      timeout_msec: 4728 + 5000,
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
      sound: {
        mp3: mp3_audio_2a,
        opus: opus_audio_2a,
      },
      timeout_msec: 2712,
      next: "3",
    },
    {
      id: "2b",
      speaker: "billie",
      text: "I’m a private detective.",
      sound: {
        mp3: mp3_audio_2b,
        opus: opus_audio_2b,
      },
      timeout_msec: 1872,
      next: "3",
    },
    {
      id: "2c",
      speaker: "billie",
      text: "...Of crows?",
      sound: {
        mp3: mp3_audio_2c,
        opus: opus_audio_2c,
      },
      timeout_msec: 1536,
      next: "2c-p1",
    },
    {
      id: "2c-p1",
      speaker: "roger_baseline",
      text: "Caw, caw, very funny.",
      sound: {
        mp3: mp3_audio_2c_p1,
        opus: opus_audio_2c_p1,
      },
      timeout_msec: 3024,
      next: "3",
    },
    {
      id: "2d",
      speaker: "billie",
      text: "Right now, technically, yes?",
      sound: {
        mp3: mp3_audio_2d,
        opus: opus_audio_2d,
      },
      timeout_msec: 2664,
      next: "2d-p1",
    },
    {
      id: "2d-p1",
      speaker: "roger_baseline",
      text: "Oh I knew it!  I knew this arcade joint was a front! I’m so screwed...",
      sound: {
        mp3: mp3_audio_2d_p1,
        opus: opus_audio_2d_p1,
      },
      timeout_msec: 4392,
      next: "3",
    },
    {
      id: "3",
      speaker: "roger_baseline",
      text: "What do you want from me?  I’m busted, ship’s stuck in port, there’s no work for me right now.  And I’m on a losing streak at these games that’s put me even deeper in the hole!",
      sound: {
        mp3: mp3_audio_3,
        opus: opus_audio_3,
      },
      timeout_msec: 7584 + 4000,
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
      sound: {
        mp3: mp3_audio_4a_first,
        opus: opus_audio_4a_first,
      },
      timeout_msec: 3264,
      next: "4a-first-p1",
    },
    {
      id: "4a-first-p1",
      speaker: "roger_baseline",
      text: "I’m stuck in port with nothin’ to do and I don’t drink and I don’t dance.  And I don’t gamble.  My mother taught me, never get into gambling, never touch tien gow nor craps nor nuttin’.",
      sound: {
        mp3: mp3_audio_4a_first_p1,
        opus: opus_audio_4a_first_p1,
      },
      timeout_msec: 9096,
      next: "4a-first-p2",
    },
    {
      id: "4a-first-p2",
      speaker: "roger_baseline",
      text: "But these games are games of _skill_!  And I swear, normally I’m a finer hand at ’em too.  It’s how I do my X-mas shopping for the nieces and nephews.",
      sound: {
        mp3: mp3_audio_4a_first_p2,
        opus: opus_audio_4a_first_p2,
      },
      timeout_msec: 7464,
      next: "4b-second",
    },
    {
      id: "4b-second",
      speaker: "billie",
      text: "Why did you assume I was with the mob?",
      sound: {
        mp3: mp3_audio_4b_second,
        opus: opus_audio_4b_second,
      },
      timeout_msec: 2376,
      next: "4b-second-p1",
    },
    {
      id: "4b-second-p1",
      speaker: "roger_baseline",
      text: "I thought the owner was just being kind when she said I could have a tab open.  But I thought about it later, the way crime is in MITropolis, arcades are the perfect place to launder money!  Lots of cash moving through, lots of tourists and kiddos for cover, you’d never suspect it!",
      sound: {
        mp3: mp3_audio_4b_second_p1,
        opus: opus_audio_4b_second_p1,
      },
      timeout_msec: 12384,
      next: "5",
    },
    // Path 2:
    {
      id: "4b-first",
      speaker: "billie",
      text: "Why did you assume I was with the mob?",
      sound: {
        mp3: mp3_audio_4b_first,
        opus: opus_audio_4b_first,
      },
      timeout_msec: 2376,
      next: "4b-first-p1",
    },
    {
      id: "4b-first-p1",
      speaker: "roger_baseline",
      text: "I thought the owner was just being kind when she said I could have a tab open.  But I thought about it later, the way crime is in MITropolis, arcades are the perfect place to launder money!  Lots of cash moving through, lots of tourists and kiddos for cover, you’d never suspect it!",
      sound: {
        mp3: mp3_audio_4b_first_p1,
        opus: opus_audio_4b_first_p1,
      },
      timeout_msec: 12384,
      next: "4a-second",
    },
    {
      id: "4a-second",
      speaker: "billie",
      text: "You’re in debt?  For _arcade games_?",
      sound: {
        mp3: mp3_audio_4a_second,
        opus: opus_audio_4a_second,
      },
      timeout_msec: 3264,
      next: "4a-second-p1",
    },
    {
      id: "4a-second-p1",
      speaker: "roger_baseline",
      text: "I’m stuck in port with nothin’ to do and I don’t drink and I don’t dance.  And I don’t gamble.  My mother taught me, never get into gambling, never touch tien gow nor craps nor nuttin’.",
      sound: {
        mp3: mp3_audio_4a_second_p1,
        opus: opus_audio_4a_second_p1,
      },
      timeout_msec: 9096,
      next: "4a-second-p2",
    },
    {
      id: "4a-second-p2",
      speaker: "roger_baseline",
      text: "But these games are games of _skill_!  And I swear, normally I’m a finer hand at ’em too.  It’s how I do my X-mas shopping for the nieces and nephews.",
      sound: {
        mp3: mp3_audio_4a_second_p2,
        opus: opus_audio_4a_second_p2,
      },
      timeout_msec: 7464,
      next: "5",
    },

    {
      id: "5",
      speaker: "billie",
      text: "I’m here to ask you about a dame who came through here the other night.  Got a brooch with a bird, maybe a hat with some feathers.",
      sound: {
        mp3: mp3_audio_5,
        opus: opus_audio_5,
      },
      timeout_msec: 6264,
      next: "5-p1",
    },
    {
      id: "5-p1",
      speaker: "roger_eek",
      text: "Oh nooooo, I’m not talking.  With all these IOUs hangin’ over me I don’t need any more trouble!",
      sound: {
        mp3: mp3_audio_5_p1,
        opus: opus_audio_5_p1,
      },
      timeout_msec: 5304,
      next: "5-p2",
    },
    {
      id: "5-p2",
      speaker: "billie",
      text: "The kid’s not wrong about racketeering being a problem in this down.  But I’m prett-y sure this place is legit.  What’s got this kid so rattled?",
      textBubbleType: "thought",
      sound: {
        mp3: mp3_audio_5_p2,
        opus: opus_audio_5_p2,
      },
      timeout_msec: 8328,
      next: "5-p3",
    },
    {
      id: "5-p3",
      speaker: "billie",
      text: "Well, no matter why.  We need to calm him down so he’ll spill on Katrina.",
      textBubbleType: "thought",
      sound: {
        mp3: mp3_audio_5_p3,
        opus: opus_audio_5_p3,
      },
      timeout_msec: 5112 + 4000,
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
      sound: {
        mp3: mp3_audio_6a,
        opus: opus_audio_6a,
      },
      timeout_msec: 5040,
      next: "7",
    },
    {
      id: "6b",
      speaker: "billie",
      text: "Get a grip, kid. This place is legit, you’re fine. I’ll show ya.",
      sound: {
        mp3: mp3_audio_6b,
        opus: opus_audio_6b,
      },
      timeout_msec: 4728,
      next: "7",
    },

    {
      id: "7",
      speaker: "roger_baseline",
      text: "Really?  I don’t know...",
      sound: {
        mp3: mp3_audio_7,
        opus: opus_audio_7,
      },
      timeout_msec: 2976,
      next: "7-p1",
    },
    {
      id: "7-p1",
      speaker: "roger_focused",
      text: "I guess, either way, if you won enough tickets, I bet the owner would take that in exchange for the debt.",
      sound: {
        mp3: mp3_audio_7_p1,
        opus: opus_audio_7_p1,
      },
      timeout_msec: 4824,
      next: "7-p2",
    },
    {
      id: "7-p2",
      speaker: "roger_okay",
      text: "Then I wouldn’t owe nothin’ to nobody!",
      sound: {
        mp3: mp3_audio_7_p2,
        opus: opus_audio_7_p2,
      },
      timeout_msec: 2280,
      next: "7-p3",
    },
    {
      id: "7-p3",
      speaker: "roger_focused",
      text: "...Except, uh, you, I guess.",
      sound: {
        mp3: mp3_audio_7_p3,
        opus: opus_audio_7_p3,
      },
      timeout_msec: 2592,
      next: "7-p4",
    },
    {
      id: "7-p4",
      speaker: "roger_baseline",
      text: "Okay.  There’s three games in this joint that make for the most prize tickets: Skee-Ball, Lucky Duck, and Pop the Balloon.  Which do you wanna try first?",
      sound: {
        mp3: mp3_audio_7_p4,
        opus: opus_audio_7_p4,
      },
      timeout_msec: 7776 + 5000,
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
      sound: {
        mp3: mp3_audio_8a,
        opus: opus_audio_8a,
      },
      timeout_msec: 2712 + 30000,
      plugin: "skee-ball",
    },
    {
      id: "8b",
      speaker: "billie",
      text: "This’ll be duck soup.  Literally!",
      sound: {
        mp3: mp3_audio_8b,
        opus: opus_audio_8b,
      },
      timeout_msec: 2928 + 30000,
      plugin: "ducks",
    },
    {
      id: "8c",
      speaker: "billie",
      text: "If I can pop a perp, I can pop a balloon.",
      sound: {
        mp3: mp3_audio_8c,
        opus: opus_audio_8c,
      },
      timeout_msec: 3072 + 30000,
      plugin: "balloons",
    },

    // Players will reach exactly three of these result nodes exactly once, based on their game performance.
    {
      id: "first-win",
      speaker: "roger_okay",
      text: "Wow!",
      sound: {
        mp3: mp3_audio_first_win,
        opus: opus_audio_first_win,
      },
      timeout_msec: 1776 + 5000,
      choices: remainingGameOptions,
    },
    {
      id: "first-loss",
      speaker: "roger_focused",
      text: "Oof, that’s rough buddy.",
      sound: {
        mp3: mp3_audio_first_loss,
        opus: opus_audio_first_loss,
      },
      timeout_msec: 2616 + 5000,
      choices: remainingGameOptions,
    },
    {
      id: "second-win",
      speaker: "roger_okay",
      text: "Gee wilickers!",
      sound: {
        mp3: mp3_audio_second_win,
        opus: opus_audio_second_win,
      },
      timeout_msec: 1848 + 5000,
      choices: remainingGameOptions,
    },
    {
      id: "second-loss",
      speaker: "roger_focused",
      text: "Geez, we’re in dutch now.",
      sound: {
        mp3: mp3_audio_second_loss,
        opus: opus_audio_second_loss,
      },
      timeout_msec: 2736 + 5000,
      choices: remainingGameOptions,
    },
    {
      id: "third-win",
      speaker: "roger_okay",
      text: "...Can ya teach me how to do that?",
      sound: {
        mp3: mp3_audio_third_win,
        opus: opus_audio_third_win,
      },
      timeout_msec: 3120 + 5000,
      choices: remainingGameOptions,
    },
    {
      id: "third-loss",
      speaker: "roger_eek",
      text: "Uh...",
      sound: {
        mp3: mp3_audio_third_loss,
        opus: opus_audio_third_loss,
      },
      timeout_msec: 1968 + 5000,
      choices: remainingGameOptions,
    },

    // Players will land at either "bigwin", "smallwin", or "bigloss".
    {
      id: "bigwin",
      speaker: "arcade_owner",
      text: "Golly, look at all those tickets!  Here’s the grand prize!  Let me take your picture for our winner’s wall.",
      sound: {
        mp3: mp3_audio_bigwin,
        opus: opus_audio_bigwin,
      },
      timeout_msec: 8280,
      next: "bigwin-p1",
    },
    {
      id: "bigwin-p1",
      speaker: "billie",
      text: "Er... <camera click> Actually, what if I left the grand prize with you and we cleared the tab for my friend Roger here?",
      sound: {
        mp3: mp3_audio_bigwin_p1,
        opus: opus_audio_bigwin_p1,
      },
      timeout_msec: 6504,
      next: "bigwin-p2",
    },
    {
      id: "bigwin-p2",
      speaker: "arcade_owner",
      text: "Oh, isn’t that kind!  Sure, I can do that.",
      sound: {
        mp3: mp3_audio_bigwin_p2,
        opus: opus_audio_bigwin_p2,
      },
      timeout_msec: 4800,
      next: "bigwin-p3",
    },
    {
      id: "bigwin-p3",
      speaker: "arcade_owner",
      text: "And I’ll send along a copy of that photograph!",
      sound: {
        mp3: mp3_audio_bigwin_p3,
        opus: opus_audio_bigwin_p3,
      },
      timeout_msec: 3312,
      next: "10",
    },

    {
      id: "smallwin",
      speaker: "arcade_owner",
      text: "Well done!  Here’s your prize.",
      sound: {
        mp3: mp3_audio_smallwin,
        opus: opus_audio_smallwin,
      },
      timeout_msec: 3432,
      next: "smallwin-p1",
    },
    {
      id: "smallwin-p1",
      speaker: "billie",
      text: "Actually, what if I left the prize with you and we cleared the tab for my friend Roger here?",
      sound: {
        mp3: mp3_audio_smallwin_p1,
        opus: opus_audio_smallwin_p1,
      },
      timeout_msec: 4584,
      next: "smallwin-p2",
    },
    {
      id: "smallwin-p2",
      speaker: "arcade_owner",
      text: "Oh, isn’t that kind!  Sure, I can do that.",
      sound: {
        mp3: mp3_audio_smallwin_p2,
        opus: opus_audio_smallwin_p2,
      },
      timeout_msec: 4800,
      next: "smallwin-p3",
    },
    {
      id: "smallwin-p3",
      speaker: "arcade_owner",
      text: "That’s more than you need for Roger’s tab.  Here’s a small prize as change.",
      sound: {
        mp3: mp3_audio_smallwin_p3,
        opus: opus_audio_smallwin_p3,
      },
      timeout_msec: 5040,
      next: "10",
    },

    {
      id: "bigloss",
      speaker: "billie",
      text: "Crap.  How do I convince the kid now?",
      textBubbleType: "thought",
      sound: {
        mp3: mp3_audio_bigloss,
        opus: opus_audio_bigloss,
      },
      timeout_msec: 3696 + 8000,
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
      sound: {
        mp3: mp3_audio_9a,
        opus: opus_audio_9a,
      },
      timeout_msec: 6384,
      next: "9a-p1",
    },
    {
      id: "9a-p1",
      speaker: "billie",
      text: "If this were a front, they’d want to give legitimate customers as much incentive as possible to spend time at the arcade, to mask the laundered cash.  The prizes would just be a rounding error to them!",
      sound: {
        mp3: mp3_audio_9a_p1,
        opus: opus_audio_9a_p1,
      },
      timeout_msec: 10632,
      next: "9a-p2",
    },
    {
      id: "9a-p2",
      speaker: "billie",
      text: "_Clearly_ this is just a regular crooked arcade.",
      sound: {
        mp3: mp3_audio_9a_p2,
        opus: opus_audio_9a_p2,
      },
      timeout_msec: 3600,
      next: "9a-p3",
    },
    {
      id: "9a-p3",
      speaker: "roger_baseline",
      text: "Huh.  I guess that makes sense...",
      sound: {
        mp3: mp3_audio_9a_p3,
        opus: opus_audio_9a_p3,
      },
      timeout_msec: 2736,
      next: "10",
    },

    {
      id: "9b",
      speaker: "billie",
      text: "I think I’ve lost enough money on this joint to effectively make a payment on whatever debt you owe here.",
      sound: {
        mp3: mp3_audio_9b,
        opus: opus_audio_9b,
      },
      timeout_msec: 5136,
      next: "9b-p1",
    },
    {
      id: "9b-p1",
      speaker: "roger_focused",
      text: "...Maybe?",
      sound: {
        mp3: mp3_audio_9b_p1,
        opus: opus_audio_9b_p1,
      },
      timeout_msec: 1920,
      next: "10",
    },

    {
      id: "9c",
      speaker: "billie",
      text: "Roger.  Buddy.  I’m clearly having a bad day.  _I’m not a fun guy to be around when I’m having a bad day._",
      sound: {
        mp3: mp3_audio_9c,
        opus: opus_audio_9c,
      },
      timeout_msec: 8592,
      next: "9c-p1",
    },
    {
      id: "9c-p1",
      speaker: "roger_eek",
      text: "<gulp>",
      sound: {
        mp3: mp3_audio_9c_p1,
        opus: opus_audio_9c_p1,
      },
      timeout_msec: 1272,
      next: "9c-p2",
    },
    {
      id: "9c-p2",
      speaker: "billie",
      text: "Tell me what you know about that dame.",
      sound: {
        mp3: mp3_audio_9c_p2,
        opus: opus_audio_9c_p2,
      },
      timeout_msec: 3048,
      next: "11",
    },

    {
      id: "10",
      speaker: "billie",
      text: "So.  What can you tell me about that dame who came in?",
      sound: {
        mp3: mp3_audio_10,
        opus: opus_audio_10,
      },
      timeout_msec: 4560,
      next: "11",
    },

    // At this point, all paths have reconverged
    {
      id: "11",
      speaker: "roger_okay",
      text: "I saw her stop by the arcade late last night.  She played one game of Redhot Racers and then she scrammed.",
      sound: {
        mp3: mp3_audio_11,
        opus: opus_audio_11,
      },
      timeout_msec: 5640,
      next: "11-p2",
    },
    {
      id: "11-p2",
      speaker: "roger_okay",
      text: "I’ve seen that lady before, though. In Chinatown, where my family lives. She’s been loiterin’ all over the neighborhood for a while now.",
      sound: {
        mp3: mp3_audio_11_p2,
        opus: opus_audio_11_p2,
      },
      timeout_msec: 6288,
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
      sound: {
        mp3: mp3_audio_11_details,
        opus: opus_audio_11_details,
      },
      timeout_msec: 6024,
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
      sound: {
        mp3: mp3_audio_11_more_details,
        opus: opus_audio_11_more_details,
      },
      timeout_msec: 4152,
      next: "11-more-details-p1",
    },
    {
      id: "11-more-details-p1",
      speaker: "roger_focused",
      text: "Two rival gangs destroyed each other. Collateral damage too – brother-in-law got hurt. Baaaad times.",
      sound: {
        mp3: mp3_audio_11_more_details_p1,
        opus: opus_audio_11_more_details_p1,
      },
      timeout_msec: 7176,
      next: "11-more-details-p2",
    },
    {
      id: "11-more-details-p2",
      speaker: "roger_focused",
      text: "Papa Finster and his trouble boys picked up the pieces–they’ve owned the neighborhood ever since.",
      sound: {
        mp3: mp3_audio_11_more_details_p2,
        opus: opus_audio_11_more_details_p2,
      },
      timeout_msec: 5136,
      next: "11-more-details-p3",
    },
    {
      id: "11-more-details-p3",
      speaker: "roger_okay",
      text: "I think that’s all I can tell you.",
      sound: {
        mp3: mp3_audio_11_more_details_p3,
        opus: opus_audio_11_more_details_p3,
      },
      timeout_msec: 1920,
      next: "11-more-details-p4",
    },
    {
      id: "11-more-details-p4",
      speaker: "billie",
      text: "Thanks, kid.",
      sound: {
        mp3: mp3_audio_11_more_details_p4,
        opus: opus_audio_11_more_details_p4,
      },
      timeout_msec: 1368,
      next: "12",
    },
    {
      id: "11-afraid",
      speaker: "roger_focused",
      text: "...Can I go now?",
      sound: {
        mp3: mp3_audio_11_afraid,
        opus: opus_audio_11_afraid,
      },
      timeout_msec: 2568,
      next: "11-afraid-p1",
    },
    {
      id: "11-afraid-p1",
      speaker: "billie",
      text: "...Yeah.",
      sound: {
        mp3: mp3_audio_11_afraid_p1,
        opus: opus_audio_11_afraid_p1,
      },
      timeout_msec: 1344,
      next: "12",
    },

    // And we've converged again.
    {
      id: "12",
      speaker: "billie",
      text: "Alright. We need to track where Katrina’s coming and going and what’s with these notes she’s leaving. It sounds like she’s doing a lot of that business in Chinatown.",
      textBubbleType: "thought",
      sound: {
        mp3: mp3_audio_12,
        opus: opus_audio_12,
      },
      timeout_msec: 8880,
      next: "12-p1",
    },
    {
      id: "12-p1",
      speaker: "billie",
      text: "Let’s set up a stakeout.",
      textBubbleType: "thought",
      sound: {
        mp3: mp3_audio_12_p1,
        opus: opus_audio_12_p1,
      },
      timeout_msec: 1896,
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
