import React from "react";
import type { TeamRegistration } from "../../../../lib/api/frontend_contract";
import { Alert, LabeledInputWithError } from "../../components/StyledUI";
import UpdateRegistrationFormInputs from "../../components/UpdateRegistrationFormInputs";
import RegsiteWrapper from "../RegsiteWrapper";
import { Form, PageHeader } from "./RegsiteUI";

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
        <PageHeader>Register Your Team</PageHeader>
        <Form method="POST">
          <section>
            {message && <Alert>{message}</Alert>}
            <LabeledInputWithError
              label="Username (cannot be changed later)"
              name="username"
              value={values.username}
              error={errors.username}
              required
              minLength={1}
              maxLength={32}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="username"
            />
            <LabeledInputWithError
              label="Password (cannot be changed later, will be displayed in clear text)"
              name="password"
              value={values.password}
              error={errors.password}
              required
              minLength={8}
              maxLength={255}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="new-password"
            />
          </section>
          <UpdateRegistrationFormInputs values={values} errors={errors} />
          <button type="submit">Register Team</button>
        </Form>
      </div>
    </RegsiteWrapper>
  );
}
