import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import gougingOfEyes from "./assets/gouging-of-eyes.mp3";
import image from "./assets/image.png";
import intermentAndSuffocation from "./assets/interment-and-suffocation.mp3";
import rapidDescents from "./assets/rapid-descents.mp3";
import technologicalSurveillance from "./assets/technological-surveillance.mp3";

const Block = styled.div`
  margin: 1em 0;
`;

const Indent = styled.div`
  margin-left: 32px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        The echoes in the tunnels beneath the institute magnify the sound of
        raised voices—voices chanting like a mass…or a ritual. You run and
        scream and escape, then think back, trying to find some order after the
        awful dread.
      </p>
      <hr />
      <Block>
        <div>Content Warning: Obscured and unnatural faces</div>
        <Indent>
          <a
            href="https://youtube.com/shorts/b2utstouH58"
            target="_blank"
            rel="noreferrer"
          >
            Obscured and unnatural faces
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Anorexia and hemophilia</div>
        <Indent>
          <a
            href="https://youtu.be/aujHdRbkVso"
            target="_blank"
            rel="noreferrer"
          >
            Anorexia and hemophilia
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Extreme heat and flames</div>
        <Indent>
          <a
            href="https://youtu.be/WzJTKfundRo"
            target="_blank"
            rel="noreferrer"
          >
            Extreme heat and flames
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Interment and suffocation</div>
        <Indent>
          {/* eslint-disable-next-line @jsx-a11y/media-has-track -- provided inline below */}
          <audio controls src={intermentAndSuffocation} />
          <details>
            <summary>Transcript: Interment and suffocation</summary>
            <div>
              My name is Oliver Kraft. I am a patient at St. Elizabeth’s
              Hospital in Washington, D.C., and I am probably never gonna get
              out of here while I live. I accept this horror. I am here on the
              point of this knife because of the Grin Man, who most people call
              Strom Sullivan.
            </div>
          </details>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Laceration and mutilation</div>
        <Indent>
          <strong>
            Addendum 3: excerpt from the journal of Alexander Montag
          </strong>
        </Indent>
        <Indent>
          <i>
            My hallucinations have continued; I see people far below on what
            used to be city streets, proceeding with their days as though the
            flooding had never occurred. I see people in the buildings below me,
            through the murky water, staring wide-eyed at dead television
            screens, laughing occasionally before they make their way to their
            waterlogged beds. I fear the loneliness and despair are eating away
            what little sense I ever possessed. Tomorrow I will set off, across
            this new “New York Sea”, to find what remains of humanity on higher
            ground. If I find any others, I pray that they have not seen the
            things that I have. If you have found this journal on the rooftop
            where I left it, well, I hope my recorded measurements of our
            satellites’ orbits help you to stay safe and dry.
          </i>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Rot and insects</div>
        <Indent>
          <a
            href="https://youtu.be/6xrAySGvr-o"
            target="_blank"
            rel="noreferrer"
          >
            Rot and insects
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Perdition</div>
        <Indent>
          <a
            href="https://youtu.be/c1DStbHTxsg"
            target="_blank"
            rel="noreferrer"
          >
            Perdition
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Venomous spiders</div>
        <Indent>
          <a
            href="https://youtube.com/shorts/N4iqd9LU3xc?feature=share"
            target="_blank"
            rel="noreferrer"
          >
            Venomous spiders
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Rapid descents</div>
        <Indent>
          {/* eslint-disable-next-line @jsx-a11y/media-has-track -- provided inline below */}
          <audio controls src={rapidDescents} />
          <details>
            <summary>Transcript: Rapid descents</summary>
            <div>
              You will be greeted by Earl, who will demonstrate how to make
              cherries jubilee, staple dish of pioneers in the early days of
              town. “You feed a goose cherries until it can no longer walk, or
              stand on its own,” Earl explains. “Then, you light the goose on
              fire, until its screams become whimpers. And when it’s finally
              silent, you extinguish the flames. The goose’s blackened flesh is
              full with terror enzymes that are very good for your skin and
              eyes. The red liquid pooling around it is only cherry juice. Only
              viscous cherry juice.” Now, the weather. [acoustic guitar plays]
            </div>
          </details>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Abyssa labyrinths</div>
        <Indent>
          <a
            href="https://youtu.be/wTKMKd_8FoU"
            target="_blank"
            rel="noreferrer"
          >
            Abyssal labyrinths
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Relentless pursuit</div>
        <Indent>
          <a
            href="https://youtu.be/o-jv1XeDj2Q"
            target="_blank"
            rel="noreferrer"
          >
            Relentless pursuit
          </a>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Technological surveillance</div>
        <Indent>
          {/* eslint-disable-next-line @jsx-a11y/media-has-track -- provided inline below */}
          <audio controls src={technologicalSurveillance} />
          <details>
            <summary>Transcript: Technological surveillance</summary>
            The door to the cabin was in splinters. The windowpanes lay like a
            thousand busted prayers on the desecrated floor. Piles of some sort
            of animal scat littered the floor and were smeared across the bare
            walls. What furniture had been in the front room was no longer fit
            for sittin’. Something or someone had torn through this house and
            befouled it. Someone or something had been looking for Sarah Avery.
            Sarah Avery who made the voices in his head practically salivate.
            Sarah Avery who he wouldn’t know if he saw her because her family
            never came to church and had never gotten saved nor baptised. Sarah
            Avery who was just a little girl, and, thankfully, Sarah Avery who
            was not here. Between the voices’ rapturous approval of his presence
            in this place and the yammerin’ of Annie, who honestly could not
            shut up if you paid her good money, the Reverend’s head was about to
            bust.
          </details>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Gouging of eyes</div>
        <Indent>
          {/* eslint-disable-next-line @jsx-a11y/media-has-track -- provided inline below */}
          <audio controls src={gougingOfEyes} />
          <details>
            <summary>Transcript: Gouging of eyes</summary>
            [piano music intro] Sympathetic magic is the lore behind the belief
            that the human body, however temporary and fragile it might be, also
            contains incredible power, and that this power can be transferred to
            others. Rather than extinguishing that power, death can often be the
            key that unlocks its fullest potential. All you need is a human
            corpse, a pressing need, and a very strong stomach. I'm the
            narrator, and this... [long pause] ...is a podcast.
          </details>
        </Indent>
      </Block>
      <Block>
        <div>Content Warning: Missing and abandoned children</div>
        <Indent>
          <a
            href="https://youtu.be/DFf9XAwp2z4"
            target="_blank"
            rel="noreferrer"
          >
            Missing and abandoned children
          </a>
        </Indent>
      </Block>
      <hr />
      <LinkedImage
        src={image}
        alt="A large rectangular grid with rows numbered 1 through 14."
      />
    </>
  );
};

export default Puzzle;
