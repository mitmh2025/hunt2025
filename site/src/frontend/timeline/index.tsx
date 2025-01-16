import { type ActivityLogEntry } from "../../../lib/api/client";
import { type DehydratedActivityLogEntry } from "../../../lib/api/contract";
import { ROUND_PAGE_MAP } from "../rounds";
import { PUZZLES } from "../puzzles";
import { INTERACTIONS } from "../interactions";
import { type TimelineActivityLogEntry, type TimelineNode } from "./types";

const TIMELINE_NODES: TimelineNode[] = [
  {
    event: "round_unlocked",
    slug: "missing_diamond",
    thread: "main",
    text: "With our field office open, the investigation could officially begin. We started by canvasing the neighborhood.",
    defaultTime: 60,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_boardwalk",
    thread: "main",
    text: "A brisk stroll might clear our minds.",
    defaultTime: 220,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_art_gallery",
    thread: "main",
    text: "We didn't know a thing about art. Maybe we'd be educated.",
    defaultTime: 180,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_jewelry_store",
    thread: "main",
    text: "Anyone need something shiny?",
    defaultTime: 230,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_casino",
    thread: "main",
    text: "A few hands wouldn't hurt.",
    defaultTime: 200,
  },
  {
    event: "puzzle_solved",
    slug: "the_boardwalk",
    thread: "main",
    text: "We opted to *** and see what he could tell us.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_boardwalk",
      },
    ],
    threadRoot: {
      id: "katrina",
      title: "The shady girlfriend",
      color: "#0B8884",
    },
    defaultTime: 275,
  },
  {
    event: "puzzle_solved",
    slug: "the_art_gallery",
    thread: "main",
    text: "We endeavored to *** to find out what she knew.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_art_gallery",
      },
    ],
    threadRoot: {
      id: "papa",
      title: "The angry gangster",
      color: "#D5C171",
    },
    defaultTime: 240,
  },
  {
    event: "puzzle_solved",
    slug: "the_jewelry_store",
    thread: "main",
    text: "We tried to *** in the hopes that he would tell us something.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_jewelry_store",
      },
    ],
    threadRoot: {
      id: "gladys",
      title: "The sneaky businesswoman",
      color: "#9959A7",
    },
    defaultTime: 300,
  },
  {
    event: "puzzle_solved",
    slug: "the_casino",
    thread: "main",
    text: "We had no choice but to *** if we were going to learn anything new.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_casino",
      },
    ],
    threadRoot: {
      id: "ferdinand",
      title: "The indebted millionaire",
      color: "#CE0000",
    },
    defaultTime: 310,
  },
  {
    event: "interaction_completed",
    slug: "interview_at_the_boardwalk",
    thread: "katrina",
    text: "A sailor on the Boardwalk told us Katrina has been meeting someone on the docks under cover of darkness. This called for a Stakeout.",
    attention: [
      {
        event: "round_unlocked",
        slug: "stakeout",
      },
    ],
    defaultTime: 295,
  },
  {
    event: "interaction_completed",
    slug: "interview_at_the_art_gallery",
    thread: "papa",
    text: "The Art Gallery owner overheard Baby and Papa arguing. Apparently, Baby was quite upset about some deep secret of Papa's she discovered. We'd have to find it for ourselves the only way we knew how: an Illegal Search of Papa's private study.",
    attention: [
      {
        event: "round_unlocked",
        slug: "illegal_search",
      },
    ],
    defaultTime: 260,
  },
  {
    event: "interaction_completed",
    slug: "interview_at_the_jewelry_store",
    thread: "gladys",
    text: "The gem-cutter let slip that Gladys bought Ferdinand's ring at the Jewelry Store. That's pretty suspicious for a jewelry magnate. Maybe her business wasn't as it appeared. We'd have to follow the Paper Trail.",
    attention: [
      {
        event: "round_unlocked",
        slug: "paper_trail",
      },
    ],
    defaultTime: 320,
  },
  {
    event: "interaction_completed",
    slug: "interview_at_the_casino",
    thread: "ferdinand",
    text: "The card players at the Casino mentioned Carter's gambling debts. What did we really know about the man? We started a Background Check.",
    attention: [
      {
        event: "round_unlocked",
        slug: "background_check",
      },
    ],
    defaultTime: 340,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_thief",
    thread: "main",
    text: "Billie asked us to meet them.",
    defaultTime: 340,
  },
  {
    event: "puzzle_solved",
    slug: "the_thief",
    thread: "main",
    text: "Having reconstructed the events of the morning, we finally understood that to catch a thief we would need to ***. Before we got a chance, Billie called us down to the Speakeasy.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "the_crime_scene",
      },
    ],
    defaultTime: 420,
  },
  {
    event: "interaction_completed",
    slug: "the_crime_scene",
    thread: "main",
    text: "It was gruesome. Sidecar was dead, a fake diamond clutched in his hand. Did the killer swap the diamonds, hoping we wouldn't notice or was the diamond fake all along? To find out, we'd first have to solve Sidecar's murder.",
    attention: [
      {
        event: "round_unlocked",
        slug: "murder_in_mitropolis",
      },
    ],
    defaultTime: 435,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_killer",
    thread: "main",
    tiebreaker: 1,
    text: "It was time to confront the killer. But how?",
    defaultTime: 1160,
  },
  {
    event: "puzzle_solved",
    slug: "the_killer",
    thread: "main",
    text: "We knew to confront the killer we would have to *** Billie knew where to find him and invited us to join them at the Gala.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "the_safehouse",
      },
    ],
    defaultTime: 1800,
  },
  {
    event: "interaction_completed",
    slug: "the_safehouse",
    thread: "main",
    text: "Confronting Rover was a bust. He went to ground, but before he escaped, we learned that he'd been following Sidecar for some time and he thinks the diamond had already been swapped when Sidecar stole it.",
    defaultTime: 1830,
  },
  {
    event: "interaction_unlocked",
    slug: "the_vault",
    thread: "main",
    text: "Everyone called in a favor. This was going to get interesting.",
    tiebreaker: 1,
    defaultTime: 3030,
  },
  {
    event: "interaction_completed",
    slug: "the_vault",
    thread: "main",
    text: "Opening the vault was catastrophic! Baby revealed herself as the mastermind behind it all and made off with the diamond to start a new life. Everyone else, she locked in the vault with the cops on their way.",
    defaultTime: 3150,
  },
  {
    event: "interaction_completed",
    slug: "confront_katrina",
    thread: "katrina",
    text: "When confronted, Katrina admitted she was really one Katherine Mockingbird, a MITropolis police officer. We agreed to keep it quiet for now.",
    defaultTime: 1350,
  },
  {
    event: "interaction_completed",
    slug: "confront_papa",
    thread: "papa",
    text: "Backed into a corner, Papa admitted that his adoption of Baby was a bit unsavory. Her parents were arrested working his job and he's done whatever it took to keep them in the clink ever since. Awful as it was, his concern for Baby was obviously genuine and he didn't think she had pieced the worst of it together. We promised to keep it to ourselves for now.",
    defaultTime: 1030,
  },
  {
    event: "interaction_completed",
    slug: "confront_gladys",
    thread: "gladys",
    text: "Presented with the evidence of her crimes, Gladys admitted she had long ago taken the legitimate jewelry empire crooked - Ms. Glass, those in the know call her. This would catch up with her soon enough; for now we had bigger fish to fry.",
    defaultTime: 2940,
  },
  {
    event: "interaction_completed",
    slug: "confront_carter",
    thread: "ferdinand",
    text: "Called out by name, Ferdinand admitted to being a confidence man. The diamond was his biggest score and his ticket out, but now it was gone, and he feared losing Gladys as well. We agreed to keep it between us, just for now.",
    defaultTime: 3030,
  },
  {
    event: "puzzle_unlocked",
    slug: "chinatown",
    thread: "katrina",
    tiebreaker: 1,
    text: "Every time I think I should just forget it, a new lead waltzes in the door.",
    defaultTime: 760,
  },
  {
    event: "puzzle_solved",
    slug: "chinatown",
    thread: "katrina",
    text: "Baby loves her and deserves to know the truth. We'd have to find Katrina at the Gala and discretely ***.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "confront_katrina",
      },
    ],
    defaultTime: 1320,
  },
  {
    event: "puzzle_unlocked",
    slug: "papas_bookcase",
    thread: "papa",
    text: "There was something strange about this bookcase. Well, there was something strange about this whole room, but the bookcase stood out.",
    defaultTime: 270,
  },
  {
    event: "puzzle_solved",
    slug: "papas_bookcase",
    thread: "papa",
    text: "With the invokation of *** the bookcase slid away, revealing a secret room.",
    defaultTime: 350,
  },
  {
    event: "puzzle_unlocked",
    slug: "papas_stash",
    thread: "papa",
    text: "Papa had quite the collection in his secret room.",
    defaultTime: 360,
  },
  {
    event: "puzzle_solved",
    slug: "papas_stash",
    thread: "papa",
    text: "It had become clear we would need to ***.",
    defaultTime: 500,
  },
  {
    event: "puzzle_unlocked",
    slug: "papas_bookcase_blacklight",
    thread: "papa",
    text: "Under the blacklight, the bookcase was even more odd than before.",
    defaultTime: 510,
  },
  {
    event: "puzzle_solved",
    slug: "papas_bookcase_blacklight",
    thread: "papa",
    text: "Does Baby know Papa kept her birth parents in the clink? No wonder she was angry. We'd have to find Papa at the Gala and discretely ***.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "confront_papa",
      },
    ],
    defaultTime: 900,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_mark",
    thread: "ferdinand",
    text: "Someone slipped a few postcards under the door.",
    attention: [
      {
        event: "puzzle_unlocked",
        slug: "the_grand_illusion",
      },
      {
        event: "puzzle_unlocked",
        slug: "the_oversight",
      },
    ],
    defaultTime: 2200,
  },
  {
    event: "puzzle_solved",
    slug: "the_mark",
    thread: "ferdinand",
    text: "They say if you can't spot the mark, it's you. I guess our friend Ferdinand took that to heart. Maybe it is ***'s fault.",
    defaultTime: 2800,
  },
  {
    event: "puzzle_solved",
    slug: "the_grand_illusion",
    thread: "ferdinand",
    text: "Imagine being so frightened of the consequences of your own actions that you flee the country in a *** under cover of night.",
    defaultTime: 2620,
  },
  {
    event: "puzzle_solved",
    slug: "the_oversight",
    thread: "ferdinand",
    text: "The good guys can afford to make mistakes. Ferdinand might say that's the only difference. But I don't have to live like a ***.",
    defaultTime: 2340,
  },
  {
    event: "puzzle_unlocked",
    slug: "alias",
    thread: "ferdinand",
    tiebreaker: 1,
    text: "Someone left us an anonymous calling card. Who would ever make such a thing?",
    defaultTime: 2340,
  },
  {
    event: "puzzle_solved",
    slug: "alias",
    thread: "ferdinand",
    tiebreaker: 1,
    text: "Clearly, he wasn't the lost scion of Carter Brothers. We'd have to find so-called Ferdinand at the Gala and discretely ***.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "confront_carter",
      },
    ],
    defaultTime: 3000,
  },
  {
    event: "puzzle_unlocked",
    slug: "shell_corporation_1",
    thread: "gladys",
    text: "Gladys' corporate structure seems awfully complicated for a jewelry maker. Why would she need some of these subsidiaries? We'd have to look closer.",
    attention: [
      {
        event: "puzzle_unlocked",
        slug: "shell_corporation_2",
      },
      {
        event: "puzzle_unlocked",
        slug: "shell_corporation_3",
      },
      {
        event: "puzzle_unlocked",
        slug: "shell_corporation_4",
      },
      {
        event: "puzzle_unlocked",
        slug: "shell_corporation_5",
      },
      {
        event: "puzzle_unlocked",
        slug: "shell_corporation_6",
      },
      {
        event: "puzzle_unlocked",
        slug: "shell_corporation_7",
      },
      {
        event: "puzzle_unlocked",
        slug: "shell_corporation_8",
      },
    ],
    defaultTime: 1800,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_1",
    thread: "gladys",
    text: "She dined like a fat cat while we scrounged for ***.",
    defaultTime: 2560,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_2",
    thread: "gladys",
    text: "*** she said. A likely story.",
    defaultTime: 2110,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_3",
    thread: "gladys",
    text: "This jewelry maker also happened to own the company that repaired ***. Makes sense.",
    defaultTime: 2100,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_4",
    thread: "gladys",
    text: "The *** was the only thing that was clear in this mess.",
    defaultTime: 2500,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_5",
    thread: "gladys",
    text: "Who was ***? An old friend with connections, no doubt.",
    defaultTime: 2800,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_6",
    thread: "gladys",
    text: "We were going to have to keep digging, down to the ***.",
    defaultTime: 2100,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_7",
    thread: "gladys",
    text: "The pieces were starting to fit together like ***.",
    defaultTime: 2120,
  },
  {
    event: "puzzle_solved",
    slug: "shell_corporation_8",
    thread: "gladys",
    text: "Maybe she thought the zoo would be good community outreach. All we saw was ***.",
    defaultTime: 2710,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_shell_game",
    thread: "gladys",
    tiebreaker: 1,
    text: "Someone slipped one last ledger under the door. Maybe this was the missing piece.",
    defaultTime: 2800,
  },
  {
    event: "puzzle_solved",
    slug: "the_shell_game",
    thread: "gladys",
    tiebreaker: 1,
    text: "Her business is a crooked as the old man's! We'd have to find Gladys at the Gala and discretely ***.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "confront_gladys",
      },
    ],
    defaultTime: 2920,
  },
];

