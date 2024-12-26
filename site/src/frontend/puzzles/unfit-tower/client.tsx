import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";

const AppContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Error = styled.p`
  color: #f00;
`;

const CommandLine = styled.form`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  padding-inline: 8px;
`;

const CommandInput = styled.input`
  flex-grow: 1;
  font-size: 16px;
  border: none;
  background-color: transparent;
  color: #80ff80;
  font-family: Courier, monospace;
  padding-inline: 8px;

  &:focus-visible {
    outline: none;
  }
`;

type NavData = {
  lookId: string;
  talkId?: string;
  northEdge: string;
  southEdge: string;
  eastEdge: string;
  westEdge: string;
  northId?: string;
  southId?: string;
  eastId?: string;
  westId?: string;
};

const App = () => {
  const navigationData = useMemo(() => {
    const content = document.getElementById(
      "maze-of-lies-navdata",
    )?.textContent;
    if (!content) {
      return {} as NavData;
    }

    const parsed = JSON.parse(content) as NavData;
    return parsed;
  }, []);

  const [error, setError] = useState<string | undefined>();
  const [command, setCommand] = useState("");

  const goToRoom = useCallback((id: string, door?: boolean) => {
    const params = new URLSearchParams({ room: id });
    if (door) {
      params.set("door", "1");
    }
    window.location.search = params.toString();
  }, []);

  const navigate = useCallback(
    (direction: string) => {
      if (
        direction !== "north" &&
        direction !== "south" &&
        direction !== "east" &&
        direction !== "west"
      ) {
        setError(`You can't go ${direction} from here.`);
        return;
      }

      const edge = navigationData[`${direction}Edge` as const];
      const id = navigationData[`${direction}Id` as const];

      if (!id) {
        setError(`You can't go ${direction} from here.`);
        return;
      }

      setError(undefined);
      setCommand("");

      goToRoom(id, edge === "door");
    },
    [goToRoom, navigationData],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setError(undefined);

      const clean = command.trim().toLowerCase();
      switch (clean) {
        case "west":
        case "w":
        case "east":
        case "e":
        case "north":
        case "n":
        case "south":
        case "s": {
          let direction = clean.replace(/^go /, "");
          switch (direction) {
            case "w":
              direction = "west";
              break;
            case "e":
              direction = "east";
              break;
            case "n":
              direction = "north";
              break;
            case "s":
              direction = "south";
              break;
          }
          navigate(direction);
          break;
        }
        case "look":
          goToRoom(navigationData.lookId);
          break;
        case "talk":
          if (navigationData.talkId) {
            goToRoom(navigationData.talkId);
          } else {
            setError("There's no one to talk to here.");
          }
          break;
        case "hello":
          setError("Nice to meet you.");
          break;
        case "h":
        case "help":
        case "?":
          setError(
            "There's just three commands you'll need to play this game: GO [direction], LOOK, TALK.",
          );
          break;
        case "go":
          setError("Where do you want to go?");
          break;
        default:
          if (clean.startsWith("go ")) {
            const direction = clean.replace(/^go /, "");
            navigate(direction);
          } else {
            setError(`${command} is not a recognized command.`);
          }
          break;
      }

      setCommand("");
    },
    [command, goToRoom, navigate, navigationData],
  );

  const onCommandChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCommand(e.target.value);
    },
    [],
  );

  const onCommandKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setCommand("");
      }
    },
    [],
  );

  const onCommandFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.target.focus({ preventScroll: true });
    },
    [],
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <AppContainer>
      {error && <Error>{error}</Error>}
      <CommandLine onSubmit={onSubmit}>
        <div>&gt;</div>
        <CommandInput
          ref={inputRef}
          value={command}
          onChange={onCommandChange}
          onKeyDown={onCommandKeyDown}
          onFocus={onCommandFocus}
        />
      </CommandLine>
    </AppContainer>
  );
};

const elem = document.getElementById("maze-of-lies-input-container");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #maze-of-lies-input-container was nowhere to be found",
  );
}
