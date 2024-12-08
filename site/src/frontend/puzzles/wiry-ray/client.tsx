import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";

const Message = styled.div`
  white-space: pre-line;
`;

const Form = styled.div`
  margin: 1rem 0;
`;

const Error = styled.p`
  color: var(--red-600);
`;

const App = () => {
  const initialMessage = useMemo(() => {
    const content = document.getElementById(
      "deepfrost-initial-state",
    )?.textContent;
    if (!content) {
      return "";
    }

    const parsed = JSON.parse(content) as { message: string };
    return parsed.message;
  }, []);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [command, setCommand] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [haveKey, setHaveKey] = useState(false);
  const [previousCommand, setPreviousCommand] = useState("");
  const [state, setState] = useState<unknown>(undefined);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const submit = useCallback(
    async (command: string) => {
      setLoading(true);
      const response = await fetch("/puzzles/deepfrost/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ command, state }),
      });
      if (!response.ok) {
        setError("An unexpected error occurred.");
        return;
      }

      const {
        message,
        haveKey,
        error,
        previousCommand,
        state: newState,
      } = (await response.json()) as {
        message: string;
        haveKey: boolean;
        error: string | undefined;
        previousCommand: string;
        state: unknown;
      };
      setMessage(message);
      setHaveKey(haveKey);
      setError(error);
      setPreviousCommand(previousCommand);
      setState(newState);
      setLoading(false);
      setCommand("");
      inputRef.current?.focus();
    },
    [state],
  );

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
  }, []);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void submit(command);
    },
    [command, submit],
  );

  return (
    <>
      <Message>{message}</Message>
      <Form>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Input here"
            value={command}
            onChange={onChange}
            disabled={loading}
            ref={inputRef}
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      </Form>
      {previousCommand && <p>Last command: {previousCommand}</p>}
      {error && <Error>Error: {error}</Error>}
      <div>
        <p>Commands:</p>
        <ul>
          <li>NN, NE, EE, SE, SS, SW, WW, NW - Move in that direction.</li>
          <li>SC### - Set the compass to an artifact, for example SC001.</li>
          <li>FD - Search the area for something you are looking for.</li>
          <li>
            KY -{" "}
            {haveKey
              ? "Use a key. Oh hey, you have one!"
              : "Use a key, you don't currently have one though."}
          </li>
          <li>RS - Restart the puzzle and get the SV of your current room.</li>
          <li>
            SV - Display a chain of commands to reach your current location from
            the start.
          </li>
          <li>
            <i>You can also chain commands together, such as NWSSFD.</i>
          </li>
        </ul>
      </div>
    </>
  );
};

const elem = document.getElementById("deepfrost-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #deepfrost-root was nowhere to be found",
  );
}
