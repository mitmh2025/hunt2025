import { type Request } from "express";
import { type DateTime } from "luxon";
import HUNT, { generateSlugToSlotMap } from "../../../huntdata";
import parsedActivityLog from "../../archives/stats/parsedActivityLog";
import { PUZZLE_STATS } from "../../archives/stats/puzzles";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import {
  PuzzleAnswerStatsTable,
  PuzzleTeamStatsTable,
} from "../../components/StatsLayout";
import { PUZZLES } from "../../puzzles";
import archiveMode from "../../utils/archiveMode";
import rootUrl from "../../utils/rootUrl";
import { type PuzzleParams } from "./puzzle";

const slugToSlot = generateSlugToSlotMap(HUNT);

export function puzzleStatsHandler(req: Request<PuzzleParams>) {
  if (!req.teamState) {
    console.log("weird no team state");
    return undefined;
  }
  // Only show solutions if we're in archive mode
  if (!archiveMode) {
    return undefined;
  }

  const slug = req.params.puzzleSlug;
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    const node = (
      <div>
        <h1>Puzzle not found</h1>
        <p>
          The puzzle you requested stats for (<code>{slug}</code>) exists, but
          we can’t seem to find it.
        </p>
      </div>
    );
    return wrapContentWithNavBar(
      { node, title: `Missing Solution for ${slug}` },
      req.teamState,
    );
  }

  const { slot } = slugToSlot.get(slug) ?? {};
  const purchasable = !slot?.is_meta && !slot?.is_supermeta;

  // Special-case what "unlock" means for quixotic-shoe to be when ads started
  const isQuixoticShoe = slug === "and_now_a_puzzling_word_from_our_sponsors";
  const unlockEvent = isQuixoticShoe ? "ads_unlocked" : "puzzle_unlocked";

  const log = parsedActivityLog.filter(
    (row) =>
      row.slug === slug || (isQuixoticShoe && row.type === "ads_unlocked"),
  );
  const unlockCount = log.filter((row) => row.type === unlockEvent).length;
  const solveCount = log.filter((row) => row.type === "puzzle_solved").length;
  const purchasedCount = log.filter(
    (row) => row.type === "puzzle_answer_bought",
  ).length;
  const guessCount = log.filter(
    (row) => row.type === "puzzle_guess_submitted",
  ).length;
  const hintCount = log.filter(
    (row) => row.type === "puzzle_hint_requested",
  ).length;

  const teamStatsMap = log.reduce<
    Map<
      string,
      {
        unlockTime?: DateTime;
        solveTime?: DateTime;
        guessCount: number;
        purchased?: boolean;
      }
    >
  >((acc, row) => {
    const stats = acc.get(row.team_name) ?? { guessCount: 0 };
    if (row.type === unlockEvent) {
      stats.unlockTime = row.timestamp;
    } else if (row.type === "puzzle_solved") {
      stats.solveTime = row.timestamp;
    } else if (row.type === "puzzle_guess_submitted") {
      stats.guessCount += 1;
    } else if (row.type === "puzzle_answer_bought") {
      stats.purchased = true;
    }
    acc.set(row.team_name, stats);

    return acc;
  }, new Map());
  const teamStats = [...teamStatsMap.entries()]
    .flatMap(([teamName, stats]) => {
      const { solveTime, unlockTime } = stats;
      if (!solveTime || !unlockTime) {
        return [];
      }

      return {
        purchased: false,
        teamName,
        ...stats,
        unlockTime,
        solveTime,
        timeToSolve: solveTime.diff(unlockTime).rescale(),
      };
    })
    .toSorted(({ solveTime: a }, { solveTime: b }) => a.diff(b).milliseconds);

  const answerResults = new Map<string, "correct" | "incorrect" | "other">();
  const answerStatsMap = log.reduce<Map<string, number>>((acc, row) => {
    if (row.type === "puzzle_guess_submitted" && row.answer) {
      const count = acc.get(row.answer) ?? 0;
      acc.set(row.answer, count + 1);

      if (row.result === "correct") {
        answerResults.set(row.answer, "correct");
      } else if (row.result === "incorrect") {
        answerResults.set(row.answer, "incorrect");
      } else if (row.result === "other") {
        answerResults.set(row.answer, "other");
      }
    }
    return acc;
  }, new Map());
  const answerStats = [...answerStatsMap.entries()]
    .flatMap(([answer, count]) => {
      return {
        answer,
        count,
      };
    })
    .toSorted(({ count: a }, { count: b }) => b - a);

  const inlineScript = `window.statsSlug = "${slug}";`;
  const node = (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <NotoColorEmojiFont />
      <PageWrapper fullWidth>
        <>
          <PageHeader>
            <PageTitle>Stats: {puzzle.title}</PageTitle>
          </PageHeader>
          <PageMain>
            <p>
              <a href={`${rootUrl}/puzzles/${slug}`}>← Back to puzzle</a>
            </p>

            {isQuixoticShoe && (
              <p>
                For this puzzle only, we consider the puzzle itself to be
                unlocked in all stats below as of when advertisements began
                playing on the radio, rather than when the puzzle itself was
                unlocked (which only occurred after discovering and solving the
                first ad minipuzzle). The minipuzzles are considered to be
                unlocked when they are first accessed.
              </p>
            )}

            <p>
              Total unlocks: {unlockCount}
              <br />
              Total solves: {solveCount}
              {purchasable ? (
                <>
                  {" "}
                  (including {purchasedCount} with Clue
                  {purchasedCount !== 1 ? "s" : ""} 🔎)
                </>
              ) : (
                <>
                  {" "}
                  (as a metapuzzle, this answer could not be purchased with
                  Clues 🔎)
                </>
              )}
              <br />
              Total guesses: {guessCount}
              <br />
              Total hints requested: {hintCount}
            </p>

            <p>(Click on headers to sort)</p>

            {PUZZLE_STATS[slug] && (
              <>
                <noscript>
                  This puzzle has additional statistics which require Javascript
                </noscript>
                <div id="puzzle-bonus-stats-root" />
              </>
            )}

            <h2>Team Stats</h2>

            <PuzzleTeamStatsTable
              purchasable={purchasable}
              teamStats={teamStats}
            />

            <h2>Answer Stats</h2>

            <PuzzleAnswerStatsTable
              answerStats={answerStats}
              answerResults={answerResults}
            />
          </PageMain>
        </>
      </PageWrapper>
    </>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: `Stats for ${puzzle.title}`,
      entrypoints: ["archive_puzzle_stats"],
    },
    req.teamState,
  );
}
