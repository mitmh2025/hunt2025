import demo from "../../../assets/demo-photo.png";
import type { InteractionGraph } from "../types";
import audio_10_p1 from "./audio/10-p1.mp3";
import audio_10 from "./audio/10.mp3";
import audio_11a from "./audio/11a.mp3";
import audio_11b from "./audio/11b.mp3";
import audio_11c from "./audio/11c.mp3";
import audio_11d from "./audio/11d.mp3";
import audio_12a_p1 from "./audio/12a-p1.mp3";
import audio_12a_p2 from "./audio/12a-p2.mp3";
import audio_12a_p3 from "./audio/12a-p3.mp3";
import audio_12a_p4 from "./audio/12a-p4.mp3";
import audio_12a_p5 from "./audio/12a-p5.mp3";
import audio_12a from "./audio/12a.mp3";
import audio_12b_p1 from "./audio/12b-p1.mp3";
import audio_12b_p2 from "./audio/12b-p2.mp3";
import audio_12b_p3 from "./audio/12b-p3.mp3";
import audio_12b_p4 from "./audio/12b-p4.mp3";
import audio_12b_p5 from "./audio/12b-p5.mp3";
import audio_12b from "./audio/12b.mp3";
import audio_12c_p1 from "./audio/12c-p1.mp3";
import audio_12c from "./audio/12c.mp3";
import audio_12d_p1 from "./audio/12d-p1.mp3";
import audio_12d_p2 from "./audio/12d-p2.mp3";
import audio_12d from "./audio/12d.mp3";
import audio_13 from "./audio/13.mp3";
import audio_15 from "./audio/15.mp3";
import audio_16 from "./audio/16.mp3";
import audio_2a_p1 from "./audio/2a-p1.mp3";
import audio_2a from "./audio/2a.mp3";
import audio_2b from "./audio/2b.mp3";
import audio_2c from "./audio/2c.mp3";
import audio_2d from "./audio/2d.mp3";
import audio_3_p1 from "./audio/3-p1.mp3";
import audio_3a from "./audio/3a.mp3";
import audio_3b from "./audio/3b.mp3";
import audio_3c from "./audio/3c.mp3";
import audio_3d from "./audio/3d.mp3";
import audio_4a_p1 from "./audio/4a-p1.mp3";
import audio_4a_p2 from "./audio/4a-p2.mp3";
import audio_4a from "./audio/4a.mp3";
import audio_4b_p1 from "./audio/4b-p1.mp3";
import audio_4b_p2 from "./audio/4b-p2.mp3";
import audio_4b from "./audio/4b.mp3";
import audio_4c_p1 from "./audio/4c-p1.mp3";
import audio_4c from "./audio/4c.mp3";
import audio_4d_p1 from "./audio/4d-p1.mp3";
import audio_4d_p2 from "./audio/4d-p2.mp3";
import audio_4d_p3 from "./audio/4d-p3.mp3";
import audio_4d_p4 from "./audio/4d-p4.mp3";
import audio_4d from "./audio/4d.mp3";
import audio_5 from "./audio/5.mp3";
import audio_5a from "./audio/5a.mp3";
import audio_5b from "./audio/5b.mp3";
import audio_5c from "./audio/5c.mp3";
import audio_5d from "./audio/5d.mp3";
import audio_6 from "./audio/6.mp3";
import audio_6a_p1 from "./audio/6a-p1.mp3";
import audio_6a_p2 from "./audio/6a-p2.mp3";
import audio_6a from "./audio/6a.mp3";
import audio_6b_p1 from "./audio/6b-p1.mp3";
import audio_6b_p2 from "./audio/6b-p2.mp3";
import audio_6b from "./audio/6b.mp3";
import audio_6c_p1 from "./audio/6c-p1.mp3";
import audio_6c_p2 from "./audio/6c-p2.mp3";
import audio_6c from "./audio/6c.mp3";
import audio_6d_p1 from "./audio/6d-p1.mp3";
import audio_6d_p2 from "./audio/6d-p2.mp3";
import audio_6d from "./audio/6d.mp3";
import audio_7_p1 from "./audio/7-p1.mp3";
import audio_7 from "./audio/7.mp3";
import audio_7a from "./audio/7a.mp3";
import audio_7b from "./audio/7b.mp3";
import audio_7c from "./audio/7c.mp3";
import audio_7d from "./audio/7d.mp3";
import audio_8_p1 from "./audio/8-p1.mp3";
import audio_8 from "./audio/8.mp3";
import audio_9_p1 from "./audio/9-p1.mp3";
import audio_9_p2 from "./audio/9-p2.mp3";
import audio_9 from "./audio/9.mp3";
import audio_start from "./audio/start.mp3";
import audio_where_a from "./audio/where-a.mp3";
import audio_where_a1 from "./audio/where-a1.mp3";
import audio_where_b from "./audio/where-b.mp3";
import audio_where_b1 from "./audio/where-b1.mp3";
import audio_where_c from "./audio/where-c.mp3";
import audio_where_c1 from "./audio/where-c1.mp3";
import audio_where_d from "./audio/where-d.mp3";
import audio_where_d1 from "./audio/where-d1.mp3";

