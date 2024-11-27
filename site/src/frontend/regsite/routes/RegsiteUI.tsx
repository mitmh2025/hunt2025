import { styled } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  width: 900px;
  max-width: 100%;
`;

export const PageHeader = styled.h1`
  margin-top: 0;
`;

export const SectionHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  section + section {
    margin-top: 2rem;
  }

  textarea {
    margin-bottom: 0;
  }

  button {
    font-size: 2.5rem;
    max-width: 500px;
  }
`;
