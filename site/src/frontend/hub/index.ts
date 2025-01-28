import { type TeamHuntState } from "../../../lib/api/client";
import { type ArtGalleryResult } from "../interactions/interview_at_the_art_gallery/graph";
import { type BoardwalkInteractionResult } from "../interactions/interview_at_the_boardwalk/graph";
import { type CasinoResult } from "../interactions/interview_at_the_casino/graph";
import { eventDataForTeam } from "../rounds/events/eventData";
import artGallery from "../rounds/missing_diamond/assets/art-gallery-solved.svg";
import boardwalk from "../rounds/missing_diamond/assets/boardwalk-solved.svg";
import casino from "../rounds/missing_diamond/assets/casino-solved.svg";
import jewelryStore from "../rounds/missing_diamond/assets/jewelry-store-solved.svg";
import map from "../rounds/missing_diamond/assets/map.png";
import about_the_hunt_flag from "./assets/about_the_hunt_flag.png";
import art_gallery_token_kieftenbeld from "./assets/art_gallery_token_kieftenbeld.png";
import art_gallery_token_lemahieu from "./assets/art_gallery_token_lemahieu.png";
import baby_aka_teresa_candy_tape from "./assets/baby_aka_teresa_candy_tape.png";
import background_check_answer_solved from "./assets/background_check_answer_solved.png";
import background_check_question_unlocked from "./assets/background_check_question_unlocked.png";
import boardwalk_token_keychain from "./assets/boardwalk_token_keychain.png";
import boardwalk_token_photo from "./assets/boardwalk_token_photo.jpg";
import boardwalk_token_ticket_stub from "./assets/boardwalk_token_ticket_stub.png";
import carter_aka_tape from "./assets/carter_aka_tape.png";
import casino_token_ace_of_diamonds from "./assets/casino_token_ace_of_diamonds.png";
import casino_token_ace_of_spades from "./assets/casino_token_ace_of_spades.png";
import casino_token_joker from "./assets/casino_token_joker.png";
import dont_refresh_postit from "./assets/dont_refresh_postit.png";
import filmstrip from "./assets/filmstrip.png";
import gladys_aka_ms_glass_tape from "./assets/gladys_aka_ms_glass_tape.png";
import health_and_safety_flag from "./assets/health_and_safety_flag.png";
import illegal_search_answer_solved from "./assets/illegal_search_answer_solved.png";
import illegal_search_question_unlocked from "./assets/illegal_search_question_unlocked.png";
import interaction_stamp from "./assets/interaction_stamp.png";
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
import pin_gold from "./assets/pin_gold.png";
import pin_purple from "./assets/pin_purple.png";
import pin_teal from "./assets/pin_teal.png";
import puzzle_piece from "./assets/puzzle_piece.png";
import radio_instruction_manual from "./assets/radio_instruction_manual.png";
import stakeout_answer_solved from "./assets/stakeout_answer_solved.png";
import stakeout_question_unlocked from "./assets/stakeout_question_unlocked.png";
import stray_leads_postit from "./assets/stray_leads_postit.png";
import string_background_check_to_carter_photo from "./assets/string_background_check_to_carter_photo.png";
import string_boardwalk_to_katrina_photo from "./assets/string_boardwalk_to_katrina_photo.png";
import string_carter_photo_to_casino from "./assets/string_carter_photo_to_casino.png";
import string_gladys_photo_to_paper_trail from "./assets/string_gladys_photo_to_paper_trail.png";
import string_illegal_search_to_papa_photo from "./assets/string_illegal_search_to_papa_photo.png";
import string_jewelry_store_to_gladys_photo from "./assets/string_jewelry_store_to_gladys_photo.png";
import string_katrina_photo_to_stakeout from "./assets/string_katrina_photo_to_stakeout.png";
import string_main_question_to_baby_photo from "./assets/string_main_question_to_baby_photo.png";
import string_missing_diamond_to_murder_in_mitropolis from "./assets/string_missing_diamond_to_murder_in_mitropolis.png";
import string_papa_photo_to_art_gallery from "./assets/string_papa_photo_to_art_gallery.png";
import string_rover_photo_to_murder_in_mitropolis from "./assets/string_rover_photo_to_murder_in_mitropolis.png";
import string_sidecar_photo_to_murder_in_mitropolis from "./assets/string_sidecar_photo_to_murder_in_mitropolis.png";
import string_sidecar_photo_to_rover_photo from "./assets/string_sidecar_photo_to_rover_photo.png";
import trainee_pin from "./assets/trainee_pin.png";
import {
  type HubState,
  type HubObject,
  type HubSuspectStatus,
  type HubSuspect,
} from "./types";

