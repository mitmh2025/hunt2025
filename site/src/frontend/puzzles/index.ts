import DownrightBackwards from "./able-worm";
import CrossSpread from "./bony-palm";
import ShellCorporationFour from "./bountiful-maple";
import EducationalRiteOfPassage from "./circular-greece";
import TheBoardwalk from "./dental-shark";
import Casino from "./fortunate-calf";
import ShellCorporationThree from "./green-princess";
import ShellCorporationOne from "./gullible-tooth";
import SingLikeACanary from "./heavenly-cell";
import ShellCorporationEight from "./insignificant-thief";
import TheArtGallery from "./intentional-limousine";
import AnExchangeOfVows from "./lanky-robot";
import ShellCorporationSix from "./mild-octopus";
import PracticalFighter from "./practical-fighter";
import ShellCorporationFive from "./profitable-trunk";
import TheJewelryStore from "./reliable-night";
import FollowTheRules from "./right-palm";
import The10000SheetExcelFile from "./shoddy-table";
import TheShellGame from "./subdued-jet";
import KoteiNoAngo from "./tragic-spider";
import ShellCorporationSeven from "./truthful-wave";
import type { PuzzleDefinition } from "./types";
import TheyMightBeGradStudentsButTheyveGotYourNumber from "./uneven-aztec";
import ShellCorporationTwo from "./untrue-dice";

export const PUZZLES: Record<string, PuzzleDefinition> = {
  // The Missing Diamond
  downright_backwards: DownrightBackwards,
  educational_rite_of_passage: EducationalRiteOfPassage,
  they_might_be_grad_students_but_theyve_got_your_number:
    TheyMightBeGradStudentsButTheyveGotYourNumber,

  the_boardwalk: TheBoardwalk,
  the_casino: Casino,
  the_jewelry_store: TheJewelryStore,
  the_art_gallery: TheArtGallery,

  // Stakeout
  an_exchange_of_vows: AnExchangeOfVows,
  sing_like_a_canary: SingLikeACanary,

  // Paper Trail
  follow_the_rules: FollowTheRules,

  shell_corporation_1: ShellCorporationOne,
  shell_corporation_2: ShellCorporationTwo,
  shell_corporation_3: ShellCorporationThree,
  shell_corporation_4: ShellCorporationFour,
  shell_corporation_5: ShellCorporationFive,
  shell_corporation_6: ShellCorporationSix,
  shell_corporation_7: ShellCorporationSeven,
  shell_corporation_8: ShellCorporationEight,
  the_shell_game: TheShellGame,

  // Illegal Search
  kotei_no_ango: KoteiNoAngo,
  cross_spread: CrossSpread,

  // Background Check
  the_10000_sheet_excel_file: The10000SheetExcelFile,

  practical_fighter: PracticalFighter,
};
