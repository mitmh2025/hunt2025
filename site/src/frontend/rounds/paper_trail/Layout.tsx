import { styled } from "styled-components";
import bg from "./assets/desk-bg.png";

const BG_COLOR = "#272421";

const DeskItem = styled.a`
  position: absolute;
  cursor: pointer;
  -webkit-filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);
  filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);

  .puzzle-name {
    position: absolute;
    left: 0.25rem;
    top: -2.25rem;
    font-size: 1rem;
    font-family: "Kiwi Maru";
    text-align: center;
    line-height: 1.25;
    color: ${BG_COLOR};
    background-color: rgba(115, 147, 93, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    visibility: hidden;
    width: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;

    .name {
      display: flex;
      align-items: center;
    }

    .answer {
      font-weight: bold;
    }
  }

  &:hover {
    -webkit-filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);
    filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);

    .puzzle-name {
      visibility: visible;
    }
  }
`;

export const Desk = styled.div`
  background: url("${bg}");
  background-size: contain;
  background-repeat: no-repeat;
  width: min(100%, 1920px);
  height: min(calc(100vw * 1080 / 1920), 1080px);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

export const Book = styled(DeskItem)`
  bottom: min(calc(100vw * 16 / 1920), 16px);
  left: min(calc(100vw * 540 / 1920), 540px);

  img {
    width: min(calc(100vw * 645 / 1920), 645px);
  }
`;

export const Receipts = styled(DeskItem)`
  top: min(calc(100vw * 600 / 1920), 600px);
  left: 0;

  img {
    width: min(calc(100vw * 378 / 1920), 378px);
  }
`;

export const PencilCup = styled(DeskItem)`
  top: min(calc(100vw * 482 / 1920), 482px);
  right: min(calc(100vw * 230 / 1920), 230px);

  img {
    width: min(calc(100vw * 180 / 1920), 180px);
  }
`;

export const TeaCup = styled(DeskItem)`
  bottom: min(calc(100vw * 10 / 1920), 10px);
  left: min(calc(100vw * 280 / 1920), 280px);

  img {
    width: min(calc(100vw * 246 / 1920), 246px);
  }
`;

export const Cabinet = styled(DeskItem)`
  top: min(calc(100vw * 24 / 1920), 24px);
  right: 0;

  img {
    width: min(calc(100vw * 355.5 / 1920), 355.5px);
  }

  .puzzle-name {
    left: 0.5rem;
    top: -0.5rem;
  }
`;

export const Phone = styled(DeskItem)`
  bottom: 0;
  right: 0;

  img {
    width: min(calc(100vw * 329 / 1920), 329px);
  }
`;

export const Pen = styled(DeskItem)`
  left: min(calc(100vw * 702 / 1920), 702px);
  top: min(calc(100vw * 600 / 1920), 600px);

  img {
    width: min(calc(100vw * 308 / 1920), 308px);
  }
`;

export const Eraser = styled(DeskItem)`
  left: min(calc(100vw * 140 / 1920), 140px);
  bottom: min(calc(100vw * 2 / 1920), 2px);

  img {
    width: min(calc(100vw * 145 / 1920), 145px);
  }
`;

export const Glasses = styled(DeskItem)`
  left: min(calc(100vw * 682 / 1920), 682px);
  top: min(calc(100vw * 690 / 1920), 690px);

  img {
    width: min(calc(100vw * 320 / 1920), 320px);
  }
`;

export const Clock = styled(DeskItem)`
  top: min(calc(100vw * 75 / 1920), 75px);
  left: min(calc(100vw * 1180 / 1920), 1180px);

  img {
    width: min(calc(100vw * 259 / 1920), 259px);
  }
`;

export const Crumpled = styled(DeskItem)`
  left: min(calc(100vw * 520 / 1920), 520px);
  top: min(calc(100vw * 530 / 1920), 530px);

  img {
    width: min(calc(100vw * 150 / 1920), 150px);
  }
`;

export const Chips = styled(DeskItem)`
  right: min(calc(100vw * 400 / 1920), 400px);
  top: min(calc(100vw * 410 / 1920), 410px);

  img {
    width: min(calc(100vw * 291 / 1920), 291px);
  }
