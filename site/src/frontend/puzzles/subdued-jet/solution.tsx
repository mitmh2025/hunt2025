import React from "react";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer } from "../../components/StyledUI";
import graph_labeled from "./assets/graph_labeled.png";
import graph_unlabeled from "./assets/graph_unlabeled.png";
import hidden_node from "./assets/hidden_node.png";

const Solution = () => {
  return (
    <>
      <p>
        This round has seventeen feeder puzzles and eight submetas. Hunters must
        decide which “subsidiaries” (feeders) are used in each “shell
        corporation” (submeta), but in doing so, they find that some of the
        feeders are in fact other submeta answers. Determining what shells and
        subsidiaries feed each shell becomes a critical part of solving the
        round, including learning that one shell acts as its own feeder, one
        shell feeds another one twice, and that each subsidiary only feeds one
        shell.
      </p>

      <p>
        Fully solving all the shell corporation submetas yields this directed
        graph, representing the corporate structure of “Gladys’ web of business
        dealings.” All of this can be completed before starting on the Shell
        Game supermeta.
      </p>

      <LinkedImage
        src={graph_unlabeled}
        alt="Directed graph showing the 8 shell corporations metas, their 17 feeders, and which answers feed into which puzzle"
      />

      <p>
        Following the instructions from the source, hunters must now “follow the
        paper trail from each subsidiary” using the information that “at each
        step, one piece gets left behind.” This means that they must assign
        letters to each edge of the graph so that each subsidiary feeder answer
        can be spelled by following a path on the graph (starting at that
        subsidiary). This can be done in a unique way, as shown below. As
        suggested by the flavortext, the shell corporation submeta answers
        “won’t leave a trace” and aren’t used in the letter assignment.
      </p>

      <LinkedImage
        src={graph_labeled}
        alt="Directed graph showing the 8 shell corporations metas, their 17 feeders, and which answers feed into which puzzles, with single-letter labels on each graph edge"
      />

      <p>
        Finally, having worked out the corporate structure, hunters look for the
        hidden pass-through company–in other words, a new hidden node in the
        graph. As clued in the flavortext, each shell corporation has two edges
        connecting it to the hidden company: one in each direction (“[the hidden
        pass-through company deals with each shell corp in exactly two ways”).
        The additional words given, along with the constraint that each of them
        goes through the hidden node exactly once, determine the letters that
        must be assigned to the edges in and out of the hidden node. Starting at
        the hidden node and tracing the edges to and from each shell corporation
        in order spells the answer, that to confront Gladys, you should{" "}
        <PuzzleAnswer>BLOW GLASS WHISTLE</PuzzleAnswer>.
      </p>

      <LinkedImage
        src={hidden_node}
        alt="Directed graph showing just the edges between the hidden node and the 8 shell corporation metas."
      />
    </>
  );
};

export default Solution;
