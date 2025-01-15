import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import useAppendDataset from "../../client/useAppendDataset";
import { AuthorsNote, AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { WebRTCClient } from "../../utils/WebRTCClient";
import { type PHAction, type PHGameState, type ControlRoomInfo } from "./types";
import { type PuzzleStateLogEntry } from "lib/api/frontend_contract";
import { deviceMax, deviceMin } from "../../utils/breakpoints";
import room from "./assets/room.jpg";

const Video = ({ whepUrl }: { whepUrl: string }) => {
  const el = useRef<HTMLVideoElement>(null);
  const client = useRef<WebRTCClient | null>(null);

  useEffect(() => {
    if (client.current) {
      return;
    }

    if (el.current !== null) {
      client.current = new WebRTCClient({
        mediaElement: el.current,
        whepUrl: whepUrl,
        retryForever: true,
        onStateChange: (state) => {
          console.log("webrtc state change", state);
        },
      });

      client.current.connect();
    }
  }, [el, whepUrl]);

  return <video ref={el} />;
};

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  gap: 1em;
  justify-content: center;
  width: 100%;
`;

const NounsAndVerbsWrapper = styled.div`
  display: flex;
  width: 100%;
  @media ${deviceMax.sm} {
    flex-direction: column;
  }
`;

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 7px;
  align-content: stretch;
  justify-content: center;
  gap: 5px;
  & button {
    width: 100px;
    padding: 4px 3px;
    font-size: 1.1rem;
    color: var(--black);
    background-color: var(--gold-300);
    font-family: "belanosima", sans-serif;
    border-radius: 2px;
    border: none;
    &:disabled {
      color: var(--white);
      background-color: var(--gold-700);
    }
  }
`;

const Col2 = styled(Box)`
  width: 400px;
  align-content: center;
  flex: 0 1 400px;
`;

const VideoWrapper = styled(Box)`
  width: 480px;
  flex: 0 1 480px;
  img {
    width: 100%;
  }
`;

const VoteyWrapper = styled(Box)`
  width: 100%;
`;

const TaskList = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`;

const WordBox = styled.div<{ $words: number }>`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  justify-content: center;
  gap: 0.5rem;
  height: 200px;
  padding: 0px 1rem;
  @media ${deviceMin.lg} {
    flex-basis: ${({ $words }) => Math.ceil($words / 5) * 108}px;
  }
  @media ${deviceMax.md} {
    flex-direction: row;
    flex-basis: ${({ $words }) => Math.ceil($words / 3) * 37}px;
  }
  &:first-child {
    align-content: flex-end;
    @media ${deviceMax.md} {
      align-content: center;
    }
  }
  &:last-child {
    align-content: flex-start;
    @media ${deviceMax.md} {
      align-content: center;
    }
  }
`;

const TheBox = styled.div`
  flex: 0 0 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "belanosima", sans-serif;
  font-size: 1.3rem;
  padding: 5px;
  @media ${deviceMax.sm} {
    align-self: center;
  }
`;

const WordsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  @media ${deviceMax.sm} {
    flex-direction: column;
  }
`;

const VideoPlaceholder = styled.img`
  width: min(480px, 100%);
  aspect-ratio: 4/3;
  align-content: center;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100px;
  padding: 4px 3px;
  font-size: 1.1rem;
  color: var(--black);
  background-color: var(--gold-300);
  font-family: "belanosima", sans-serif;
  border-radius: 2px;
  border: none;
  &:disabled {
    cursor: not-allowed;
    color: var(--white);
    background-color: var(--gold-700);
  }
`;

const Display = styled(Button)`
  font-size: 1.75rem;
  padding: 4px 5px;
  width: 170px;
`;

const Header = styled.h2`
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

const FinishedTask = styled.li`
  text-decoration: line-through;
`;

const initialState: PHGameState = {
  started: false,
};

const Game = ({ info }: { info: ControlRoomInfo }) => {
  const [state, setState] = useState<PHGameState>(initialState);
  const [noun, setNoun] = useState<string | null>(null);
  const [verb, setVerb] = useState<string | null>(null);
  const [choices, setChoices] = useState({} as PHAction);
  const [wsOpen, setWsOpen] = useState(false);
  const [isInRetryWsTimeout, setIsInRetryWsTimeout] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isInRetryWsTimeout) {
      return;
    }

    const client = new WebSocket(info.wsUrl);
    if (socketRef.current === null) {
      socketRef.current = client;
    }

    // Connection opened
    client.addEventListener("open", (_) => {
      console.log("Connection established");
      setWsOpen(true);
    });

    // Listen for messages
    client.addEventListener("message", (event) => {
      const msg: PHGameState = JSON.parse(event.data);
      console.log(msg);
      setState(msg);
    });

    // Connection error
    client.addEventListener("error", (event) => {
      console.log("Connection error", event);
      setWsOpen(false);
      setIsInRetryWsTimeout(true);
      setTimeout(() => {
        setIsInRetryWsTimeout(false);
      }, 5000);
    });

    // Connection closed
    client.addEventListener("close", (event) => {
      console.log("Connection closed", event);
      if (!socketRef.current) {
        // component unmounted, don't try to retry
        return;
      }
      setWsOpen(false);
      setIsInRetryWsTimeout(true);
      setTimeout(() => {
        setIsInRetryWsTimeout(false);
      }, 5000);
    });
    return () => {
      socketRef.current = null;
      client.close();
    };
  }, [info.wsUrl, isInRetryWsTimeout]);

  function updateVote(t: "noun" | "verb", value: string) {
    return (e: React.MouseEvent) => {
      //TODO: implement ~5 second lockout because it's funny
      e.preventDefault();
      switch (t) {
        case "verb":
          socketRef.current?.send(
            JSON.stringify({
              name: "vote",
              choice: { verb: value },
              old: { noun, verb },
            }),
          );
          console.log(t + " " + value);
          setVerb(value);
          setTimeout(() => {
            setVerb(null);
          }, 5000);
          break;
        case "noun":
          socketRef.current?.send(
            JSON.stringify({
              name: "vote",
              choice: { noun: value },
              old: { noun, verb },
            }),
          );
          console.log(t + " " + value);
          setNoun(value);
          setTimeout(() => {
            setNoun(null);
          }, 5000);
          break;
      }
    };
  }

  if (!state.started) {
    return (
      <FlexWrapper>
        <VideoWrapper></VideoWrapper>
        <Col2>This interaction is not currently active.</Col2>
      </FlexWrapper>
    );
  }

  return (
    <FlexWrapper>
      <VideoWrapper>
        {/* <Video whepUrl={info.whepUrl} /> */}
        <img src={room} alt="lol" />
      </VideoWrapper>
      <Col2>
        <Header>Tasks</Header>
        <TaskList>
          {state.tasks.map((task, i) =>
            task.finished ? (
              <FinishedTask key={task.text}>{task.text}</FinishedTask>
            ) : (
              <li key={task.text}>{task.text}</li>
            ),
          )}
        </TaskList>
        <Header>Your team just told them:</Header>
        <Display disabled>{state.action.verb}</Display> <TheBox>THE</TheBox>{" "}
        <Display disabled>{state.action.noun}</Display>
      </Col2>
      <VoteyWrapper>
        <Header>Send Help</Header>
        <WordsWrapper>
          <WordBox $words={state.verbs.length}>
            {state.verbs.map((v) => (
              <Button
                key={v}
                disabled={verb === v}
                onClick={updateVote("verb", v)}
                value={v}
              >
                {v}
              </Button>
            ))}
          </WordBox>
          <TheBox>THE</TheBox>
          <WordBox $words={state.nouns.length}>
            {state.nouns.map((n) => (
              <Button
                key={n}
                disabled={noun === n}
                onClick={updateVote("noun", n)}
                value={n}
              >
                {n}
              </Button>
            ))}
          </WordBox>
        </WordsWrapper>
      </VoteyWrapper>
    </FlexWrapper>
  );
};

type PHPuzzleState = {
  room?: string;
  time?: string;
  video?: string;
  ws?: string;
  complete: boolean;
};

const App = () => {
  const controlRoomInfo = (
    window as unknown as { controlRoomInfo: ControlRoomInfo }
  ).controlRoomInfo;

  return <Game info={controlRoomInfo} />;

  const log = useAppendDataset(
    "puzzle_state_log",
    { slug: "control_room" },
    [] as PuzzleStateLogEntry[],
  );

  // each log entry contains whole current state, mostly because it's small and makes it easy to undo anything ig :shrug:
  const { room, time, video, ws, complete }: PHPuzzleState =
    log.length === 0
      ? { complete: false }
      : (log[log.length - 1]!.data as PHPuzzleState);

  if (complete) {
    return (
      <FlexWrapper>
        <VideoWrapper></VideoWrapper>
        <Col2>This broadcast has ended.</Col2>
      </FlexWrapper>
    );
  }
  if (room !== undefined && time !== undefined) {
    return (
      <FlexWrapper>
        <VideoWrapper></VideoWrapper>
        <Col2>
          <AuthorsNote>
            Please make sure to send your favorite escape room enthusiast to
            room {room} by {time} for your scheduled interaction. Other team
            members should keep an eye on this puzzle page when the interaction
            begins.
          </AuthorsNote>
        </Col2>
      </FlexWrapper>
    );
  }

  return (
    <FlexWrapper>
      <AuthorsNoteBlock>
        <p>
          This is an in-person interaction and is only available for on-campus
          teams.
        </p>
        <p>
          Someone will be calling shortly to schedule this interaction. If this
          puzzle has been open for longer than 1 hour and you have not been
          contacted, email info@mitmh2025.com for updates.
        </p>
      </AuthorsNoteBlock>
    </FlexWrapper>
  );
};

const elem = document.getElementById("control-room-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #control-room-root was nowhere to be found",
  );
}