`;

export const Sandwich = styled(DeskItem)`
  right: 0;
  top: min(calc(100vw * 480 / 1920), 480px);

  img {
    width: min(calc(100vw * 280 / 1920), 280px);
  }
`;

export const Fly = styled(DeskItem)`
  right: min(calc(100vw * 420 / 1920), 420px);
  top: min(calc(100vw * 300 / 1920), 300px);

  &:hover {
    -webkit-filter: drop-shadow(0px 0px 9px #ffffefaa);
    filter: drop-shadow(0px 0px 9px #ffffefaa);
  }

  img {
    width: min(calc(100vw * 333 / 1920), 333px);
  }
`;

export const OldFashioned = styled(DeskItem)`
  bottom: min(calc(100vw * 20 / 1920), 20px);
  right: min(calc(100vw * 380 / 1920), 380px);

  img {
    width: min(calc(100vw * 180 / 1920), 180px);
  }
`;

export const Tie = styled(DeskItem)`
  bottom: 0;
  right: min(calc(100vw * 345 / 1920), 345px);

  img {
    width: min(calc(100vw * 500 / 1920), 500px);
  }
`;

export const Coffee = styled(DeskItem)`
  top: min(calc(100vw * 584 / 1920), 584px);
  right: min(calc(100vw * 640 / 1920), 640px);
  visibility: visible;

  img {
    width: min(calc(100vw * 930 / 1920), 930px);
  }

  .puzzle-name {
    position: absolute;
    left: auto;
    right: 0.25rem;
    top: -2.25rem;
  }
`;

export const Bottle = styled(DeskItem)`
  left: 0;
  top: min(calc(100vw * 124 / 1920), 124px);

  img {
    width: min(calc(100vw * 152 / 1920), 152px);
  }
`;

export const Meta1 = styled(DeskItem)`
  left: min(calc(100vw * 160 / 1920), 160px);
  top: min(calc(100vw * 70 / 1920), 70px);

  img {
    width: min(calc(100vw * 168 / 1920), 168px);
  }
`;
export const Meta2 = styled(DeskItem)`
  left: min(calc(100vw * 285 / 1920), 285px);
  top: min(calc(100vw * 165 / 1920), 165px);

  img {
    width: min(calc(100vw * 142 / 1920), 142px);
  }
`;
export const Meta3 = styled(DeskItem)`
  left: min(calc(100vw * 390 / 1920), 390px);
  top: min(calc(100vw * 35 / 1920), 35px);

  img {
    width: min(calc(100vw * 151 / 1920), 151px);
  }

  .puzzle-name {
    top: -0.5rem;
  }
`;
export const Meta4 = styled(DeskItem)`
  left: min(calc(100vw * 504 / 1920), 504px);
  top: min(calc(100vw * 55 / 1920), 55px);

  img {
    width: min(calc(100vw * 169 / 1920), 169px);
  }

  .puzzle-name {
    top: -0.5rem;
  }
`;
export const Meta5 = styled(DeskItem)`
  left: min(calc(100vw * 588 / 1920), 588px);
  top: min(calc(100vw * 80 / 1920), 80px);

  img {
    width: min(calc(100vw * 184 / 1920), 184px);
  }
`;
export const Meta6 = styled(DeskItem)`
  left: min(calc(100vw * 670 / 1920), 670px);
  top: min(calc(100vw * 94 / 1920), 94px);

  img {
    width: min(calc(100vw * 212 / 1920), 212px);
  }
`;
export const Meta7 = styled(DeskItem)`
  left: min(calc(100vw * 744 / 1920), 744px);
  top: min(calc(100vw * 122 / 1920), 122px);

  img {
    width: min(calc(100vw * 252 / 1920), 252px);
  }
`;
export const Meta8 = styled(DeskItem)`
  left: min(calc(100vw * 820 / 1920), 820px);
  top: min(calc(100vw * 164 / 1920), 164px);

  img {
    width: min(calc(100vw * 325 / 1920), 325px);
  }
`;

export const Loupe = styled(DeskItem)`
  left: min(calc(100vw * 230 / 1920), 210px);
  top: min(calc(100vw * 558 / 1920), 558px);

  img {
    width: min(calc(100vw * 280 / 1920), 280px);
  }
`;

export const Root = styled.div`
  background-color: ${BG_COLOR};
`;
