import React from "react";
import type { TeamRegistration } from "../../../../lib/api/frontend_contract";
import { Alert, LabeledInputWithError } from "../../components/StyledUI";
import UpdateRegistrationFormInputs from "../../components/UpdateRegistrationFormInputs";
import RegsiteWrapper from "../RegsiteWrapper";

export default function NewRegistration({
  values,
  message,
  errors,
}: {
  values: Partial<TeamRegistration>;
  message?: string;
  errors: { [K in keyof TeamRegistration]?: string };
}) {
  return (
    <RegsiteWrapper>
      <div className="container">
        <h2>Register Your Team</h2>
        {message && <Alert>{message}</Alert>}
        <form method="POST">
          <div>
            <LabeledInputWithError
              label="Username (cannot be changed later)"
              name="username"
              value={values.username}
              error={errors.username}
              required
              minLength={1}
              maxLength={32}
            />
          </div>
          <div>
            <LabeledInputWithError
              label="Password (cannot be changed later, will be displayed in clear text)"
              name="password"
              value={values.password}
              error={errors.password}
              required
              minLength={8}
              maxLength={255}
            />
          </div>
          <UpdateRegistrationFormInputs values={values} errors={errors} />
          <button type="submit">Register Team</button>
        </form>
      </div>
    </RegsiteWrapper>
  );
}
