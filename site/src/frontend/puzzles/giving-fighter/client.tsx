import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import { chat } from "@hunt_client/puzzles/chatgpt";

const Enumeration = "____ _______ ____ _____ _______ (____ ____)";

type Messagetype = {
  direction: "send" | "recv";
  message: React.ReactNode;
  icon: string;
};

const HistoryContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 30rem;
  overflow-y: auto;
  padding: 1rem 1rem 0;
  margin-bottom: 10px;
`;

const MessageContainer = styled.div<{ $direction: "send" | "recv" }>`
  display: flex;
  flex-direction: ${({ $direction }) =>
    $direction === "send" ? "row" : "row-reverse"};
  align-items: flex-start;
  --speech-color: ${({ $direction }) =>
    $direction === "send" ? "blue" : "red"};
  gap: 0.5rem;

  & .icon {
    font-size: 2rem;
    width: 3rem;
  }

  & .text {
    border: 1px solid var(--speech-color);
    color: var(--speech-color);
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
`;

const Error = styled.p`
  color: var(--red-600);
`;

const EnumerationContainer = styled.div`
  margin: 1rem auto 0;
  justify-content: center;
  display: flex;
  font-size: 1.5em;

  & .word {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

const Message = ({ message }: { message: Messagetype }) => {
  return (
    <MessageContainer $direction={message.direction}>
      <div className="icon">{message.icon}</div>
      <div className="text">{message.message}</div>
    </MessageContainer>
  );
};

const History = ({
  history,
  waiting,
}: {
  history: Messagetype[];
  waiting: boolean;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, waiting]);

  return (
    <HistoryContainer>
      {history.map((msg, i) => (
        <Message key={i} message={msg} />
      ))}
      {waiting && (
        <Message message={{ direction: "recv", message: "...", icon: "❓" }} />
      )}
      <div ref={bottomRef} />
    </HistoryContainer>
  );
};

const App = () => {
  const [history, setHistory] = useState<Messagetype[]>([]);
  const [state, setState] = useState<unknown>();
  const appendHistory = useCallback((m: Messagetype) => {
    setHistory((h) => [...h, m]);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputMessage, setInputMessage] = useState("");
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  }, []);

  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!pending) inputRef.current?.focus();
  }, [pending]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      void (async () => {
        try {
          setPending(true);

          appendHistory({
            direction: "send",
            icon: "🗣",
            message: inputMessage,
          });
          setInputMessage("");

          const {
            response,
            success,
            state: newState,
          } = await chat({ message: inputMessage, state });

          appendHistory({
            direction: "recv",
            icon: success ? "🐱" : "😾",
            message: <span dangerouslySetInnerHTML={{ __html: response }} />,
          });
          setState(newState);
        } catch (err) {
          setErrorMessage("An unexpected error occurred");
          console.error(err);
        } finally {
          setPending(false);
        }
      })();
    },
    [inputMessage, state, appendHistory],
  );

  return (
    <>
      <NotoColorEmojiFont />
      <History history={history} waiting={pending} />
      <Form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          style={{ flexGrow: 1 }}
          value={inputMessage}
          onChange={onChange}
          disabled={pending}
        />
        <button type="submit" disabled={pending}>
          Send
        </button>
      </Form>
      <EnumerationContainer>
        {Enumeration.split(" ").map((w, i) => (
          <span className="word" key={i}>
            {w.split("").join(" ")}
          </span>
        ))}
      </EnumerationContainer>
      {errorMessage && <Error>{errorMessage}</Error>}
    </>
  );
};

const elem = document.getElementById("chatgpt-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #chatgpt-root was nowhere to be found",
  );
}