type HubObjectSetting = HubObject & {
  condition: (teamState: TeamHuntState) => boolean;
};

type HubSuspectStatusSetting = HubSuspectStatus & {
  condition: (teamState: TeamHuntState) => boolean;
};

type HubSuspectSetting = {
  status:
    | [HubSuspectStatusSetting]
    | [HubSuspectStatusSetting, HubSuspectStatusSetting]
    | [
        HubSuspectStatusSetting,
        HubSuspectStatusSetting,
        HubSuspectStatusSetting,
      ];
};

const ALWAYS = (_: TeamHuntState) => {
  return true;
};

const HUNT_NOT_STARTED = (teamState: TeamHuntState) => {
  return !teamState.rounds.missing_diamond?.gates?.includes("hunt_started");
};

const HUNT_STARTED = (teamState: TeamHuntState) => {
  return !!teamState.rounds.missing_diamond?.gates?.includes("hunt_started");
};
const ROUND_UNLOCKED = (teamState: TeamHuntState, round: string) => {
  return !!teamState.rounds[round];
};
const PUZZLE_UNLOCKED =
  (slug: string) =>
  (teamState: TeamHuntState): boolean => {
    return teamState.puzzles[slug]?.unlocked_at !== undefined;
  };
const INTERACTION_UNLOCKED =
  (round: string, interaction: string) => (teamState: TeamHuntState) => {
    return !!teamState.rounds[round]?.interactions?.[interaction];
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
  return ROUND_UNLOCKED(teamState, "missing_diamond");
};
const MISSING_DIAMOND_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "missing_diamond", "the_crime_scene");
};
const ILLEGAL_SEARCH_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "illegal_search");
};
const ILLEGAL_SEARCH_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "illegal_search", "confront_papa");
};
const BACKGROUND_CHECK_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "background_check");
};
const BACKGROUND_CHECK_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(
    teamState,
    "background_check",
    "confront_carter",
  );
};
const PAPER_TRAIL_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "paper_trail");
};
const PAPER_TRAIL_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "paper_trail", "confront_gladys");
};
const STAKEOUT_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "stakeout");
};
const STAKEOUT_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "stakeout", "confront_katrina");
};
const MURDER_IN_MITROPOLIS_UNLOCKED = (teamState: TeamHuntState) => {
  return ROUND_UNLOCKED(teamState, "murder_in_mitropolis");
};
const MURDER_IN_MITROPOLIS_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(
    teamState,
    "murder_in_mitropolis",
    "the_safehouse",
  );
};
const VAULT_COMPLETED = (teamState: TeamHuntState) => {
  return INTERACTION_COMPLETED(teamState, "endgame", "the_vault");
};

