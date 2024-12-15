import React, { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { Button } from "../../components/StyledUI";
import { createRoot } from "react-dom/client";

import {
  FirstPerson,
  Line,
  Person,
  PUZZLE_ANSWER,
  RESERVED_NAMES,
} from "./data";

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
  font-family: monospace;
  margin-top: 1rem;
  position: relative;

  p {
    margin: 0.5rem 0;
  }

  .stage-direction {
    color: var(--gray-200);
  }

  #what-do-they-call-you-dossier {
    margin: 0 auto;
    max-width: fit-content;
    font-family: "Courier New", "Courier", monospace;

    h4 {
      text-align: center;
    }
  }
`;

const Speaker = styled.span`
  color: var(--gold-500);
  padding-right: 0.5rem;
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
    font-family: monospace;
  }
`;

function format(s: string): string {
  return s.toUpperCase().replace(/[^a-zA-Z0-9]/g, "");
}

function getCaseNumber(names: string[]): string {
  let caseNumber = "";
  const answerLetters = PUZZLE_ANSWER.split("");
  names.forEach((name) => {
    const nameSlice = name.slice(0, 9).split("");
    let found = false;
    for (let i = 0; i < nameSlice.length; i++) {
      // if this letter matches the next answer letter
      if (nameSlice[i] === answerLetters[0]) {
        // add index in this name to case number
        found = true;
        caseNumber += `${i + 1}`;
        // advance next answer letter
        answerLetters.shift();
        break;
      }
    }
    if (!found) {
      caseNumber += "0";
    }
  });
  return caseNumber;
}
const DEFAULT_TEAM_NAME = "Death and Mayhem";

const Puzzle = () => {
  const chatEndRef = useRef<HTMLSpanElement | null>(null);

  // current state:
  const [currentPerson, setCurrentPerson] = useState<Person>({
    ...FirstPerson,
  });
  const [teamName, setTeamName] = useState<string>(DEFAULT_TEAM_NAME);

  // accumulated state:
  const [chatLog, setChatLog] = useState<Line[]>([]);
  const [nameLog, setNameLog] = useState<string[]>([format(DEFAULT_TEAM_NAME)]);

  useEffect(() => {
    if (currentPerson.name === "Agent") {
      const caseFile = `
        <div id="what-do-they-call-you-dossier">
          <h4>DOSSIER #${getCaseNumber(nameLog)}</h4>
          <ul>
            ${nameLog.map((name) => `<li>${name}</li>`).join("")}
          </ul>
        </div>
      `;
      setChatLog((l) => [
        ...l,
        ...currentPerson.intro,
        { line: caseFile },
        ...(currentPerson.postCaseFile as Line[]),
      ]);
    } else {
      setChatLog((l) => [...l, ...currentPerson.intro]);
    }
  }, [currentPerson]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleTalk = () => {
    // first we say hello
    setChatLog((l) => [
      ...l,
      { line: "Hello.", speaker: teamName, isYou: true },
    ]);
    const formattedTeamName = format(teamName);
    // wrong or right, we collect the name if it's:
    // 1) new to the log and
    // 2) not needed as an answer (unless it's the answer right now, of course)
    if (
      formattedTeamName &&
      !nameLog.includes(formattedTeamName) &&
      (!RESERVED_NAMES.includes(formattedTeamName) ||
        currentPerson.validAnswers.includes(formattedTeamName))
    ) {
      setNameLog((names) => [...names, format(teamName)]);
    }
    // then we see if it's correct for the current person
    // and update the dialog log accordingly
    if (currentPerson.validAnswers.includes(formattedTeamName)) {
      // say the success condition and add a blank line
      setChatLog((l) => [
        ...l,
        ...currentPerson.replySuccessful,
        { line: "<hr />" },
      ]);
      // move to the next person
      if (currentPerson.nextPerson) {
        setCurrentPerson(currentPerson.nextPerson);
      }
    } else if (currentPerson.almostAnswers?.includes(formattedTeamName)) {
      setChatLog((l) => [...l, { line: "<i>Almost...</i>" }]);
    } else {
      setChatLog((l) => [...l, ...currentPerson.replyUnsuccessful]);
    }
  };

  const devHandleTalk = () => {
    setTeamName(currentPerson.validAnswers[0] || "");
    handleTalk();
  };

  return (
    <>
      <p className="puzzle-flavor">
        Who <strong>is</strong> your new employer, anyway? Billie clearly used
        to have a partner, or the agency wouldn′t be called <strong>2</strong>{" "}
        P.I. Noir. You set out to investigate who Billie′s old partner was and
        what became of them. But to do that, you′re going to have to convince a
        lot of tight-lipped characters to talk to you.
      </p>
      <DialogBoxWrapper>
        <DialogBox>
          {chatLog.map((line, i) => (
            <p
              key={`line-${line.line.replace(/[^a-zA-Z0-9]/g, "")}-${i}`}
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
          ))}
          <span ref={chatEndRef} />
        </DialogBox>
        <Bottom>
          <Button onClick={handleTalk}>Talk</Button>
          <Button onClick={devHandleTalk}>Devmode Talk</Button>
        </Bottom>
      </DialogBoxWrapper>

      <input
        value={teamName}
        onChange={(e) => {
          setTeamName(e.target.value);
        }}
      />
      {/* <ul>
        {nameLog.map((name, i) => (
          <li key={`teamname-${i}-${name}`}>{name}</li>
        ))}
      </ul>
      <p>
        <b>{getCaseNumber(nameLog)}</b>
      </p> */}
    </>
  );
};

const elem = document.getElementById("what-do-they-call-you-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<Puzzle />);
} else {
  console.error(
    "Could not mount Puzzle because #follow-the-rules-root was nowhere to be found",
  );
}
