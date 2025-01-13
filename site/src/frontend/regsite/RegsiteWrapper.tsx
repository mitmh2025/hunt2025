import React from "react";
import sparkle1 from "../../assets/sparkle1.svg";
import sparkle2 from "../../assets/sparkle2.svg";

export default function RegsiteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <div className="container header-container">
          <img src={sparkle1} alt="" />
          <div className="header-text">
            <h1>
              <a href="/">MIT Mystery Hunt 2025</a>
            </h1>

            <h4>Massachusetts Institute of Technology</h4>
            <h4>January 17 – 20</h4>
          </div>
          <img src={sparkle2} alt="" />
        </div>
      </header>
      <main>{children}</main>

      <footer>
        <div className="container">
          Brought to you by the MIT Puzzle Club and Death &amp; Mayhem.{" "}
          <a href="mailto:info@mitmh2025.com">info@mitmh2025.com</a>. &lt;3
        </div>
      </footer>
    </>
  );
}
