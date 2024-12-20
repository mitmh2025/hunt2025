import React from "react";
import { BookcaseInteraction } from "../../rounds/illegal_search/client/Bookcase";

export default function Puzzle(): JSX.Element {
  return (
    <div>
      <BookcaseInteraction
        interactive={false}
        state={[]}
        handleClick={() => {
          // Do nothing
        }}
        style={{ position: "static", marginLeft: "auto", marginRight: "auto" }}
      />
    </div>
  );
}
