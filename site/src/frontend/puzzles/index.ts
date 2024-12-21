import PapasBookcase from "./serene-africa";
import PapasStash from "./shy-embassy";
import type { PuzzleDefinition } from "./types";
import { makePlaceholder } from "./placeholder";


export const PUZZLES: Record<string, PuzzleDefinition> = {
  // The Missing Diamond

  // The Illegal Search

  // initial unlock:
  kotei_no_ango: makePlaceholder("kotei_no_ango", "\u7687\u5e1d\u306e\u6697\u53f7", "THE END OF THE HEISEI ERA"),
  cross_spread: makePlaceholder("cross_spread", "Cross Spread", "REUNITED"),
  isp03: makePlaceholder("isp03", "Placeholder 03", "HELL HOLE"),
  this_is_just_a_test: makePlaceholder("this_is_just_a_test", "This Is Just A Test", "A BAD DECADE"),
  isp05: makePlaceholder("isp05", "Placeholder 05", "SLEDDER"),

  // behind locks:
  jargon: makePlaceholder("jargon", "Jargon", "PHILOLOGY"),
  cahfee_regular: makePlaceholder("cahfee_regular", "Cahfee, Regulah", "ATHLETIC CLUB"),
  the_center_is_in_plain_sight: makePlaceholder("the_center_is_in_plain_sight", "The Center Is In Plain Sight", "FIORE SARDO"),
  no_accounting_for_taste: makePlaceholder("no_accounting_for_taste", "No Accounting for Taste", "FOOD COURT"),
  south_americant: makePlaceholder("south_americant", "South American't", "MANUEL ORIBE"),

  // secret room:
  isp11: makePlaceholder("isp11", "Placeholder 11", "GARDEN CENTER"),
  isp12: makePlaceholder("isp12", "Placeholder 12", "FAT TUESDAY"),
  isp13: makePlaceholder("isp13", "Placeholder 13", "CARPENTER FISH"),
  isp14: makePlaceholder("isp14", "Placeholder 14", "BASEBALL MOUND"),
  isp15: makePlaceholder("isp15", "Placeholder 15", "VAMPIRE BUTTERFLY"),
  isp16: makePlaceholder("isp16", "Placeholder 16", "FIVE HOLE"),
  isp17: makePlaceholder("isp17", "Placeholder 17", "LIVING YEARS"),
  isp18: makePlaceholder("isp18", "Placeholder 18", "BANANA BREAD"),

  // metas:
  papas_bookcase: PapasBookcase,
  papas_stash: PapasStash,
};
