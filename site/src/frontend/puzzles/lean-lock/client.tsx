/* eslint-disable @typescript-eslint/no-non-null-assertion -- data is hard coded */
import bcrypt from "bcryptjs";
import panzoom, { type PanZoom } from "panzoom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import { AuthorsNote } from "../../components/PuzzleLayout";
import {
  CLEANSTRING_REGEX,
  DATA,
  HAS_STORAGE,
  LOCAL_STORAGE_PREFIX,
} from "./Constants";

const StyledContainer = styled.div`
  border: 3px solid var(--black);
  border-radius: 1em;
  background-color: var(--white);
  overflow: hidden;
  height: 600px;
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  margin-bottom: 1em;
`;

const ResetButton = styled.button`
  display: block;
  border: 3px solid var(--black);
  border-radius: 8px;
  background-color: var(--white);
  padding: 8px;
  cursor: pointer;
`;

type Puzzle = {
  nodes: Record<string, { xml: string; enumeration?: number; hash: string }>;
  svg: Document;
  edges: { nodes: number[]; content: string }[];
  version: string;
};

type Presentation = {
  svg: SVGElement;
  nodes: Record<number, SVGElement>;
  edges: Set<number[]>;
  panzoom_instance?: PanZoom;
};

type State = {
  available_nodes: Set<number>;
  solved_nodes: Record<number, string>;
};

function add_to_svg(
  svg: SVGElement,
  content: string,
  category: string,
): SVGElement {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.innerHTML = content;
  svg.querySelector(`#${category}-group`)!.appendChild(group);
  return group.childNodes[0]! as SVGElement;
}

function label_node(
  node: number,
  label_text: string,
  presentation: Presentation,
) {
  const node_element = presentation.nodes[node]!;
  const tspan_element = node_element.querySelector("tspan")!;
  tspan_element.innerHTML = label_text;
  node_element.querySelector(".node-input")!.remove();
}

function render_unlock(
  node: number,
  puzzle: Puzzle,
  presentation: Presentation,
  state: State,
) {
  if (presentation.nodes[node] !== undefined) {
    return;
  }

  const rendered = add_to_svg(
    presentation.svg,
    puzzle.nodes[node]!.xml,
    "nodes",
  );
  presentation.nodes[node] = rendered;

  const tspan_element = rendered.querySelector("tspan")!;
  const foreign_obj = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject",
  );
  rendered.appendChild(foreign_obj);
  foreign_obj.setAttribute("class", "node-input");
  foreign_obj.setAttribute(
    "x",
    `${parseFloat(tspan_element.getAttribute("x")!) - 3}`,
  );
  foreign_obj.setAttribute(
    "y",
    `${parseFloat(tspan_element.getAttribute("y")!) - 23}`,
  );
  foreign_obj.setAttribute("width", "150");
  foreign_obj.setAttribute("height", "50");
  const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
  foreign_obj.appendChild(div);
  const form = document.createElement("form");
  foreign_obj.appendChild(form);
  const input = document.createElement("input");
  form.appendChild(input);
  input.setAttribute("type", "text");
  input.setAttribute("class", "node-input-text");
  input.setAttribute(
    "style",
    "font-size: 20px; background-color: transparent; border: none; outline: none",
  );
  if (puzzle.nodes[node]!.enumeration !== undefined) {
    input.setAttribute("placeholder", `(${puzzle.nodes[node]!.enumeration})`);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.toUpperCase();
    check_submission(node, text, puzzle, state, presentation);
    input.value = "";
  });
}

function render_answer(
  node: number,
  answer: string,
  presentation: Presentation,
) {
  label_node(node, answer, presentation);
}

function handle_correct_submission(
  node: number,
  answer: string,
  puzzle: Puzzle,
  state: State,
  presentation: Presentation,
) {
  state.solved_nodes[node] = answer;
  render_answer(node, answer, presentation);
  state.available_nodes.delete(node);

  for (const edge of puzzle.edges) {
    if (edge.nodes.includes(Number(node))) {
      for (const destination of edge.nodes) {
        if (state.solved_nodes[destination] !== undefined) {
          continue;
        }
        if (!state.available_nodes.has(destination)) {
          render_unlock(destination, puzzle, presentation, state);
          state.available_nodes.add(destination);
        }
        if (!presentation.edges.has(edge.nodes)) {
          add_to_svg(presentation.svg, edge.content, "edges");
          presentation.edges.add(edge.nodes);
        }
      }
    }
  }
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}-state`, JSON.stringify(state));
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}-version`, puzzle.version);
}

