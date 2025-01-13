import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { INTERACTIONS } from "../../interactions";
import { PUZZLES } from "../../puzzles";
import MissingDiamondBody from "./MissingDiamondBody";
import airport from "./assets/airport.svg";
import arboristLocked from "./assets/arborist-locked.png";
import arboristSolved from "./assets/arborist-solved.png";
import arboristUnlocked from "./assets/arborist-unlocked.png";
import artGalleryLocked from "./assets/art-gallery-locked.svg";
import artGallerySolved from "./assets/art-gallery-solved.svg";
import artGalleryUnlocked from "./assets/art-gallery-unlocked.svg";
import artistLocked from "./assets/artist-locked.png";
import artistSolved from "./assets/artist-solved.png";
import artistUnlocked from "./assets/artist-unlocked.png";
import bakerLocked from "./assets/baker-locked.png";
import bakerSolved from "./assets/baker-solved.png";
import bakerUnlocked from "./assets/baker-unlocked.png";
import bank from "./assets/bank.svg";
import bankerLocked from "./assets/banker-locked.png";
import bankerSolved from "./assets/banker-solved.png";
import bankerUnlocked from "./assets/banker-unlocked.png";
import boardwalkLocked from "./assets/boardwalk-locked.svg";
import boardwalkSolved from "./assets/boardwalk-solved.svg";
import boardwalkUnlocked from "./assets/boardwalk-unlocked.svg";
import businesswomanLocked from "./assets/businesswoman-locked.png";
import businesswomanSolved from "./assets/businesswoman-solved.png";
import businesswomanUnlocked from "./assets/businesswoman-unlocked.png";
import buskerLocked from "./assets/busker-locked.png";
import buskerSolved from "./assets/busker-solved.png";
import buskerUnlocked from "./assets/busker-unlocked.png";
import cartersTownhouse from "./assets/carters-townhouse.svg";
import casinoLocked from "./assets/casino-locked.svg";
import casinoSolved from "./assets/casino-solved.svg";
import casinoUnlocked from "./assets/casino-unlocked.svg";
import constructionWorkerLocked from "./assets/construction-worker-locked.png";
import constructionWorkerSolved from "./assets/construction-worker-solved.png";
import constructionWorkerUnlocked from "./assets/construction-worker-unlocked.png";
import deliverymanLocked from "./assets/deliveryman-locked.png";
import deliverymanSolved from "./assets/deliveryman-solved.png";
import deliverymanUnlocked from "./assets/deliveryman-unlocked.png";
import dockworkerLocked from "./assets/dockworker-locked.png";
import dockworkerSolved from "./assets/dockworker-solved.png";
import dockworkerUnlocked from "./assets/dockworker-unlocked.png";
import dogwalkerLocked from "./assets/dogwalker-locked.png";
import dogwalkerSolved from "./assets/dogwalker-solved.png";
import dogwalkerUnlocked from "./assets/dogwalker-unlocked.png";
import doormanLocked from "./assets/doorman-locked.png";
import doormanSolved from "./assets/doorman-solved.png";
import doormanUnlocked from "./assets/doorman-unlocked.png";
import estate from "./assets/estate.svg";
import floristLocked from "./assets/florist-locked.png";
import floristSolved from "./assets/florist-solved.png";
import floristUnlocked from "./assets/florist-unlocked.png";
import flowerShop from "./assets/flower-shop.svg";
import gardenerLocked from "./assets/gardener-locked.png";
import gardenerSolved from "./assets/gardener-solved.png";
import gardenerUnlocked from "./assets/gardener-unlocked.png";
import hairStylistLocked from "./assets/hair-stylist-locked.png";
import hairStylistSolved from "./assets/hair-stylist-solved.png";
import hairStylistUnlocked from "./assets/hair-stylist-unlocked.png";
import hotelClerkLocked from "./assets/hotel-clerk-locked.png";
import hotelClerkSolved from "./assets/hotel-clerk-solved.png";
import hotelClerkUnlocked from "./assets/hotel-clerk-unlocked.png";
import housekeeperLocked from "./assets/housekeeper-locked.png";
import housekeeperSolved from "./assets/housekeeper-solved.png";
import housekeeperUnlocked from "./assets/housekeeper-unlocked.png";
import interaction from "./assets/interaction.svg";
import jewelryStoreLocked from "./assets/jewelry-store-locked.svg";
import jewelryStoreSolved from "./assets/jewelry-store-solved.svg";
import jewelryStoreUnlocked from "./assets/jewelry-store-unlocked.svg";
import leafleterLocked from "./assets/leafleter-locked.png";
import leafleterSolved from "./assets/leafleter-solved.png";
import leafleterUnlocked from "./assets/leafleter-unlocked.png";
import linemanLocked from "./assets/lineman-locked.png";
import linemanSolved from "./assets/lineman-solved.png";
import linemanUnlocked from "./assets/lineman-unlocked.png";
import lunchCounter from "./assets/lunch-counter.svg";
import mechanicLocked from "./assets/mechanic-locked.png";
import mechanicSolved from "./assets/mechanic-solved.png";
import mechanicUnlocked from "./assets/mechanic-unlocked.png";
import metallurgistLocked from "./assets/metallurgist-locked.png";
import metallurgistSolved from "./assets/metallurgist-solved.png";
import metallurgistUnlocked from "./assets/metallurgist-unlocked.png";
import newsboyLocked from "./assets/newsboy-locked.png";
import newsboySolved from "./assets/newsboy-solved.png";
import newsboyUnlocked from "./assets/newsboy-unlocked.png";
import patrolmanLocked from "./assets/patrolman-locked.png";
import patrolmanSolved from "./assets/patrolman-solved.png";
import patrolmanUnlocked from "./assets/patrolman-unlocked.png";
import policeDetectiveLocked from "./assets/police-detective-locked.png";
import policeDetectiveSolved from "./assets/police-detective-solved.png";
import policeDetectiveUnlocked from "./assets/police-detective-unlocked.png";
import professorLocked from "./assets/professor-locked.png";
import professorSolved from "./assets/professor-solved.png";
import professorUnlocked from "./assets/professor-unlocked.png";
import receptionistLocked from "./assets/receptionist-locked.png";
import receptionistSolved from "./assets/receptionist-solved.png";
import receptionistUnlocked from "./assets/receptionist-unlocked.png";
import salon from "./assets/salon.svg";
import shopClerkLocked from "./assets/shop-clerk-locked.png";
import shopClerkSolved from "./assets/shop-clerk-solved.png";
import shopClerkUnlocked from "./assets/shop-clerk-unlocked.png";
import tailorLocked from "./assets/tailor-locked.png";
import tailorSolved from "./assets/tailor-solved.png";
import tailorUnlocked from "./assets/tailor-unlocked.png";
import tailor from "./assets/tailor.svg";
import thief from "./assets/thief.png";
import vintnerLocked from "./assets/vintner-locked.png";
import vintnerSolved from "./assets/vintner-solved.png";
import vintnerUnlocked from "./assets/vintner-unlocked.png";
import {
  type MissingDiamondState,
  type MissingDiamondSpeechBubble,
  type MissingDiamondEntity,
  type MissingDiamondInteractionEntity,
  type MissingDiamondWitness,
} from "./types";

