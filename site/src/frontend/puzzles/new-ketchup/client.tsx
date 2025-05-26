import React, {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import { fetchPuzzleStateLog } from "../../../../lib/api/archive/log";
import useAppendDataset from "../../client/useAppendDataset";
import { Button } from "../../components/StyledUI";
import { generateCaseFile } from "./logic";
import { type LogEntryData } from "./types";
import { speak } from "@hunt_client/puzzles/what_do_they_call_you";

const Speaker = styled.span`
  color: var(--gold-500);
  padding-right: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SpeakerYou = styled(Speaker)`
  color: var(--teal-200);
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 1rem;
  background-color: var(--gray-900);

  button {
    font-family: "Roboto Mono", monospace;
    font-weight: 300;
  }
`;

const DialogBoxWrapper = styled.div`
  position: relative;
  height: 30rem;
`;

const DialogBox = styled.div`
  overflow-y: scroll;
  height: 30rem;
  padding: 0.25rem 1rem;
  padding-bottom: 3.5rem;
  background-color: var(--black);
  color: var(--white);
  font-family: "Roboto Mono", monospace;
  font-weight: 300;
  margin-top: 1rem;
  position: relative;

  p {
    margin: 0.5rem 0;
  }

  b,
  strong {
    font-weight: bold;
  }

  i,
  em {
    font-style: italic;
  }

  .what-do-they-call-you-link {
    color: var(--gold-500);
  }

  .stage-direction {
    color: var(--gray-200);
  }

  .the-end {
    display: block;
    text-align: center;
    margin: 0 2rem;
  }
`;

type LogEntry = {
  id: number;
  timestamp: string | number;
  data: LogEntryData;
};

type State = "idle" | "speaking" | "error";

const ROMAN_NAME = "IULIUS";
const INTRO: LogEntry[] = [
  {
    id: -2,
    timestamp: 0,
    data: {
      line: `You start your search with a Roman slave named ${ROMAN_NAME}. He refuses to talk to you.`,
      isYou: false,
    },
  },
  {
    id: -1,
    timestamp: 0,
    data: {
      line: "I will only speak with Spartacus!",
      speaker: ROMAN_NAME,
      isYou: false,
    },
  },
];

function renderLogEntry(entry: LogEntry) {
  const id = entry.id;
  const line = entry.data;
  return (
    <p
      key={`line-${line.line.replace(/[^a-zA-Z0-9]/g, "")}-${id}`}
      className={!line.speaker ? "stage-direction" : ""}
    >
      {line.isYou ? (
        <SpeakerYou>{line.speaker}:</SpeakerYou>
      ) : line.speaker ? (
        <Speaker>{line.speaker}:</Speaker>
      ) : (
        ""
      )}
      <span dangerouslySetInnerHTML={{ __html: line.line }} />
    </p>
  );
}

const RATE_LIMIT_BACKOFF_INTERVAL = 5000; // 5 seconds

const App = () => {
  const log = useAppendDataset(
    "puzzle_state_log",
    { slug: "what_do_they_call_you" },
    [] as LogEntry[],
  );

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [state, setState] = useState<State>("idle");
  const [time, setTime] = useState<number>(Date.now());
  const timerHandle = useRef<number | NodeJS.Timeout | undefined>(undefined);

  const chatEndRef = useRef<HTMLSpanElement | null>(null);

  // #!if TARGET === "client" && ARCHIVE_MODE

  // When we're running in archive mode, we need to intercept the link to the
  // case file and replace it with a data URL because it needs to be generated
  // client-side
  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current
      .querySelectorAll<HTMLAnchorElement>("a.what-do-they-call-you-link")
      .forEach((link) => {
        if (!link.href.endsWith(".txt")) {
          return;
        }

        const dossier = generateCaseFile(fetchPuzzleStateLog());
        if (!dossier) {
          return;
        }

        const blob = new Blob([dossier], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = "case_file.txt";
      });
  }, [log]);

  // #!endif

  const isDone = log.some((entry) => !!entry.data.isDone);
  const handleTalk: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setState("speaking");
    speak()
      .then(() => {
        setState("idle");
        setTime(Date.now());
        console.log("got reply");
      })
      .catch((err: unknown) => {
        setState("error");
        console.log("got error reply", err);
      });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setTime(Date.now());
  }, [log]);

  const logUpdateTime = useMemo(() => {
    const last = log[log.length - 1];
    if (last !== undefined) {
      return new Date(last.timestamp).getTime();
    } else {
      return 0;
    }
  }, [log]);

  const shouldRateLimit = time - logUpdateTime < RATE_LIMIT_BACKOFF_INTERVAL;
  useEffect(() => {
    // If rate limit is blocking speaking again, schedule an update for when we
    // should enable the button again.
    if (shouldRateLimit) {
      const timeout = logUpdateTime + RATE_LIMIT_BACKOFF_INTERVAL - time;
      timerHandle.current = setTimeout(() => {
        setTime(Date.now());
      }, timeout);

      return () => {
        if (timerHandle.current !== undefined) {
          clearTimeout(timerHandle.current);
          timerHandle.current = undefined;
        }
      };
    }
    return undefined;
  }, [time, logUpdateTime, shouldRateLimit, state]);

  const buttonDisabled = isDone || state === "speaking" || shouldRateLimit;

  return (
    <>
      <DialogBoxWrapper>
        <DialogBox ref={dialogRef}>
          {INTRO.map((entry) => renderLogEntry(entry))}
          {log.map((entry) => renderLogEntry(entry))}
          <span ref={chatEndRef} />
        </DialogBox>
        <Bottom>
          <Button onClick={handleTalk} disabled={buttonDisabled}>
            Talk
          </Button>
        </Bottom>
      </DialogBoxWrapper>
    </>
  );
};

const elem = document.getElementById("what-do-they-call-you-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #what-do-they-call-you-root was nowhere to be found",
  );
}
