import React from "react";
import { styled } from "styled-components";
import img_1_1 from "./assets/1-1.png";
import img_1_2 from "./assets/1-2.png";
import img_2_1 from "./assets/2-1.png";
import img_2_2 from "./assets/2-2.png";
import img_2_3 from "./assets/2-3.png";
import img_3_1 from "./assets/3-1.png";
import img_3_2 from "./assets/3-2.png";
import img_4_1 from "./assets/4-1.png";
import img_4_2 from "./assets/4-2.png";
import img_5_1 from "./assets/5-1.png";
import img_5_2 from "./assets/5-2.png";
import img_5_3 from "./assets/5-3.png";
import img_5_4 from "./assets/5-4.png";
import img_6_1 from "./assets/6-1.png";
import img_6_2 from "./assets/6-2.png";
import img_6_3 from "./assets/6-3.png";
import img_7_1 from "./assets/7-1.png";
import img_7_2 from "./assets/7-2.png";
import img_7_3 from "./assets/7-3.png";
import img_8_1 from "./assets/8-1.png";
import img_8_2 from "./assets/8-2.png";
import img_8_3 from "./assets/8-3.png";
import img_9_1 from "./assets/9-1.png";
import img_9_2 from "./assets/9-2.png";
import img_9_3 from "./assets/9-3.png";
import mp3_1 from "./assets/canary1.mp3";
import mp3_2 from "./assets/canary2.mp3";
import mp3_3 from "./assets/canary3.mp3";
import mp3_4 from "./assets/canary4.mp3";
import mp3_5 from "./assets/canary5.mp3";
import mp3_6 from "./assets/canary6.mp3";
import mp3_7 from "./assets/canary7.mp3";
import mp3_8 from "./assets/canary8.mp3";
import mp3_9 from "./assets/canary9.mp3";
import img_notes from "./assets/notes.png";
import img_pause from "./assets/pause.svg";
import img_play from "./assets/play.svg";

const StaveContainerSection = styled.section`
  display: flex;
  background-color: white;

  .button-container {
    flex: 0;
    position: relative;
    align-items: center;
    padding: 46px 4px;
  }

  button {
    display: block;
    height: 22px;
    width: 28px;
    padding: 2px;
    padding-left: 4px;
    background-color: #111;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin: 1px 0;
    &:hover {
      background-color: #444;
      margin-top: -1px;
      margin-bottom: 3px;
      border-bottom: 3px solid black;
    }
  }
  button + button:hover {
    margin-bottom: 2px;
    border-bottom: 2px solid black;
  }
  button img {
    width: 11px;
  }
  button img.pause {
    display: none;
  }
`;

const Stave = styled.div`
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: visible;

  img {
    height: calc(24px * 12);
  }
`;

const ImageSection = styled.section`
  margin-top: 2rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 15px;

  img {
    display: block;
    width: 100%;
    border-radius: 21px;
    box-shadow: 1px 3px 5px #00000033;
  }
`;

const inlineScript = `
  let currentlyPlaying = null;
  let currentlyPlayingIndex = -1;

  function onEnded(id) {
    document.getElementById(\`play-\${id}\`).style.display = "inline";
    document.getElementById(\`pause-\${id}\`).style.display = "none";
  }

  function onButtonClick(id) {
    const audio = document.getElementById(\`sound-\${id}\`);
    if (audio.paused) {
      if (currentlyPlaying && currentlyPlayingIndex !== id) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        document.getElementById(
          \`play-\${currentlyPlayingIndex}\`
        ).style.display = "inline";
        document.getElementById(
          \`pause-\${currentlyPlayingIndex}\`
        ).style.display = "none";
      }
      currentlyPlaying = audio;
      currentlyPlayingIndex = id;
      document.getElementById(\`pause-\${id}\`).style.display = "inline";
      document.getElementById(\`play-\${id}\`).style.display = "none";
      audio.addEventListener("ended", () => onEnded(id));
      audio.play();
    } else {
      audio.pause();
      document.getElementById(\`play-\${id}\`).style.display = "inline";
      document.getElementById(\`pause-\${id}\`).style.display = "none";
    }
  }

  // set up button handlers
  const buttons = document.querySelectorAll(".button-container button");
  let idx = 1;
  for (button of buttons) {
    const buttonIdx = idx;
    const handler = onButtonClick.bind(button, buttonIdx);
    button.onclick = handler;
    idx++;
  }
`;

