import React from "react";
import audio1 from "./assets/01.mp3";
import audio2 from "./assets/02.mp3";
import audio3 from "./assets/03.mp3";
import audio4 from "./assets/04.mp3";
import audio5 from "./assets/05.mp3";
import audio6 from "./assets/06.mp3";
import audio7 from "./assets/07.mp3";
import audio8 from "./assets/08.mp3";
import audio9 from "./assets/09.mp3";
import audio10 from "./assets/10.mp3";
import audio11 from "./assets/11.mp3";
import audio12 from "./assets/12.mp3";
import audio13 from "./assets/13.mp3";
import captions1 from "./assets/captions01.vtt";
import captions2 from "./assets/captions02.vtt";
import captions3 from "./assets/captions03.vtt";
import captions4 from "./assets/captions04.vtt";
import captions5 from "./assets/captions05.vtt";
import captions6 from "./assets/captions06.vtt";
import captions7 from "./assets/captions07.vtt";
import captions8 from "./assets/captions08.vtt";
import captions9 from "./assets/captions09.vtt";
import captions10 from "./assets/captions10.vtt";
import captions11 from "./assets/captions11.vtt";
import captions12 from "./assets/captions12.vtt";
import captions13 from "./assets/captions13.vtt";

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Although most of it is together, I keep going off key.
      </p>
      <audio controls src={audio1}>
        <track default kind="captions" srcLang="en" src={captions1} />
      </audio>
      <br />
      <audio controls src={audio2}>
        <track default kind="captions" srcLang="en" src={captions2} />
      </audio>
      <br />
      <audio controls src={audio3}>
        <track default kind="captions" srcLang="en" src={captions3} />
      </audio>
      <br />
      <audio controls src={audio4}>
        <track default kind="captions" srcLang="en" src={captions4} />
      </audio>
      <br />
      <audio controls src={audio5}>
        <track default kind="captions" srcLang="en" src={captions5} />
      </audio>
      <br />
      <audio controls src={audio6}>
        <track default kind="captions" srcLang="en" src={captions6} />
      </audio>
      <br />
      <audio controls src={audio7}>
        <track default kind="captions" srcLang="en" src={captions7} />
      </audio>
      <br />
      <audio controls src={audio8}>
        <track default kind="captions" srcLang="en" src={captions8} />
      </audio>
      <br />
      <audio controls src={audio9}>
        <track default kind="captions" srcLang="en" src={captions9} />
      </audio>
      <br />
      <audio controls src={audio10}>
        <track default kind="captions" srcLang="en" src={captions10} />
      </audio>
      <br />
      <audio controls src={audio11}>
        <track default kind="captions" srcLang="en" src={captions11} />
      </audio>
      <br />
      <audio controls src={audio12}>
        <track default kind="captions" srcLang="en" src={captions12} />
      </audio>
      <br />
      <audio controls src={audio13}>
        <track default kind="captions" srcLang="en" src={captions13} />
      </audio>
      <br />
    </>
  );
};

export default Puzzle;
