import { useRef, useEffect, useReducer } from "react";
import Reveal from "reveal.js";
import { styled } from "styled-components";
import { useInterval } from "usehooks-ts";
import {
  type FermitQuestion,
  type FermitSession,
} from "../../../lib/api/admin_contract";
import { useFermitData } from "../FermitDataProvider";
import { geoguessrLookup } from "../opsdata/desertedNinjaImages";

import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

type TimerData = {
  timeLeft: number;
  running: boolean;
};
type TimerAction = {
  type: "reset" | "start" | "tick";
};

const RevealBox = styled.div`
  border: 1px solid;
  height: 500px;
`;

function RevealContainer({
  children,
  updateTimer,
  session,
}: {
  children: React.ReactNode;
  updateTimer: React.Dispatch<
    React.ReducerAction<React.Reducer<TimerData, TimerAction>>
  >;
  session: FermitSession | null;
}) {
  const deckRef = useRef<Reveal.Api | null>(null);

  useEffect(() => {
    let abortInitialize = false;
    if (deckRef.current === null) {
      deckRef.current = new Reveal({
        embedded: true,
        progress: false,
        overview: false,
        //jumpToSlide: false, // not present in @types/reveal.js, but is present in the reveal package... :/
        controls: false,
        keyboardCondition: "focused",
        navigationMode: "linear",
      });

      deckRef.current.initialize().then(
        () => {
          if (abortInitialize) {
            deckRef.current.destroy();
            return;
          }
          deckRef.current?.addKeyBinding(
            { keyCode: 82, key: "R", description: "Reset timer" },
            () => {
              updateTimer({ type: "reset" });
            },
          );
          deckRef.current?.addKeyBinding(
            { keyCode: 84, key: "T", description: "Start timer" },
            () => {
              updateTimer({ type: "start" });
            },
          );
        },
        () => {
          return null;
        },
      );
    }

    if (deckRef.current.isReady()) {
      deckRef.current.sync();
      deckRef.current.slide(0);
    }

    return () => {
      try {
        abortInitialize = true;
        if (deckRef?.current?.isReady()) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
      }
    }
  }, [session, updateTimer]);

  useInterval(() => {
    updateTimer({ type: "tick" });
  }, 1000);

  return (
    <RevealBox className="reveal">
      <div className="slides">{children}</div>
    </RevealBox>
  );
}

const TimerDiv = styled.div`
  font-size: 200%;
`;
const TimerCornerDiv = styled.div`
  font-size: 200%;
  position: absolute;
  right: 5px;
  bottom: -500px;
  background: rgba(0, 0, 0, 0.5);
`;

function CountdownTimer({
  timer,
  geoguessr,
}: {
  timer: TimerData;
  geoguessr: boolean;
}) {
  const timerElt = (
    <div
      style={{
        color:
          timer.timeLeft === 0
            ? "red"
            : timer.timeLeft < 15
              ? "yellow"
              : "white",
      }}
    >
      0:{timer.timeLeft.toString().padStart(2, "0")}
    </div>
  );

  if (geoguessr) {
    return (
      <TimerCornerDiv className="fragment absolute">{timerElt}</TimerCornerDiv>
    );
  } else {
    return <TimerDiv className="fragment">{timerElt}</TimerDiv>;
  }
}

const SlideH1 = styled.h1`
  text-transform: none !important;
`;

const ErrorSlide = (
  <section>
    <p>Something&rsquo;s gone wrong here</p>
  </section>
);

const RulesSlide = (
  <section>
    <SlideH1>The Rules</SlideH1>
    <p className="fragment">
      I&rsquo;ll show a question on the screen and read it twice.
    </p>
    <p className="fragment">
      Once I&rsquo;m done reading, your team will have 45 seconds to come up
      with your best estimate.
    </p>
    <p className="fragment">
      When time is called, hold up your whiteboard so the scorekeeper can record
      your answer.
    </p>
    <p className="fragment">
      Please don&rsquo;t use your devices! You&rsquo;ll probably get plenty of
      screen time this weekend anyhow.
    </p>
  </section>
);