const SLUG_LOOKUP = {
  round_unlocked: ROUND_PAGE_MAP,
  puzzle_unlocked: PUZZLES,
  puzzle_solved: PUZZLES,
  interaction_unlocked: INTERACTIONS,
  interaction_completed: INTERACTIONS,
};

export function generateActivityLogForTimeline(
  entry: DehydratedActivityLogEntry | ActivityLogEntry,
): TimelineActivityLogEntry | undefined {
  const node = TIMELINE_NODES.find(
    (node) => node.event === entry.type && node.slug === entry.slug,
  );
  if (!node) {
    return undefined;
  }
  const extendedAttention = [{ event: node.event, slug: node.slug }].concat(
    node.attention || [],
  );
  const titledAttention = extendedAttention.map((attn) => {
    const title = SLUG_LOOKUP?.[attn.event]?.[attn.slug]?.title || "";
    return {
      event: attn.event,
      slug: attn.slug,
      title: title,
    };
  });
  const baseTime = Date.parse("2025-01-17T12:00:00.000-05:00");
  const timestamp =
    process.env.NODE_ENV === "development"
      ? new Date(baseTime + node.defaultTime * 60000)
      : new Date(entry.timestamp);
  const answer = entry.type === "puzzle_solved" ? entry.answer : "";
  return {
    id: entry.id,
    timestamp,
    thread: node.thread,
    tiebreaker: node.tiebreaker || 0,
    text: node.text,
    attention: titledAttention,
    answer,
    threadRoot: node.threadRoot || undefined,
  };
}
