import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import endImage from "./assets/end.png";
import startImage from "./assets/start.png";
import useAppendDataset from "../../client/useAppendDataset";
import { PuzzleStateLogEntry } from "lib/api/frontend_contract";
import { AuthorsNote, AuthorsNoteBlock } from "../../components/PuzzleLayout";

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  gap: 10px;
  justify-content:center;
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
  font-size:1.1rem;
  color: var(--black);
  background-color: var(--gold-300);
  font-family: "belanosima", sans-serif;
  border-radius:2px;
  border: none;
  &:disabled {
    color: var(--white);
    background-color: var(--gold-700);
  }
}
`

const Col2 = styled(Box)`
  width: 450px;
  align-content: center;
  flex-grow: 5;
`;

const VideoWrapper = styled(Box)`
  width: 480px;
  flex-grow: 1;
`;

const VoteyWrapper = styled(Box)`
  width: 100%;
`;

const TaskList = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`
const WordBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  justify-content: center;
  gap: 7px;
  height: 200px;
  padding: 0px 1rem;
`;

const TheBox = styled.div`
  align-content: center;
  font-family: "belanosima", sans-serif;
  font-size:1.3rem;
  padding: 5px;
`;

const VideoPlaceholder = styled.img`
    width:min(480px, 100%);
    aspect-ratio: 4/3;
    align-content: center;
`;

const Button = styled.button`
  width: 100px;
  padding: 4px 3px;
  font-size:1.1rem;
  color: var(--black);
  background-color: var(--gold-300);
  font-family: "belanosima", sans-serif;
  border-radius:2px;
  border: none;
  &:disabled {
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
`

const FinishedTask = styled.li`
text-decoration: line-through
`
type PHAction = {
    verb?: string;
    noun?: string;
}

type PHTask = {
    text: string;
    finished: boolean;
}

type PHState = {
    tasks: PHTask[];
    verbs: string[];
    nouns: string[];
    action: PHAction;
}

type PHVote = {
    choice: PHAction;
    old: PHAction;
}

type PHMessage = { 
    name: string;
    tasks?: PHTask[];
    verbs?: string[];
    nouns?: string[];
    action?: PHAction;
    video?: string;
};

const initialState: PHState = {
    tasks: [{text: "Open the chest", finished: false}],
    verbs: ["OPEN"],
    nouns: ["CHEST"],
    action: {}
}

const Game = () => {
    const [{tasks, verbs, nouns, action}, setState] = useState(initialState);
    const [choices, setChoices] = useState({} as PHAction);
    const [video, setVideo] = useState("");

    const socketRef = useRef<WebSocket>(null);
  
    useEffect(() => {
      if (socketRef.current == null) {
        socketRef.current = new WebSocket("ws://localhost:8086/ws/1");
      }
  
      const {current: socket} = socketRef;

      // Connection opened
      socket.addEventListener("open", event => {
          console.log("Connection established")
      });
  
      // Listen for messages
      socket.addEventListener("message", event => {
      let msg: PHMessage = JSON.parse(event.data);
      console.log(msg);
      switch (msg.name) {
        case "state":
            setState({tasks: msg.tasks!, verbs: msg.verbs!, nouns: msg.nouns!, action: msg.action!})
            break;
        case "display":
            setState({tasks, verbs, nouns, action: msg.action!})
            break;
        case "tasks":
            setState({tasks: msg.tasks!, verbs, nouns, action})
            break;
        case "video":
            break;
        default:
            break;
      }
      });

      // Connection error
      socket.addEventListener("error", event => {
          socket.send("Connection established")
      });
      
      // Connection closed
      socket.addEventListener("close", event => {
          console.log("Connection closed")
      });
      return () => {
        socket.close();
      };
    }, []);
    
    function updateVote(t: "noun" | "verb", value: string) {
        return (e: React.MouseEvent) => {
            //TODO: implement ~5 second lockout because it's funny
            e.preventDefault();
            switch(t) {
                case "verb":
                    socketRef.current?.send(JSON.stringify({name: "vote", choice: {verb: value}, old: choices}));
                    console.log(t + " " + value);
                    setChoices({verb: value, noun: choices.noun});
                    break;
                case "noun":
                    socketRef.current?.send(JSON.stringify({name: "vote", choice: {noun: value}, old: choices}));
                    console.log(t + " " + value);
                    setChoices({verb: choices.verb, noun: value});
                    break;
            }
        };
    }

  return (
    <FlexWrapper>
      <VideoWrapper>
        <VideoPlaceholder src={startImage}></VideoPlaceholder>
      </VideoWrapper>
      <Col2>
        <Header>Tasks</Header>
        <TaskList>
      {tasks.map((task, i) => ( task.finished ? <FinishedTask>{task.text}</FinishedTask> : <li>{task.text}</li> ))}
        </TaskList>
        <Header>Your team just told them:</Header>
        <Display disabled>{action.verb?? "OPEN"}</Display> <TheBox>THE</TheBox> <Display disabled>{action.noun?? "CHEST"}</Display>
      </Col2>
      <VoteyWrapper>
      <Header>Send Help</Header>
        <WordBox id="ph-verbs">
            {verbs.map((v) => ( <Button disabled={choices.verb === v} onClick={updateVote("verb", v)} value={v}>{v}</Button> ))}
        </WordBox>
        <TheBox>THE</TheBox>
        <WordBox id="ph-nouns">
            {nouns.map((n) => ( <Button disabled={choices.noun === n} onClick={updateVote("noun", n)} value={n}>{n}</Button> ))}
        </WordBox>
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
}

const App = () => {
  const log = useAppendDataset(
    "puzzle_state_log",
    { slug: "control_room" },
    [] as PuzzleStateLogEntry[],
  );
  
  // each log entry contains whole current state, mostly because it's small and makes it easy to undo anything ig :shrug:
  const {room, time, video, ws, complete}: PHPuzzleState = log.length == 0 ? { complete: false } : log[log.length-1]!.data as PHPuzzleState;

  if (complete) {
    return (
      <FlexWrapper>
        <VideoWrapper>
          <VideoPlaceholder src={endImage}></VideoPlaceholder>
        </VideoWrapper>
        <Col2>This broadcast has ended.</Col2>
      </FlexWrapper>
    )
  }
  if (room !== undefined && time !== undefined) {
    if (video !== undefined && ws !== undefined) {
      return <Game />
    }
    return (
      <FlexWrapper>
        <VideoWrapper>
          <VideoPlaceholder src={startImage}></VideoPlaceholder>
        </VideoWrapper>
        <Col2>
        <AuthorsNote>Please make sure to send your favorite escape room enthusiast to room {room} by {time} for your scheduled interaction. Other team members should keep an eye on this puzzle page when the interaction begins.</AuthorsNote>
        </Col2>
    </FlexWrapper>
    )
  }

  return (
    <FlexWrapper>
      <AuthorsNoteBlock>
        <p>This is an in-person interaction and is only available for on-campus teams.</p>
        <p>Someone will be calling shortly to schedule this interaction. If this puzzle has been open for longer than 1 hour and you have not been contacted, email info@mitmh2025.com for updates.</p>
      </AuthorsNoteBlock>
    </FlexWrapper>
  )
}

const elem = document.getElementById("under-control-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #under-control-root was nowhere to be found",
  );
}
