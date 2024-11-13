import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

export type PlaceholderPuzzleType = "placeholder_stakeout_01" |
"placeholder_stakeout_02" |
"placeholder_stakeout_03" |
"placeholder_stakeout_04" |
"placeholder_stakeout_05" |
"placeholder_stakeout_06" |
"placeholder_stakeout_07" |
"placeholder_stakeout_08" |
"placeholder_stakeout_09" |
"placeholder_stakeout_10" |
"placeholder_stakeout_11" |
"placeholder_stakeout_12" |
"placeholder_stakeout_13" |
"placeholder_stakeout_14" |
"placeholder_stakeout_15" |
"placeholder_stakeout_16" |
"placeholder_stakeout_17" |
"placeholder_stakeout_18" |
"placeholder_stakeout_19" |
"placeholder_stakeout_20" |
"placeholder_stakeout_21" |
"placeholder_stakeout_22" |
"placeholder_stakeout_23" |
"placeholder_stakeout_24" |
"placeholder_stakeout_25" |
"placeholder_stakeout_26" |
"placeholder_stakeout_27" |
"placeholder_stakeout_28" |
"placeholder_stakeout_29" |
"placeholder_stakeout_30" |
"placeholder_stakeout_31" |
"placeholder_stakeout_32" |
"placeholder_stakeout_33" |
"placeholder_stakeout_34" |
"placeholder_stakeout_35" |
"placeholder_stakeout_36" |
"placeholder_stakeout_37" |
"placeholder_stakeout_38" |
"placeholder_stakeout_39" |
"placeholder_stakeout_40" |
"placeholder_stakeout_41" |
"placeholder_stakeout_42";

function makePuzzle(
  k: string,
  t: string,
  a: string
): PuzzleDefinition {
  return {
    title: t,
    slug: k,
    authors: ["Placeholder Author"],
    editors: [],
    additional_credits: [],
    content: {
      component: Puzzle(a),
    },
    solution: {
      component: Solution,
    },
    answer: a,
    hints: [],
    canned_responses: [],
  }
}

