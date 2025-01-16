import React, { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import useAppendDataset from "../../client/useAppendDataset";
import { AuthorsNote, AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { WebRTCClient } from "../../utils/WebRTCClient";
import { deviceMax, deviceMin } from "../../utils/breakpoints";
import start from "./assets/start.png";
import { type ControlRoomServerState, type ControlRoomInfo } from "./types";
import useGameState, { GameActionType } from "./useGameState";
import useReconnectingWebsocket from "./useReconnectingWebsocket";
import { type PuzzleStateLogEntry } from "lib/api/frontend_contract";

const StyledVideo = styled.video`
  width: min(480px, 100%);
  aspect-ratio: 4/3;
  align-content: center;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  gap: 1em;
  justify-content: center;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 7px;
  align-content: stretch;
  justify-content: center;
  gap: 5px;
`;

const Col2 = styled(Box)`
  width: 400px;
  align-content: center;
  flex: 0 1 400px;
`;

const VideoWrapper = styled(Box)`
  width: 480px;
  flex: 0 1 480px;
  border: 3px solid var(--gold-700);
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
  padding: 0px 1rem;
  @media ${deviceMin.lg} {
    flex-basis: ${({ $words }) => Math.ceil($words / 5) * 108}px;
    height: 200px;
  }
  @media ${deviceMax.md} {
    flex-direction: row;
    width: 100%;
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
  @media ${deviceMax.md} {
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
    background-color: var(--gray-300);
    &.chosen {
      color: var(--white);
      background-color: var(--gold-700);
    }
  }
`;

const Display = styled.div`
  font-family: "belanosima", sans-serif;
  border-radius: 2px;
  border: none;
  display: flex;
  justify-content: center;
  font-size: 1.75rem;
  padding: 4px 5px;
  width: 100px;
  color: var(--black);
  background-color: var(--gold-300);
  color: var(--white);
  background-color: var(--gold-700);
`;

const Header = styled.h2`
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

const FinishedTask = styled.li`
  text-decoration: line-through;
`;

const Video = ({ whepUrl }: { whepUrl: string }) => {
  const [webRTCClient, setWebRTCClient] = useState<WebRTCClient | null>(null);

  function attachWebRTCClient(el: HTMLVideoElement | null) {
    if (webRTCClient !== null) {
      return;
    }
    if (el) {
      const client = new WebRTCClient({
        mediaElement: el,
        whepUrl: whepUrl,
        retryForever: true,
        onStateChange: (state) => {
          console.log("webrtc state change", state);
        },
      });
      client.connect();
      setWebRTCClient(client);
    }
  }

  return (
    <StyledVideo
      ref={(el) => {
        attachWebRTCClient(el);
      }}
    />
  );
};

const Game = ({
  info,
  room,
  time,
}: {
  info: ControlRoomInfo;
  room: string;
  time: string;
}) => {
  const [
    {
      started,
      tasks,
      verbs,
      nouns,
      instruction,
      noun,
      verb,
      lastNoun,
      lastVerb,
    },
    dispatch,
  ] = useGameState();

  const onMessage = useCallback(
    (message: string) => {
      const msg = JSON.parse(message) as ControlRoomServerState;
      console.log(msg);
      dispatch({
        type: GameActionType.SET_GAME_STATE,
        state: { ...msg },
      });
    },
    [dispatch],
  );
  const socketRef = useReconnectingWebsocket({
    onMessage,
    wsUrl: info.wsUrl,
  });

  function voteVerb(newVerb: string): void {
    socketRef.current?.send(
      JSON.stringify({
        name: "vote",
        choice: { verb: newVerb },
        old: { noun: lastNoun, verb: lastVerb },
      }),
    );
    dispatch({
      type: GameActionType.VOTE_VERB,
      verb: newVerb,
    });
    setTimeout(() => {
      dispatch({
        type: GameActionType.ENABLE_VERBS,
      });
    }, 5000);
  }

  function voteNoun(newNoun: string): void {
    socketRef.current?.send(
      JSON.stringify({
        name: "vote",
        choice: { noun: newNoun },
        old: { noun: lastNoun, verb: lastVerb },
      }),
    );
    dispatch({
      type: GameActionType.VOTE_NOUN,
      noun: newNoun,
    });
    setTimeout(() => {
      dispatch({
        type: GameActionType.ENABLE_NOUNS,
      });
    }, 5000);
  }

  if (!started) {
    return (
      <FlexWrapper>
        <VideoWrapper>
          <img src={start} alt="Starting soon" />
        </VideoWrapper>
        <Col2>
          <AuthorsNote>
            Please make sure to send your favorite escape room enthusiast to
            room {room} by {new Date(Date.parse(time)).toLocaleString("en-US")}{" "}
            for your scheduled interaction. Other team members should keep an
            eye on this puzzle page when the interaction begins.
          </AuthorsNote>
        </Col2>
      </FlexWrapper>
    );
  }

  if (!socketRef.current?.OPEN) {
    return <FlexWrapper>Loading...</FlexWrapper>;
  }

  return (
    <FlexWrapper>
      <VideoWrapper>
        <Video whepUrl={info.whepUrl} />
      </VideoWrapper>
      <Col2>
        <Header>Tasks</Header>
        <TaskList>
          {tasks.map((task) =>
            task.finished ? (
              <FinishedTask key={task.text}>{task.text}</FinishedTask>
            ) : (
              <li key={task.text}>{task.text}</li>
            ),
          )}
        </TaskList>
        <Header>Your team just told them:</Header>
        <Display>{instruction.verb}</Display> <TheBox>THE</TheBox>{" "}
        <Display>{instruction.noun}</Display>
      </Col2>
      <VoteyWrapper>
        <Header>Send Help</Header>
        <WordsWrapper>
          <WordBox $words={verbs.length}>
            {verbs.map((v) => (
              <Button
                key={v}
                className={verb === v ? "chosen" : ""}
                disabled={verb !== null}
                onClick={() => {
                  voteVerb(v);
                }}
                value={v}
              >
                {v}
              </Button>
            ))}
          </WordBox>
          <TheBox>THE</TheBox>
          <WordBox $words={nouns.length}>
            {nouns.map((n) => (
              <Button
                key={n}
                className={noun === n ? "chosen" : ""}
                disabled={noun !== null}
                onClick={() => {
                  voteNoun(n);
                }}
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

// type PHPuzzleState = {
//   room?: string;
//   time?: string;
//   video?: string;
//   ws?: string;
//   complete: boolean;
// };

const App = ({
  initialPuzzleStateLog,
}: {
  initialPuzzleStateLog: PuzzleStateLogEntry[];
}) => {
  const controlRoomInfo = (
    window as unknown as { controlRoomInfo: ControlRoomInfo }
  ).controlRoomInfo;

  const log = useAppendDataset(
    "puzzle_state_log",
    { slug: "control_room" },
    initialPuzzleStateLog,
  );

  // each log entry contains whole current state, mostly because it's small and makes it easy to undo anything ig :shrug:
  // const { room, time, video, ws, complete }: PHPuzzleState =
  //   log.length === 0
  //     ? { complete: false }
  //     : (log[log.length - 1]!.data as PHPuzzleState);

  if (log.length === 0) {
    // Unscheduled.
    return (
      <FlexWrapper>
        <AuthorsNoteBlock>
          <p>
            This is an in-person interaction and is only available for on-campus
            teams.
          </p>
          <p>
            Someone will be calling shortly to schedule this interaction. If
            this puzzle has been open for longer than 1 hour and you have not
            been contacted, email info@mitmh2025.com for updates.
          </p>
        </AuthorsNoteBlock>
      </FlexWrapper>
    );
  }

  const schedulingMessage = log.findLast(({ data }) => data.time && data.room);

  if (schedulingMessage) {
    const { room, time } = schedulingMessage.data as unknown as {
      room: string;
      time: string;
    };
    return <Game info={controlRoomInfo} room={room} time={time} />;
  }

  return <>lol</>;

  // if (complete) {
  //   return (
  //     <FlexWrapper>
  //       <VideoWrapper></VideoWrapper>
  //       <Col2>This broadcast has ended.</Col2>
  //     </FlexWrapper>
  //   );
  // }
};

const elem = document.getElementById("control-room-root");
if (elem) {
  const initialPuzzleStateLog = (
    window as unknown as { initialPuzzleStateLog: PuzzleStateLogEntry[] }
  ).initialPuzzleStateLog;
  const root = createRoot(elem);
  root.render(<App initialPuzzleStateLog={initialPuzzleStateLog} />);
} else {
  console.error(
    "Could not mount App because #control-room-root was nowhere to be found",
  );
}
