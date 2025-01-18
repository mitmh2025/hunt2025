import { type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Router } from "websocket-express";
import { type PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import canonicalizeInput from "../../../../lib/canonicalizeInput";
import { AGENT_NAME, FirstPerson, PUZZLE_ANSWER, type Person } from "./data";
import { type LogEntryData } from "./types";

export function generateLogEntries(
  currentTeamName: string,
  log: PuzzleStateLogEntry[],
): LogEntryData[] {
  // If the team has reached an isDone state, they should stop hitting the button that should be
  // disabled by now!
  const isDone = log.some((e) => !!(e.data as LogEntryData).isDone);
  if (isDone) {
    return [];
  }
  // Compute how far along the solve path the log indicates the team has come, to determine which
  // actor they are interacting with next

  let unsatisfiedPerson: Person | undefined = FirstPerson;
  for (const entry of log) {
    const data = entry.data as LogEntryData;
    if (
      data.isYou &&
      data.speaker &&
      unsatisfiedPerson.validAnswers.includes(canonicalizeInput(data.speaker))
    ) {
      unsatisfiedPerson = unsatisfiedPerson.nextPerson;
      if (unsatisfiedPerson === undefined) {
        break;
      }
    }
  }

  if (unsatisfiedPerson === undefined) {
    // We're done.  We should have hit that branch above.
    return [];
  }

  let lines: LogEntryData[] = [
    {
      line: "Hello.",
      speaker: currentTeamName,
      isYou: true,
    },
  ];

  const canonicalizedTeamName = canonicalizeInput(currentTeamName);

  // Now, see if the current team name will satisfy the unsatisfied Person.
  const successful = unsatisfiedPerson.validAnswers.includes(
    canonicalizedTeamName,
  );

  let replies = successful
    ? unsatisfiedPerson.replySuccessful
    : unsatisfiedPerson.replyUnsuccessful;

  if (!successful) {
    // See if any of the "almost" answers match.  If so, don't bother with the
    // default unsuccessful response; just give an "almost" from the aether.
    const candidates = unsatisfiedPerson.almostAnswers ?? [];
    if (candidates.includes(canonicalizedTeamName)) {
      replies = [
        {
          line: "<i>Almost...</i>",
          isYou: false as const,
        },
      ];
    }
  }

  // emit the appropriate lines
  lines = [
    ...lines,
    ...replies.map((line) => {
      return {
        line: line.line,
        speaker: line.speaker,
        isYou: false as const,
        isDone: line.isDone,
      };
    }),
  ];

  if (successful) {
    unsatisfiedPerson = unsatisfiedPerson.nextPerson;
    if (unsatisfiedPerson) {
      lines = [
        ...lines,
        {
          line: "<hr />",
          isYou: false as const,
        },
      ];
      const introLines = unsatisfiedPerson.intro.map((line) => {
        return {
          line: line.line,
          speaker: line.speaker,
          isYou: false as const,
          isDone: line.isDone,
        };
      });
      lines = [...lines, ...introLines];
    }
  }

  return lines;
}

const speakHandler = async (req: Request, res: Response) => {
  if (!req.teamState) {
    // Not logged in
    res.sendStatus(404);
    return;
  }
  const teamId = req.teamState.teamId;
  await req.frontendApi.speakNewKetchup({
    params: { teamId: `${teamId}` },
  });
  // no particular reply here, puzzle state is expected to come in via websocket

  res.json({});
};

const caseFileHandler = async (req: Request, res: Response) => {
  if (!req.teamState) {
    res.sendStatus(404);
    return;
  }

  const team_id = req.teamState.teamId;
  const fullLog = await req.frontendApi.getFullPuzzleStateLog({
    query: { team_id, slug: "what_do_they_call_you" },
  });
  if (fullLog.status !== 200) {
    res.sendStatus(500);
    return;
  }

  const log = fullLog.body;

  let nextExtractionIndex = 0;
  let nextExtractionLetter = PUZZLE_ANSWER[nextExtractionIndex];

  let unsatisfiedPerson: Person | undefined = FirstPerson;
  // The list of names in the order they should appear in the case file, which is mostly the order
  // they were used, but making sure that if you somehow used an answer-satisfying name out of order,
  // we just pretend you didn't use it until it was right
  const usedNames: string[] = [];
  // The extraction indexes for used names; zero means "no extraction from this name"
  const usedNamesIndexes = new Map<string, number>();

  for (const entry of log) {
    const data = entry.data as LogEntryData;
    if (data.isYou) {
      const name = canonicalizeInput(data.speaker);
      const existingIndex = usedNamesIndexes.get(name);

      let index = 0;

      if (unsatisfiedPerson?.validAnswers.includes(name)) {
        if (nextExtractionLetter !== undefined) {
          const usageIdx = name.indexOf(nextExtractionLetter) + 1;
          if (usageIdx > 0 && usageIdx < 10) {
            // This is both a valid answer for this unsatisfied person and a valid name to extract a letter from.
            if (existingIndex !== undefined) {
              if (existingIndex === 0) {
                // console.log("screwy branch taken!");
                // This is the weird case -- we used the name before, but it wasn't satisfying an answer
                // then.  Yank it out from its original location; we'll use it here.
                const usedIndex = usedNames.indexOf(name);
                usedNames.splice(usedIndex, 1);
                usedNamesIndexes.delete(name);
                index = usageIdx;
              }
              // Otherwise, if existingIndex is already nonzero, then we've already used this name in
              // a useful way, and we won't be changing how it sits in usedNames or usedNameIndexes.
            } else {
              // This is the expected normal "good" matching case
              index = usageIdx;
            }
            // Advance through the extraction
            nextExtractionIndex += 1;
            nextExtractionLetter = PUZZLE_ANSWER[nextExtractionIndex];
          }
        }

        // Advance through the cast of characters.
        unsatisfiedPerson = unsatisfiedPerson.nextPerson;
      }

      if (!usedNamesIndexes.has(name)) {
        usedNames.push(name);
        usedNamesIndexes.set(name, index);
      }

      // console.log("usedNames", usedNames);
      // console.log("usedNamesIndexes", usedNamesIndexes);
    }
  }

  if (
    unsatisfiedPerson !== undefined &&
    unsatisfiedPerson.name !== AGENT_NAME
  ) {
    // How did you get here?  You're not supposed to make this request until you've got a log that
    // satisfies all the requisite letters.  Go away.
    res.sendStatus(404);
    return;
  }

  const case_no = usedNames
    .map((name) => {
      const index = usedNamesIndexes.get(name);
      return `${index}`;
    })
    .join("");

  const content = [`DOSSIER #${case_no}`, "", ...usedNames, ""].join("\n");

  res.contentType("text/plain");
  res.setHeader("Content-Disposition", `attachment; filename="case_file.txt"`);
  res.send(content);
  res.end();
};

const router = new Router();
router.post("/speak", expressAsyncHandler(speakHandler));
router.get("/case_file.txt", expressAsyncHandler(caseFileHandler));
export default router;
