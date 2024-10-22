import { css, styled } from "styled-components";
import {
  BgColor,
  FridgeColor,
} from "../../components/BackgroundCheckPuzzleLayout";
import BackgroundImage from "./assets/background.png";
import FridgeBottom from "./assets/fridge_bottom.png";
import FridgeMiddle from "./assets/fridge_middle.png";
import FridgeTop from "./assets/fridge_top_with_round_title.png";
import FridgeHandle from "./assets/handle.png";
import FridgeHinge from "./assets/hinge.png";

export const Background = styled.div`
  background-image: url(${BackgroundImage});
`;

//const FRIDGE_SEGMENT_INTRINSIC_WIDTH = 1920;
//const FRIDGE_SEGMENT_INTRINSIC_HEIGHT = 1080
const HANDLE_WIDTH = 62;
const HANDLE_HEIGHT = 315;
const HINGE_WIDTH = 57;
const HINGE_HEIGHT = 301;

// min(calc(100vw * 1080 / 1920), 1080px);

// The viewport width is 100vw.
// Our base width shall be min(100vw, 1920px)
// Our base segment height shall be min(calc(100vw / 1920 * 1080), 1080px)
// There shall be one top segment, one bottom segment, and $tiles middle segments
// Thus our actual height shall be calc(min(calc(100vw / 1920 * 1080), 1080px) * (${tiles} + 2))
// Then we can scale things by our desired reduced scale factor if needed

export const SCALED_WIDTH = "max(min(calc(100vw), 1920px), 600px)";
export const SCALED_HEIGHT = `calc(${SCALED_WIDTH} * 1080 / 1920)`;

// It's helpful to have the image/repeat/position/size line up in blocks together
// prettier-ignore
export const Fridge = styled.main<{ $tiles: number }>`
  position: relative;
  width: ${SCALED_WIDTH};
  min-width: 600px;
  max-width: 100%;
  ${({ $tiles }) => css`
    height: calc(${SCALED_HEIGHT} * (${$tiles} + 2));
    min-height: calc(${SCALED_HEIGHT} * (${$tiles} + 2));
  `}
  margin: 0 auto;
  padding: calc(${SCALED_WIDTH} * .15);
  padding-top: calc(${SCALED_HEIGHT} * .45); // Offset farther because of the round logo/label
  text-align: center;
  background-color: ${FridgeColor};
  color: ${BgColor};

  ${({ $tiles }) => css`
    background-image:    url(${FridgeHandle}),                                                                              url(${FridgeHinge}),                                                                             url(${FridgeHinge}),                                                                             url(${FridgeTop}), url(${FridgeBottom}), url(${FridgeMiddle});
    background-repeat:   no-repeat,                                                                                         no-repeat,                                                                                       no-repeat,                                                                                       no-repeat,         no-repeat,            repeat-y;
    background-position: left calc(${SCALED_WIDTH} * (230/1920)) top calc(${SCALED_HEIGHT} * (${$tiles} + 2) * .4),         right calc(${SCALED_WIDTH} * (185/1920)) top calc(${SCALED_HEIGHT} * (${$tiles} + 2) * .1),      right calc(${SCALED_WIDTH} * (185/1920)) bottom calc(${SCALED_HEIGHT} * (${$tiles} + 2) * .1),   left top,          left bottom,          left top;
    background-size:     calc(${SCALED_WIDTH} * (${HANDLE_WIDTH}/1920)) calc(${SCALED_HEIGHT} * (${HANDLE_HEIGHT} / 1080)), calc(${SCALED_WIDTH} * (${HINGE_WIDTH}/1920)) calc(${SCALED_HEIGHT} * (${HINGE_HEIGHT} / 1080)), calc(${SCALED_WIDTH} * (${HINGE_WIDTH}/1920)) calc(${SCALED_HEIGHT} * (${HINGE_HEIGHT} / 1080)), contain,           contain,              contain;
  `}

  a {
    color: ${BgColor};
    text-decoration-color: ${BgColor};
  }
`;
