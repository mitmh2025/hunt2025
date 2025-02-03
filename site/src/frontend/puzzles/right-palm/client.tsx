import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import rootUrl from "../../utils/rootUrl";
import { type Outputs, type Color, Display } from "./shared";

type NineNumberArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

type InputIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px;
`;

const StyledInputButton = styled.button<{ $bgcolor: Color }>`
  background-color: ${({ $bgcolor }) => $bgcolor};
  width: 80px;
  height: 80px;
`;

const InputButton = ({
  state,
  index,
  onClick,
}: {
  state: number;
  index: InputIndex;
  onClick: (index: InputIndex) => void;
}) => {
  const onButtonClick = useCallback(() => {
    onClick(index);
  }, [onClick, index]);
  const bgcolor = ["black", "grey", "white"][state] as Color;
  return <StyledInputButton $bgcolor={bgcolor} onClick={onButtonClick} />;
};

const InputGrid = ({
  inputs,
  onButtonClick,
}: {
  inputs: NineNumberArray;
  onButtonClick: (index: InputIndex) => void;
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <InputButton state={inputs[0]} index={0} onClick={onButtonClick} />
          </td>
          <td>
            <InputButton state={inputs[1]} index={1} onClick={onButtonClick} />
          </td>
          <td>
            <InputButton state={inputs[2]} index={2} onClick={onButtonClick} />
          </td>
        </tr>
        <tr>
          <td>
            <InputButton state={inputs[3]} index={3} onClick={onButtonClick} />
          </td>
          <td>
            <InputButton state={inputs[4]} index={4} onClick={onButtonClick} />
          </td>
          <td>
            <InputButton state={inputs[5]} index={5} onClick={onButtonClick} />
          </td>
        </tr>
        <tr>
          <td>
            <InputButton state={inputs[6]} index={6} onClick={onButtonClick} />
          </td>
          <td>
            <InputButton state={inputs[7]} index={7} onClick={onButtonClick} />
          </td>
          <td>
            <InputButton state={inputs[8]} index={8} onClick={onButtonClick} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Spinner = ({ loading }: { loading: "idle" | "loading" | "error" }) => {
  const label = loading === "idle" ? "" : loading;
  return <FlexRow style={{ width: "80px", height: "80px" }}>{label}</FlexRow>;
};

const ProgressCircle = styled.div<{ $state: number }>`
  border: 2px solid black;
  background-color: ${({ $state }) => ["black", "white"][$state]};
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const ProgressBar = ({ outputs }: { outputs: NineNumberArray }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <ProgressCircle $state={outputs[0]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[1]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[2]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[3]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[4]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[5]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[6]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[7]} />
          </td>
          <td>
            <ProgressCircle $state={outputs[8]} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const AdditionalText = ({ additionalText }: { additionalText: string }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        display: "inline",
        backgroundColor: "white",
        fontFamily: "Consolas,monospace",
        padding: "40px",
        textAlign: "center",
        fontSize: "24px",
        whiteSpace: "pre",
      }}
    >
      {additionalText}
    </div>
  );
};

const App = () => {
  const [inputs, setInputs] = useState<NineNumberArray>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [outputs, setOutputs] = useState<Outputs>([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [additionalText, setAdditionalText] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<"idle" | "loading" | "error">("idle");
  const activeRequest = useRef<Uint8Array | undefined>(undefined);

  const cycleInput = useCallback((index: InputIndex) => {
    setInputs((prevInputs: NineNumberArray) => {
      const nextInputs: NineNumberArray = [...prevInputs];
      nextInputs[index] = (nextInputs[index] + 1) % 3;
      return nextInputs;
    });
  }, []);

  useEffect(() => {
    // Only pay attention to the latest request.
    const requestId = crypto.getRandomValues(new Uint8Array(16));
    activeRequest.current = requestId;
    fetch(`${rootUrl}/puzzles/follow_the_rules/lights`, {
      method: "POST",
      body: JSON.stringify({ inputs }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(
      async (result) => {
        if (activeRequest.current === requestId) {
          if (result.ok) {
            // show result
            const json = (await result.json()) as {
              outputs: Outputs;
              additionalText?: string;
            };
            setOutputs(json.outputs);
            setAdditionalText(json.additionalText);
            setLoading("idle");
          } else {
            console.log("fetch failed :(");
            setLoading("error");
          }
        } else {
          console.log("ignoring response to stale request");
        }
      },
      (rejectReason: unknown) => {
        console.error(rejectReason);
        setLoading("error");
      },
    );
    setLoading("loading");
  }, [inputs]);

  const displayOutputs = outputs.slice(0, 9) as NineNumberArray;
  const progressBarOutputs = outputs.slice(9, 18) as NineNumberArray;
  return (
    <>
      <FlexRow>
        <InputGrid inputs={inputs} onButtonClick={cycleInput} />
        <Spinner loading={loading} />
        <Display outputs={displayOutputs} />
      </FlexRow>
      <FlexRow>
        <ProgressBar outputs={progressBarOutputs} />
      </FlexRow>
      {additionalText ? (
        <FlexRow>
          <AdditionalText additionalText={additionalText} />
        </FlexRow>
      ) : undefined}
    </>
  );
};

const ready =
  (window as unknown as { mswWorkerReady?: Promise<void> }).mswWorkerReady ??
  Promise.resolve();

void ready.then(() => {
  const elem = document.getElementById("follow-the-rules-root");
  if (elem) {
    const root = createRoot(elem);
    root.render(<App />);
  } else {
    console.error(
      "Could not mount App because #follow-the-rules-root was nowhere to be found",
    );
  }
});
