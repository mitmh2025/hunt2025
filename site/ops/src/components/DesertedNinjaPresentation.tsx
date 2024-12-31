import { useRef, useEffect } from 'react';
import Reveal from 'reveal.js';
import { styled } from "styled-components";
import { type DesertedNinjaSession } from "../../../lib/api/admin_contract";
import 'reveal.js/dist/reveal.css';

const RevealBox = styled.div`
border: 1px solid;
height: 500px;
`

function RevealContainer({ children }) {
  useEffect(() => {
    const deck = new Reveal({
      embedded: true,
      dependencies: [
        { src: 'node_modules/reveal.js-toolbar/toolbar.js' },
      ],
    });
    deck.initialize();
  }, []);
  
  return (
    <RevealBox className="reveal">
      <div className="slides">
        {children}
      </div>
    </RevealBox>
  );
}

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
      <section>
        <p>Title: {session.title}</p>
      </section>
    );
  }
  
  return (
    <RevealContainer className="reveal">
      {contents}
    </RevealContainer>
  );
}
