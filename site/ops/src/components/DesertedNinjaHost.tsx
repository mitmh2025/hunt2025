//import { useState } from "react";
//import { styled } from "styled-components";
import { DesertedNinjaPresentation } from "./DesertedNinjaPresentation";
import { SessionSelect } from "./DesertedNinjaSessionSelector.tsx";

export function DesertedNinjaHost() {
  return (
    <>
      <h2>Host mode</h2>
      <SessionSelect buttonText="Present" />
      <DesertedNinjaPresentation />
    </>
  );
}
