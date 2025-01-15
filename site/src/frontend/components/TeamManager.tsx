import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { styled } from "styled-components";
import { newAuthClient } from "../../../lib/api/auth_client";
import { type TeamRegistrationState } from "../../../lib/api/contract";
import apiUrl from "../utils/apiUrl";
import {
  responseIsZodError,
  responseToZodErrors,
} from "../utils/zodFieldErrors";
import {
  Alert,
  Button,
  LabeledWithError,
  TextArea,
  TextInput,
} from "./StyledUI";

const Section = styled.section`
  width: 100%;
  max-width: 600px;

  & + section {
    margin-top: 2rem;
  }
`;

const SectionHeader = styled.h2`
  padding-top: 0;
  padding-bottom: 1rem;
`;

const WideTextInput = styled(TextInput)`
  width: 100%;
`;

const WideTextArea = styled(TextArea)`
  width: 100%;
`;

const WideButton = styled(Button)`
  width: 300px;
  max-width: 100%;
`;

function LabeledControlledInputWithError({
  label,
  value,
  error,
  ...props
}: {
  label: string;
  value?: string | number;
  error?: string;
  multiline?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <LabeledWithError label={label} error={error}>
      <WideTextInput type="text" value={value} {...props} />
    </LabeledWithError>
  );
}

function LabeledControlledTextAreaWithError({
  label,
  value,
  error,
  rows = 3,
  cols = 40,
  ...props
}: {
  label: string;
  value?: string | number;
  error?: string;
  rows?: number;
  cols?: number;
  multiline?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <LabeledWithError label={label} error={error}>
      <WideTextArea value={value} rows={rows} cols={cols} {...props} />
    </LabeledWithError>
  );
}

type TopLevelAlert = {
  variant: "success" | "error";
  message: string;
};

