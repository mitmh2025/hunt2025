import React from "react";
import { styled } from "styled-components";
import { lightBgLinkStyles, Wrapper } from "../../../components/StyledUI";

// Overriding global anchor styles here
const StyledWrapper = styled(Wrapper)`
  background-color: var(--white);
  color: var(--black);
  padding: 1em;

  h1,
  h2 {
    text-align: center;
  }

  a {
    ${lightBgLinkStyles}
  }
`;

const InnerWrapper = styled.div`
  border: 3px solid var(--black);
  padding: 1em;
`;

const InnermostWrapper = styled.div`
  border: 1px solid var(--black);
  padding: 2em;
`;

export const AboutWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <StyledWrapper>
      <InnerWrapper>
        <InnermostWrapper>{children}</InnermostWrapper>
      </InnerWrapper>
    </StyledWrapper>
  );
};
