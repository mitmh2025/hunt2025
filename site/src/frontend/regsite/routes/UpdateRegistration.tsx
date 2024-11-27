import React from "react";
import { styled } from "styled-components";
import type {
  MutableTeamRegistration,
  TeamRegistration,
} from "../../../../lib/api/frontend_contract";
import { Alert, LabeledInputWithError } from "../../components/StyledUI";
import UpdateRegistrationFormInputs from "../../components/UpdateRegistrationFormInputs";
import RegsiteWrapper from "../RegsiteWrapper";
import { Form, PageHeader } from "./RegsiteUI";

const StaticFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

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
        <PageHeader>Update Registration</PageHeader>
        <StaticFields>
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
        </StaticFields>
        <Form method="POST">
          <UpdateRegistrationFormInputs values={values} errors={errors} />
          <button type="submit">Update Registration</button>
        </Form>
      </div>
    </RegsiteWrapper>
  );
}
