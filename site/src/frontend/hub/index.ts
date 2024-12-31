import { type TeamHuntState } from "../../../lib/api/client";
import { type ArtGalleryResult } from "../interactions/interview_at_the_art_gallery/graph";
import { type BoardwalkInteractionResult } from "../interactions/interview_at_the_boardwalk/graph";
import { type CasinoResult } from "../interactions/interview_at_the_casino/graph";
import art_gallery_token_kieftenbeld from "./assets/art_gallery_token_kieftenbeld.png";
import art_gallery_token_lemahieu from "./assets/art_gallery_token_lemahieu.png";
import background_check_answer_solved from "./assets/background_check_answer_solved.png";
import background_check_question_unlocked from "./assets/background_check_question_unlocked.png";
import boardwalk_token_keychain from "./assets/boardwalk_token_keychain.png";
import boardwalk_token_photo from "./assets/boardwalk_token_photo.png";
import boardwalk_token_ticket_stub from "./assets/boardwalk_token_ticket_stub.png";
import casino_token_ace_of_diamonds from "./assets/casino_token_ace_of_diamonds.png";
import casino_token_ace_of_spades from "./assets/casino_token_ace_of_spades.png";
import casino_token_joker from "./assets/casino_token_joker.png";
import illegal_search_answer_solved from "./assets/illegal_search_answer_solved.png";
import illegal_search_question_unlocked from "./assets/illegal_search_question_unlocked.png";
import jewelry_store_token from "./assets/jewelry_store_token.png";
import missing_diamond_answer_solved from "./assets/missing_diamond_answer_solved.png";
import missing_diamond_question_unlocked from "./assets/missing_diamond_question_unlocked.png";
import murder_in_mitropolis_answer_solved from "./assets/murder_in_mitropolis_answer_solved.png";
import murder_in_mitropolis_question_unlocked from "./assets/murder_in_mitropolis_question_unlocked.png";
import paper_trail_answer_solved from "./assets/paper_trail_answer_solved.png";
import paper_trail_question_unlocked from "./assets/paper_trail_question_unlocked.png";
import stakeout_answer_solved from "./assets/stakeout_answer_solved.png";
import stakeout_question_unlocked from "./assets/stakeout_question_unlocked.png";
import stray_leads_postit from "./assets/stray_leads_postit.png";
import trainee_pin from "./assets/trainee_pin.png";
import { type HubState, type HubObject } from "./types";

type HubObjectSetting = HubObject & {
  condition: (teamState: TeamHuntState) => boolean;
};

const HUNT_STARTED = (teamState: TeamHuntState) => {
  return !!teamState.rounds.the_missing_diamond?.gates?.includes(
    "hunt_started",
  );
};
const ROUND_UNLOCKED = (teamState: TeamHuntState, round: string) => {
  return !!teamState.rounds[round];
};
const INTERACTION_COMPLETED = (
  teamState: TeamHuntState,
  round: string,
  interaction: string,
) => {
  return (
    teamState.rounds[round]?.interactions?.[interaction]?.state === "completed"
  );
};
const MISSING_DIAMOND_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "the_missing_diamond");
};
const MISSING_DIAMOND_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(
    teamState,
    "the_missing_diamond",
    "catch_the_thief",
  );
};
const ILLEGAL_SEARCH_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "illegal_search");
};
const ILLEGAL_SEARCH_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "illegal_search", "meet_papa");
};
const BACKGROUND_CHECK_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "background_check");
};
const BACKGROUND_CHECK_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "background_check", "meet_carter");
};
const PAPER_TRAIL_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "paper_trail");
};
const PAPER_TRAIL_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "paper_trail", "meet_gladys");
};
const STAKEOUT_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "stakeout");
};
const STAKEOUT_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "stakeout", "meet_katrina");
};
const MURDER_IN_MITROPOLIS_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "murder_in_mitropolis");
};
const MURDER_IN_MITROPOLIS_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(
    teamState,
    "murder_im_mitropolis",
    "unmask_the_killer",
  );
};

