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
  margin-top: 1em;
  padding: 2em;
  border-radius: 1em;
  background-color: var(--white);
  color: var(--black);
`;

export function loginGetHandler(_req: Request) {
  const node = (
    <StyledWrapper>
      <h1>Log in</h1>
      <form method="post">
        <div>
          <label htmlFor="username">Username: </label>
          <TextInput type="text" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <TextInput type="password" name="password" />
        </div>
        <div>
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </StyledWrapper>
  );
  return { node, title: "Login" };
}