const MISSING_DIAMOND_SLOTS = [
  "mdm01",
  "mdm02",
  "mdm03",
  "mdm04",
  "mdm05",
  "mdp01",
  "mdp02",
  "mdp03",
  "mdp04",
  "mdp05",
  "mdp06",
  "mdp07",
  "mdp08",
  "mdp09",
  "mdp10",
  "mdp11",
  "mdp12",
  "mdp13",
  "mdp14",
  "mdp15",
  "mdp16",
  "mdp17",
  "mdp18",
  "mdp19",
  "mdp20",
  "mdp21",
  "mdp22",
  "mdp23",
  "mdp24",
  "mdp25",
  "mdp26",
  "mdp27",
  "mdp28",
] as const;

const MISSING_DIAMOND_INTERACTIONS = [
  "interview_at_the_boardwalk",
  "interview_at_the_jewelry_store",
  "interview_at_the_casino",
  "interview_at_the_art_gallery",
] as const;

export type MissingDiamondSlot = (typeof MISSING_DIAMOND_SLOTS)[number];
type MissingDiamondInteraction = (typeof MISSING_DIAMOND_INTERACTIONS)[number];

function lookupSlug(
  slot: string,
  teamState: TeamHuntState,
): string | undefined {
  const round = teamState.rounds.missing_diamond;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

const fixedLocations: MissingDiamondEntity[] = [
  {
    asset: airport,
    alt: "The Airport",
    pos: {
      top: 341,
      left: 337,
      width: 162,
    },
  },
  {
    asset: bank,
    alt: "The Bank",
    pos: {
      top: 164,
      left: 662,
      width: 141,
    },
  },
  {
    asset: cartersTownhouse,
    alt: "Carter’s Townhouse",
    pos: {
      top: 529,
      left: 1039,
      width: 122,
    },
  },
  {
    asset: estate,
    alt: "The Estate",
    pos: {
      top: 693,
      left: 978,
      width: 185,
    },
  },
  {
    asset: flowerShop,
    alt: "The Flower Shop",
    pos: {
      top: 337,
      left: 1443,
      width: 132,
    },
  },
  {
    asset: lunchCounter,
    alt: "The Lunch Counter",
    pos: {
      top: 352,
      left: 1590,
      width: 154,
    },
  },
  {
    asset: salon,
    alt: "The Salon",
    pos: {
      top: 1365,
      left: 839,
      width: 125,
    },
  },
  {
    asset: tailor,
    alt: "The Tailor",
    pos: {
      top: 1007,
      left: 336,
      width: 163,
    },
  },
];

const metaLocations: Partial<
  Record<
    MissingDiamondSlot,
    Omit<MissingDiamondEntity, "asset"> & {
      asset: Partial<Record<"unlockable" | "unlocked" | "solved", string>>;
    }
  >
> = {
  mdm01: {
    asset: {
      unlockable: boardwalkLocked,
      unlocked: boardwalkUnlocked,
      solved: boardwalkSolved,
    },
    alt: "The Boardwalk",
    pos: {
      top: 1759,
      left: 11,
      width: 1760,
    },
  },
  mdm02: {
    asset: {
      unlockable: jewelryStoreLocked,
      unlocked: jewelryStoreUnlocked,
      solved: jewelryStoreSolved,
    },
    alt: "The Jewelry Store",
    pos: {
      top: 420,
      left: 1443,
      width: 132,
    },
  },
  mdm03: {
    asset: {
      unlockable: casinoLocked,
      unlocked: casinoUnlocked,
      solved: casinoSolved,
    },
    alt: "The Casino",
    pos: {
      top: 705,
      left: 514,
      width: 221,
    },
  },
  mdm04: {
    asset: {
      unlockable: artGalleryLocked,
      unlocked: artGalleryUnlocked,
      solved: artGallerySolved,
    },
    alt: "The Art Gallery",
    pos: {
      top: 1324,
      left: 346,
      width: 121,
    },
  },
  mdm05: {
    asset: {
      unlocked: thief,
      solved: thief,
    },
    alt: "The Thief",
    pos: {
      top: 100,
      left: 1429,
      width: 136,
    },
  },
};

type SpeechBubbleDescriptor = {
  unsolved: Omit<MissingDiamondSpeechBubble, "slug">;
  solved: Omit<MissingDiamondSpeechBubble, "slug">;
};

const firstSpeechBubble: MissingDiamondSpeechBubble = {
  text: "We’ll start by accounting for everyone’s whereabouts this morning. You interview the locals; I’ll check with my contacts. I’ll let you know whenever I learn something!",
  color: "#7F7F7F",
  slug: "",
  extraBorder: true,
};

const metaSpeechBubbles: Partial<
  Record<
    MissingDiamondSlot,
    { interaction: MissingDiamondInteraction; desc: SpeechBubbleDescriptor }
  >
> = {
  mdm01: {
    interaction: "interview_at_the_boardwalk",
    desc: {
      unsolved: {
        text: "Apparently, Katrina was spotted on the Boardwalk last night. That’s strange. Find out what she was doing there.",
        color: "#FFAE40",
      },
      solved: {
        text: "So Katrina left a note for someone at the Boardwalk. Did you know Katrina will only walk against one-way automobile traffic? Apparently it’s safer.",
        color: "#FF9401",
      },
    },
  },

  mdm02: {
    interaction: "interview_at_the_jewelry_store",
    desc: {
      unsolved: {
        text: "Gladys visited the Jewelry Store this afternoon. Why would she do that? She owns a jewelry empire! Do some digging.",
        color: "#FF80CB",
      },
      solved: {
        text: "Gladys bought a ring at the Jewelry Store, huh. Well, it sounds like Gladys gets driven almost everywhere; she’ll occasionally go between stops on foot, but never more than next door or across the street.",
        color: "#FF0A9C",
      },
    },
  },

  mdm03: {
    interaction: "interview_at_the_casino",
    desc: {
      unsolved: {
        text: "My informants tell me that Carter was at the Casino this morning. The MITropolis social scene doesn’t tend to hover around there on a weekday morning. See what you can find out.",
        color: "#FF4040",
      },
      solved: {
        text: "Good work discovering Carter’s gambling debts at the Casino. He’s a superstitious man; he won’t go straight through more than three intersections in a row before turning at one.",
        color: "#FF0000",
      },
    },
  },

  mdm04: {
    interaction: "interview_at_the_art_gallery",
    desc: {
      unsolved: {
        text: "I’ve just learned that Papa was involved in a bit of a scene at the Art Gallery this morning before the Gala started. See if you can get someone to tell you what happened.",
        color: "#348DD1",
      },
      solved: {
        text: "Papa got into an argument with Baby at the Art Gallery? By the way, in his old age, he’ll walk no more than nine blocks in a day.",
        color: "#348DD1",
      },
    },
  },
};

const finalSpeechBubble: Omit<MissingDiamondSpeechBubble, "slug"> = {
  text: "We’ll have to compile everything we’ve learned from our interviews. From my research, all the family members are such careful planners that we can safely assume everyone’s journey ends in an establishment and no one revisits an intersection within the day. I’m also confident no one could have entered any establishment or vehicle without one of the witnesses mentioning it.\n\nCome meet me at the Gala and we’ll talk about it.",
  color: "#7F7F7F",
};
const finalSpeechBubbleSlot = "mdm05";

export type WitnessName =
  | "arborist"
  | "artist"
  | "patrolman"
  | "banker"
  | "businesswoman"
  | "busker"
  | "construction-worker"
  | "delivery-man"
  | "dockworker"
  | "dogwalker"
  | "doorman"
  | "florist"
  | "receptionist"
  | "gardener"
  | "hair-stylist"
  | "hotel-clerk"
  | "housekeeper"
  | "leafleter"
  | "lineman"
  | "mechanic"
  | "metallurgist"
  | "newsboy"
  | "baker"
  | "police-detective"
  | "professor"
  | "shop-clerk"
  | "tailor"
  | "vintner";

export type WitnessRecord = Omit<MissingDiamondWitness, "asset" | "puzzle"> & {
  asset: { unlockable: string; unlocked: string; solved: string };
};
export const witnesses: Record<WitnessName, WitnessRecord> = {
  arborist: {
    asset: {
      unlockable: arboristLocked,
      unlocked: arboristUnlocked,
      solved: arboristSolved,
    },
    alt: "The Arborist",
    pos: {
      left: 353,
      top: 1501,
      width: 80,
    },
    statement:
      "I worked here in the park next to the Boardwalk all day. I saw Papa walk by this morning, but no, I didn’t see Carter.",
  },
  artist: {
    asset: {
      unlockable: artistLocked,
      unlocked: artistUnlocked,
      solved: artistSolved,
    },
    alt: "The Artist",
    pos: {
      left: 1838,
      top: 926,
      width: 80,
    },
    statement:
      "I was on my way to my show at the Art Gallery and I remember seeing Gladys in the backseat of a car.",
  },
  patrolman: {
    asset: {
      unlockable: patrolmanLocked,
      unlocked: patrolmanUnlocked,
      solved: patrolmanSolved,
    },
    alt: "The Patrolman",
    pos: {
      left: 1254,
      top: 696,
      width: 80,
    },
    statement:
      "I’ve been stationed here all day, and last night too. It’s back-breaking work, not like those cushy jobs working security at the Casino. Anyway, I haven’t seen Katrina or Carter.",
  },
  banker: {
    asset: {
      unlockable: bankerLocked,
      unlocked: bankerUnlocked,
      solved: bankerSolved,
    },
    alt: "The Banker",
    pos: {
      left: 763,
      top: 274,
      width: 80,
    },
    statement:
      "Carter stopped here briefly. I was helping the owner of the Jewelry Store and I distinctly remember thinking that somehow he wasn’t the most bombastically dressed man here.",
  },
  businesswoman: {
    asset: {
      unlockable: businesswomanLocked,
      unlocked: businesswomanUnlocked,
      solved: businesswomanSolved,
    },
    alt: "The Businesswoman",
    pos: {
      left: 467,
      top: 425,
      width: 80,
    },
    statement:
      "I was on the same flight as Gladys—I’m in town for the convention at the Casino—and I saw her get picked up by a car service.",
  },
  busker: {
    asset: {
      unlockable: buskerLocked,
      unlocked: buskerUnlocked,
      solved: buskerSolved,
    },
    alt: "The Busker",
    pos: {
      left: 1035,
      top: 237,
      width: 80,
    },
    statement:
      "I’ve been here all day. I’m not making Art Gallery money, but it’s a living. Carter walked by, but Gladys hasn’t been here.",
  },
  "construction-worker": {
    asset: {
      unlockable: constructionWorkerLocked,
      unlocked: constructionWorkerUnlocked,
      solved: constructionWorkerSolved,
    },
    alt: "The Construction Worker",
    pos: {
      left: 1134,
      top: 784,
      width: 80,
    },
    statement:
      "No one could have come through here today in a car or on foot. Torn up like this, the street makes the Boardwalk look navigable.",
  },
  "delivery-man": {
    asset: {
      unlockable: deliverymanLocked,
      unlocked: deliverymanUnlocked,
      solved: deliverymanSolved,
    },
    alt: "The Delivery Man",
    pos: {
      left: 1479,
      top: 933,
      width: 80,
    },
    statement:
      "We were on our way to a late-night delivery to the Jewelry Store when I saw Katrina here.",
  },
  dockworker: {
    asset: {
      unlockable: dockworkerLocked,
      unlocked: dockworkerUnlocked,
      solved: dockworkerSolved,
    },
    alt: "The Dockworker",
    pos: {
      left: 1740,
      top: 1136,
      width: 80,
    },
    statement:
      "We’ve been working a double, shuttling loads to the Boardwalk. I saw Katrina in the middle of the night and Gladys was driven by this afternoon.",
  },
  "police-detective": {
    asset: {
      unlockable: policeDetectiveLocked,
      unlocked: policeDetectiveUnlocked,
      solved: policeDetectiveSolved,
    },
    alt: "The Police Detective",
    pos: {
      left: 1387,
      top: 1349,
      width: 80,
    },
    statement:
      "I’ve been here since last night, following up on a lead in the Jewelry Store break-in. I saw Gladys being driven, but I haven’t seen Katrina at all.",
  },
  doorman: {
    asset: {
      unlockable: doormanLocked,
      unlocked: doormanUnlocked,
      solved: doormanSolved,
    },
    alt: "The Doorman",
    pos: {
      left: 1135,
      top: 537,
      width: 80,
    },
    statement:
      "Carter left his townhouse on foot this morning. I had just started my shift after my morning walk on the Boardwalk.",
  },
  florist: {
    asset: {
      unlockable: floristLocked,
      unlocked: floristUnlocked,
      solved: floristSolved,
    },
    alt: "The Florist",
    pos: {
      left: 1542,
      top: 286,
      width: 80,
    },
    statement:
      "Gladys walked here, already dressed for the Art Gallery. When she left, Rover brought the car around and picked her up.",
  },
  receptionist: {
    asset: {
      unlockable: receptionistLocked,
      unlocked: receptionistUnlocked,
      solved: receptionistSolved,
    },
    alt: "The Receptionist",
    pos: {
      left: 406,
      top: 1244,
      width: 80,
    },
    statement: "Yes, Carter visited the Art Gallery earlier today.",
  },
  gardener: {
    asset: {
      unlockable: gardenerLocked,
      unlocked: gardenerUnlocked,
      solved: gardenerSolved,
    },
    alt: "The Gardener",
    pos: {
      left: 1070,
      top: 878,
      width: 80,
    },
    statement:
      "Katrina snuck out the window and left by the footpath exit of the estate late last night. Papa left through the same exit after sunrise, complaining as he always does about the gaudy Casino.",
  },
  "hair-stylist": {
    asset: {
      unlockable: hairStylistLocked,
      unlocked: hairStylistUnlocked,
      solved: hairStylistSolved,
    },
    alt: "The Hair Stylist",
    pos: {
      left: 932,
      top: 1431,
      width: 80,
    },
    statement:
      "Rover dropped Gladys off here at the salon and she stayed here the rest of the afternoon. Ever since that incident outside the Art Gallery, he drives her almost everywhere. I haven’t seen Papa all day.",
  },
  "hotel-clerk": {
    asset: {
      unlockable: hotelClerkLocked,
      unlocked: hotelClerkUnlocked,
      solved: hotelClerkSolved,
    },
    alt: "The Hotel Clerk",
    pos: {
      left: 279,
      top: 1097,
      width: 80,
    },
    statement:
      "Our guests expect discretion, sir; this isn’t the Boardwalk! But if you must know, I saw Carter this afternoon, but I haven’t seen Gladys.",
  },
  housekeeper: {
    asset: {
      unlockable: housekeeperLocked,
      unlocked: housekeeperUnlocked,
      solved: housekeeperSolved,
    },
    alt: "The Housekeeper",
    pos: {
      left: 999,
      top: 661,
      width: 80,
    },
    statement:
      "Yes, Rover and Gladys drove in to the estate, but Carter hasn’t come through here all day. If you’ll excuse me, I’m on my way to the Casino, to win back last week’s wages.",
  },
  leafleter: {
    asset: {
      unlockable: leafleterLocked,
      unlocked: leafleterUnlocked,
      solved: leafleterSolved,
    },
    alt: "The Leafleter",
    pos: {
      left: 687,
      top: 1157,
      width: 80,
    },
    statement:
      "I’ve been here all day advertising the new show at the Art Gallery. I didn’t see Carter or Gladys.",
  },
  lineman: {
    asset: {
      unlockable: linemanLocked,
      unlocked: linemanUnlocked,
      solved: linemanSolved,
    },
    alt: "The Lineman",
    pos: {
      left: 1638,
      top: 696,
      width: 80,
    },
    statement:
      "Yeah, I was working here overnight, near that big Jewelry Store, and I saw Katrina sometime before midnight.",
  },
  mechanic: {
    asset: {
      unlockable: mechanicLocked,
      unlocked: mechanicUnlocked,
      solved: mechanicSolved,
    },
    alt: "The Mechanic",
    pos: {
      left: 936,
      top: 1044,
      width: 80,
    },
    statement:
      "I was at the garage all day. Gladys was driven by, but I didn’t see Papa. My shift’s over; I’m goin’ to the Casino.",
  },
  metallurgist: {
    asset: {
      unlockable: metallurgistLocked,
      unlocked: metallurgistUnlocked,
      solved: metallurgistSolved,
    },
    alt: "The Metallurgist",
    pos: {
      left: 717,
      top: 478,
      width: 80,
    },
    statement:
      "I was en route to an appointment at the Jewelry Store when I saw Gladys in a taxi.",
  },
  newsboy: {
    asset: {
      unlockable: newsboyLocked,
      unlocked: newsboyUnlocked,
      solved: newsboySolved,
    },
    alt: "The Newsboy",
    pos: {
      left: 1060,
      top: 1496,
      width: 80,
    },
    statement:
      "With all the foot traffic to the Boardwalk, this is a great place to sell papers! Papa walked by this morning, but Gladys hasn’t been by.",
  },
  baker: {
    asset: {
      unlockable: bakerLocked,
      unlocked: bakerUnlocked,
      solved: bakerSolved,
    },
    alt: "The Baker",
    pos: {
      left: 1262,
      top: 900,
      width: 80,
    },
    statement:
      "I’ve been here since this morning baking bread for the Art Gallery’s catering order. But I didn’t see Gladys or Papa.",
  },
  dogwalker: {
    asset: {
      unlockable: dogwalkerLocked,
      unlocked: dogwalkerUnlocked,
      solved: dogwalkerSolved,
    },
    alt: "The Dogwalker",
    pos: {
      left: 1139,
      top: 1219,
      width: 80,
    },
    statement:
      "I come through here a lot, trying to make a little extra money to get my fiancée something nice at the Jewelry Store, and I saw Papa walking here today.",
  },
  professor: {
    asset: {
      unlockable: professorLocked,
      unlocked: professorUnlocked,
      solved: professorSolved,
    },
    alt: "The Professor",
    pos: {
      left: 283,
      top: 578,
      width: 80,
    },
    statement: "I was on my way to the Casino when I saw Carter.",
  },
  "shop-clerk": {
    asset: {
      unlockable: shopClerkLocked,
      unlocked: shopClerkUnlocked,
      solved: shopClerkSolved,
    },
    alt: "The Shop Clerk",
    pos: {
      left: 368,
      top: 493,
      width: 80,
    },
    statement:
      "I was here all day, helping one of the new Jewelry Store associates spend his first paycheck. Neither Carter nor Gladys came through here.",
  },
  tailor: {
    asset: {
      unlockable: tailorLocked,
      unlocked: tailorUnlocked,
      solved: tailorSolved,
    },
    alt: "The Tailor",
    pos: {
      left: 466,
      top: 937,
      width: 80,
    },
    statement:
      "Carter came to my shop near the Art Gallery and stayed all afternoon.",
  },
  vintner: {
    asset: {
      unlockable: vintnerLocked,
      unlocked: vintnerUnlocked,
      solved: vintnerSolved,
    },
    alt: "The Vintner",
    pos: {
      left: 717,
      top: 782,
      width: 80,
    },
    statement:
      "I’ve been here all day preparing for our next tasting at the Casino. Gladys was driven down this road this afternoon, but I never saw Carter.",
  },
};

export const slotToWitness: Partial<Record<MissingDiamondSlot, WitnessName>> = {
  mdp01: "baker",
  mdp02: "artist",
  mdp03: "florist",
  mdp04: "tailor",
  mdp05: "lineman",
  mdp06: "housekeeper",
  mdp07: "mechanic",
  mdp08: "doorman",
  mdp09: "newsboy",
  mdp10: "hotel-clerk",
  mdp11: "metallurgist",
  mdp12: "dogwalker",
  mdp13: "shop-clerk",
  mdp14: "busker",
  mdp15: "professor",
  mdp16: "businesswoman",
  mdp17: "vintner",
  mdp18: "patrolman",
  mdp19: "police-detective",
  mdp20: "construction-worker",
  mdp21: "leafleter",
  mdp22: "arborist",
  mdp23: "delivery-man",
  mdp24: "receptionist",
  mdp25: "hair-stylist",
  mdp26: "gardener",
  mdp27: "banker",
  mdp28: "dockworker",
};

const interactions: Record<
  string,
  Omit<MissingDiamondInteractionEntity, "slug" | "alt">
> = {
  interview_at_the_boardwalk: {
    asset: interaction,
    pos: {
      left: 1732,
      top: 1693,
      width: 80,
    },
  },
  interview_at_the_jewelry_store: {
    asset: interaction,
    pos: {
      left: 1406,
      top: 468,
      width: 80,
    },
  },
  interview_at_the_casino: {
    asset: interaction,
    pos: {
      left: 473,
      top: 777,
      width: 80,
    },
  },
  interview_at_the_art_gallery: {
    asset: interaction,
    pos: {
      left: 321,
      top: 1277,
      width: 80,
    },
  },
};

function genSpeechBubbles(
  teamState: TeamHuntState,
): MissingDiamondSpeechBubble[] {
  const round = teamState.rounds.missing_diamond;
  if (!round) return [];

  const speechBubbles: MissingDiamondSpeechBubble[] = [firstSpeechBubble];

  const metaSequence: [string, string, number][] = [];
  Object.keys(metaSpeechBubbles).forEach((slotId) => {
    const slug = lookupSlug(slotId, teamState);
    if (!slug) return;

    const puzzleState = teamState.puzzles[slug];
    if (!puzzleState?.unlocked_at) return;
    metaSequence.push([slotId, slug, puzzleState.unlocked_at]);
  });
  metaSequence.sort((a, b) => a[2] - b[2]);
  metaSequence.forEach(([slotId, slug]) => {
    const bubble = metaSpeechBubbles[slotId as MissingDiamondSlot];
    if (!bubble) {
      // This should not happen, but hard to prove to the typechecker.
      return;
    }

    const { interaction, desc } = bubble;

    // See if they've completed the interaction
    const interactionState = round.interactions?.[interaction]?.state;
    if (interactionState === "completed") {
      speechBubbles.push({
        ...desc.solved,
        slug: slotId,
        glow: true,
        extraBorder: true,
      });
      return;
    }

    // Otherwise see if the slot is unlocked
    const puzzleState = teamState.puzzles[slug];
    if (!puzzleState) return;
    const unlockState = puzzleState.locked;
    if (unlockState !== "unlocked") return;

    speechBubbles.push({ ...desc.unsolved, slug: slotId });
  });

  const finalSlug = lookupSlug(finalSpeechBubbleSlot, teamState);
  if (finalSlug) {
    const finalPuzzleState = teamState.puzzles[finalSlug];
    if (finalPuzzleState?.locked === "unlocked") {
      speechBubbles.push({ ...finalSpeechBubble, slug: finalSlug });
    }
  }

  return speechBubbles;
}

function getLocationPuzzleState(
  slotId: string,
  teamState: TeamHuntState,
): MissingDiamondEntity["puzzle"] {
  const slug = lookupSlug(slotId, teamState);
  if (!slug) return undefined;

  const puzzleState = teamState.puzzles[slug];
  if (!puzzleState) return undefined;
  const unlockState = puzzleState.locked;
  // Metapuzzles can not be unlockable
  if (unlockState !== "unlocked") return undefined;

  const state =
    puzzleState.answer !== undefined
      ? ("solved" as const)
      : ("unlocked" as const);

  const puzzleDefinition = PUZZLES[slug];
  return {
    title: puzzleDefinition?.title ?? `Stub puzzle for slot ${slotId}`,
    slug,
    desc: puzzleDefinition?.initial_description,
    state,
    answer: puzzleState.answer,
  };
}

function genLocations(teamState: TeamHuntState): MissingDiamondEntity[] {
  const locations = fixedLocations.slice();

  Object.entries(metaLocations).forEach(
    ([slotId, { asset: assetSet, ...spec }]) => {
      const puzzle = getLocationPuzzleState(slotId, teamState);
      const asset = assetSet[puzzle?.state ?? "unlockable"];
      if (!asset) return;
      locations.push({
        asset,
        puzzle,
        ...spec,
      });
    },
  );

  return locations;
}

function genWitnesses(teamState: TeamHuntState): MissingDiamondWitness[] {
  const round = teamState.rounds.missing_diamond;
  if (!round) return [];

  return Object.entries(slotToWitness).flatMap(([slotId, witnessName]) => {
    const witness = witnesses[witnessName];
    const slug = lookupSlug(slotId, teamState);
    if (!slug) return [];

    const puzzleState = teamState.puzzles[slug];
    if (!puzzleState) return [];
    const unlockState = puzzleState.locked;
    if (unlockState === "locked") return [];

    const state =
      puzzleState.answer !== undefined ? ("solved" as const) : unlockState;
    const puzzleDefinition = PUZZLES[slug];
    const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slotId}`;

    return [
      {
        alt: witness.alt,
        pos: witness.pos,
        asset: witness.asset[state],
        puzzle: {
          title,
          slug,
          desc: puzzleDefinition?.initial_description,
          state,
          answer: puzzleState.answer,
        },
        statement: puzzleState.answer ? witness.statement : undefined,
      },
    ];
  });
}

function genInteractions(
  teamState: TeamHuntState,
): MissingDiamondInteractionEntity[] {
  const round = teamState.rounds.missing_diamond;
  if (!round) return [];

  return Object.entries(interactions).flatMap(([interactionId, spec]) => {
    const interactionState = round.interactions?.[interactionId]?.state;
    if (!interactionState) return [];

    const interaction =
      INTERACTIONS[interactionId as MissingDiamondInteraction];

    return [
      {
        alt: interaction?.title ?? "unknown interaction",
        pos: spec.pos,
        asset: spec.asset,
        slug: interactionId,
      },
    ];
  });
}

export function missingDiamondState(
  teamState: TeamHuntState,
): MissingDiamondState {
  const speechBubbles = genSpeechBubbles(teamState);
  const locations = genLocations(teamState);
  const witnesses = genWitnesses(teamState);
  const interactions = genInteractions(teamState);
  return {
    epoch: teamState.epoch,
    speechBubbles,
    locations,
    witnesses,
    ...(interactions.length > 0 ? { interactions } : {}),
  };
}

const MissingDiamondRoundPage = ({
  teamState,
}: {
  teamState: TeamHuntState;
}) => {
  const state = missingDiamondState(teamState);
  const inlineScript = `window.initialMissingDiamondState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="missing-diamond-root">
        <MissingDiamondBody state={state} teamState={teamState} />
      </div>
    </>
  );
};

export default MissingDiamondRoundPage;