export type ArtGalleryState = {
  opinion: "dunce" | "aficionado" | undefined;
  selection:
    | "kieftenbeld"
    | "lemahieu"
    | "kieftenbeld-postcard"
    | "lemahieu-postcard"
    | undefined;
  thought1: boolean;
  thought2: boolean;
  thought3: boolean;
};

export type ArtGalleryResult = {
  opinion: "dunce" | "aficionado";
  selection:
    | "kieftenbeld"
    | "lemahieu"
    | "kieftenbeld-postcard"
    | "lemahieu-postcard";
};

const remainingLocationOptions = (state: ArtGalleryState) => {
  const remaining_options = [];
  if (!state.thought1) {
    remaining_options.push({
      text: "In his wallet?",
      next: "where-a",
      stateEffect(state: ArtGalleryState) {
        return {
          ...state,
          thought1: true,
        };
      },
    });
  }
  if (!state.thought2) {
    remaining_options.push({
      text: "In his car?",
      next: "where-b",
      stateEffect(state: ArtGalleryState) {
        return {
          ...state,
          thought2: true,
        };
      },
    });
  }
  if (!state.thought3) {
    remaining_options.push({
      text: "In his office?",
      next: "where-c",
      stateEffect(state: ArtGalleryState) {
        return {
          ...state,
          thought3: true,
        };
      },
    });
  }
  remaining_options.push({
    text: "In his study?",
    next: "where-d",
  });
  return remaining_options;
};

type ArtGallerySpeakers =
  | "billie"
  | "judith_unintroduced"
  | "judith_slight_smile_unintroduced"
  | "judith"
  | "judith_flat"
  | "judith_stern"
  | "judith_slight_smile"
  | "judith_grin";

const ArtGalleryInteractionGraph: InteractionGraph<
  ArtGalleryState,
  ArtGalleryResult,
  ArtGallerySpeakers
