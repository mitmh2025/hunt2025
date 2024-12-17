import React from "react";
import { css, styled } from "styled-components";
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

  &:disabled {
    background-color: var(--gray-100);
    box-shadow: 0 0 0 1px var(--gray-300);
    border-color: var(--gray-400);
    color: var(--gray-300);
    cursor: not-allowed;
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: var(--gray-100);
  box-shadow:
    0 0 0 1px var(--gray-100),
    0px 1px 3px hsl(from var(--black) h s l / 0.8);

  &:hover {
    background-color: var(--white);
    box-shadow:
      0 0 0 1px var(--white),
      0px 2px 8px hsl(from var(--black) h s l / 0.3);
    color: var(--true-black);
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
  color: var(--red-600);
  margin-left: 0.5rem;
  &::before {
    content: "⚠️ ";
  }
`;

export const Alert = styled.div<{ $variant?: "success" | "error" }>`
  border: 3px solid;
  border-radius: 0.25rem;
  padding: 1em;
  margin: 1em 0;
  color: var(--black);
  ${({ $variant }) => {
    switch ($variant) {
      case "success":
        return css`
          background-color: var(--gold-400);
          border-color: var(--gold-700);
        `;
      case "error":
      default:
        return css`
          background-color: var(--red-200);
          border-color: var(--red-600);
        `;
    }
  }}
`;

export function LabeledWithError({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ marginLeft: "0.5rem" }}>
        {label}
        <br />
        {children}
      </label>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

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
    <LabeledWithError label={label} error={error}>
      <TextInput type="text" defaultValue={value} {...props} />
    </LabeledWithError>
  );
}

export function LabeledTextAreaWithError({
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
      <TextArea defaultValue={value} rows={rows} cols={cols} {...props} />
    </LabeledWithError>
  );
}
