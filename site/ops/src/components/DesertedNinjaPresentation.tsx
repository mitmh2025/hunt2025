import { useRef, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Reveal from 'reveal.js';
import { styled } from "styled-components";
import { type DesertedNinjaQuestion, type DesertedNinjaSession } from "../opsdata/types.ts";
import 'reveal.js/dist/reveal.css';
import "reveal.js/dist/theme/black.css";

type CountdownTimer = {
  timeLeft: number,
  running: boolean
};

const RevealBox = styled.div`
border: 1px solid;
height: 500px;
`

function RevealContainer({ children, timer, setTimer, session }) {
  const deckRef = useRef<Reveal.Api | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (deckRef.current === null) {
      deckRef.current = new Reveal({
        embedded: true,
        progress: false,
        jumpToSlide: false,
        overview: false,
        controls: false,
        keyboardCondition: 'focused',
        keyboard: {
          82: () => {
            setTimer({
              timeLeft: 45,
              running: false,
            });
          },
          84: () => {
            if (timer.timeLeft > 0) {
              setTimer({
                timeLeft: timer.timeLeft,
                running: true,
              });
            }
          },
        },
      });
      deckRef.current.initialize();

      return () => {
        if (deckRef.current.isReady()) {
          deckRef.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (deckRef.current !== null && deckRef.current.isReady()) {
      deckRef.current.sync();
      deckRef.current.slide(0);
    }
  }, [session]);

  useInterval( () => {
    if (timer.running) {
      if (timer.timeLeft <= 1) {
        setTimer({
          timeLeft: 0,
          running: false,
        });
      }
      else {
        setTimer({
          timeLeft: timer.timeLeft - 1,
          running: true,
        });
      }
    }
  }, 1000);
  
  return (
    <RevealBox className="reveal">
      <div className="slides">
        {children}
      </div>
    </RevealBox>
  );
}

const TimerDiv = styled.div`
  font-size: 200%;
`;

function CountdownTimer( { timer } ) {
  return (
    <TimerDiv className="fragment" style={ {color: (timer.timeLeft == 0 ? "red" : (timer.timeLeft < 15 ? "yellow" : "white")) } }>
      0:{timer.timeLeft.toString().padStart(2, '0')}
    </TimerDiv>
  );
}

const SlideH1 = styled.h1`
  text-transform: none !important;
`

const RulesSlide = (
  <section>
    <SlideH1>The Rules</SlideH1>
    <p className="fragment">I'll show a question on the screen and read it twice.</p>
    <p className="fragment">Once I'm done reading, your team will have 45 seconds to come up with your best estimate.</p>
    <p className="fragment">When time is called, hold up your whiteboard so the scorekeeper can record your answer.</p>
    <p className="fragment">Please don't use your devices!  You'll probably get plenty of screen time this weekend anyhow.</p>
  </section>
);

const GeoguessrRulesSlide = (
  <section key="geoguessr">
    <SlideH1>Rule Update</SlideH1>
    <p className="fragment">This next question is a bit different.</p>
    <p className="fragment">You'll be receiving laminated maps of campus.</p>
    <p className="fragment">I'll show a (blurry) picture of a location on campus, and you will have 45 seconds to figure out where the picture was taken from.</p>
    <p className="fragment">Mark that location with an X or a dot.  When time is up, hold it up so the scorekeeper can collect them.</p>
  </section>
);

function QuestionSlide(
  { question, questionNumber, timer }:
  { question: DesertedNinjaQuestion, questionNumber: number }
) {
  let content = null;
  if (question.imageUrl === null) { // text question
    content = (
      <>
        <p className="fragment">{question.text}</p>
        <CountdownTimer timer={timer} />
      </>
    );
  }
  else { // geoguessr question
    content = (
      <>
        <p className="fragment">{question.text}</p>
        <p className="fragment">{question.imageUrl}</p>
        <CountdownTimer timer={timer} />
      </>
    );
  }
  
  return (
    <section>
      <SlideH1>Question {questionNumber}</SlideH1>
      {content}
    </section>
  );
}

export function DesertedNinjaPresentation(
  { session, questions }: { session: DesertedNinjaSession, questions: DesertedNinjaQuestions[] }
) {
  let contents = null;
  const [timer, setTimer] = useState<CountdownTimer>({
    timeLeft: 45,
    running: false,
  });

  if (!session) {
    contents = (
      <section>
        <p>Please select a session to present.</p>
      </section>
    );
  }
  else {
    let firstGeoguessrIndex = -1;
    const questionSlides = session.questionIds.map(
      (questionId, index) => {
        let question = questions.find( (q) => q.id == questionId );
        if (firstGeoguessrIndex == -1 && question.imageUrl !== null) {
          firstGeoguessrIndex = index;
        }
        return <QuestionSlide
          question={question}
          questionNumber={index + 1}
          timer={timer}
          key={questionId}
        />
      }
    );
    
    contents = (
      <>
        <section>
          <SlideH1>The FerMIT Challenge!</SlideH1>
          <p>{session.title}</p>
        </section>
        {RulesSlide}
        {questionSlides.toSpliced(firstGeoguessrIndex, 0, GeoguessrRulesSlide)}
      </>
    );
  }
  
  return (
    <RevealContainer className="reveal" timer={timer} setTimer={setTimer} session={session}>
      {contents}
    </RevealContainer>
  );
}
