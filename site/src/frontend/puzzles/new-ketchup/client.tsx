import React, {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import useAppendDataset from "../../client/useAppendDataset";
import { Button } from "../../components/StyledUI";
import { type LogEntryData } from "./types";

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
  data: LogEntryData;
};

type State = "idle" | "speaking" | "error" | "backoff";

const ROMAN_NAME = "IULIUS";
const INTRO: LogEntry[] = [
  {
    id: -2,
    data: {
      line: `You start your search with a Roman slave named ${ROMAN_NAME}. He refuses to talk to you.`,
      isYou: false,
    },
  },
  {
    id: -1,
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

const App = () => {
  const log = useAppendDataset(
    "puzzle_state_log",
    { slug: "what_do_they_call_you" },
    [] as LogEntry[],
  );

  const [state, setState] = useState<State>("idle");

  const chatEndRef = useRef<HTMLSpanElement | null>(null);

  const isDone = log.some((entry) => !!entry.data.isDone);
  const handleTalk: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setState("speaking");
    fetch("/puzzles/what_do_they_call_you/speak", {
      method: "POST",
      body: "{}",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setState("idle");
          console.log("got reply");
        } else {
          // TODO: handle rate-limiting
          setState("error");
          console.log("got error, code", res.status, res.body);
        }
      })
      .catch((err: unknown) => {
        setState("error");
        console.log("got error reply", err);
      });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  const buttonDisabled = isDone || state === "speaking" || state === "backoff";

  console.log("log is now", log);

  return (
    <>
      <DialogBoxWrapper>
        <DialogBox>
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
