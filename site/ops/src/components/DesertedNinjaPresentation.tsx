import { useRef, useEffect } from 'react';
import Reveal from 'reveal.js';
import { styled } from "styled-components";
import { type DesertedNinjaSession } from "../../../lib/api/admin_contract";
import 'reveal.js/dist/reveal.css';
import "reveal.js/dist/theme/black.css";

const RevealBox = styled.div`
border: 1px solid;
height: 500px;
`

function RevealContainer({ children }) {
  const deckRef = useRef<Reveal.Api | null>(null);

  useEffect(() => {
    if (deckRef.current === null) {
      deckRef.current = new Reveal({
        embedded: true,
        progress: false,
        jumpToSlide: false,
        overview: false,
        controls: true,
      });
      deckRef.current.initialize();
    }
  }, []);

  useEffect(() => {
    if (deckRef.current !== null && deckRef.current.isReady()) {
      deckRef.current.sync();
      deckRef.current.slide(0);
    }
  }, [children]);
  
  return (
    <RevealBox className="reveal">
      <div className="slides">
        {children}
      </div>
    </RevealBox>
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
  <section>
    <SlideH1>Rule Update</SlideH1>
    <p className="fragment">This next question is a bit different.</p>
    <p className="fragment">You'll be receiving laminated maps of campus.</p>
    <p className="fragment">I'll show a (blurry) picture of a location on campus, and you will have 45 seconds to figure out where the picture was taken from.</p>
    <p className="fragment">Mark that location with an X or a dot.  When time is up, hold it up so the scorekeeper can collect them.</p>
  </section>
);

const SampleQuestionSlide = (
  <section>
    <SlideH1>Question 1</SlideH1>
    <p className="fragment">How many smoots is it from one end of the Infinite Corridor to the other?</p>
  </section>
);

const SampleGeoguessrSlide = (
  <section>
    <SlideH1>Question 2</SlideH1>
    <p className="fragment">Where is this location on campus?</p>
    <p className="fragment">[insert image here]</p>
  </section>
);

export function DesertedNinjaPresentation({ session }: { session: DesertedNinjaSession }) {
  let contents = null;
  if (!session) {
    contents = (
      <section>
        <p>Please select a session to present.</p>
      </section>
    );
  }
  else {
    contents = (
      <>
        <section>
          <SlideH1>The FerMIT Challenge!</SlideH1>
          <p>{session.title}</p>
        </section>
        {RulesSlide}
        {SampleQuestionSlide}
        {GeoguessrRulesSlide}
        {SampleGeoguessrSlide}
      </>
    );
  }
  
  return (
    <RevealContainer className="reveal">
      {contents}
    </RevealContainer>
  );
}
