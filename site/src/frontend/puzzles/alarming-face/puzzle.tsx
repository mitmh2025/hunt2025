import React from "react";

const CIRCUITS: { href: string; contents: string }[] = [
  { href: "https://youtube.com/embed/Fg8cBy-KvFM", contents: "One" },
  { href: "https://youtube.com/embed/c8dTSFy5UWo", contents: "Two" },
  { href: "https://youtube.com/embed/jgTCA11o7wM", contents: "Three" },
  { href: "https://youtube.com/embed/oUX-VBR6b9g", contents: "Four" },
  { href: "https://youtube.com/embed/NfunG-GSV9o", contents: "Five" },
  { href: "https://youtube.com/embed/MtSkX-7-A_Y", contents: "Six" },
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Winning isn’t everything; it’s the only thing. But take that with a
        grain of salt.
      </p>
      <p>Circuits:</p>
      <p>
        {CIRCUITS.map(({ href, contents }, i) => (
          <React.Fragment key={i}>
            <a href={href} target="_blank" rel="noreferrer">
              {contents}
            </a>
            <br />
          </React.Fragment>
        ))}
      </p>
      <p>Scripted Travel:</p>
      <p>
        <a
          href="https://www.youtube.com/embed/zp53T0HaPOk"
          target="_blank"
          rel="noreferrer"
        >
          Tour
        </a>
      </p>
    </>
  );
};

export default Puzzle;
