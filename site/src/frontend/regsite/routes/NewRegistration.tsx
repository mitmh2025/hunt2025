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
        <p>
          Please register your team as early as possible to assist us in
          planning, even if you have to guess at some of the information. Most
          fields can be updated at any time before January 17th, and we would
          appreciate updates as you solidify your team’s plans for the year.
        </p>
        <p>
          If you are requesting space at MIT, we ask that you register{" "}
          <strong>before December 21st</strong>. While we will do our best to
          accommodate requests after that date, we cannot guarantee space.
        </p>
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
