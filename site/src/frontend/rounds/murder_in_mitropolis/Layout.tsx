import { styled } from "styled-components";

export const WIDTH = 1920;
export const HEIGHT = 1415;

export function proportionify(size: number) {
  return `calc(${size} * min(calc(min(100vw, ${WIDTH}px) / ${WIDTH}), calc(min(calc(100vh - 3rem), ${HEIGHT}px) / ${HEIGHT})))`;
}

export const MurderWrapper = styled.div`
  width: ${proportionify(WIDTH)};
  background-color: var(--teal-700);
  margin: 0 auto;
`;

export const CityWrapper = styled.div`
  background-color: var(--purple-800);
  width: ${proportionify(WIDTH)};
  height: ${proportionify(HEIGHT)};
  position: relative;
  overflow: hidden;

  h1 {
    font-family: "Eccentric";
    font-size: ${proportionify(140)};
    color: var(--purple-300);
    padding: ${proportionify(8)} 0 0 ${proportionify(16)};
  }
`;

export const MurderCityBg = styled.img`
  width: ${proportionify(WIDTH)};
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const MurderWindowComponent = styled.a`
  position: absolute;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;

  & img {
    -webkit-filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);
    filter: brightness(0.8) drop-shadow(1px 3px 8px #00000066);
  }

  &:hover img {
    -webkit-filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);
    filter: brightness(1) drop-shadow(0px 0px 8px #ffffe966);
  }
`;
