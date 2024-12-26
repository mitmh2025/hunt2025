import cryptex_note_blacklight from "../../frontend/rounds/illegal_search/assets/cryptex/cryptex_note_blacklight.png";
import candy_modal_blacklight from "../../frontend/rounds/illegal_search/assets/desk_drawer/candy_modal_blacklight.png";
import rings_modal_blacklight from "../../frontend/rounds/illegal_search/assets/fuse_box/rings_modal_blacklight.png";
import ledger_blacklight from "../../frontend/rounds/illegal_search/assets/rug/numberlock_box_ledger_blacklight.png";
import money_modal_blacklight from "../../frontend/rounds/illegal_search/assets/safe/money_modal_blacklight.png";
import { blacklightPuzzle } from "./blacklight";
import { makePlaceholder } from "./placeholder";
import PapasBookcase from "./serene-africa";
import PapasStash from "./shy-embassy";
import PapasBookcaseBlacklight from "./sick-crown";
import type { PuzzleDefinition } from "./types";

const Jargon = makePlaceholder("jargon", "Jargon", "PHILOLOGY");
const CahfeeRegular = makePlaceholder("cahfee_regular", "Cahfee, Regulah", "ATHLETIC CLUB");
const TheCenterIsInPlainSight = makePlaceholder("the_center_is_in_plain_sight", "The Center Is In Plain Sight", "FIORE SARDO");
const NoAccountingForTaste = makePlaceholder("no_accounting_for_taste", "No Accounting for Taste", "FOOD COURT");
const SouthAmericant = makePlaceholder("south_americant", "South American't", "MANUEL ORIBE");

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
  jargon: Jargon,
  cahfee_regular: CahfeeRegular,
  the_center_is_in_plain_sight: TheCenterIsInPlainSight,
  no_accounting_for_taste: NoAccountingForTaste,
  south_americant: SouthAmericant,

  // secret room:
  isp11: makePlaceholder("isp11", "Placeholder 11", "GARDEN CENTER"),
  isp12: makePlaceholder("isp12", "Placeholder 12", "FAT TUESDAY"),
  isp13: makePlaceholder("isp13", "Placeholder 13", "CARPENTER FISH"),
  isp14: makePlaceholder("isp14", "Placeholder 14", "BASEBALL MOUND"),
  isp15: makePlaceholder("isp15", "Placeholder 15", "VAMPIRE BUTTERFLY"),
  isp16: makePlaceholder("isp16", "Placeholder 16", "FIVE HOLE"),
  isp17: makePlaceholder("isp17", "Placeholder 17", "LIVING YEARS"),
  isp18: makePlaceholder("isp18", "Placeholder 18", "BANANA BREAD"),

  // blacklight:

  // Note: these blacklight answer assignments are all wrong, but that's the
  // set of graphical assets that we got for the playtest, so we're going to
  // live with it for now.  Eventually:
  // * SPARE PARTS should go to the_center_is_in_plain_sight_blacklight
  // * LIFEFORCE should go to jargon_blacklight
  // * VOYAGERS should go to cahfee_regulah_blacklight
  // * the other two have not reached postprod yet
  jargon_blacklight: blacklightPuzzle(Jargon, {
    answer: "LIFEFORCE",
    asset: candy_modal_blacklight,
    assetAlt: "TODO",
  }),
  cahfee_regular_blacklight: blacklightPuzzle(CahfeeRegular, {
    answer: "VOYAGERS",
    asset: rings_modal_blacklight,
    assetAlt: "TODO",
  }),
  the_center_is_in_plain_sight_blacklight: blacklightPuzzle(TheCenterIsInPlainSight, {
    answer: "SPARE PARTS",
    asset: money_modal_blacklight,
    assetAlt: "TODO",
  }),
  no_accounting_for_taste_blacklight: blacklightPuzzle(NoAccountingForTaste, {
    answer: "BROADCAST NEWS",
    asset: ledger_blacklight,
    assetAlt: "TODO",
  }),
  south_americant_blacklight: blacklightPuzzle(
    SouthAmericant,
    {
      answer: "BRAZIL",
      asset: cryptex_note_blacklight,
      assetAlt: "TODO",
    },
  ),

  // metas:
  papas_bookcase: PapasBookcase,
  papas_stash: PapasStash,
  papas_bookcase_blacklight: PapasBookcaseBlacklight,
};
