import React from "react";

const CIRCUITS: { href: string; contents: string }[] = [
  { href: "https://youtu.be/Fg8cBy-KvFM", contents: "Circuit 1" },
  { href: "https://youtu.be/c8dTSFy5UWo", contents: "Circuit 2" },
  { href: "https://youtu.be/jgTCA11o7wM", contents: "Circuit 3" },
  { href: "https://youtu.be/oUX-VBR6b9g", contents: "Circuit 4" },
  { href: "https://youtu.be/NfunG-GSV9o", contents: "Circuit 5" },
  { href: "https://youtu.be/MtSkX-7-A_Y", contents: "Circuit 6" },
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Winning isn’t everything; it’s the only thing. But take that with a
        grain of salt.
      </p>
      <p>Circuits</p>
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
      <p>Scripted Travel</p>
      <p>
        <a href="https://youtu.be/zp53T0HaPOk" target="_blank" rel="noreferrer">
          Tour
        </a>
      </p>
    </>
  );
};

export default Puzzle;
