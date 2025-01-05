import { makePlaceholder } from "./placeholder";
import type { PuzzleDefinition, SubpuzzleDefinition } from "./types";
import TheThief from "./dimpled-star";

export const PUZZLES: Record<string, PuzzleDefinition> = {
  unreal_islands: makePlaceholder("unreal_islands", "Unreal Islands", "BATH BRICK"),
  educational_rite_of_passage: makePlaceholder("educational_rite_of_passage", "Educational Rite of Passage", "RAW ANTIQUE BRASS"),
  songs_on_the_radio: makePlaceholder("songs_on_the_radio", "Songs on the Radio", "GUARDIAN LAVENDER"),
  downright_backwards: makePlaceholder("downright_backwards", "Downright Backwards", "GUIANA CHESTNUT"),
  chatgpt: makePlaceholder("chatgpt", "ChatGPT", "CREME CARAMEL"),
  zulu_lima: makePlaceholder("zulu_lima", "Zulu Lima", "SPACE WARSHIPS"),
  press_play: makePlaceholder("press_play", "Press Play", "STENOGRAPHERS"),
  shrinkage: makePlaceholder("shrinkage", "Shrinkage", "NEWMANS APARTMENT"),
  missing_connections: makePlaceholder("missing_connections", "Missing Connections", "DEVILS MARBLES"),
  xoxo: makePlaceholder("xoxo", "XOXO", "FROM RUSSIA WITH LOVE"),
  an_argument: makePlaceholder("an_argument", "An Argument", "RIGHT TO BEAR ARMS"),
  "📑🍝": makePlaceholder("📑🍝", "📑🍝", "PIDAKALA WAR"),
  mitropolitan_house_of_fashion: makePlaceholder("mitropolitan_house_of_fashion", "MITropolitan House of Fashion", "SERENDIP SANCTUARY"),
  on_the_corner: makePlaceholder("on_the_corner", "On the Corner", "BREGENZ FOREST"),
  drunkens_and_flagons: makePlaceholder("drunkens_and_flagons", "Drunkens and Flagons", "SLEIGHT OF HAND"),
  battle_factory: makePlaceholder("battle_factory", "Battle Factory", "CHOKING HAZARD"),
  synthetic_tagsonomy: makePlaceholder("synthetic_tagsonomy", "Synthetic Tagsonomy", "CHEESE VENDORS"),
  no_notes: makePlaceholder("no_notes", "No Notes", "CANINE PARTNER"),
  "🔎🧊": makePlaceholder("🔎🧊", "🔎🧊", "CHIFFONIER"),
  introduction_to_decryption: makePlaceholder("introduction_to_decryption", "Introduction to Decryption", "JABBAS BOILER ROOM"),
  neatly_drawn: makePlaceholder("neatly_drawn", "Neatly Drawn", "BIRD ORCHID"),
  dropping_the_ball: makePlaceholder("dropping_the_ball", "Dropping the Ball", "HAL INSTITUTE FOR CRIMINALLY INSANE ROBOTS"),
  mastering_the_art_of_conch_frocking: makePlaceholder("mastering_the_art_of_conch_frocking", "Mastering the Art of Conch Frocking", "LAMOTTA"),
  in_a_different_direction: makePlaceholder("in_a_different_direction", "In a Different Direction", "GREEDY PIGGY"),
  check_a_deez_words_out: makePlaceholder("check_a_deez_words_out", "Check-a-deez Words Out", "RYAN FLAMINGO"),
  be_kind_rewind: makePlaceholder("be_kind_rewind", "Be Kind, Rewind", "HARD DISK SPACE"),
  they_might_be_grad_students_but_theyve_got_your_number: makePlaceholder("they_might_be_grad_students_but_theyve_got_your_number", "They Might Be Grad Students, But They've Got Your Number", "RAP OFF KEY"),
  zing_it_again: makePlaceholder("zing_it_again", "Zing it Again", "THE BEATLES"),

  the_boardwalk: makePlaceholder("the_boardwalk", "The Boardwalk", "BAIL MATE"),
  the_jewelry_store: makePlaceholder("the_jewelry_store", "The Jewelry Store", "OFFER CARAT TO A LAPIDARY"),
  the_casino: makePlaceholder("the_casino", "The Casino", "FACE CARD SHARKS"),
  the_art_gallery: makePlaceholder("the_art_gallery", "The Art Gallery", "BOX OWNER"),

  the_thief: TheThief,
};

// Generate the SUBPUZZLES index from PUZZLES
type FullSubpuzzleDefinition = SubpuzzleDefinition & { parent_slug: string };
export const SUBPUZZLES: Record<string, FullSubpuzzleDefinition> =
  Object.fromEntries(
    Object.entries(PUZZLES).flatMap(([slug, puzzleDef]) => {
      return (puzzleDef.subpuzzles ?? []).map((subpuzzleDef) => {
        return [
          subpuzzleDef.slug,
          {
            ...subpuzzleDef,
            parent_slug: slug,
          },
        ];
      });
    }),
  ) as Record<string, FullSubpuzzleDefinition>;
