import React, { type ReactNode } from "react";
import NavBar from "./NavBar";

const ContentWithNavBar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default ContentWithNavBar;
