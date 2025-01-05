import { styled } from "styled-components";

const WIDTH = 1920;
const HEIGHT = 648 * 2;

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
  gap: ${proportionify(6)};
  min-height: ${proportionify(HEIGHT / 2)};
  border: ${proportionify(2)} solid var(--gold-400);
`;

export const Billie = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  gap: ${proportionify(16)};
  text-align: center;
  min-width: ${proportionify(360)};
  padding: ${proportionify(16)};
  background-color: var(--nav-bar-bg);
  color: var(--gold-400);
  border-right: ${proportionify(2)} solid var(--gold-400);

  .avi {
    flex: 1;
    background-color: var(--gray-500);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: ${proportionify(4)} solid var(--black);
    box-shadow:
      0 0 0 ${proportionify(4)} var(--gold-400),
      0px ${proportionify(4)} ${proportionify(8)} var(--black);
  }

  h3 {
    flex: 0;
    padding: ${proportionify(16)} 0;
    font-size: max(${proportionify(48)}, 1rem);
    text-transform: uppercase;
    font-weight: normal;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: ${proportionify(12)};

  display: flex;
  flex-direction: column;

  border-left: ${proportionify(2)} solid var(--gold-400);
`;

export const Scrollback = styled.div`
  flex: 1;
  overflow-y: scroll;
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

export const Choices = styled.div`
  flex: 0;
  padding-right: 1rem;
  h4 {
    margin: ${proportionify(8)} ${proportionify(16)};
    font-family: var(--body-font);
  }
  .choice-buttons {
    button {
      margin: ${proportionify(4)} 0;
      width: 100%;
    }
  }
`;
