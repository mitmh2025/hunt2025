import React from "react";
import { styled } from "styled-components";
import { deviceMax } from "../utils/breakpoints";
import { Button } from "./StyledUI";

const ControlWrapper = styled.div`
  margin: 0 0.25rem;
  display: flex;
  align-items: center;

  button {
    font-size: 1.25rem;
    padding: 0 0.25rem 0.125rem 0.25rem;
    margin-right: 0.125rem;
  }

  #volume-slider {
    width: 90px;
    cursor: grab;
  }

  @media ${deviceMax.md} {
    #volume-slider {
      width: auto;
    }
  }

  @media ${deviceMax.sm} {
    #volume-slider {
      width: 60px;
    }
  }
`;

const AudioControls = () => {
  return (
    <ControlWrapper>
      <Button>🔈</Button>{" "}
      <input type="range" min="0" max="1" step="0.01" id="volume-slider" />
    </ControlWrapper>
  );
};

export default AudioControls;
