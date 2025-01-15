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
    text: "The Boardwalk came up a lot. We decided look into it.",
    defaultTime: 220,
  },
  {
    event: "puzzle_unlocked",
    slug: "the_art_gallery",
    thread: "main",
    text: "A lot of people mentioned the Art Gallery. We looked closer.",
    defaultTime: 180,
  },
  {
    event: "puzzle_unlocked",
    slug: "The Jewelry Store",
    thread: "main",
    text: "A number of witnesses spoke of the Jewelry Store, so we investigated.",
    defaultTime: 230,
  },
  {
    event: "puzzle_unlocked",
    slug: "The Casino",
    thread: "main",
    text: "The Casino was often mentioned. We set our sights on it.",
    defaultTime: 200,
  },
  {
    name: "boardwalksolved",
    event: "puzzle_solved",
    slug: "the_boardwalk",
    thread: "main",
    text: "On the Boardwalk we decided to *** and see what he could tell us.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_boardwalk",
      },
    ],
    threadRoot: {
      id: "katrina",
      name: "The shady girlfriend",
      permittedOrders: [5, 4, 3, 2],
    },
    defaultTime: 275,
  },
  {
    name: "artgallerysolved",
    event: "puzzle_solved",
    slug: "the_art_gallery",
    thread: "main",
    text: "At the Art Gallery we endeavored to *** to find out what she knew.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_art_gallery",
      },
    ],
    threadRoot: {
      id: "papa",
      name: "The angry gangster",
      permittedOrders: [5, 4, 3, 2],
    },
    defaultTime: 240,
  },
  {
    name: "jewelrystoresolved",
    event: "puzzle_solved",
    slug: "the_jewelry_store",
    thread: "main",
    text: "At the Jewelry Store, we committed to *** in the hopes that he would tell us something.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_jewelry_store",
      },
    ],
    threadRoot: {
      id: "gladys",
      name: "The sneaky businesswoman",
      permittedOrders: [5, 4, 3, 2],
    },
    defaultTime: 300,
  },
  {
    name: "casinosolved",
    event: "puzzle_solved",
    slug: "the_casino",
    thread: "main",
    text: "At the Casino, we realized we had to *** if we were going to learn anything new.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "interview_at_the_casino",
      },
    ],
    threadRoot: {
      id: "ferdinand",
      name: "The indebted millionaire",
      permittedOrders: [5, 4, 3, 2],
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
    text: "The Art Gallery owner overheard Baby and Papa arguing - apparently, Baby was quite upset about some deep secret of Papa's she discovered. We'd have to find it for ourselves the only way we knew how: an Illegal Search of Papa's private study.",
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
    text: "The gem-cutter let slip that Gladys bought Ferdinand's ring at the Jewelry Store. That's pretty suspicious for a jewelry magnate. Maybe her business wasn't as it appeared. Wed have to follow the Paper Trail.",
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
    text: "Billie asked us to meet him.",
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
    text: "It was time to confront the killer. But how?",
    defaultTime: 1160,
  },
  {
    event: "puzzle_solved",
    slug: "the_killer",
    thread: "main",
    text: "We knew to confront the killer we would have to *** Billie knew where to find him and invited us to join him at the Gala.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "the_safe_house",
      },
    ],
    defaultTime: 1800,
  },
  {
    event: "interaction_completed",
    slug: "the_safe_house",
    thread: "main",
    text: "Confronting Rover didn't go well. He's in the wind, but before he escaped, we learned that he'd been following Sidecar for some time and he thinks the diamond had already been swapped when Sidecar stole it.",
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
    text: "Opening the vault did not go well! Baby revealed herself as the mastermind behind it all and made off with the diamond to start a new life. Everyone else, she locked in the vault.",
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
    text: "Backed into a corner, Papa admitted that his adoption of Baby was a bit unsavory. Her parents were arrested working his job and he's done whatever it took to keep them in the clink ever since. Awful as it was, his care for Baby was obviously genuine and he didn't know how much she had figured out. We promised to keep it to ourselves for now.",
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
    slug: "confront_ferdinand",
    thread: "ferdinand",
    text: "Called out by name, Ferdinand admitted to being a confidence man. The diamond was his biggest score and his ticket out, but now it was gone, and he feared losing Gladys as well. We agreed to keep it between us, just for now.",
    defaultTime: 3030,
  },
  {
    event: "puzzle_unlocked",
    slug: "chinatown",
    thread: "katrina",
    text: "Every time I think I should just forget it, a new lead waltzes in the door.",
    defaultTime: 760,
  },
  {
    event: "puzzle_solved",
    slug: "chinatown",
    thread: "katrina",
    text: "Baby loves her and deserves to know the truth. Find Katrina at the Gala and discretely ***.",
    attention: [
      {
        event: "interaction_unlocked",
        slug: "confrontation_with_katrina",
      },
    ],
    defaultTime: 1320,
  },
  // three more threads to fill in
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
    name: node.name || "",
    timestamp,
    thread: node.thread,
    tiebreaker: node.tiebreaker || 0,
    text: node.text,
    attention: titledAttention,
    answer,
    threadRoot: node.threadRoot || undefined,
  };
}
