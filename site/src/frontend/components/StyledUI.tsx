import React from "react";
import { css, styled } from "styled-components";
import { sizeMin } from "../utils/breakpoints";

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
  justify-content: center;

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

const inputStyles = `
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

  &:disabled {
    background-color: var(--gray-100);
    box-shadow: 0 0 0 2px var(--gray-300);
    border-color: var(--gray-400);
    color: var(--gray-500);
    cursor: not-allowed;
  }
`;

export const TextInput = styled.input`
  ${inputStyles}
`;

export const TextArea = styled.textarea`
  ${inputStyles}
`;

export const StyledSelect = styled.select`
  ${inputStyles}
  width: 100%;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: calc(${sizeMin.lg} - 1rem);
  padding: 0 1rem;
  max-width: 100%;
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

export const Mono = styled.span`
  font-family: "Roboto Mono", monospace;
`;

export const PuzzleAnswer = styled(Mono)`
  font-weight: bold;
`;

export const HScrollTableWrapper = styled.div`
  position: relative;
  max-width: 100%;
  overflow-x: auto;
`;

export function LabeledWithError({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ marginLeft: "0.5rem" }}>
        {label ? (
          <>
            {label}
            <br />
          </>
        ) : null}
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
  label?: string;
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

const ErrataWrapper = styled.div`
  margin: 1em 2em;
  border: 1px solid var(--teal-500);
  color: var(--teal-800);
  background-color: var(--teal-200);
  border-radius: 2px;
  padding: 1rem;
  .copying & {
    background-color: transparent;
  }
`;

export function Errata({
  errata,
}: {
  errata: { timestamp: string; message: string }[];
}): JSX.Element {
  return (
    <>
      <ErrataWrapper>
        {errata.map(({ timestamp, message }, i) => (
          <div key={i}>
            <strong>Erratum on {timestamp}</strong>: {message}
          </div>
        ))}
      </ErrataWrapper>
    </>
  );
}

export const lightBgLinkStyles = `
  color: var(--gold-700);
  text-decoration-color: var(--black);

  &:hover {
    text-shadow: 0 0 0.5rem hsl(from var(--gold-400) h s l / 0.2);
    color: var(--gold-600);
    text-decoration-color: var(--gold-700);
  }
`;

export const darkBgLinkStyles = `
  color: var(--gold-200);
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--gold-600);

  &:hover {
    color: var(--true-white);
    text-shadow: 0 0 0.5rem hsl(from var(--white) h s l / 0.4);
    text-decoration-color: var(--gold-400);
  }

  @media print {
    ${lightBgLinkStyles}
  }
`;

export const mdBgLinkStyles = `
  color: var(--teal-600);
  text-decoration-color: var(--teal-700);

  &:hover {
    text-shadow: 0 0 0.5rem hsl(from var(--white) h s l / 0.2);
    color: var(--teal-400);
    text-decoration-color: var(--teal-500);
  }
`;

export const MailtoLink = ({ subject }: { subject: string }): JSX.Element => {
  return (
    <a href={`mailto:info@mitmh2025.com?subject=${subject}`}>
      info@mitmh2025.com
    </a>
  );
};
