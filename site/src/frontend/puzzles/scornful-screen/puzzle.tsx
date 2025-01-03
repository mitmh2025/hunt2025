import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";

const StyledIframe = styled.iframe`
  margin: 0 auto 1em;
  display: block;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <div>
        <StyledIframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/d8-BQXHspfg"
          title="Where Am I?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <a
        className={COPY_ONLY_CLASS}
        href="https://www.youtube.com/embed/d8-BQXHspfg"
        target="_blank"
        rel="noreferrer"
      >
        [Video link]
      </a>
      <details>
        <summary>Transcript</summary>
        <p>
          [sung] It’s my video vlog / it’s my first video vlog / it’s very good,
          let’s watch!
        </p>
        <p>
          Welcome to my very first travel vlog. I had what they call an
          inauspicious start because I missed my plane. Bye plane! But that’s
          okay. Maybe I can rebook on British Airways? Probably not, because I’m
          not leaving the country! But it seemed appropriate…
        </p>
        <p>
          After that I decided to do what everyone always tells me to do and
          stop and smell the flowers. But then as I was smelling the flowers I
          thought I saw a bee, so I had to get my nerves up because bees are
          both your friend and your enemy, depending on whether you are a
          pollenatable flower or a guy in a big puffy suit taking all their
          honey. You have to BEE aware!
        </p>
        <p>
          Just like bees are industrious I also wanted to see this bit of
          industry that looks a lot like some candy I won years ago at Chuck E
          Cheese along with a fake mustache that continues to pay dividends for
          me when I have to look responsible and mature. Remember: the big
          tickets are in skee-ball!
        </p>
        <p>
          Science and stuff is nothing without arts and stuff to make the
          science and stuff stand out from the arts and stuff. If you have the
          opportunity to go see a big elaborate performance piece, I recommend
          you enjoy the performance and not try to surreptitiously check whether
          or not you have something in your teeth when one of the big mirrors
          gets close to you. The performers do not appreciate it!
        </p>
        <p>
          The natural world is very neat! Sometimes the sun gets blocked out by
          the moon in what scientists call something that’s very neat. I planned
          to watch it from the planetarium but instead watched it from my
          hospital bed thanks to a well-placed window and a very patient nurse.
          Why was I in a hospital bed? Definitely not because I balanced on the
          ledge to get a better shot of the planetarium, THAT’S for sure!
        </p>
        <p>
          A neat trick if you want to see a very popular monument is to go at a
          time when not a lot of other people want to see that monument, and
          then you don’t have to fight through crowds. If you pick your time
          right you have the whole place to yourself!
        </p>
        <p>
          History is full of things like statues and cannons and busts and
          antique firearms. It helps to have them around in equal measure! Is it
          a good idea to have them just sitting there in public for folks to
          walk around? That’s debatable. Was it a good idea for me to stand in
          front of the barrel and start poking it? According to a very annoyed
          park official, it was not.
        </p>
        <p>
          Sometimes you have to respect the sneaky street artists of their time.
          When I was a kid I would write my name in wet cement with my finger
          and it would turn out sloppy and my finger would get a rash and my
          parents would be very mad because they would have to repave the patio.
          This artist managed to sneak into a freshly poured five story
          structure and put all sorts of art and writings on the side of it!
          Hats off to this vandal for doing what I certainly couldn’t do: write
          legibly.
        </p>
        <p>
          And what better way to end than with a trip through time? [humming
          Jurassic Park theme] Of course I’m kidding: we all know that dinosaurs
          aren’t real, but were invented by Stephen Spielberg for his famous
          movie: Ready Player One.
        </p>
        <p>
          Thank you for watching my travel vlog! If you want to get in touch on
          social media, just look up my username on, as you can see—
        </p>
        <p>
          [sung] Thank you for watching my video vlog / I hope you liked it as
          much / as I did making it / it was pretty fun / thank you for watching
          / please like and subscribe!
        </p>
      </details>
    </>
  );
};

export default Puzzle;
