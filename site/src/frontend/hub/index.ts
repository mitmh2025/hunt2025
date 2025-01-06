import { type TeamHuntState } from "../../../lib/api/client";
import { type ArtGalleryResult } from "../interactions/interview_at_the_art_gallery/graph";
import { type BoardwalkInteractionResult } from "../interactions/interview_at_the_boardwalk/graph";
import { type CasinoResult } from "../interactions/interview_at_the_casino/graph";
import art_gallery_token_kieftenbeld from "./assets/art_gallery_token_kieftenbeld.png";
import art_gallery_token_lemahieu from "./assets/art_gallery_token_lemahieu.png";
import baby_aka_teresa_candy_tape from "./assets/baby_aka_teresa_candy_tape.png";
import background_check_answer_solved from "./assets/background_check_answer_solved.png";
import background_check_question_unlocked from "./assets/background_check_question_unlocked.png";
import boardwalk_token_keychain from "./assets/boardwalk_token_keychain.png";
import boardwalk_token_photo from "./assets/boardwalk_token_photo.png";
import boardwalk_token_ticket_stub from "./assets/boardwalk_token_ticket_stub.png";
import carter_aka_tape from "./assets/carter_aka_tape.png";
import casino_token_ace_of_diamonds from "./assets/casino_token_ace_of_diamonds.png";
import casino_token_ace_of_spades from "./assets/casino_token_ace_of_spades.png";
import casino_token_joker from "./assets/casino_token_joker.png";
import gladys_aka_ms_glass_tape from "./assets/gladys_aka_ms_glass_tape.png";
import illegal_search_answer_solved from "./assets/illegal_search_answer_solved.png";
import illegal_search_question_unlocked from "./assets/illegal_search_question_unlocked.png";
import jewelry_store_token from "./assets/jewelry_store_token.png";
import katrina_aka_mockingbird_tape from "./assets/katrina_aka_mockingbird_tape.png";
import main_question_answer_1 from "./assets/main_question_answer_1.png";
import main_question_answer_2 from "./assets/main_question_answer_2.png";
import main_question_answer_3a from "./assets/main_question_answer_3a.png";
import main_question_answer_3b from "./assets/main_question_answer_3b.png";
import missing_diamond_answer_solved from "./assets/missing_diamond_answer_solved.png";
import missing_diamond_question_unlocked from "./assets/missing_diamond_question_unlocked.png";
import murder_in_mitropolis_answer_solved from "./assets/murder_in_mitropolis_answer_solved.png";
import murder_in_mitropolis_question_unlocked from "./assets/murder_in_mitropolis_question_unlocked.png";
import paper_trail_answer_solved from "./assets/paper_trail_answer_solved.png";
import paper_trail_question_unlocked from "./assets/paper_trail_question_unlocked.png";
import pin_teal from "./assets/pin_teal.png";
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
    "murder_in_mitropolis",
    "unmask_the_killer",
  );
};
const VAULT_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "the_vault", "the_vault");
};

