import { styled } from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  background-color: var(--gold-400);
  border-radius: 0.5rem;
  border: 1px solid var(--black);
  box-shadow:
    0 0 0 1px var(--gold-400),
    0px 1px 3px hsl(from var(--black) h s l / 0.8);
  padding: 0.5rem;
  color: var(--black);
  font-size: 1rem;
  font-family: var(--body-font);
  margin: 4px;

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
  &[type="text"] {
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
  }
`;
