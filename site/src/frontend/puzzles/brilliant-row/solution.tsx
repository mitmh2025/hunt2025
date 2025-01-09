import React from "react";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle presents as five sets of song lyrics with words blacked out,
        as if with static. Each set of lyrics is a rewritten version of a pop
        song that prominently features spelling within it. The spelled out
        lyrics are also obscured, both through the simulated static and through
        a number. Teams must use the lyrics in front of them to identify the
        song and the changed letters. When assembled in order, the changed
        letters provide the instruction <Mono>SPELL FOR US</Mono>.
      </p>
      <p>
        Teams are then instructed to send solvers to the Gala to perform their
        own original rewrite of “Hot to Go” using their favorite seven-letter
        word or phrase, making sure to spell the letters with their arms as
        Chapelle Roan does in her music video. When they did so, they were given
        the final answer, <PuzzleAnswer>[pending]</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
