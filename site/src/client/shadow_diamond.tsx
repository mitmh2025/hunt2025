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

const root = createRoot(document.getElementById("shadow-diamond-root")!);
root.render(<RoundSpecificClientComponent />);