const TeamManager = ({
  registration,
}: {
  registration: TeamRegistrationState;
}) => {
  const [topLevelAlert, setTopLevelAlert] = useState<TopLevelAlert | undefined>(
    undefined,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Clear the success message after 5 seconds.
    let timeoutHandle = undefined;
    if (topLevelAlert?.variant === "success") {
      timeoutHandle = setTimeout(() => {
        setTopLevelAlert(undefined);
      }, 5000);
    }
    return () => {
      if (timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
      }
    };
  }, [topLevelAlert]);

  // Each of the following edited$THING fields is either the currently-edited value, or undefined
  // (indicating no override of the current value from the server.)
  // This approach allows the fields of the form to live-update as writes occur elsewhere, so as to
  // prevent unintended loss of edits from other users, so long as you're not both editing the same
  // field (but if you are, last writer wins seems like the only reasonable set of semantics, which
  // is what you'll get).
  const [editedTeamName, setEditedTeamName] = useState<string | undefined>(
    undefined,
  );
  const onTeamNameChanged: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEditedTeamName(e.currentTarget.value);
    },
    [],
  );

  const [editedContactName, setEditedContactName] = useState<
    string | undefined
  >(undefined);
  const onContactNameChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setEditedContactName(e.currentTarget.value);
    }, []);

  const [editedContactEmail, setEditedContactEmail] = useState<
    string | undefined
  >(undefined);
  const onContactEmailChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setEditedContactEmail(e.currentTarget.value);
    }, []);

  const [editedContactPhone, setEditedContactPhone] = useState<
    string | undefined
  >(undefined);
  const onContactPhoneChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setEditedContactPhone(e.currentTarget.value);
    }, []);

  const [editedMailingAddress, setEditedMailingAddress] = useState<
    string | undefined
  >(undefined);
  const onMailingAddressChanged: ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      setEditedMailingAddress(e.currentTarget.value);
    }, []);

  const [editedSecondaryContactName, setEditedSecondaryContactName] = useState<
    string | undefined
  >(undefined);
  const onSecondaryContactNameChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setEditedSecondaryContactName(e.currentTarget.value);
    }, []);

  const [editedSecondaryContactEmail, setEditedSecondaryContactEmail] =
    useState<string | undefined>(undefined);
  const onSecondaryContactEmailChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setEditedSecondaryContactEmail(e.currentTarget.value);
    }, []);

  const [editedSecondaryContactPhone, setEditedSecondaryContactPhone] =
    useState<string | undefined>(undefined);
  const onSecondaryContactPhoneChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setEditedSecondaryContactPhone(e.currentTarget.value);
    }, []);

  const [editedTeamEamil, setEditedTeamEmail] = useState<string | undefined>(
    undefined,
  );
  const onTeamEmailChanged: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEditedTeamEmail(e.currentTarget.value);
    },
    [],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      // We pass through any fields we don't provide UI for here unmodified from the registration
      // data we received from the backend, because the API expects to receive the full
      // MutableTeamRegistration fieldset.
      const data = {
        ...registration,
        name: editedTeamName ?? registration.name,
        contactName: editedContactName ?? registration.contactName,
        contactEmail: editedContactEmail ?? registration.contactEmail,
        contactPhone: editedContactPhone ?? registration.contactPhone,
        contactMailingAddress:
          editedMailingAddress ?? registration.contactMailingAddress,
        secondaryContactName:
          editedSecondaryContactName ?? registration.secondaryContactName,
        secondaryContactEmail:
          editedSecondaryContactEmail ?? registration.secondaryContactEmail,
        secondaryContactPhone:
          editedSecondaryContactPhone ?? registration.secondaryContactPhone,
        teamEmail: editedTeamEamil ?? registration.teamEmail,
      };
      // Submit auth API request
      const authClient = newAuthClient(apiUrl());
      const updatePromise = authClient.updateRegistration({
        body: data,
      });
      updatePromise
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // Clear any errors.
            setTopLevelAlert({ variant: "success", message: "Updates saved." });
            setErrors({});
            // On success, clear the edited fields, so you can pick up changes from other tabs once more
            setEditedTeamName(undefined);
            setEditedContactEmail(undefined);
            setEditedContactName(undefined);
            setEditedContactPhone(undefined);
            setEditedMailingAddress(undefined);
            setEditedSecondaryContactEmail(undefined);
            setEditedSecondaryContactName(undefined);
            setEditedSecondaryContactPhone(undefined);
            setEditedTeamEmail(undefined);
          } else if (responseIsZodError(res)) {
            setTopLevelAlert({
              variant: "error",
              message: "Update failed (see reasons above)",
            });
            const errors = responseToZodErrors(res);
            setErrors(errors);
          } else {
            // Unexpected error response from server.
            setTopLevelAlert({
              variant: "error",
              message: `Update failed (status ${res.status})`,
            });
            console.log("Update failed for unknown cause", res);
          }
        })
        .catch((err: unknown) => {
          // the request itself failed
          setTopLevelAlert({
            variant: "error",
            message: "Failed to save update (request did not complete)",
          });
          console.log("Update request failed", err);
        });
    },
    [
      editedContactEmail,
      editedContactName,
      editedContactPhone,
      editedMailingAddress,
      editedSecondaryContactEmail,
      editedSecondaryContactName,
      editedSecondaryContactPhone,
      editedTeamEamil,
      editedTeamName,
      registration,
    ],
  );

  return (
    <form onSubmit={onSubmit}>
      <Section>
        <SectionHeader>Identity</SectionHeader>
        <div>
          <LabeledControlledInputWithError
            name="username"
            label="Username (cannot be changed)"
            value={registration.username}
            error={errors.username}
            autoComplete={"off"}
            readOnly
            disabled
          />
        </div>
        <div>
          <LabeledControlledInputWithError
            name="password"
            label="Password (cannot be changed)"
            value={registration.password}
            error={errors.password}
            autoComplete={"off"}
            readOnly
            disabled
          />
        </div>
        <div>
          <LabeledControlledInputWithError
            name="name"
            label="Team Name"
            value={editedTeamName ?? registration.name}
            onChange={onTeamNameChanged}
            error={errors.name}
            autoComplete={"off"}
          />
        </div>
      </Section>
      <Section>
        <SectionHeader>Contact Information</SectionHeader>
        <div>
          <LabeledControlledInputWithError
            name="contactName"
            label="Contact Name"
            value={editedContactName ?? registration.contactName}
            onChange={onContactNameChanged}
            error={errors.contactName}
            autoComplete="name"
          />
        </div>
        <div>
          <LabeledControlledInputWithError
            name="contactEmail"
            label="Contact Email"
            value={editedContactEmail ?? registration.contactEmail}
            onChange={onContactEmailChanged}
            error={errors.contactEmail}
            autoComplete="email"
          />
        </div>
        <div>
          <LabeledControlledInputWithError
            name="contactPhone"
            label="Contact Phone"
            value={editedContactPhone ?? registration.contactPhone}
            onChange={onContactPhoneChanged}
            error={errors.contactPhone}
            type="tel"
            autoComplete="tel"
          />
        </div>
        <div>
          <LabeledControlledTextAreaWithError
            name="contactMailingAddress"
            label="Contact Mailing Address"
            value={editedMailingAddress ?? registration.contactMailingAddress}
            onChange={onMailingAddressChanged}
            error={errors.contactMailingAddress}
            autoComplete="street-address"
            rows={3}
            cols={40}
          />
        </div>
        <div>
          <LabeledControlledInputWithError
            name="secondaryContactName"
            label="Secondary Contact Name"
            value={
              editedSecondaryContactName ?? registration.secondaryContactName
            }
            onChange={onSecondaryContactNameChanged}
            error={errors.secondaryContactName}
            autoComplete="off"
          />
        </div>
        <div>
          <LabeledControlledInputWithError
            name="secondaryContactEmail"
            label="Secondary Contact Email"
            value={
              editedSecondaryContactEmail ?? registration.secondaryContactEmail
            }
            onChange={onSecondaryContactEmailChanged}
            error={errors.secondaryContactEmail}
            autoComplete="off"
          />
        </div>
        <div>
          <LabeledControlledInputWithError
            name="secondaryContactPhone"
            label="Secondary Contact Phone"
            value={
              editedSecondaryContactPhone ?? registration.secondaryContactPhone
            }
            onChange={onSecondaryContactPhoneChanged}
            error={errors.secondaryContactPhone}
            autoComplete="off"
            type="tel"
          />
        </div>
      </Section>
      <Section>
        <SectionHeader>Team Information</SectionHeader>
        <div>
          <LabeledControlledInputWithError
            name="teamEmail"
            label="Team-wide Email Address"
            value={editedTeamEamil ?? registration.teamEmail}
            onChange={onTeamEmailChanged}
            error={errors.teamEmail}
            autoComplete="off"
          />
        </div>
      </Section>
      <Section>
        {topLevelAlert && (
          <Alert $variant={topLevelAlert.variant}>
            {topLevelAlert.message}
          </Alert>
        )}
        <WideButton>Save</WideButton>
      </Section>
    </form>
  );
};

export default TeamManager;