const puzzles: Record<PlaceholderPuzzleType, PuzzleDefinition> = {
  placeholder_stakeout_01: makePuzzle("placeholder_stakeout_01", "A Puzzle Consisting...", "FORWARD SLASH"), 
  placeholder_stakeout_02: makePuzzle("placeholder_stakeout_02", "Cleanup on Aisle π", "SHOPPING CART"), 
  placeholder_stakeout_03: makePuzzle("placeholder_stakeout_03", "Famous Alumni", "STUDENT BODY"), 
  placeholder_stakeout_04: makePuzzle("placeholder_stakeout_04", "The Safety Dance", "FIRE EXTINGUISHER"), 
  placeholder_stakeout_05: makePuzzle("placeholder_stakeout_05", "Huge Pop!", "RICE UNIVERSITY"), 
  placeholder_stakeout_06: makePuzzle("placeholder_stakeout_06", "Misquoted", "THINK AGAIN"), 
  placeholder_stakeout_07: makePuzzle("placeholder_stakeout_07", "In the Red", "LACK"), 
  placeholder_stakeout_08: makePuzzle("placeholder_stakeout_08", "Royals", "LET THEM EAT CAKE"), 
  placeholder_stakeout_09: makePuzzle("placeholder_stakeout_09", "Talk to the Hand", "PALM TREE"), 
  placeholder_stakeout_10: makePuzzle("placeholder_stakeout_10", "Fine Art", "BRUSH WITH FATE"), 
  placeholder_stakeout_11: makePuzzle("placeholder_stakeout_11", "Happy Feet", "EARTH ANGEL"), 
  placeholder_stakeout_12: makePuzzle("placeholder_stakeout_12", "Disarmament", "BOW TIE"), 
  placeholder_stakeout_13: makePuzzle("placeholder_stakeout_13", "Bark > Bite", "TREE"), 
  placeholder_stakeout_14: makePuzzle("placeholder_stakeout_14", "Some BODY", "SMASH MOUTH"), 
  placeholder_stakeout_15: makePuzzle("placeholder_stakeout_15", "The King and I", "HOT DOG"), 
  placeholder_stakeout_16: makePuzzle("placeholder_stakeout_16", "Call for Reservations", "BRICK AND MORTAR"), 
  placeholder_stakeout_17: makePuzzle("placeholder_stakeout_17", "Level One Orc Fighter", "AXE"), 
  placeholder_stakeout_18: makePuzzle("placeholder_stakeout_18", "Do You Believe?", "SAY YOU LOVE ME"), 
  placeholder_stakeout_19: makePuzzle("placeholder_stakeout_19", "Potlines II", "GRASS"), 
  placeholder_stakeout_20: makePuzzle("placeholder_stakeout_20", "Song That Never Ends", "WITHOUT STOPPING"), 
  placeholder_stakeout_21: makePuzzle("placeholder_stakeout_21", "Stonks", "PRIVATE SECTOR"), 
  placeholder_stakeout_22: makePuzzle("placeholder_stakeout_22", "Drop Anchor", "EVENING NEWS"), 
  placeholder_stakeout_23: makePuzzle("placeholder_stakeout_23", "Fabric Softener", "SILK"), 
  placeholder_stakeout_24: makePuzzle("placeholder_stakeout_24", "Dragon, Drag Off", "HEDWIG AND THE ANGRY INCH"), 
  placeholder_stakeout_25: makePuzzle("placeholder_stakeout_25", "Track Changes", "FOOTSTEPS"), 
  placeholder_stakeout_26: makePuzzle("placeholder_stakeout_26", "Renovations", "BLANK TILE"), 
  placeholder_stakeout_27: makePuzzle("placeholder_stakeout_27", "A Storm is Coming", "JADE"), 
  placeholder_stakeout_28: makePuzzle("placeholder_stakeout_28", "Dedications", "FUR COAT"), 
  placeholder_stakeout_29: makePuzzle("placeholder_stakeout_29", "Tree Fifty", "LEAF"), 
  placeholder_stakeout_30: makePuzzle("placeholder_stakeout_30", "Surf and Turf", "FISH AND CHIPS"), 
  placeholder_stakeout_31: makePuzzle("placeholder_stakeout_31", "A Pure Metal Puzzle", "GOLD"), 
  placeholder_stakeout_32: makePuzzle("placeholder_stakeout_32", "The Next Generation", "THE WHALE AND THE RISING SUN"), 
  placeholder_stakeout_33: makePuzzle("placeholder_stakeout_33", "The 1-Sheet Excel File", "PIVOT TABLE"), 
  placeholder_stakeout_34: makePuzzle("placeholder_stakeout_34", "Caterpie, I Choose You!", "INSECT"), 
  placeholder_stakeout_35: makePuzzle("placeholder_stakeout_35", "Executive Suite", "WHITE HOUSE"), 
  placeholder_stakeout_36: makePuzzle("placeholder_stakeout_36", "Tango Foxtrot", "IT TAKES TWO"), 
  placeholder_stakeout_37: makePuzzle("placeholder_stakeout_37", "Ministry of Silly Walks", "LONG STRIDE"), 
  placeholder_stakeout_38: makePuzzle("placeholder_stakeout_38", "Af-Ford-Able", "PINTO BEAN"), 
  placeholder_stakeout_39: makePuzzle("placeholder_stakeout_39", "The Mushroom Kingdom", "BADGER"), 
  placeholder_stakeout_40: makePuzzle("placeholder_stakeout_40", "fxe8=Q", "DESTINY'S CHILD"), 
  placeholder_stakeout_41: makePuzzle("placeholder_stakeout_41", "Get Loud", "SPEECH"), 
  placeholder_stakeout_42: makePuzzle("placeholder_stakeout_42", "Jack-O-Lantern", "KNIFE")
}

export default puzzles;