function check_submission(
  node: number,
  submission: string,
  puzzle: Puzzle,
  state: State,
  presentation: Presentation,
) {
  if (state.solved_nodes[node] !== undefined) {
    return;
  }
  if (
    bcrypt.compareSync(
      `${node}-${submission.toUpperCase().replace(CLEANSTRING_REGEX, "")}`,
      puzzle.nodes[node]!.hash,
    )
  ) {
    handle_correct_submission(node, submission, puzzle, state, presentation);
    return;
  }
}

function setup(puzzle: Puzzle, presentation: Presentation): State {
  let stored_state: State;
  const serialized_state = localStorage.getItem(
    `${LOCAL_STORAGE_PREFIX}-state`,
  );
  if (serialized_state !== null) {
    stored_state = JSON.parse(serialized_state) as State;
    if (
      puzzle.version !== localStorage.getItem(`${LOCAL_STORAGE_PREFIX}-version`)
    ) {
      const itemsToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(LOCAL_STORAGE_PREFIX)) {
          itemsToRemove.push(key);
        }
      }
      for (const item of itemsToRemove) {
        localStorage.removeItem(item);
      }
      stored_state = default_state();
    }
  } else {
    stored_state = default_state();
  }
  const state: State = {
    solved_nodes: {},
    available_nodes: new Set<number>(),
  };
  presentation.svg.innerHTML = puzzle.svg.querySelector("svg")!.innerHTML;
  for (const x of ["nodes", "edges"]) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("id", `${x}-group`);
    presentation.svg.appendChild(group);
  }
  for (const node of Object.keys(stored_state.solved_nodes)) {
    render_unlock(parseInt(node, 10), puzzle, presentation, state);
    handle_correct_submission(
      parseInt(node, 10),
      stored_state.solved_nodes[parseInt(node, 10)]!,
      puzzle,
      state,
      presentation,
    );
  }
  return state;
}

function default_state(): State {
  return {
    solved_nodes: { 1: "BELGIUM", 10: "GUINEA" },
    available_nodes: new Set(),
  };
}

const parser = new DOMParser();

const App = () => {
  const [grabbing, setGrabbing] = useState(false);
  const defaultPuzzleState = useMemo(() => {
    return {
      nodes: DATA.nodes,
      edges: DATA.edges,
      svg: parser.parseFromString(DATA.svg, "text/xml"),
      version: DATA.version,
    };
  }, []);
  const reset = useCallback(() => {
    const presentation: Presentation = {
      svg: document.getElementById("puzzle-image") as unknown as SVGElement,
      nodes: {},
      edges: new Set(),
    };
    setup(defaultPuzzleState, presentation);
    if (presentation.panzoom_instance) {
      presentation.panzoom_instance.dispose();
    }
    presentation.panzoom_instance = panzoom(presentation.svg, {
      smoothScroll: false,
      bounds: true,
      boundsPadding: 0.05,
      minZoom: 0.5,
      initialZoom: 3,
      onTouch: () => {
        return false; // tells panoom to not preventDefault onTouch.
      },
    });
    presentation.panzoom_instance.moveTo(-1500, -150);
    presentation.panzoom_instance.on("panstart", () => {
      setGrabbing(true);
    });
    presentation.panzoom_instance.on("panend", () => {
      setGrabbing(false);
    });
  }, [defaultPuzzleState]);
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <FlexWrapper>
        <ResetButton
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to reset the state of this puzzle?",
              )
            ) {
              if (HAS_STORAGE) {
                const itemsToRemove: string[] = [];
                for (let i = 0; i < localStorage.length; i++) {
                  const key = localStorage.key(i);
                  if (key?.startsWith(LOCAL_STORAGE_PREFIX)) {
                    itemsToRemove.push(key);
                  }
                }
                for (const item of itemsToRemove) {
                  localStorage.removeItem(item);
                }
              }
              reset();
            }
          }}
        >
          Reset
        </ResetButton>
        <AuthorsNote>
          We recommend solving this puzzle on a laptop or desktop computer.
          Scroll to zoom. Click and drag to pan.
        </AuthorsNote>
      </FlexWrapper>
      <StyledContainer style={{ cursor: grabbing ? "grabbing" : "grab" }}>
        <svg
          id="puzzle-image"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.0 0.0 3321.3333333333335 1806.6666666666667"
          fill="none"
          stroke="none"
          strokeLinecap="square"
          strokeMiterlimit="10"
        />
      </StyledContainer>
    </>
  );
};

const elem = document.getElementById("charged-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #charged-root was nowhere to be found",
  );
}
/* eslint-enable @typescript-eslint/no-non-null-assertion -- data is hard coded */
