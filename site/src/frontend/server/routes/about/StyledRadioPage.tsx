import React from "react";
import { styled } from "styled-components";
import { lightBgLinkStyles, Wrapper } from "../../../components/StyledUI";
import { sizeMin } from "../../../utils/breakpoints";

// Overriding global anchor styles here
const StyledWrapper = styled(Wrapper)`
  background-color: var(--white);
  color: var(--black);
  padding: 1rem;
  width: calc(${sizeMin.md} - 1rem);
  max-width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

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
  padding: 1rem;
`;

const InnermostWrapper = styled.div`
  border: 1px solid var(--black);
  padding: 2rem;
`;

export const RadioWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <StyledWrapper>
      <InnerWrapper>
        <InnermostWrapper>{children}</InnermostWrapper>
      </InnerWrapper>
    </StyledWrapper>
  );
};
