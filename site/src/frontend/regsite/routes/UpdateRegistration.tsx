import React from "react";
import type {
  MutableTeamRegistration,
  TeamRegistration,
} from "../../../../lib/api/frontend_contract";
import { Alert } from "../../components/StyledUI";
import UpdateRegistrationFormInputs from "../../components/UpdateRegistrationFormInputs";

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
    <div>
      <h1>Update Registration</h1>
      <p>
        <a href="/">&laquo; Back</a>
      </p>
      {message && <Alert>{message}</Alert>}
      <p>
        Username: <strong>{registration.username}</strong>
      </p>
      <p>
        Password: <strong>{registration.password}</strong>
      </p>
      <form method="POST">
        <UpdateRegistrationFormInputs values={values} errors={errors} />
        <input type="submit" />
      </form>
    </div>
  );
}
