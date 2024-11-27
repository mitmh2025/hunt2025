import React from "react";
import type {
  MutableTeamRegistration,
  TeamRegistration,
} from "../../../../lib/api/frontend_contract";
import { Alert, LabeledInputWithError } from "../../components/StyledUI";
import UpdateRegistrationFormInputs from "../../components/UpdateRegistrationFormInputs";
import RegsiteWrapper from "../RegsiteWrapper";

export default function UpdateRegistration({
  registration,
  values,
  message,
  errors,
}: {
  registration: TeamRegistration;
  values: MutableTeamRegistration;
  message?: string;
  errors: { [K in keyof MutableTeamRegistration]?: string };
}) {
  return (
    <RegsiteWrapper>
      <div className="container">
        <h1>Update Registration</h1>
        {message && <Alert>{message}</Alert>}
        <LabeledInputWithError
          label="Username (cannot be changed)"
          value={registration.username}
          readOnly
        />
        <LabeledInputWithError
          label="Password (cannot be changed)"
          value={registration.password}
          readOnly
        />
        <form method="POST">
          <UpdateRegistrationFormInputs values={values} errors={errors} />
          <button type="submit">Update Registration</button>
        </form>
      </div>
    </RegsiteWrapper>
  );
}
