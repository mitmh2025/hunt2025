import { styled } from "styled-components";

export const PuzzleStatsTable = styled.table`
  border-collapse: collapse;

  th {
    border-bottom: 3px solid var(--gray-500);
    margin-bottom: 0.5rem;
  }

  th,
  td {
    padding: 0.5rem 1rem;
    text-align: left;
  }

  tr:nth-child(even) td {
    background-color: var(--gray-800);
  }

  & tr:has(td:hover) td {
    background-color: var(--gold-800);
  }
`;
