import React from "react";
import { AuthorsNote } from "../../components/PuzzleLayout";

const Interaction = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Your leads are coming together. Stay by the phone.
      </p>

      <AuthorsNote>
        Please check one last time that your{" "}
        <a href="/team">team contact info</a> is up to date. If the Gala is
        currently closed, Billie’s team will reach out about next steps.
      </AuthorsNote>
    </>
  );
};

export default Interaction;
