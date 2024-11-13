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
  placeholder_stakeout_01: makePuzzle("placeholder_stakeout_01", "Title01", "FORWARD SLASH"), 
  placeholder_stakeout_02: makePuzzle("placeholder_stakeout_02", "Title02", "SHOPPING CART"), 
  placeholder_stakeout_03: makePuzzle("placeholder_stakeout_03", "Title03", "STUDENT BODY"), 
  placeholder_stakeout_04: makePuzzle("placeholder_stakeout_04", "Title04", "FIRE EXTINGUISHER"), 
  placeholder_stakeout_05: makePuzzle("placeholder_stakeout_05", "Title05", "RICE UNIVERSITY"), 
  placeholder_stakeout_06: makePuzzle("placeholder_stakeout_06", "Title06", "THINK AGAIN"), 
  placeholder_stakeout_07: makePuzzle("placeholder_stakeout_07", "Title07", "LACK"), 
  placeholder_stakeout_08: makePuzzle("placeholder_stakeout_08", "Title08", "LET THEM EAT CAKE"), 
  placeholder_stakeout_09: makePuzzle("placeholder_stakeout_09", "Title09", "PALM TREE"), 
  placeholder_stakeout_10: makePuzzle("placeholder_stakeout_10", "Title10", "BRUSH WITH FATE"), 
  placeholder_stakeout_11: makePuzzle("placeholder_stakeout_11", "Title11", "EARTH ANGEL"), 
  placeholder_stakeout_12: makePuzzle("placeholder_stakeout_12", "Title12", "BOW TIE"), 
  placeholder_stakeout_13: makePuzzle("placeholder_stakeout_13", "Title13", "TREE"), 
  placeholder_stakeout_14: makePuzzle("placeholder_stakeout_14", "Title14", "SMASH MOUTH"), 
  placeholder_stakeout_15: makePuzzle("placeholder_stakeout_15", "Title15", "HOT DOG"), 
  placeholder_stakeout_16: makePuzzle("placeholder_stakeout_16", "Title16", "BRICK AND MORTAR"), 
  placeholder_stakeout_17: makePuzzle("placeholder_stakeout_17", "Title17", "AXE"), 
  placeholder_stakeout_18: makePuzzle("placeholder_stakeout_18", "Title18", "SAY YOU LOVE ME"), 
  placeholder_stakeout_19: makePuzzle("placeholder_stakeout_19", "Title19", "GRASS"), 
  placeholder_stakeout_20: makePuzzle("placeholder_stakeout_20", "Title20", "WITHOUT STOPPING"), 
  placeholder_stakeout_21: makePuzzle("placeholder_stakeout_21", "Title21", "PRIVATE SECTOR"), 
  placeholder_stakeout_22: makePuzzle("placeholder_stakeout_22", "Title22", "EVENING NEWS"), 
  placeholder_stakeout_23: makePuzzle("placeholder_stakeout_23", "Title23", "SILK"), 
  placeholder_stakeout_24: makePuzzle("placeholder_stakeout_24", "Title24", "HEDWIG AND THE ANGRY INCH"), 
  placeholder_stakeout_25: makePuzzle("placeholder_stakeout_25", "Title25", "FOOTSTEPS"), 
  placeholder_stakeout_26: makePuzzle("placeholder_stakeout_26", "Title26", "BLANK TILE"), 
  placeholder_stakeout_27: makePuzzle("placeholder_stakeout_27", "Title27", "JADE"), 
  placeholder_stakeout_28: makePuzzle("placeholder_stakeout_28", "Title28", "FUR COAT"), 
  placeholder_stakeout_29: makePuzzle("placeholder_stakeout_29", "Title29", "LEAF"), 
  placeholder_stakeout_30: makePuzzle("placeholder_stakeout_30", "Title30", "FISH AND CHIPS"), 
  placeholder_stakeout_31: makePuzzle("placeholder_stakeout_31", "Title31", "GOLD"), 
  placeholder_stakeout_32: makePuzzle("placeholder_stakeout_32", "Title32", "THE WHALE AND THE RISING SUN"), 
  placeholder_stakeout_33: makePuzzle("placeholder_stakeout_33", "Title33", "PIVOT TABLE"), 
  placeholder_stakeout_34: makePuzzle("placeholder_stakeout_34", "Title34", "INSECT"), 
  placeholder_stakeout_35: makePuzzle("placeholder_stakeout_35", "Title35", "WHITE HOUSE"), 
  placeholder_stakeout_36: makePuzzle("placeholder_stakeout_36", "Title36", "IT TAKES TWO"), 
  placeholder_stakeout_37: makePuzzle("placeholder_stakeout_37", "Title37", "LONG STRIDE"), 
  placeholder_stakeout_38: makePuzzle("placeholder_stakeout_38", "Title38", "PINTO BEAN"), 
  placeholder_stakeout_39: makePuzzle("placeholder_stakeout_39", "Title39", "BADGER"), 
  placeholder_stakeout_40: makePuzzle("placeholder_stakeout_40", "Title40", "DESTINY'S CHILD"), 
  placeholder_stakeout_41: makePuzzle("placeholder_stakeout_41", "Title41", "SPEECH"), 
  placeholder_stakeout_42: makePuzzle("placeholder_stakeout_42", "Title42", "KNIFE")
}

export default puzzles;