const OBJECTS: HubObjectSetting[] = [
  {
    asset: illegal_search_question_unlocked,
    alt: "TODO",
    x: 61,
    y: 76,
    width: 948,
    rot: 1.8,
    href: "/rounds/illegal_search",
    condition: ILLEGAL_SEARCH_UNLOCKED,
  },
  {
    asset: illegal_search_answer_solved,
    alt: "TODO",
    x: 94,
    y: 266,
    width: 788,
    rot: 1.8,
    inert: true,
    condition: ILLEGAL_SEARCH_COMPLETED,
  },
  {
    asset: background_check_question_unlocked,
    alt: "TODO",
    x: 83,
    y: 1358,
    width: 920,
    rot: -1.1,
    href: "/rounds/background_check",
    condition: BACKGROUND_CHECK_UNLOCKED,
  },
  {
    asset: background_check_answer_solved,
    alt: "TODO",
    x: 110,
    y: 1555,
    width: 730,
    rot: -1.1,
    inert: true,
    condition: BACKGROUND_CHECK_COMPLETED,
  },
  {
    asset: paper_trail_question_unlocked,
    alt: "TODO",
    x: 2881,
    y: 95,
    width: 901,
    rot: 1.6,
    href: "/rounds/paper_trail",
    condition: PAPER_TRAIL_UNLOCKED,
  },
  {
    asset: paper_trail_answer_solved,
    alt: "TODO",
    x: 2912,
    y: 282,
    width: 734,
    rot: 1.6,
    inert: true,
    condition: PAPER_TRAIL_COMPLETED,
  },
  {
    asset: stakeout_question_unlocked,
    alt: "TODO",
    x: 2899,
    y: 1341,
    width: 895,
    rot: -4,
    href: "/rounds/stakeout",
    condition: STAKEOUT_UNLOCKED,
  },
  {
    asset: stakeout_answer_solved,
    alt: "TODO",
    x: 2912,
    y: 1531,
    width: 718,
    rot: -4,
    inert: true,
    condition: STAKEOUT_COMPLETED,
  },
  {
    asset: art_gallery_token_lemahieu,
    alt: "TODO",
    x: 99,
    y: 408,
    width: 399,
    rot: -4.6,
    href: "/interactions/interview_at_the_art_gallery",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_art_gallery?.result as ArtGalleryResult | undefined;
      return !!(
        result &&
        (result === "lemahieu" || result === "lemahieu-postcard")
      );
    },
  },
  {
    asset: art_gallery_token_kieftenbeld,
    alt: "TODO",
    x: 99,
    y: 408,
    width: 399,
    rot: -4.6,
    href: "/interactions/interview_at_the_art_gallery",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_art_gallery?.result as ArtGalleryResult | undefined;
      return !!(
        result &&
        (result === "kieftenbeld" || result === "kieftenbeld-postcard")
      );
    },
  },
  {
    asset: stray_leads_postit,
    alt: "TODO",
    x: 56,
    y: 984,
    width: 402,
    rot: 2.3,
    href: "/rounds/stray_leads",
    condition: HUNT_STARTED,
  },
  {
    asset: casino_token_joker,
    alt: "TODO",
    x: 63,
    y: 1699,
    width: 449,
    rot: 2.6,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "joker");
    },
  },
  {
    asset: casino_token_ace_of_diamonds,
    alt: "TODO",
    x: 63,
    y: 1699,
    width: 449,
    rot: 2.6,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "ace-of-diamonds");
    },
  },
  {
    asset: casino_token_ace_of_spades,
    alt: "TODO",
    x: 63,
    y: 1699,
    width: 449,
    rot: 2.6,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "ace-of-spades");
    },
  },
  {
    asset: trainee_pin,
    alt: "TODO",
    x: 586,
    y: 1764,
    width: 330,
    rot: 1.3,
    inert: true,
    condition(teamState: TeamHuntState) {
      return INTERACTION_COMPLETED(
        teamState,
        "the_missing_diamond",
        "catch_the_thief",
      );
    },
  },
  {
    asset: jewelry_store_token,
    alt: "TODO",
    x: 2888,
    y: 432,
    width: 409,
    rot: 4.7,
    href: "/interactions/interview_at_the_jewelry_store",
    condition(teamState: TeamHuntState) {
      return (
        teamState.rounds.the_missing_diamond?.interactions
          ?.interview_at_the_jewelry_store?.state === "completed"
      );
    },
  },
  {
    asset: boardwalk_token_photo,
    alt: "TODO",
    x: 2958,
    y: 1670,
    width: 749,
    rot: -10.1,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "photo");
    },
  },
  {
    asset: boardwalk_token_keychain,
    alt: "TODO",
    x: 2950,
    y: 1622,
    width: 242,
    rot: 0,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "keychain");
    },
  },
  {
    asset: boardwalk_token_ticket_stub,
    alt: "TODO",
    x: 3040,
    y: 1626,
    width: 132,
    rot: -1.4,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "ticket-stub");
    },
  },
  {
    asset: murder_in_mitropolis_question_unlocked,
    alt: "TODO",
    x: 2900,
    y: 588,
    width: 887,
    rot: -1.6,
    href: "/rounds/murder_in_mitropolis",
    condition: MURDER_IN_MITROPOLIS_UNLOCKED,
  },
  {
    asset: murder_in_mitropolis_answer_solved,
    alt: "TODO",
    x: 3063,
    y: 770,
    width: 676,
    rot: -1.6,
    inert: true,
    condition: MURDER_IN_MITROPOLIS_COMPLETED,
  },
  {
    asset: missing_diamond_question_unlocked,
    alt: "TODO",
    x: 1471,
    y: 395,
    width: 972,
    rot: 2.7,
    href: "/rounds/the_missing_diamond",
    condition: MISSING_DIAMOND_UNLOCKED,
  },
  {
    asset: missing_diamond_answer_solved,
    alt: "TODO",
    x: 1636,
    y: 558,
    width: 693,
    rot: 2.7,
    inert: true,
    condition: MISSING_DIAMOND_COMPLETED,
  },
  // TODO: figure out what we really want, sequence wise, for the main_question assets.
  // main_question claims it should appear at start of hunt, and link to the metameta page, if we have one,
  // but also the metameta isn't unlocked initially (indeed, it is not available until all four
  // submetas are solved).
  // TODO: implement anything after missing_diamond_answer_solved from the spreadsheet.  To wit:
  // * suspect photos
  // * pins
  // * string between pins
];

export function hubState(teamState: TeamHuntState): HubState {
  const rounds = Object.entries(teamState.rounds).map(([slug, roundObj]) => {
    return {
      slug,
      title: roundObj.title,
    };
  });
  if (teamState.rounds.the_missing_diamond?.gates?.includes("hunt_started")) {
    rounds.push({
      slug: "stray_leads",
      title: "Stray Leads",
    });
  }

  const objects = OBJECTS.flatMap((obj) => {
    const { condition, ...rest } = obj;
    if (condition(teamState)) {
      return [rest];
    } else {
      return [];
    }
  });

  return {
    epoch: teamState.epoch,
    rounds,
    objects,
  };
}