const OBJECTS: HubObjectSetting[] = [
  {
    asset: illegal_search_question_unlocked,
    alt: "What was Papa arguing about at the Art Gallery? Search his study…",
    x: 61,
    y: 48,
    width: 948,
    rot: 1.8,
    shadow: true,
    href: "/rounds/illegal_search",
    condition: ILLEGAL_SEARCH_UNLOCKED,
  },
  {
    asset: illegal_search_answer_solved,
    alt: "Baby’s angry he hid she’s adopted (Does she know Papa’s why her birth parents are in the clink?)",
    x: 94,
    y: 238,
    width: 788,
    rot: 1.8,
    shadow: false,
    inert: true,
    condition: ILLEGAL_SEARCH_COMPLETED,
  },
  {
    asset: background_check_question_unlocked,
    alt: "What was Carter doing at the Casino? Run a background check…",
    x: 83,
    y: 1358,
    width: 920,
    rot: -1.1,
    shadow: true,
    href: "/rounds/background_check",
    condition: BACKGROUND_CHECK_UNLOCKED,
  },
  {
    asset: background_check_answer_solved,
    alt: "He’s a con man trying to settle his gambling debts",
    x: 110,
    y: 1555,
    width: 730,
    rot: -1.1,
    shadow: false,
    inert: true,
    condition: BACKGROUND_CHECK_COMPLETED,
  },
  {
    asset: paper_trail_question_unlocked,
    alt: "Why was Gladys at a competitor’s jewely store? Follow paper trail…",
    x: 2921,
    y: 95,
    width: 901,
    rot: 1.6,
    shadow: true,
    href: "/rounds/paper_trail",
    condition: PAPER_TRAIL_UNLOCKED,
  },
  {
    asset: paper_trail_answer_solved,
    alt: "She didn’t want to give Carter one of her company’s counterfeit rings",
    x: 2952,
    y: 282,
    width: 734,
    rot: 1.6,
    shadow: false,
    inert: true,
    condition: PAPER_TRAIL_COMPLETED,
  },
  {
    asset: stakeout_question_unlocked,
    alt: "Why was Katrina at the Boardwalk? Hold a stakeout…",
    x: 2899,
    y: 1341,
    width: 895,
    rot: -4,
    shadow: true,
    href: "/rounds/stakeout",
    condition: STAKEOUT_UNLOCKED,
  },
  {
    asset: stakeout_answer_solved,
    alt: "She’s an undercover cop meeting a source",
    x: 2912,
    y: 1531,
    width: 718,
    rot: -4,
    shadow: false,
    inert: true,
    condition: STAKEOUT_COMPLETED,
  },
  {
    asset: art_gallery_token_lemahieu,
    alt: "A postcard of a painting by LeMahieu from the Art Gallery",
    x: 99,
    y: 408,
    width: 399,
    rot: -4.6,
    shadow: true,
    href: "/interactions/interview_at_the_art_gallery",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_art_gallery?.result as ArtGalleryResult | undefined;
      return !!(
        result &&
        (result === "lemahieu" || result === "lemahieu-postcard")
      );
    },
    pin: {
      asset: pin_teal,
      x: 275,
      y: 446,
    },
  },
  {
    asset: art_gallery_token_kieftenbeld,
    alt: "A postcard of a painting by Kieftenbeld from the Art Gallery",
    x: 99,
    y: 408,
    width: 399,
    rot: -4.6,
    shadow: true,
    href: "/interactions/interview_at_the_art_gallery",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_art_gallery?.result as ArtGalleryResult | undefined;
      return !!(
        result &&
        (result === "kieftenbeld" || result === "kieftenbeld-postcard")
      );
    },
    pin: {
      asset: pin_teal,
      x: 275,
      y: 446,
    },
  },
  {
    asset: stray_leads_postit,
    alt: "Stray Leads: Unsorted leads available to solve",
    x: 40,
    y: 984,
    width: 402,
    rot: 2.3,
    shadow: true,
    href: "/rounds/stray_leads",
    condition: HUNT_STARTED,
  },
  {
    asset: casino_token_joker,
    alt: "A joker from the Casino",
    x: 63,
    y: 1699,
    width: 449,
    rot: 2.6,
    shadow: true,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "joker");
    },
    pin: {
      asset: pin_teal,
      x: 275,
      y: 1720,
    },
  },
  {
    asset: casino_token_ace_of_diamonds,
    alt: "An Ace of Diamonds from the Casino",
    x: 63,
    y: 1699,
    width: 449,
    rot: 2.6,
    shadow: true,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "ace-of-diamonds");
    },
    pin: {
      asset: pin_teal,
      x: 275,
      y: 1720,
    },
  },
  {
    asset: casino_token_ace_of_spades,
    alt: "An Ace of Spades from the Casino",
    x: 63,
    y: 1699,
    width: 449,
    rot: 2.6,
    shadow: true,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "ace-of-spades");
    },
    pin: {
      asset: pin_teal,
      x: 275,
      y: 1720,
    },
  },
  {
    asset: trainee_pin,
    alt: "A 2 P.I. Noir trainee pin",
    x: 586,
    y: 1764,
    width: 330,
    rot: 1.3,
    shadow: true,
    inert: true,
    condition(teamState: TeamHuntState) {
      return INTERACTION_COMPLETED(
        teamState,
        "the_missing_diamond",
        "catch_the_thief",
      );
    },
    pin: {
      asset: pin_teal,
      x: 727,
      y: 1777,
    },
  },
  {
    asset: jewelry_store_token,
    alt: "A note from the jewelry store that says ”Call me! ❤️ PEnnsylvania 6-5000",
    x: 2888,
    y: 432,
    width: 409,
    rot: 4.7,
    shadow: true,
    href: "/interactions/interview_at_the_jewelry_store",
    condition(teamState: TeamHuntState) {
      return (
        teamState.rounds.the_missing_diamond?.interactions
          ?.interview_at_the_jewelry_store?.state === "completed"
      );
    },
    pin: {
      asset: pin_teal,
      x: 3072,
      y: 430,
    },
  },
  {
    asset: boardwalk_token_photo,
    alt: "A photo from the Boardwalk. Billie is hidden behind the giant stuffed beaver they are holding while Roger flashes a cautious thumbs up",
    x: 3033,
    y: 1670,
    width: 749,
    rot: 10.1,
    rotOrigin: "top left",
    shadow: true,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "photo");
    },
    pin: {
      asset: pin_teal,
      x: 3321,
      y: 1756,
    },
  },
  {
    asset: boardwalk_token_keychain,
    alt: "A rubber duck keychain from the Boardwalk",
    x: 2950,
    y: 1622,
    width: 242,
    rot: 0,
    shadow: true,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "keychain");
    },
    pin: {
      asset: pin_teal,
      x: 3088,
      y: 1622,
    },
  },
  {
    asset: boardwalk_token_ticket_stub,
    alt: "A ticket stub from the Boardwalk",
    x: 3040,
    y: 1626,
    width: 132,
    rot: -1.4,
    shadow: true,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.the_missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "ticket-stub");
    },
    pin: {
      asset: pin_teal,
      x: 3088,
      y: 1622,
    },
  },
  {
    asset: murder_in_mitropolis_question_unlocked,
    alt: "Who killed Sidecar? Solve the murder in MITropolis…",
    x: 2900,
    y: 588,
    width: 887,
    rot: -1.6,
    shadow: true,
    href: "/rounds/murder_in_mitropolis",
    condition: MURDER_IN_MITROPOLIS_UNLOCKED,
  },
  {
    asset: murder_in_mitropolis_answer_solved,
    alt: "Rover. During a confrontation after he saw Sidecar swipe the diamond. (He says it was an accident)",
    x: 3063,
    y: 770,
    width: 676,
    rot: -1.6,
    shadow: false,
    inert: true,
    condition: MURDER_IN_MITROPOLIS_COMPLETED,
  },
  {
    asset: missing_diamond_question_unlocked,
    alt: "Where is the missing diamond? Interview witnesses to find the diamond…",
    x: 1471,
    y: 325,
    width: 972,
    rot: 2.7,
    shadow: true,
    href: "/rounds/the_missing_diamond",
    condition: MISSING_DIAMOND_UNLOCKED,
  },
  {
    asset: missing_diamond_answer_solved,
    alt: "A *fake* diamond was found where Sidecar was killed",
    x: 1636,
    y: 488,
    width: 693,
    rot: 2.7,
    shadow: false,
    inert: true,
    condition: MISSING_DIAMOND_COMPLETED,
  },
  {
    asset: main_question_answer_1,
    alt: "“Sidecar?”, crossed out",
    x: 1391,
    y: 214,
    width: 176,
    rot: -1.8,
    shadow: false,
    inert: true,
    condition: MISSING_DIAMOND_COMPLETED,
  },
  {
    asset: main_question_answer_2,
    alt: "Rover?",
    x: 1617,
    y: 208,
    width: 156,
    rot: -1.8,
    rotOrigin: "top left",
    shadow: false,
    inert: true,
    condition(teamState) {
      return (
        MURDER_IN_MITROPOLIS_COMPLETED(teamState) && !VAULT_COMPLETED(teamState)
      );
    },
  },
  {
    asset: main_question_answer_3a,
    alt: "“Rover?”, crossed out",
    x: 1617,
    y: 212,
    width: 158,
    rot: -1.8,
    rotOrigin: "top left",
    shadow: false,
    inert: true,
    condition: VAULT_COMPLETED,
  },
  {
    asset: main_question_answer_3b,
    alt: "“Baby”, underlined twice",
    x: 1809,
    y: 193,
    width: 164,
    rot: -10.1,
    rotOrigin: "top left",
    shadow: false,
    inert: true,
    condition: VAULT_COMPLETED,
  },
  {
    asset: baby_aka_teresa_candy_tape,
    alt: "AKA Teresa Candy",
    x: 2445,
    y: 1375,
    rot: 0,
    width: 430,
    shadow: true,
    inert: true,
    condition: VAULT_COMPLETED,
  },
  {
    asset: katrina_aka_mockingbird_tape,
    alt: "AKA Katharine Mockingbird",
    x: 2440,
    y: 1942,
    rot: 0,
    width: 423,
    shadow: true,
    inert: true,
    condition: STAKEOUT_COMPLETED,
  },
  {
    asset: carter_aka_tape,
    alt: "Real name: Shirley Grey",
    x: 978,
    y: 1370,
    rot: 0,
    width: 427,
    shadow: true,
    inert: true,
    condition: BACKGROUND_CHECK_COMPLETED,
  },
  {
    asset: gladys_aka_ms_glass_tape,
    alt: "“Ms Glass” (not to her face)",
    x: 2460,
    y: 770,
    rot: 0,
    width: 431,
    shadow: true,
    inert: true,
    condition: PAPER_TRAIL_COMPLETED,
  },
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
