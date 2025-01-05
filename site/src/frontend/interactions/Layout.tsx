import { styled } from "styled-components";

const WIDTH = 1920;
const HEIGHT = 1080 * 1.25;

export function proportionify(size: number) {
  return `calc(${size} * min(calc(min(100vw, ${WIDTH}px) / ${WIDTH}), calc(min(calc(100vh - 3rem), ${HEIGHT}px) / ${HEIGHT})))`;
}

export const Wrapper = styled.main`
  width: ${proportionify(WIDTH)};
  height: ${proportionify(HEIGHT)};
  margin: 0 auto;
  background-color: var(--true-black);

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

export const Interviewee = styled.img`
  position: absolute;
  height: 100%;
`;

export const UIWrapper = styled.div`
  flex: 0;
  display: flex;
  align-items: stretch;
  min-height: ${proportionify(HEIGHT / 4)};
`;

export const Billie = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  gap: ${proportionify(16)};
  text-align: center;
  min-width: ${proportionify(320)};
  padding: ${proportionify(16)};
  background-color: var(--gold-800);

  .avi {
    flex: 1;
    background-color: var(--gray-500);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  h3 {
    flex: 0;
    padding: 0;
    font-size: max(${proportionify(40)}, 1rem);
    text-transform: uppercase;
    font-weight: normal;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: ${proportionify(16)};

  display: flex;
  flex-direction: column;
`;

export const Scrollback = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${proportionify(8)} ${proportionify(16)};
  background-color: var(--gray-900);
  color: var(--gray-200);

  .current-line {
    color: var(--white);
    font-family: var(--body-font);
    font-weight: 300;
  }

  .speaker {
    font-weight: bold;
  }
`;
