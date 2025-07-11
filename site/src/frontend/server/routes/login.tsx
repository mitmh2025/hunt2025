import { type Request, type Response } from "express";
import React from "react";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import { Alert, Button, TextInput } from "../../components/StyledUI";

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
              <option value="prehunt">
                prehunt (hunt has not started yet)
              </option>
              <option value="team">
                team (hunt has started, but only the starting puzzle drop is
                unlocked)
              </option>
              <option value="unlockable">
                unlockable (all puzzles unlockable)
              </option>
              <option value="unlocked">
                unlocked (all puzzles unlocked, recommended for validating
                postprod)
              </option>
              <option value="dnm-solved">
                solved (all puzzles already solved; beware spoilers!)
              </option>
              <option value="is1">Illegal Search (Stage 1)</option>
              <option value="is2">Illegal Search (Stage 2)</option>
              <option value="is3">Illegal Search (Stage 3)</option>
              <option value="qs1">Quixotic Shoe (Stage 1)</option>
              <option value="qs2">Quixotic Shoe (Stage 2)</option>
              <option value="qs3">Quixotic Shoe (Stage 3)</option>
              <option value="qs4">Quixotic Shoe (Stage 4)</option>
              <option value="public_access">Public Access</option>
              <option value="loadtest1">Load Test 1</option>
              <option value="loadtestearly1">Early Load Test 1</option>
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

export function loginGetHandler(req: Request, res: Response) {
  const login_flash = req.cookies.login_flash as string | undefined;
  res.clearCookie("login_flash");

  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>The Case of the Shadow Diamond</PageTitle>
        </PageHeader>
        <PageMain>
          <form method="post">
            <input type="hidden" name="username" value="public_access" />
            <input type="hidden" name="password" value="public" />
            <Button type="submit">Log in as Public Access</Button>
          </form>
          <br />
          <p>
            Teams that participated in the Hunt can also continue to log in with
            their existing account information:
          </p>
          {login_flash ? (
            <Alert>
              Incorrect username or password. Your team captain should have
              received a confirmation of your team’s username and password in an
              email after they registered. If you’re having trouble, please
              reach out to{" "}
              <a
                href="mailto:info@mitmh2025.com?subject=Login Issues"
                style={{
                  color: "var(--black)",
                  textDecorationColor: "var(--black)",
                }}
              >
                info@mitmh2025.com
              </a>
              .
            </Alert>
          ) : null}
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
        </PageMain>
      </>
    </PageWrapper>
  );
  return { node, title: "Login" };
}