const OBJECTS: HubObjectSetting[] = [
  {
    asset: dont_refresh_postit,
    alt: "This page will live-update when puzzles become available.",
    x: 1709,
    y: 454,
    width: 403,
    rot: -1.5,
    shadow: true,
    inert: true,
    condition: HUNT_NOT_STARTED,
    pin: {
      asset: pin_gold,
      x: 1890,
      y: 468,
    },
  },
  {
    asset: radio_instruction_manual,
    alt: "Radio Instruction Manual",
    x: 1739,
    y: 914,
    width: 440,
    rot: 1.5,
    shadow: true,
    href: "/radio",
    condition: HUNT_NOT_STARTED,
    pin: {
      asset: pin_purple,
      x: 1950,
      y: 944,
    },
  },
  {
    asset: about_the_hunt_flag,
    alt: "About the Hunt",
    x: 1838,
    y: 1269,
    width: 519,
    rot: -4.3,
    shadow: true,
    href: "/about",
    condition: HUNT_NOT_STARTED,
  },
  {
    asset: health_and_safety_flag,
    alt: "Health & Safety",
    x: 1789,
    y: 1409,
    width: 519,
    rot: 3.4,
    shadow: true,
    href: "/health_and_safety",
    condition: HUNT_NOT_STARTED,
  },
  {
    asset: filmstrip,
    alt: "A strip of film showing the Shadow Diamond",
    x: 1003,
    y: 131,
    width: 150,
    rot: -4.5,
    shadow: true,
    href: "https://youtube.com/live/cWPZ61YgY6s",
    condition: ALWAYS,
    pin: {
      asset: pin_teal,
      x: 1058,
      y: 116,
    },
  },
  {
    asset: map,
    alt: "A map of Downtown MITropolis",
    x: 1424,
    y: 664,
    width: 991,
    rot: 0,
    shadow: true,
    href: "/rounds/missing_diamond",
    condition: MISSING_DIAMOND_UNLOCKED,
  },
  {
    asset: artGallery,
    alt: "The Art Gallery",
    x: 1578,
    y: 1273,
    width: 66.8,
    rot: 0,
    shadow: false,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_art_gallery"),
  },
  {
    asset: boardwalk,
    alt: "The Boardwalk",
    x: 1425,
    y: 1468,
    width: 805,
    rot: 0,
    shadow: false,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_boardwalk"),
  },
  {
    asset: casino,
    alt: "The Casino",
    x: 1659,
    y: 985,
    width: 103,
    rot: 0,
    shadow: false,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_casino"),
  },
  {
    asset: jewelryStore,
    alt: "The Jewelry Store",
    x: 2052,
    y: 831,
    width: 95.7,
    rot: 0,
    shadow: false,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_jewelry_store"),
  },
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
    pin: {
      asset: pin_purple,
      x: 472,
      y: 91,
    },
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
    pin: {
      asset: pin_purple,
      x: 508,
      y: 1388,
    },
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
    pin: {
      asset: pin_purple,
      x: 3286,
      y: 105,
    },
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
    rot: 4,
    rotOrigin: "top left",
    shadow: true,
    href: "/rounds/stakeout",
    condition: STAKEOUT_UNLOCKED,
    pin: {
      asset: pin_purple,
      x: 3314,
      y: 1386,
    },
  },
  {
    asset: stakeout_answer_solved,
    alt: "She’s an undercover cop meeting a source",
    x: 2925,
    y: 1531,
    width: 718,
    rot: 4,
    rotOrigin: "top left",
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
      const result = teamState.rounds.missing_diamond?.interactions
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
      const result = teamState.rounds.missing_diamond?.interactions
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
    pin: {
      asset: pin_gold,
      x: 230,
      y: 1025,
    },
  },
  {
    asset: casino_token_joker,
    alt: "A joker from the Casino",
    x: 23,
    y: 1699,
    width: 449,
    rot: 2.6,
    shadow: true,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "joker");
    },
    pin: {
      asset: pin_teal,
      x: 245,
      y: 1720,
    },
  },
  {
    asset: casino_token_ace_of_diamonds,
    alt: "An Ace of Diamonds from the Casino",
    x: 23,
    y: 1699,
    width: 449,
    rot: 2.6,
    shadow: true,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "ace-of-diamonds");
    },
    pin: {
      asset: pin_teal,
      x: 245,
      y: 1720,
    },
  },
  {
    asset: casino_token_ace_of_spades,
    alt: "An Ace of Spades from the Casino",
    x: 23,
    y: 1699,
    width: 449,
    rot: 2.6,
    shadow: true,
    href: "/interactions/interview_at_the_casino",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.missing_diamond?.interactions
        ?.interview_at_the_casino?.result as CasinoResult | undefined;
      return !!(result && result === "ace-of-spades");
    },
    pin: {
      asset: pin_teal,
      x: 245,
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
        "missing_diamond",
        "the_crime_scene",
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
        teamState.rounds.missing_diamond?.interactions
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
    x: 2933,
    y: 1670,
    width: 749,
    rot: 10.1,
    rotOrigin: "top left",
    shadow: true,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "photo");
    },
    pin: {
      asset: pin_teal,
      x: 3221,
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
      const result = teamState.rounds.missing_diamond?.interactions
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
    y: 1726,
    width: 132,
    rot: -1.4,
    shadow: true,
    href: "/interactions/interview_at_the_boardwalk",
    condition(teamState: TeamHuntState) {
      const result = teamState.rounds.missing_diamond?.interactions
        ?.interview_at_the_boardwalk?.result as
        | BoardwalkInteractionResult
        | undefined;
      return !!(result && result === "ticket-stub");
    },
    pin: {
      asset: pin_teal,
      x: 3088,
      y: 1722,
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
    pin: {
      asset: pin_purple,
      x: 3382,
      y: 630,
    },
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
    asset: puzzle_piece,
    alt: "A piece of a jigsaw puzzle",
    x: 3428,
    y: 1028,
    width: 332,
    rot: 4.7,
    rotOrigin: "top left",
    shadow: true,
    inert: true,
    condition: MURDER_IN_MITROPOLIS_COMPLETED,
    pin: {
      asset: pin_teal,
      x: 3521,
      y: 1182,
    },
  },
  {
    asset: missing_diamond_question_unlocked,
    alt: "Where is the missing diamond? Interview witnesses to find the diamond…",
    x: 1471,
    y: 395,
    width: 972,
    rot: -2.7,
    rotOrigin: "top left",
    shadow: true,
    href: "/rounds/missing_diamond",
    condition: MISSING_DIAMOND_UNLOCKED,
    pin: {
      asset: pin_purple,
      x: 1950,
      y: 386,
    },
  },
  {
    asset: missing_diamond_answer_solved,
    alt: "A *fake* diamond was found where Sidecar was killed",
    x: 1644,
    y: 551,
    width: 693,
    rot: -2.7,
    rotOrigin: "top left",
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
    y: 1378,
    rot: 5,
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

  // stamps
  {
    asset: interaction_stamp,
    alt: "The Crime Scene",
    x: 1520,
    y: 490,
    rot: 10.9,
    rotOrigin: "top left",
    width: 107,
    shadow: false,
    href: "/interactions/the_crime_scene",
    condition: INTERACTION_UNLOCKED("missing_diamond", "the_crime_scene"),
  },
  {
    asset: interaction_stamp,
    alt: "Confront Papa",
    x: 75,
    y: 169,
    width: 107,
    rot: -17.2,
    rotOrigin: "top left",
    shadow: false,
    href: "/interactions/confront_papa",
    condition: INTERACTION_UNLOCKED("illegal_search", "confront_papa"),
  },
  {
    asset: interaction_stamp,
    alt: "Confront Carter",
    x: 116,
    y: 1466,
    rot: 7.3,
    rotOrigin: "top left",
    width: 107,
    shadow: false,
    href: "/interactions/confront_carter",
    condition: INTERACTION_UNLOCKED("background_check", "confront_carter"),
  },
  {
    asset: interaction_stamp,
    alt: "Confront Katrina",
    x: 3575,
    y: 1511,
    rot: -9.3,
    rotOrigin: "top left",
    width: 107,
    shadow: false,
    href: "/interactions/confront_katrina",
    condition: INTERACTION_UNLOCKED("stakeout", "confront_katrina"),
  },
  {
    asset: interaction_stamp,
    alt: "Confront Gladys",
    x: 2941,
    y: 125,
    rot: -11,
    rotOrigin: "top left",
    width: 107,
    shadow: false,
    href: "/interactions/confront_gladys",
    condition: INTERACTION_UNLOCKED("paper_trail", "confront_gladys"),
  },
  {
    asset: interaction_stamp,
    alt: "The Safehouse",
    x: 3635,
    y: 658,
    rot: 24.8,
    rotOrigin: "top left",
    width: 107,
    shadow: false,
    href: "/interactions/the_safehouse",
    condition: INTERACTION_UNLOCKED("murder_in_mitropolis", "the_safehouse"),
  },
  {
    asset: interaction_stamp,
    alt: "The Vault",
    x: 1270,
    y: 173,
    rot: 2.9,
    rotOrigin: "top left",
    width: 107,
    shadow: false,
    href: "/interactions/the_vault",
    condition: INTERACTION_UNLOCKED("endgame", "the_vault"),
  },

  // strings
  {
    asset: string_main_question_to_baby_photo,
    alt: "A piece of string",
    x: 2016,
    y: 206,
    width: 656,
    rot: 0,
    shadow: true,
    inert: true,
    condition: VAULT_COMPLETED,
    pin: {
      asset: pin_purple,
      x: 2000,
      y: 190,
    },
  },
  {
    asset: string_missing_diamond_to_murder_in_mitropolis,
    alt: "A piece of string",
    x: 1966,
    y: 402,
    width: 1432,
    rot: 0,
    shadow: true,
    inert: true,
    condition: MISSING_DIAMOND_COMPLETED,
  },
  {
    asset: string_sidecar_photo_to_murder_in_mitropolis,
    alt: "A piece of string",
    x: 1222,
    y: 646,
    width: 2176,
    rot: 0,
    shadow: true,
    inert: true,
    condition(teamState) {
      return (
        MISSING_DIAMOND_COMPLETED(teamState) &&
        !MURDER_IN_MITROPOLIS_COMPLETED(teamState)
      );
    },
  },
  {
    asset: string_rover_photo_to_murder_in_mitropolis,
    alt: "A piece of string",
    x: 1690,
    y: 646,
    width: 1708,
    rot: 0,
    shadow: true,
    inert: true,
    condition: MURDER_IN_MITROPOLIS_COMPLETED,
  },
  {
    asset: string_sidecar_photo_to_rover_photo,
    alt: "A piece of string",
    x: 1222,
    y: 1578,
    width: 468,
    rot: 0,
    shadow: true,
    inert: true,
    condition: MURDER_IN_MITROPOLIS_COMPLETED,
  },
  {
    asset: string_illegal_search_to_papa_photo,
    alt: "A piece of string",
    x: 488,
    y: 107,
    width: 722,
    rot: 0,
    shadow: true,
    inert: true,
    condition: ILLEGAL_SEARCH_UNLOCKED,
  },
  {
    asset: string_background_check_to_carter_photo,
    alt: "A piece of string",
    x: 524,
    y: 980,
    width: 680,
    rot: 0,
    shadow: true,
    inert: true,
    condition: BACKGROUND_CHECK_UNLOCKED,
  },
  {
    asset: string_katrina_photo_to_stakeout,
    alt: "A piece of string",
    x: 2674,
    y: 1402,
    width: 656,
    rot: 0,
    shadow: true,
    inert: true,
    condition: STAKEOUT_UNLOCKED,
  },
  {
    asset: string_gladys_photo_to_paper_trail,
    alt: "A piece of string",
    x: 2690,
    y: 110,
    width: 634,
    rot: 0,
    shadow: true,
    inert: true,
    condition: PAPER_TRAIL_UNLOCKED,
  },
  {
    asset: string_papa_photo_to_art_gallery,
    alt: "A piece of string",
    x: 1210,
    y: 394,
    width: 380,
    rot: 0,
    shadow: true,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_art_gallery"),
    pin: {
      asset: pin_teal,
      x: 1565,
      y: 1289,
    },
  },
  {
    asset: string_carter_photo_to_casino,
    alt: "A piece of string",
    x: 1204,
    y: 980,
    width: 514,
    rot: 0,
    shadow: true,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_casino"),
    pin: {
      asset: pin_teal,
      x: 1702,
      y: 1073,
    },
  },
  {
    asset: string_boardwalk_to_katrina_photo,
    alt: "A piece of string",
    x: 2195,
    y: 1481,
    width: 479,
    rot: 0,
    shadow: true,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_boardwalk"),
    pin: {
      asset: pin_teal,
      x: 2179,
      y: 1470,
    },
  },
  {
    asset: string_jewelry_store_to_gladys_photo,
    alt: "A piece of string",
    x: 2130,
    y: 382,
    width: 582,
    rot: 0,
    shadow: true,
    inert: true,
    condition: PUZZLE_UNLOCKED("the_jewelry_store"),
    pin: {
      asset: pin_teal,
      x: 2114,
      y: 896,
    },
  },
];

const SUSPECTS: Record<string, HubSuspectSetting> = {
  papa: {
    status: [
      { text: "Suspect", condition: ALWAYS },
      { text: "Arrested", color: "#D52222", condition: VAULT_COMPLETED },
    ],
  },
  carter: {
    status: [
      { text: "Suspect", condition: ALWAYS },
      { text: "Arrested", color: "#D52222", condition: VAULT_COMPLETED },
    ],
  },
  sidecar: {
    status: [
      { text: "Suspect", condition: ALWAYS },
      {
        text: "Deceased",
        color: "#D52222",
        condition: MISSING_DIAMOND_COMPLETED,
      },
    ],
  },
  rover: {
    status: [
      { text: "Suspect", condition: ALWAYS },
      {
        text: "At large",
        color: "#D52222",
        condition: MURDER_IN_MITROPOLIS_COMPLETED,
      },
      { text: "Arrested", color: "#D52222", condition: VAULT_COMPLETED },
    ],
  },
  billie: {
    status: [{ text: "Cleared", color: "#006304", condition: ALWAYS }],
  },
  katrina: {
    status: [
      { text: "Suspect", condition: ALWAYS },
      { text: "Cleared", color: "#006304", condition: VAULT_COMPLETED },
    ],
  },
  baby: {
    status: [
      { text: "Suspect", condition: ALWAYS },
      { text: "At large", color: "#D52222", condition: VAULT_COMPLETED },
    ],
  },
  gladys: {
    status: [
      { text: "Suspect", condition: ALWAYS },
      { text: "Arrested", color: "#D52222", condition: VAULT_COMPLETED },
    ],
  },
};

export function hubState(
  teamState: TeamHuntState,
  { username }: { username: string },
): HubState {
  const rounds = Object.entries(teamState.rounds).map(([slug, roundObj]) => {
    return {
      slug,
      title: roundObj.title,
    };
  });
  if (teamState.rounds.missing_diamond?.gates?.includes("hunt_started")) {
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

  const suspects = Object.fromEntries(
    Object.entries(SUSPECTS).map(([name, setting]) => {
      return [
        name,
        {
          status: setting.status.flatMap((status) => {
            const { condition, ...rest } = status;
            if (condition(teamState)) {
              return [rest];
            } else {
              return [];
            }
          }),
        } as HubSuspect,
      ];
    }),
  );

  const events = eventDataForTeam(username);

  return {
    epoch: teamState.epoch,
    rounds,
    objects,
    suspects,
    events,
  };
}
