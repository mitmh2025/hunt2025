import React from "react";
import { Alert, LabeledInputWithError } from "../../components/StyledUI";
import RegsiteWrapper from "../RegsiteWrapper";
import { Form, SectionHeader } from "./RegsiteUI";

export default function LogIn({
  error,
  username,
}: {
  error?: string;
  username?: string;
}) {
  return (
    <RegsiteWrapper>
      <div className="container container-md">
        <Form method="post">
          <SectionHeader>Log Back In</SectionHeader>
          {error && <Alert>{error}</Alert>}
          <LabeledInputWithError
            label="Username"
            name="username"
            value={username}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="username"
          />

          <LabeledInputWithError
            label="Password"
            name="password"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="current-password"
          />

          <button type="submit">Log In</button>
        </Form>
      </div>
    </RegsiteWrapper>
  );
}
