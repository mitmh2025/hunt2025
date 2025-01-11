import { type Request } from "express";
import React from "react";
import { styled } from "styled-components";
import { Button, TextInput, Wrapper } from "../../components/StyledUI";

export function hackLoginGetHandler(_req: Request) {
  const node = (
    <div>
      <h1>Log in</h1>
      <form method="post">
        <div>
          <label>
            Username:{" "}
            <select name="username">
              <option value="">Select...</option>
              <option value="team">team (no magic)</option>
              <option value="unlockable">
                unlockable (all puzzles unlockable)
              </option>
              <option value="unlocked">
                unlocked (all puzzles unlocked, recommended for validating
                postprod)
              </option>
              <option value="solved">
                solved (all puzzles already solved; beware spoilers!)
              </option>
              <option value="is1">Illegal Search (Stage 1)</option>
              <option value="is2">Illegal Search (Stage 2)</option>
              <option value="is3">Illegal Search (Stage 3)</option>
            </select>
          </label>
        </div>
        <div>
          <input type="hidden" name="password" value="password" />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
  return { node, title: "Login" };
}

const StyledWrapper = styled(Wrapper)`
  margin-top: 2em;
  color: var(--black);
  display: grid;
  grid-template-columns: [outer-start] 1em [mid-start] 1em [inner-start] 1fr [inner-end] 1em [mid-end] 1em [outer-end];
  grid-template-rows: [inner-start] 1em [mid-start] 1em [outer-start] 1fr [outer-end] 1em [mid-end] 1em [inner-end];
`;

const StairOuterLeft = styled.div`
  background-color: var(--white);
  grid-column: outer-start / mid-start;
  grid-row: outer-start / outer-end;
  border-left: 1px solid var(--gold-700);
  border-top: 1px solid var(--gold-700);
  border-bottom: 1px solid var(--gold-700);
`;

const StairOuterRight = styled.div`
  background-color: var(--white);
  grid-column: mid-end / outer-end;
  grid-row: outer-start / outer-end;
  border-right: 1px solid var(--gold-700);
  border-top: 1px solid var(--gold-700);
  border-bottom: 1px solid var(--gold-700);
`;

const StairMidLeft = styled.div`
  background-color: var(--white);
  grid-column: mid-start / inner-start;
  grid-row: mid-start / mid-end;
  border-top: 1px solid var(--gold-700);
  border-bottom: 1px solid var(--gold-700);
`;

const StairMidRight = styled.div`
  background-color: var(--white);
  grid-column: inner-end / mid-end;
  grid-row: mid-start / mid-end;
  border-top: 1px solid var(--gold-700);
  border-bottom: 1px solid var(--gold-700);
`;

const StairMidTop = styled.div`
  background-color: var(--white);
  grid-column: mid-start / mid-end;
  grid-row: outer-start / mid-start;
  border-left: 1px solid var(--gold-700);
  border-right: 1px solid var(--gold-700);
`;

const StairMidBottom = styled.div`
  background-color: var(--white);
  grid-column: mid-start / mid-end;
  grid-row: mid-end / outer-end;
  border-left: 1px solid var(--gold-700);
  border-right: 1px solid var(--gold-700);
`;

const StairInnerTop = styled.div`
  background-color: var(--white);
  grid-column: inner-start / inner-end;
  grid-row: inner-start / mid-start;
  border-left: 1px solid var(--gold-700);
  border-right: 1px solid var(--gold-700);
  border-top: 1px solid var(--gold-700);
`;

const StairInnerBottom = styled.div`
  background-color: var(--white);
  grid-column: inner-start / inner-end;
  grid-row: mid-end / inner-end;
  border-left: 1px solid var(--gold-700);
  border-right: 1px solid var(--gold-700);
  border-bottom: 1px solid var(--gold-700);
`;

const InnerWrapper = styled(Wrapper)`
  grid-column: inner-start / inner-end;
  grid-row: outer-start / outer-end;
  background-color: var(--white);
  display: grid;
  grid-template-columns: [wide-start] 1em [mid-start] 1em [tall-start] 1fr [tall-end] 1em [mid-end] 1em [wide-end];
  grid-template-rows: [tall-start] 1em [mid-start] 1em [wide-start] 1fr [wide-end] 1em [mid-end] 1em [tall-end];
`;

const NoPointerEvents = styled.div`
  pointer-events: none;
`;

const ContentsWrapper = styled.div`
  grid-column: tall-start / tall-end;
  grid-row: wide-start / wide-end;
  padding: 1em 2em;
`;

const GoldBorderTall = styled(NoPointerEvents)`
  grid-area: tall;
  border: 2px solid var(--gold-700);
`;

const GoldBorderMid = styled(NoPointerEvents)`
  grid-area: mid;
  border: 2px solid var(--gold-700);
`;

const GoldBorderWide = styled(NoPointerEvents)`
  grid-area: wide;
  border: 2px solid var(--gold-700);
`;

export function loginGetHandler(_req: Request) {
  const node = (
    <StyledWrapper>
      <InnerWrapper>
        <ContentsWrapper>
          <h1>The Case of the Shadow Diamond</h1>
          <form method="post">
            <div>
              <label htmlFor="username">Username: </label>
              <TextInput
                data-testId="login-username-input"
                type="text"
                name="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <TextInput
                data-testId="login-password-input"
                type="password"
                name="password"
              />
            </div>
            <div>
              <Button data-testId="login-button" type="submit">
                Log in
              </Button>
            </div>
          </form>
        </ContentsWrapper>
        <GoldBorderTall />
        <GoldBorderMid />
        <GoldBorderWide />
      </InnerWrapper>
      <StairOuterLeft />
      <StairOuterRight />
      <StairMidLeft />
      <StairMidRight />
      <StairMidTop />
      <StairMidBottom />
      <StairInnerTop />
      <StairInnerBottom />
    </StyledWrapper>
  );
  return { node, title: "Login" };
}
