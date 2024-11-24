import React from "react";
import { LabeledInputWithError } from "../../components/StyledUI";
import RegsiteWrapper from "../RegsiteWrapper";

export default function LogIn({
  error,
  username,
}: {
  error?: string;
  username?: string;
}) {
  return (
    <RegsiteWrapper>
      <div className="container">
        <h2>Log Back In</h2>
        {error && <p>{error}</p>}
        <form method="post">
          <LabeledInputWithError
            label="Username"
            name="username"
            value={username}
          />

          <LabeledInputWithError label="Password" name="password" />

          <button type="submit">Log In</button>
        </form>
      </div>
    </RegsiteWrapper>
  );
}
