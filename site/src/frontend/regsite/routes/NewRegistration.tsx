import React from "react";
import type { TeamRegistration } from "../../../../lib/api/frontend_contract";
import { Alert, LabeledInputWithError } from "../../components/StyledUI";
import UpdateRegistrationFormInputs from "../../components/UpdateRegistrationFormInputs";

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
    <div>
      <h1>Register Your Team</h1>
      <p>
        <a href="/">&laquo; Back</a>
      </p>
      {message && <Alert>{message}</Alert>}
      <form method="POST">
        <div>
          <LabeledInputWithError
            label="Username (cannot be changed later)"
            name="username"
            value={values.username}
            error={errors.username}
            required
            min={1}
            max={32}
          />
        </div>
        <div>
          <LabeledInputWithError
            label="Password (cannot be changed later, will be displayed in clear text)"
            name="password"
            value={values.password}
            error={errors.password}
            required
            min={8}
            max={255}
          />
        </div>
        <UpdateRegistrationFormInputs values={values} errors={errors} />
        <input type="submit" />
      </form>
    </div>
  );
}
