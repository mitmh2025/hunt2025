import React, { useEffect, useRef, useState /*, { useState }*/ } from "react";
import { styled } from "styled-components";
import { Button } from "../../components/StyledUI";
import { createRoot } from "react-dom/client";
import { FirstPerson, Person, PUZZLE_ANSWER, PuzzleStatus } from "./data";

const DialogBoxWrapper = styled.div`
  position: relative;
  height: 20rem;
`;

const DialogBox = styled.div`
  overflow-y: scroll;
  height: 20rem;
  padding: 0.25rem 1rem;
  padding-bottom: 3.5rem;
  background-color: var(--black);
  color: var(--white);
  font-family: monospace;
  margin-top: 1rem;

  .name {
    color: var(--gold-500);
    padding-right: 1rem;
  }
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
  return s.toUpperCase().replace(/\s/g, "");
}

const Puzzle = () => {
  const chatEndRef = useRef<HTMLSpanElement | null>(null);
  // current state:
  const [currentPerson, setCurrentPerson] = useState<Person>({
    ...FirstPerson,
  });
  const [teamName, setTeamName] = useState<string>("Death and Mayhem");

  // accumulated state:
  const [log, setLog] = useState<string>("");
  const [nameLog, setNameLog] = useState<string[]>([
    format("Death and Mayhem"),
  ]);
  const [puzzleStatus, setPuzzleStatus] = useState<PuzzleStatus>({
    lettersCollected: "",
    clueLettersCollected: "",
  });
  const [caseNumber, setCaseNumber] = useState<string>("");

  useEffect(() => {
    if (log.length === 0) {
      // initialize log with the intro of the first person we meet
      const name = currentPerson.getName(puzzleStatus);
      const intro = currentPerson.getIntro(name);
      setLog(intro);
      updateCaseNumber();
    }
  });

  const updateCaseNumber = () => {
    const nextLetter =
      PUZZLE_ANSWER.split("")[puzzleStatus.lettersCollected.length];
    const teamSlice = format(teamName).slice(0, 9);
    console.log(puzzleStatus);
    console.log(
      nextLetter,
      teamSlice,
      `${puzzleStatus.lettersCollected}${nextLetter}`,
    );
    if (nextLetter) {
      const i = teamSlice.split("").indexOf(nextLetter);
      console.log("i", i);
      if (i !== -1) {
        console.log("wtf");
        setCaseNumber((n) => `${n}${i + 1}`);
        setPuzzleStatus((s) => ({
          ...s,
          lettersCollected: `${s.lettersCollected}${nextLetter}`,
        }));
      } else {
        setCaseNumber((n) => `${n}0`);
      }
    } else {
      setCaseNumber((n) => `${n}0`);
    }
  };

  const handleTalk = () => {
    // wrong or right, we collect the name if it's new and see if we get answer stuff out of it
    if (nameLog.indexOf(format(teamName)) === -1) {
      setNameLog((names) => [...names, format(teamName)]);
      updateCaseNumber();
    }

    const pointer = currentPerson.getPointer(puzzleStatus);
    const name = currentPerson.getName(puzzleStatus);
    // then we see if it's correct for the current person
    // and update the dialog log accordingly
    if (currentPerson.validAnswers.indexOf(format(teamName)) !== -1) {
      // add acquired clue letter
      setPuzzleStatus((s) => ({
        ...s,
        clueLettersCollected: `${s.clueLettersCollected}${name.slice(0, 1)}`,
      }));
      // add the success dialog
      setLog(
        (l) =>
          `${l}<br>${currentPerson.getReplySuccessful(name)}<br>${pointer.getDialog(name)}`,
      );
    } else if (
      currentPerson.almostAnswers &&
      currentPerson.almostAnswers?.indexOf(format(teamName)) !== -1
    ) {
      setLog((l) => `${l}<br><i>Not quite...</i>`);
    } else {
      setLog((l) => `${l}<br>${currentPerson.getReplyUnsuccessful(name)}`);
    }
    // move to the next person
    if (
      currentPerson.validAnswers.indexOf(format(teamName)) !== -1 &&
      pointer &&
      pointer.nextPerson
    ) {
      setCurrentPerson(pointer.nextPerson);
      setLog(
        (l) =>
          `${l}<br><br>${(pointer.nextPerson as Person).getIntro((pointer.nextPerson as Person).getName(puzzleStatus))}`,
      );
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

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
          <p dangerouslySetInnerHTML={{ __html: log }} />
          <span ref={chatEndRef} />
        </DialogBox>
        <Bottom>
          <Button onClick={handleTalk}>Talk</Button>
        </Bottom>
      </DialogBoxWrapper>

      <input value={teamName} onChange={(e) => setTeamName(e.target.value)} />
      <ul>
        {nameLog.map((name, i) => (
          <li key={`teamname-${i}-${name}`}>{name}</li>
        ))}
      </ul>

      <p>
        <b>{puzzleStatus.clueLettersCollected}</b>
      </p>
      <p>
        <b>{puzzleStatus.lettersCollected}</b>
      </p>
      <p>
        <b>{caseNumber}</b>
      </p>
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

export default Puzzle;
