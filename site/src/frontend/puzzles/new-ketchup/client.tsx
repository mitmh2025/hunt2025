import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import { Button } from "../../components/StyledUI";
import { FirstPerson, PUZZLE_ANSWER, type PuzzleStatus } from "./data";

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

  .name {
    color: var(--gold-500);
    padding-right: 0.5rem;
  }

  .you .name {
    color: var(--teal-200);
  }

  hr {
    margin-bottom: 1rem;
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
  const [currentPerson, setCurrentPerson] = useState<Person | Agent>({
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
    }
  }, [log]);

  useEffect(() => {
    const nextLetter =
      PUZZLE_ANSWER.split("")[puzzleStatus.lettersCollected.length];
    const teamSlice = format(teamName).slice(0, 9);
    console.log(puzzleStatus);
    console.log(nextLetter, teamSlice);
    if (nextLetter) {
      const i = teamSlice.split("").indexOf(nextLetter);
      console.log("i", format(teamName), teamSlice.split(""), i);
      if (i !== -1) {
        console.log("wtf");
        setCaseNumber((n) => `${n}${i + 1}`);
        setPuzzleStatus((s) => ({
          ...s,
          lettersCollected: format(`${s.lettersCollected}${nextLetter}`),
        }));
      } else {
        setCaseNumber((n) => `${n}0`);
      }
    } else {
      setCaseNumber((n) => `${n}0`);
    }
  }, [nameLog]);

  const devHandleTalk = () => {
    setTeamName(currentPerson.validAnswers[0] || "");
    handleTalk();
  };

  const handleTalk = () => {
    // first we say hello
    setLog((l) => `${l}<p class="you">${getNameSpan("You")}Hello.</p>`);
    // wrong or right, we collect the name if it's new and so we can see if we get answer stuff out of it
    if (!nameLog.includes(format(teamName))) {
      setNameLog((names) => [...names, format(teamName)]);
    }
    // then we see if it's correct for the current person
    // and update the dialog log accordingly
    const pointer = currentPerson.getPointer(puzzleStatus);
    const name = currentPerson.getName(puzzleStatus);
    const newPuzzleStatus = {
      ...puzzleStatus,
      clueLettersCollected: `${puzzleStatus.clueLettersCollected}${name.slice(0, 1)}`,
    };
    if (currentPerson.validAnswers.includes(format(teamName))) {
      // add acquired clue letter
      setPuzzleStatus((s: PuzzleStatus): PuzzleStatus => {
        return {
          ...s,
          clueLettersCollected: `${s.clueLettersCollected}${name.slice(0, 1)}`,
        };
      });
      // add the success dialog
      setLog(
        (l) =>
          `${l}${currentPerson.getReplySuccessful(name)}${pointer.getDialog(name)}<hr />`,
      );
    } else if (currentPerson.almostAnswers?.includes(format(teamName))) {
      setLog((l) => `${l}<p><i>Not quite...</i></p>`);
    } else {
      setLog((l) => `${l}${currentPerson.getReplyUnsuccessful(name)}`);
    }
    // move to the next person
    if (
      currentPerson.validAnswers.includes(format(teamName)) &&
      pointer &&
      pointer.nextPerson
    ) {
      if (pointer.nextPerson) {
        setCurrentPerson(pointer.nextPerson);
        console.log("about to intro, status: ", newPuzzleStatus);
        setLog((l) => {
          if (pointer.nextPerson?.getName() === "Agent") {
            return `${l}${(pointer.nextPerson as Agent).getIntro((pointer.nextPerson as Agent).getName(newPuzzleStatus), caseNumber, nameLog)}`;
          } else {
            return `${l}${(pointer.nextPerson as Person).getIntro((pointer.nextPerson as Person).getName(newPuzzleStatus))}`;
          }
        });
      }
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
          <div dangerouslySetInnerHTML={{ __html: log }} />
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
        <b>{puzzleStatus.clueLettersCollected}</b>
      </p>
      <p>
        <b>{puzzleStatus.lettersCollected}</b>
      </p>
      <p>
        <b>{caseNumber}</b>
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

export default Puzzle;
