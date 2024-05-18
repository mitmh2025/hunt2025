import React from "react";
import { createRoot } from "react-dom/client";
import "./shadow_diamond.css";

const RoundSpecificClientComponent = () => {
  return (
    <div>
      <p>This portion of the page was rendered by browser code.</p>
      <p className="shadow-diamond-demo">
        This is styled by round-specific CSS.
      </p>
    </div>
  );
};

const elem = document.getElementById("shadow-diamond-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<RoundSpecificClientComponent />);
}