> = {
  starting_node: "start",
  starting_state: {
    opinion: undefined,
    selection: undefined,
    thought1: false,
    thought2: false,
    thought3: false,
  },
  background: "", // TODO: get a background image for this
  speaker_states: {
    billie: {
      label: "Billie",
      image: demo, // TODO: get pose images
    },
    judith_unintroduced: {
      label: "Woman",
      image: demo, // TODO: get pose images
    },
    judith_slight_smile_unintroduced: {
      label: "Woman",
      image: demo, // TODO: get pose images
    },
    judith: {
      label: "Judith",
      image: demo, // TODO: get pose images
    },
    judith_flat: {
      label: "Judith",
      image: demo, // TODO: get pose images
    },
    judith_stern: {
      label: "Judith",
      image: demo, // TODO: get pose images
    },
    judith_slight_smile: {
      label: "Judith",
      image: demo, // TODO: get pose images
    },
    judith_grin: {
      label: "Judith",
      image: demo, // TODO: get pose images
    },
  },
  nodes: [
    {
      id: "start",
      speaker: "judith_unintroduced",
      text: "Ah, I see you’ve got a taste for Korneel Kieftenbeld, hm? The closest thing the late 19th century has to a Dutch master.",
      sound: audio_start,
      timeout_msec: 10000 + 5000, // 10 seconds audio, 5 additional seconds voting
      choices: [
        {
          text: "Oh, truly. The richness of the painting complements the texture of the brushwork. You can see Kieffinbalt’s angst at living in such a flat country. He yearns for the Alps.",
          next: "2a",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              opinion: "dunce",
            };
          },
        },
        {
          text: "Oh, he might be Dutch, but he’s no master. He lacks the transportative quality of Vermeer, of Rembrandt. With them, I’m looking through a window. With him, I’m looking at a wall.",
          next: "2b",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              opinion: "aficionado",
            };
          },
        },
        {
          text: "Oh, I appreciate it in its context. My tastes have always run a bit more modern – like the LeMahieu over in the corner, for example. I didn’t think he exhibited outside of Paris these days.",
          next: "2c",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              opinion: "aficionado",
            };
          },
        },
        {
          text: "Oh. Yeah.",
          textEffect: "span",
          next: "2d",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              opinion: "dunce",
            };
          },
        },
      ],
    },
    {
      id: "2a",
      speaker: "billie",
      text: "Oh, truly. The richness of the painting complements the texture of the brushwork. You can see Kieffinbalt’s angst at living in such a flat country. He yearns for the Alps.",
      sound: audio_2a,
      timeout_msec: 11000,
      next: "2a-p1",
    },
    {
      id: "2b",
      speaker: "billie",
      text: "Oh, he might be Dutch, but he’s no master. He lacks the transportative quality of Vermeer, of Rembrandt. With them, I’m looking through a window. With him, I’m looking at a wall.",
      sound: audio_2b,
      timeout_msec: 11000,
      next: "5",
    },
    {
      id: "2c",
      speaker: "billie",
      text: "Oh, I appreciate it in its context. My tastes have always run a bit more modern – like the LeMahieu over in the corner, for example. I didn’t think he exhibited outside of Paris these days.",
      sound: audio_2c,
      timeout_msec: 10500,
      next: "5",
    },
    {
      id: "2d",
      speaker: "billie",
      text: "Oh.  Yeah.",
      textEffect: "span",
      sound: audio_2d,
      timeout_msec: 5000,
      next: "2a-p1",
    },
    {
      id: "2a-p1",
      speaker: "judith_stern",
      text: "You don’t know the first thing about art, do you?",
      sound: audio_2a_p1,
      timeout_msec: 3500 + 10000, // 3.5 seconds audio, 10 more seconds voting (it's quick)
      choices: [
        {
          text: "I know a guy named Art, does that count?  He and his buddy Paul won’t shut up about a bridge.",
          next: "3a",
        },
        {
          text: "I know that art is subjective, and so I can’t be wrong.",
          next: "3b",
        },
        {
          text: "I know that my finest artwork still hangs on my mother’s fridge.  She moved, so I’m a little worried why the new tenant kept it, but it’s there.",
          next: "3c",
        },
        {
          text: "I know enough to know when I’m beat.",
          next: "3d",
        },
      ],
    },
    {
      id: "3a",
      speaker: "billie",
      text: "I know a guy named Art, does that count?  He and his buddy Paul won’t shut up about a bridge.",
      sound: audio_3a,
      timeout_msec: 6250,
      next: "3-p1",
    },
    {
      id: "3b",
      speaker: "billie",
      text: "I know that art is subjective, and so I can’t be wrong.",
      sound: audio_3b,
      timeout_msec: 4250,
      next: "3-p1",
    },
    {
      id: "3c",
      speaker: "billie",
      text: "I know that my finest artwork still hangs on my mother’s fridge.  She moved, so I’m a little worried why the new tenant kept it, but it’s there.",
      sound: audio_3c,
      timeout_msec: 7800,
      next: "3-p1",
    },
    {
      id: "3d",
      speaker: "billie",
      text: "I know enough to know when I’m beat.",
      sound: audio_3d,
      timeout_msec: 3250,
      next: "3-p1",
    },
    {
      id: "3-p1",
      speaker: "judith_flat",
      text: "Charming, truly.  Judith Calvert.  I own the gallery.",
      sound: audio_3_p1,
      timeout_msec: 5750 + 10000, // 5.75 clip + 10 more seconds voting
      choices: [
        {
          text: "Billie O’Ryan.  I own a detective agency.",
          next: "4a",
        },
        {
          text: "Billie O’Ryan.  I own a second trenchcoat to this one.",
          next: "4b",
        },
        {
          text: "Billie O’Ryan.  I own a healthy suspicion.",
          next: "4c",
        },
        {
          text: "Billie O’Ryan.  I own.",
          next: "4d",
        },
      ],
    },
    {
      id: "4a",
      speaker: "billie",
      text: "Billie O’Ryan.  I own a detective agency.",
      sound: audio_4a,
      timeout_msec: 3700,
      next: "4a-p1",
    },
    {
      id: "4a-p1",
      speaker: "judith_flat",
      text: "A detective agency?  You must be here about the diamond, then.",
      sound: audio_4a_p1,
      timeout_msec: 4250,
      next: "4a-p2",
    },
    {
      id: "4a-p2",
      speaker: "billie",
      text: "Careful with that intuition, ma’am.  That’s my job.",
      sound: audio_4a_p2,
      timeout_msec: 4100,
      next: "7",
    },
    {
      id: "4b",
      speaker: "billie",
      text: "Billie O’Ryan.  I own a second trenchcoat to this one.",
      sound: audio_4b,
      timeout_msec: 3900,
      next: "4b-p1",
    },
    {
      id: "4b-p1",
      speaker: "judith_flat",
      text: "Really? Is it as shabby as this one?",
      sound: audio_4b_p1,
      timeout_msec: 3600,
      next: "4b-p2",
    },
    {
      id: "4b-p2",
      speaker: "billie",
      text: "I’m not here to swap sartorial stories, actually.  I’m here about the diamond.",
      sound: audio_4b_p2,
      timeout_msec: 5600,
      next: "7",
    },
    {
      id: "4c",
      speaker: "billie",
      text: "Billie O’Ryan.  I own a healthy suspicion.",
      sound: audio_4c,
      timeout_msec: 3500,
      next: "4c-p1",
    },
    {
      id: "4c-p1",
      speaker: "judith_flat",
      text: "Is that right? You must be here about the diamond, then.",
      sound: audio_4c_p1,
      timeout_msec: 4500,
      next: "4a-p2",
    },
    {
      id: "4d",
      speaker: "billie",
      text: "Billie O’Ryan.  I own.",
      sound: audio_4d,
      timeout_msec: 3100,
      next: "4d-p1",
    },
    {
      id: "4d-p1",
      speaker: "judith_flat",
      text: "You own? ... Own what?",
      sound: audio_4d_p1,
      timeout_msec: 3600,
      next: "4d-p2",
    },
    {
      id: "4d-p2",
      speaker: "billie",
      text: "Own... generally.  Dominate.  I’m trying to get some new slang going here.  Is it not working?",
      sound: audio_4d_p2,
      timeout_msec: 7000,
      next: "4d-p3",
    },
    {
      id: "4d-p3",
      speaker: "judith_flat",
      text: "Not in the least.",
      sound: audio_4d_p3,
      timeout_msec: 3100,
      next: "4d-p4",
    },
    {
      id: "4d-p4",
      speaker: "billie",
      text: "Well, I’ll have to fall back on my day job of hunting down that diamond, then.",
      sound: audio_4d_p4,
      timeout_msec: 5250,
      next: "7",
    },
    {
      id: "5",
      speaker: "judith_slight_smile_unintroduced",
      text: "Well, I can see puffery won’t work on you, then, will it?",
      sound: audio_5,
      timeout_msec: 15000, // 4.5 sec audio + ~10 seconds voting
      choices: [
        {
          text: "I don’t know.  It depends on how much huffery you put before it.",
          next: "5a",
        },
        {
          text: "I don’t know.  I have a feeling that a sales pitch might be on its way.",
          next: "5b",
        },
        {
          text: "I don’t know.  It might still be nice to hear the routine.",
          next: "5c",
        },
        {
          text: "I don’t know.  They’re cute, but I prefer penguins.",
          next: "5d",
        },
      ],
    },
    {
      id: "5a",
      speaker: "billie",
      text: "I don’t know.  It depends on how much huffery you put before it.",
      sound: audio_5a,
      timeout_msec: 4250,
      next: "6",
    },
    {
      id: "5b",
      speaker: "billie",
      text: "I don’t know.  I have a feeling that a sales pitch might be on its way.",
      sound: audio_5b,
      timeout_msec: 4500,
      next: "6",
    },
    {
      id: "5c",
      speaker: "billie",
      text: "I don’t know.  It might still be nice to hear the routine.",
      sound: audio_5c,
      timeout_msec: 4000,
      next: "6",
    },
    {
      id: "5d",
      speaker: "billie",
      text: "I don’t know.  They’re cute, but I prefer penguins.",
      sound: audio_5d,
      timeout_msec: 3750,
      next: "6",
    },
    {
      id: "6",
      speaker: "judith_slight_smile",
      text: "Oh, I like you.  Judith Calvert, of the Gallery Calvert.",
      sound: audio_6,
      timeout_msec: 4750 + 10000, // 4.75 sec clip + 10 seconds more to vote
      choices: [
        {
          text: "Billie O’Ryan, of the O’Ryan Detective Agency.",
          next: "6a",
        },
        {
          text: "Billie O’Ryan, of the O’Ryan Exhibition Center.",
          next: "6b",
        },
        {
          text: "Billie O’Ryan, of the O’Ryan Shoe Company.",
          next: "6c",
        },
        {
          text: "Billie O’Ryan, of the O’Ryans.",
          next: "6d",
        },
      ],
    },
    {
      id: "6a",
      speaker: "billie",
      text: "Billie O’Ryan, of the O’Ryan Detective Agency.",
      sound: audio_6a,
      timeout_msec: 3750,
      next: "6a-p1",
    },
    {
      id: "6a-p1",
      speaker: "judith_flat",
      text: "Detective Agency, hm? And here I thought you might be part of the art world.",
      sound: audio_6a_p1,
      timeout_msec: 5300,
      next: "6a-p2",
    },
    {
      id: "6a-p2",
      speaker: "billie",
      text: "I suppose I might be for as long as it takes to find the diamond, ma’am.",
      sound: audio_6a_p2,
      timeout_msec: 4800,
      next: "7",
    },

    {
      id: "6b",
      speaker: "billie",
      text: "Billie O’Ryan, of the O’Ryan Exhibition Center.",
      sound: audio_6b,
      timeout_msec: 4000,
      next: "6b-p1",
    },
    {
      id: "6b-p1",
      speaker: "judith_flat",
      text: "Exhibition Center? I haven’t heard of that one.  What do you exhibit?",
      sound: audio_6b_p1,
      timeout_msec: 4500,
      next: "6b-p2",
    },
    {
      id: "6b-p2",
      speaker: "billie",
      text: "Right now, a practical installation.  A corkboard with a lot of photos, a lot of strings, and a missing diamond smack in the middle.",
      sound: audio_6b_p2,
      timeout_msec: 8000,
      next: "7",
    },

    {
      id: "6c",
      speaker: "billie",
      text: "Billie O’Ryan, of the O’Ryan Shoe Company.",
      sound: audio_6c,
      timeout_msec: 3500,
      next: "6c-p1",
    },
    {
      id: "6c-p1",
      speaker: "judith_flat",
      text: "Shoe Company?  I didn’t take you for a cobbler.",
      sound: audio_6c_p1,
      timeout_msec: 3800,
      next: "6c-p2",
    },
    {
      id: "6c-p2",
      speaker: "billie",
      text: "Well, I’ve been going all over town investigating the diamond.  I’m burning through loafers.  At this rate I may as well buy the company and save some time.",
      sound: audio_6c_p2,
      timeout_msec: 8000,
      next: "7",
    },
    {
      id: "6d",
      speaker: "billie",
      text: "Billie O’Ryan, of the O’Ryans.",
      sound: audio_6d,
      timeout_msec: 3000,
      next: "6d-p1",
    },
    {
      id: "6d-p1",
      speaker: "judith_flat",
      text: "The O’Ryans? I don’t believe I’ve heard your name in socialite circles.",
      sound: audio_6d_p1,
      timeout_msec: 5300,
      next: "6d-p2",
    },
    {
      id: "6d-p2",
      speaker: "billie",
      text: "Well, it’s not there yet.  That might change once I hunt down the diamond.",
      sound: audio_6d_p2,
      timeout_msec: 5200,
      next: "7",
    },

    {
      id: "7",
      speaker: "judith_flat",
      text: "Ah, the diamond.  I had heard of what happened.  Such a shock, such an embarrassment, such a scandal.",
      sound: audio_7,
      timeout_msec: 8100,
      next: "7-p1",
    },
    {
      id: "7-p1",
      speaker: "judith_slight_smile",
      text: "I’m sure it will be the talk of the town for gallery openings and artist retrospectives for months to come.",
      sound: audio_7_p1,
      timeout_msec: 7000 + 10000, // 7 second clip, 10 seconds voting
      choices: [
        {
          text: "And when that talk happens, you wouldn’t happen to be adding any exclusive knowledge to those conversations, would you?",
          next: "7a",
        },
        {
          text: "I’m hoping it could be the talk of this gallery for minutes to come.",
          next: "7b",
        },
        {
          text: "Any chance I could get a sneak preview of that talk?  I’m so rusty at cocktail chatter.",
          next: "7c",
        },
        {
          text: "I doubt I’ll be invited to those unless I solve the case.  Any chance you can help guide me closer by telling me what you know, ma’am?",
          next: "7d",
        },
      ],
    },
    {
      id: "7a",
      speaker: "billie",
      text: "And when that talk happens, you wouldn’t happen to be adding any exclusive knowledge to those conversations, would you?",
      sound: audio_7a,
      timeout_msec: 7500,
      next: "8",
    },
    {
      id: "7b",
      speaker: "billie",
      text: "I’m hoping it could be the talk of this gallery for minutes to come.",
      sound: audio_7b,
      timeout_msec: 4800,
      next: "8",
    },
    {
      id: "7c",
      speaker: "billie",
      text: "Any chance I could get a sneak preview of that talk?  I’m so rusty at cocktail chatter.",
      sound: audio_7c,
      timeout_msec: 5750,
      next: "8",
    },
    {
      id: "7d",
      speaker: "billie",
      text: "I doubt I’ll be invited to those unless I solve the case.  Any chance you can help guide me closer by telling me what you know, ma’am?",
      sound: audio_7d,
      timeout_msec: 7500,
      next: "8",
    },

    {
      id: "8",
      speaker: "judith_slight_smile",
      text: "Oh goodness.  The art world is such an insular place, Detective.  And there’s a certain level of discretion that develops in business relationships.  You understand, surely.",
      sound: audio_8,
      timeout_msec: 12250,
      next: "8-p1",
    },
    {
      id: "8-p1",
      speaker: "billie",
      text: "Are you saying the art world lacks gossip?",
      sound: audio_8_p1,
      timeout_msec: 4000,
      next: "9",
    },
    {
      id: "9",
      speaker: "judith_grin",
      text: "Oh, no, the art world would absolutely wither without gossip.  Fresh gossip.  Juicy gossip.  Exciting gossip.",
      sound: audio_9,
      timeout_msec: 10000,
      next: "9-p1",
    },
    {
      id: "9-p1",
      speaker: "judith_slight_smile",
      text: "But it’s strictly for the art world.",
      sound: audio_9_p1,
      timeout_msec: 4600,
      next: "9-p2",
    },
    {
      id: "9-p2",
      speaker: "billie",
      text: "I see.  And so if I were to... materially become part of the art world, then...",
      sound: audio_9_p2,
      timeout_msec: 6750,
      next: "10",
    },

    {
      id: "10",
      speaker: "judith_slight_smile",
      text: "...then this might be a very different conversation.  Very different, indeed, if you catch my drift.",
      sound: audio_10,
      timeout_msec: 7500,
      next: "10-p1",
    },
    {
      id: "10-p1",
      speaker: "billie",
      textBubbleType: "thought",
      text: "Hm.  I DO have an open expense account on this job.  And I’ve paid less subtle bribes than this before.",
      sound: audio_10_p1,
      timeout_msec: 7500 + 10000, // 7.5 sec clip + 10 seconds voting
      choices: [
        {
          text: "Then I suppose I’ll take the Kieftenbeld.",
          next: "11a",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              selection: "kieftenbeld",
            };
          },
        },
        {
          text: "Then I suppose I’ll take the LeMahieu.",
          next: "11b",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              selection: "lemahieu",
            };
          },
        },
        {
          text: "Then I suppose I’ll take the Kieftenbeld. ...’s postcard.",
          next: "11c",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              selection: "kieftenbeld-postcard",
            };
          },
        },
        {
          text: "Then I suppose I’ll take the LeMahieu. ...’s postcard.",
          next: "11d",
          stateEffect(state: ArtGalleryState) {
            return {
              ...state,
              selection: "lemahieu-postcard",
            };
          },
        },
      ],
    },
    {
      id: "11a",
      speaker: "billie",
      text: "Then I suppose I’ll take the Kieftenbeld.",
      sound: audio_11a,
      timeout_msec: 3000,
      next: (state: ArtGalleryState) => {
        if (state.opinion === "aficionado") {
          return "12a";
        } else {
          return "12b";
        }
      },
    },
    {
      id: "11b",
      speaker: "billie",
      text: "Then I suppose I’ll take the LeMahieu.",
      sound: audio_11b,
      timeout_msec: 3000,
      next: (state: ArtGalleryState) => {
        if (state.opinion === "aficionado") {
          return "12a";
        } else {
          return "12b";
        }
      },
    },
    {
      id: "11c",
      speaker: "billie",
      text: "Then I suppose I’ll take the Kieftenbeld. ...’s postcard.",
      sound: audio_11c,
      timeout_msec: 4250,
      next: (state: ArtGalleryState) => {
        if (state.opinion === "aficionado") {
          return "12c";
        } else {
          return "12d";
        }
      },
    },
    {
      id: "11d",
      speaker: "billie",
      text: "Then I suppose I’ll take the LeMahieu. ...’s postcard.",
      sound: audio_11d,
      timeout_msec: 4000,
      next: (state: ArtGalleryState) => {
        if (state.opinion === "aficionado") {
          return "12c";
        } else {
          return "12d";
        }
      },
    },
    {
      id: "12a",
      speaker: "judith_slight_smile",
      text: "Well, you have outstanding taste, my friend. We can get that paperwork handled right now.",
      sound: audio_12a,
      timeout_msec: 6500,
      next: "12a-p1",
    },
    {
      id: "12a-p1",
      speaker: "judith_slight_smile",
      text: "You know, this reminds me. I heard the most fascinating thing when I was hanging this painting up. An older gentleman and a younger lady raised such a ruckus! She came in shouting about how “she knew his secret,” and he stammered and sputtered– “o-o-oh what secret, I don’t have any secrets, what do you mean?” Oh, I’m not getting the voices right, you must excuse me. Just sign there, please.",
      sound: audio_12a_p1,
      timeout_msec: 26750,
      next: "12a-p2",
    },
    {
      id: "12a-p2",
      speaker: "judith_slight_smile",
      text: "And then she went on about the secret she was never supposed to know about, the one locked away where she was never supposed to find it. Of course, he tried to hush her up and hustle her out when she started talking about that, so there MUST be something to it. And just initial there, and…",
      sound: audio_12a_p2,
      timeout_msec: 18400,
      next: "12a-p3",
    },
    {
      id: "12a-p3",
      speaker: "judith_slight_smile",
      text: "Of course I couldn’t tell you precisely who they were. It would be uncouth; you might be familiar with them. Verrrry familiar indeed. And one more signature there?",
      sound: audio_12a_p3,
      timeout_msec: 12400,
      next: "12a-p4",
    },
    {
      id: "12a-p4",
      speaker: "judith_slight_smile",
      text: "Lovely. Well, it’s been a delight doing business with you, detective. Once the exhibition is complete, you can pick up what will surely be the new showpiece of your office. Here’s the bill of sale– and a little postcard as a thank-you.",
      sound: audio_12a_p4,
      timeout_msec: 15750,
      next: "12a-p5",
    },
    {
      id: "12a-p5",
      speaker: "judith_slight_smile",
      text: "I do hope to see you around once more; this city’s upper crust needs a shot in the arm, and I can’t imagine a stronger shot than you, detective.",
      sound: audio_12a_p5,
      timeout_msec: 9500,
      next: "13",
    },
    {
      id: "12b",
      speaker: "judith_slight_smile",
      text: "Well! I’m glad that I could steer you towards such an elegant decision. We can get that paperwork handled now.",
      sound: audio_12b,
      timeout_msec: 7250,
      next: "12b-p1",
    },
    {
      id: "12b-p1",
      speaker: "judith_slight_smile",
      text: "You know, this reminds me. I heard the most fascinating thing when I was hanging this painting up. An older gentleman and a younger lady raised such a ruckus! She came in shouting about how she had found out his big secret and he stammered and sputtered, denying he hid any secrets from her. Just sign there, please.",
      sound: audio_12b_p1,
      timeout_msec: 21250,
      next: "12b-p2",
    },
    {
      id: "12b-p2",
      speaker: "judith_slight_smile",
      text: "And then she went on about the secret she was never supposed to know about, the one locked away where she was never supposed to find it. And just initial there, and… ",
      sound: audio_12b_p2,
      timeout_msec: 10800,
      next: "12b-p3",
    },
    {
      id: "12b-p3",
      speaker: "judith_slight_smile",
      text: "He hustled her out before I could hear the exact details, but from the look on his face, there must have been something to it. And one more signature there?",
      sound: audio_12b_p3,
      timeout_msec: 10200,
      next: "12b-p4",
    },
    {
      id: "12b-p4",
      speaker: "judith_slight_smile",
      text: "Lovely. Well, it’s been a delight doing business with you, detective. Once the exhibition is complete, you can pick up what will surely be the new showpiece of your office. Here’s the bill of sale– and a little postcard as a thank-you.",
      sound: audio_12b_p4,
      timeout_msec: 15750,
      next: "12b-p5",
    },
    {
      id: "12b-p5",
      speaker: "judith_slight_smile",
      text: "I hope this is the first step down the line of opening your eyes to the finer things, my friend.",
      sound: audio_12b_p5,
      timeout_msec: 6800,
      next: "13",
    },

    {
      id: "12c",
      speaker: "judith_flat",
      text: "Ah-ha. You sneaky little thing, you. Is that how you finagle clues and confessions, with your little loopholes?",
      sound: audio_12c,
      timeout_msec: 8500,
      next: "12c-p1",
    },
    {
      id: "12c-p1",
      speaker: "judith_flat",
      text: "All right, then. I can respect a savvy transactor like yourself, detective. A gentleman and a woman had a bit of a ruckus in here. She had discovered some sort of secret he had been keeping from her, stashed away where she wasn’t supposed to find it. He hushed her up and hustled her out before they could give any details, though. Well, I’d say we’ve gotten what we want from each other– or, at least, all we can expect. If you decide to let your appreciation for the finer things off its leash, do come back.",
      sound: audio_12c_p1,
      timeout_msec: 32800,
      next: "15",
    },

    {
      id: "12d",
      speaker: "judith_stern",
      text: "Hm. You’re a little snake, aren’t you? No taste for art, and when given the chance to expand your horizons and get a little culture, you go for the cheap trick.",
      sound: audio_12d,
      timeout_msec: 12500,
      next: "12d-p1",
    },
    {
      id: "12d-p1",
      speaker: "judith_stern",
      text: "Well, let it never be said that I am not a woman of my word, detective. A gentleman and a lady had a rough argument earlier. Something to do with a secret he kept from her, hidden somewhere where she wasn’t supposed to find it.",
      sound: audio_12d_p1,
      timeout_msec: 15250,
      next: "12d-p2",
    },
    {
      id: "12d-p2",
      speaker: "judith_stern",
      text: "And that is precisely as much gossip as you will get for a postcard. Now, if you’ll excuse me, I have people who actually appreciate the finer things ready to be more substantial customers.",
      sound: audio_12d_p2,
      timeout_msec: 12700,
      next: "16",
    },

    // The following three entries all converge on their destination.
    {
      id: "13",
      overlay: null,
      speaker: "billie",
      textBubbleType: "thought",
      text: "Being an art connoisseur is fun when someone else is picking up the tab. The “older gentleman” and “younger lady” must be Papa and Baby. But where could he hide a secret where she couldn’t find it– something that would make his own family so irate as to confront him in public? He’d want that where he could keep an eye on it, surely.",
      sound: audio_13,
      timeout_msec: 18600 + 5000, // 18.6 second line, 5 seconds add'l voting time
      choices: remainingLocationOptions,
    },
    // As originally scripted, node 14 is identical to 13, so I merged them,
    // but for continuity against the interaction draft, I just skip the number
    {
      id: "15",
      overlay: null,
      speaker: "billie",
      textBubbleType: "thought",
      text: "Well, I can work with that. The two must have been Papa and Baby. But where could he hide a secret where she couldn’t find it– something that would make his own family so irate as to confront him in public? He’d want that where he could keep an eye on it, surely.",
      sound: audio_15,
      timeout_msec: 15800 + 5000, // 15.8 second clip, 5 seconds add'l voting time
      choices: remainingLocationOptions,
    },
    {
      id: "16",
      overlay: null,
      speaker: "billie",
      textBubbleType: "thought",
      text: "I’ve never seen someone so upset I don’t know who Korfball is. Well, I can work with what little I got. The two must have been Papa and Baby. But where could he hide a secret where she couldn’t find it– something that would make his own family so irate as to confront him in public? He’d want that where he could keep an eye on it, surely.",
      sound: audio_16,
      timeout_msec: 20200 + 5000, // 20.2 second clip, 5 seconds add'l voting time
      choices: remainingLocationOptions,
    },

    {
      id: "where-a",
      speaker: "billie",
      textBubbleType: "thought",
      text: "In his wallet?",
      sound: audio_where_a,
      timeout_msec: 2200,
      next: "where-a1",
    },
    {
      id: "where-a1",
      speaker: "billie",
      textBubbleType: "thought",
      text: "Hm. No, he would never let his wallet out of his sight. Besides, Baby’s a lot of things, but I don’t think she’s a pickpocket.",
      sound: audio_where_a1,
      timeout_msec: 8000 + 5000, // 8 second clip, 5 seconds additional voting time
      choices: remainingLocationOptions,
    },
    {
      id: "where-b",
      speaker: "billie",
      textBubbleType: "thought",
      text: "In his car?",
      sound: audio_where_b,
      timeout_msec: 2000,
      next: "where-b1",
    },
    {
      id: "where-b1",
      speaker: "billie",
      textBubbleType: "thought",
      text: "Hm. No, too many others use his car. I’m sure he trusts Rover, but would he trust him with his deepest secrets?",
      sound: audio_where_b1,
      timeout_msec: 8000 + 5000, // 8 second clip, 5 seconds additional voting time
      choices: remainingLocationOptions,
    },
    {
      id: "where-c",
      speaker: "billie",
      textBubbleType: "thought",
      text: "In his office?",
      sound: audio_where_c,
      timeout_msec: 2200,
      next: "where-c1",
    },
    {
      id: "where-c1",
      speaker: "billie",
      textBubbleType: "thought",
      text: "Hm. No, too many people who could access it. Gladys and Sidecar are so involved in the business and in outdoing each other that anything secret from one or the other at the office wouldn’t stay that way for long.",
      sound: audio_where_c1,
      timeout_msec: 12000 + 5000, // 12 second clip, 5 seconds additional voting time
      choices: remainingLocationOptions,
    },
    {
      id: "where-d",
      speaker: "billie",
      textBubbleType: "thought",
      text: "In his study?",
      sound: audio_where_d,
      timeout_msec: 2000,
      next: "where-d1",
    },
    {
      id: "where-d1",
      speaker: "billie",
      textBubbleType: "thought",
      text: "Hm. His study makes the most sense. His private retreat within his home, already off-limits to everyone else, with plenty of opportunities to hide his dirty little secrets. I think that should be my next stop.",
      sound: audio_where_d1,
      timeout_msec: 12750,
      finalState(state: ArtGalleryState) {
        return {
          opinion: state.opinion ?? "dunce",
          selection: state.selection ?? "kieftenbeld-postcard",
        };
      },
    },
  ],
};

export default ArtGalleryInteractionGraph;
