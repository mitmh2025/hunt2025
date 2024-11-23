import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 900px;
  max-width: 100%;
  padding: 5em 1em;
`;

export default function RegsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
