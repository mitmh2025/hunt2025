import React from "react";
import { styled, createGlobalStyle } from "styled-components";
import Caveat from "./assets/Caveat-Regular.ttf";

const Fonts = createGlobalStyle`
  @font-face {
    font-family: "Caveat";
    src: url(${Caveat});
    font-weight: normal;
    font-style: normal;
  }
`;

const FontParagraph = styled.p`
  font-family: "Caveat";
  font-size: 20px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Fonts />
      <FontParagraph>
        Once again I have soiled my chance to put a father in my cap, so my
        steak continues and my mood is quite sombre. These days British
        detectives such as myself are often called upon by chef inspectors in
        the Netherlands, and I found myself working a most fantastic kidnapping
        and murder case involving the barn in Amsterdam. Edgar Allan Poe
        couldn’t have assembled a stranger breath of personalities; even the
        Shah was there - Mohammad Reza Pahlavi. Count on me to gather the entire
        cat of suspects together for maximum drama, just like in my favourite
        stories. Ordinarily (well, sometimes), I would case a few more leads and
        eliminate any personal bases, but I thought I was already holing all the
        cards, so perhaps I was overly precipitous in driving a theory and
        convening everybody. Ingeniously, while they all sat rapt with
        attention, I produced the stunning, decisive evidence - that the Ming
        vase was, in fact, a replica. Goodness knows they cured me but somehow I
        kept my pose and handed their vitriol gracefully!
      </FontParagraph>
      <FontParagraph>
        Surly I could not have known that the baron himself was making vases for
        the price, providing a perfect alibi. Lethargy is overcoming me now, so
        I will wrap up this, ahem, postmortem. The mistaken accusation (it sings
        for the baron to call it false) was entirely reasonable, I thought,
        given the vase and the stipulated ransom. One day perhaps we’ll look
        back at that ridiculous scene and the ensuing sandal and laugh together
        over a pint. Restitution might be necessary first, though, as rather
        than tanks, I earned the entire royal family’s animus. Lessons learned:
        not every case can have a sensational revel and a spectacular ending.
        Ostentatious explanations are just my nature I suppose, but I must keep
        tying to retrain myself and review my notes to find everything that is
        missing!
      </FontParagraph>
    </>
  );
};

export default Puzzle;
