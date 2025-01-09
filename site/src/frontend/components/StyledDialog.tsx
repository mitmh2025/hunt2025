import { styled } from "styled-components";

const StyledDialog = styled.dialog`
  font-size: 24px;
  font-family: var(--body-font);
  background-color: var(--white);
  color: var(--black);
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  text-align: left;

  &::backdrop {
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

export default StyledDialog;

export const DialogActions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0.5rem;
  gap: 0.5rem;

  button {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
