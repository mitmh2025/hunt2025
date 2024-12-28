import React /*, { useState }*/ from "react";
import { styled } from "styled-components";
import { Button } from "../../components/StyledUI";

const Wrapper = styled.div`
  background-color: var(--black);
  color: var(--white);
  font-family: "Roboto Mono", monospace;
  margin-top: 1rem;

  button {
    font-family: "Roboto Mono", monospace;
  }
`;

const DialogBox = styled.div`
  overflow-y: scroll;
  height: 20rem;
  padding: 0.25rem 1rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 1rem;
  background-color: var(--gray-900);
`;

// const STEPS = [
//   "You start your search with a Roman aristocrat named IULIA.",
//   'She refuses to talk to you. "I will only speak with Spartacus!"',
//   '"Ah, Spartacus. You seek this person? I do not know where he is now, but I know he took dance lessons at a dance studio nearby."',
// ];

const Puzzle = () => {
  // const [step, setStep] = useState(0);

  // const [prevSteps, setPrevSteps] = useState<string[]>([]);

  const handleTalk = () => {
    // if (STEPS[step] && STEPS[step + 1]) {
    //   setPrevSteps([...prevSteps, STEPS[step]]);
    //   setStep(step + 1);
    // }
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
      <Wrapper>
        <DialogBox>
          {/* {prevSteps.map((s) => (
            <p>{s}</p>
          ))} */}
          <p>Hello world</p>
        </DialogBox>
        <Bottom>
          <Button onClick={handleTalk}>Talk</Button>
        </Bottom>
      </Wrapper>
    </>
  );
};

export default Puzzle;
