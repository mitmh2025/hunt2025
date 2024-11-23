import React from "react";
import { styled } from "styled-components";
import { deviceMin } from "../utils/breakpoints";

export const Button = styled.button`
  cursor: pointer;
  background-color: var(--gold-400);
  border-radius: 0.5em;
  border: 1px solid var(--black);
  box-shadow:
    0 0 0 1px var(--gold-400),
    0px 1px 3px hsl(from var(--black) h s l / 0.8);
  padding: 0.5em;
  color: var(--black);
  font-size: 1rem;
  font-family: var(--body-font);
  margin: 4px;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: var(--gold-500);
    box-shadow:
      0 0 0 1px var(--gold-500),
      0px 2px 8px hsl(from var(--black) h s l / 0.5);
    color: var(--true-black);
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.25rem var(--black);
  }
`;

export const TextInput = styled.input`
  border-radius: 0.5rem;
  border: 1px solid var(--black);
  box-shadow: 0 0 0 2px var(--gold-700);
  padding: 0.5rem;
  font-family: var(--body-font);
  color: var(--black);
  font-size: 1rem;
  margin: 0.5rem;
  background: var(--gray-000);

  &:focus {
    box-shadow: 0 0 0 0.25rem var(--black);
  }
`;

export const TextArea = styled.textarea`
  border-radius: 0.5rem;
  border: 1px solid var(--black);
  box-shadow: 0 0 0 2px var(--gold-700);
  padding: 0.5rem;
  font-family: var(--body-font);
  color: var(--black);
  font-size: 1rem;
  margin: 0.5rem;
  background: var(--gray-000);

  &:focus {
    box-shadow: 0 0 0 0.25rem var(--black);
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 900px;
  max-width: 100%;

  @media ${deviceMin.lg} {
    width: calc(1080px - 1rem);
  }
`;

export const ErrorText = styled.div`
  color: var(--gold-400);
`;

export const Alert = styled.div`
  background-color: var(--gold-100);
  border: 1px solid var(--gold-400);
  padding: 1em;
  margin: 1em 0;
  color: var(--black);
`;

export function LabeledInputWithError({
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
    <div style={{ marginBottom: "2rem" }}>
      <label style={{ marginLeft: "0.5rem" }}>
        {label}
        <br />
        <TextInput type="text" defaultValue={value} {...props} />
      </label>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

export function LabeledTextAreaWithError({
  label,
  value,
  error,
  ...props
}: {
  label: string;
  value?: string | number;
  error?: string;
  multiline?: boolean;
} & React.InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div style={{ marginBottom: "2em" }}>
      <label>
        {label}
        <br />
        <TextArea defaultValue={value} rows={3} cols={80} {...props} />
      </label>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