const Puzzle = () => {
  return (
    <>
      <StaveContainerSection>
        <div className="button-container">
          <button title="Play">
            <img id="play-1" src={img_play} alt="First audio play button" />
            <img
              id="pause-1"
              className="pause"
              src={img_pause}
              alt="First audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-2" src={img_play} alt="Second audio play button" />
            <img
              id="pause-2"
              className="pause"
              src={img_pause}
              alt="Second audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-3" src={img_play} alt="Third audio play button" />
            <img
              id="pause-3"
              className="pause"
              src={img_pause}
              alt="Third audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-4" src={img_play} alt="Fourth audio play button" />
            <img
              id="pause-4"
              className="pause"
              src={img_pause}
              alt="Fourth audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-5" src={img_play} alt="Fifth audio play button" />
            <img
              id="pause-5"
              className="pause"
              src={img_pause}
              alt="Fifth audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-6" src={img_play} alt="Sixth audio play button" />
            <img
              id="pause-6"
              className="pause"
              src={img_pause}
              alt="Sixth audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-7" src={img_play} alt="Seventh audio play button" />
            <img
              id="pause-7"
              className="pause"
              src={img_pause}
              alt="Seventh audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-8" src={img_play} alt="Eighth audio play button" />
            <img
              id="pause-8"
              className="pause"
              src={img_pause}
              alt="Eighth audio pause button"
            />
          </button>
          <button title="Play">
            <img id="play-9" src={img_play} alt="Ninth audio play button" />
            <img
              id="pause-9"
              className="pause"
              src={img_pause}
              alt="Ninth audio pause button"
            />
          </button>
        </div>
        <Stave>
          <img src={img_notes} alt="A series of musical notes on a staff" />
        </Stave>
      </StaveContainerSection>
      {/* eslint-disable jsx-a11y/alt-text -- can't label the cards */}
      <ImageSection>
        <StyledTable>
          <tbody>
            <tr>
              <td>
                <img src={img_1_1} />
              </td>
              <td>
                <img src={img_1_2} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_2_1} />
              </td>
              <td>
                <img src={img_2_2} />
              </td>
              <td>
                <img src={img_2_3} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_3_1} />
              </td>
              <td>
                <img src={img_3_2} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_4_1} />
              </td>
              <td>
                <img src={img_4_2} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_5_1} />
              </td>
              <td>
                <img src={img_5_2} />
              </td>
              <td>
                <img src={img_5_3} />
              </td>
              <td>
                <img src={img_5_4} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_6_1} />
              </td>
              <td>
                <img src={img_6_2} />
              </td>
              <td>
                <img src={img_6_3} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_7_1} />
              </td>
              <td>
                <img src={img_7_2} />
              </td>
              <td>
                <img src={img_7_3} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_8_1} />
              </td>
              <td>
                <img src={img_8_2} />
              </td>
              <td>
                <img src={img_8_3} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={img_9_1} />
              </td>
              <td>
                <img src={img_9_2} />
              </td>
              <td>
                <img src={img_9_3} />
              </td>
            </tr>
          </tbody>
        </StyledTable>
      </ImageSection>
      {/* eslint-enable jsx-a11y/alt-text -- done with unlabelable cards */}
      {/* eslint-disable jsx-a11y/media-has-caption -- the media is part of the puzzle */}
      <audio id="sound-1" src={mp3_1} preload="auto" />
      <audio id="sound-2" src={mp3_2} preload="auto" />
      <audio id="sound-3" src={mp3_3} preload="auto" />
      <audio id="sound-4" src={mp3_4} preload="auto" />
      <audio id="sound-5" src={mp3_5} preload="auto" />
      <audio id="sound-6" src={mp3_6} preload="auto" />
      <audio id="sound-7" src={mp3_7} preload="auto" />
      <audio id="sound-8" src={mp3_8} preload="auto" />
      <audio id="sound-9" src={mp3_9} preload="auto" />
      {/* eslint-enable jsx-a11y/media-has-caption -- the media is part of the puzzle */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
    </>
  );
};

export default Puzzle;