const GeoguessrRulesSlide = (
  <section key="geoguessr">
    <SlideH1>Rule Update</SlideH1>
    <p className="fragment">This next question is a bit different.</p>
    <p className="fragment">
      You&rsquo;ll be receiving laminated maps of campus.
    </p>
    <p className="fragment">
      I&rsquo;ll show a picture of a location on campus, and you will have 45
      seconds to figure out where the picture was taken from.
    </p>
    <p className="fragment">
      Mark that location with an X or a dot. When time is up, hold it up so the
      scorekeeper can collect them.
    </p>
  </section>
);

const LastSlide = (
  <section key="last">
    <SlideH1>That&rsquo;s it!</SlideH1>
    <p className="fragment">
      Congratulations on finishing the FerMIT Challenge!
    </p>
    <p className="fragment">
      You&rsquo;re all winners (plus or minus a few places).
    </p>
    <p className="fragment">
      You will see your results on the puzzle page shortly. If you would like to
      get clearer results, please contact HQ again and schedule another time to
      play.
    </p>
    <p className="fragment">
      And, if you would like a souvenir to commemorate your participation,
      please come on up and get a sticker before you go.
    </p>
  </section>
);

function QuestionSlide({
  question,
  questionNumber,
  timer,
}: {
  question: FermitQuestion;
  questionNumber: number;
  timer: TimerData;
}) {
  if (question.geoguessr === null) {
    // text question, single slide
    return (
      <section>
        <SlideH1>Question {questionNumber}</SlideH1>
        <p className="fragment">{question.text}</p>
        <CountdownTimer timer={timer} geoguessr={false} />
      </section>
    );
  } else {
    // geoguessr question, two stacked vertical slides
    return (
      <section>
        <section>
          <SlideH1>Question {questionNumber}</SlideH1>
          <p className="fragment">{question.text}</p>
        </section>
        <section
          data-background-image={geoguessrLookup[question.geoguessr - 1]}
        >
          <CountdownTimer timer={timer} geoguessr={true} />
        </section>
      </section>
    );
  }
}

export function FermitPresentation() {
  let contents = null;
  const fermitData = useFermitData();

  const [timer, updateTimer] = useReducer(
    (t: TimerData, { type }: { type: string }) => {
      if (type === "reset") {
        return {
          timeLeft: 45,
          running: false,
        };
      }
      if (type === "start") {
        return {
          timeLeft: t.timeLeft,
          running: true,
        };
      }
      if (type === "tick") {
        if (t.running) {
          if (t.timeLeft <= 1) {
            return {
              timeLeft: 0,
              running: false,
            };
          } else {
            return {
              timeLeft: t.timeLeft - 1,
              running: true,
            };
          }
        } else {
          return t;
        }
      }
      return t;
    },
    {
      timeLeft: 45,
      running: false,
    },
  );

  const session = fermitData.activeSession;

  if (!session) {
    contents = (
      <section>
        <p>Please select a session to present.</p>
      </section>
    );
  } else {
    let firstGeoguessrIndex = -1;
    const questionSlides = session.questionIds.map(
      (questionId: number, index: number) => {
        const question = fermitData.questions.get(questionId);
        if (question) {
          if (firstGeoguessrIndex === -1 && question.geoguessr !== null) {
            firstGeoguessrIndex = index;
          }
          return (
            <QuestionSlide
              question={question}
              questionNumber={index + 1}
              timer={timer}
              key={questionId}
            />
          );
        } else {
          return ErrorSlide;
        }
      },
    );

    contents = (
      <>
        <section>
          <SlideH1>The FerMIT Challenge!</SlideH1>
          <p>{session.title}</p>
        </section>
        {RulesSlide}
        {questionSlides.toSpliced(firstGeoguessrIndex, 0, GeoguessrRulesSlide)}
        {LastSlide}
      </>
    );
  }

  return (
    <RevealContainer updateTimer={updateTimer} session={session}>
      {contents}
    </RevealContainer>
  );
}
