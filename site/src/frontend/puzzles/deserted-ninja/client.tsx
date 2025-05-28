import React, {
  forwardRef,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import {
  albumLookup,
  geoguessrLookup,
} from "../../../../ops/src/opsdata/desertedNinjaImages";
import {
  ALL_QUESTIONS,
  type FermitQuestion,
} from "../../../../ops/src/opsdata/desertedNinjaQuestions";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import StyledDialog, { DialogActions } from "../../components/StyledDialog";
import { Button, ButtonSecondary, TextInput } from "../../components/StyledUI";
import huntLocalStorage from "../../utils/huntLocalStorage";
import campusmap from "./assets/campusmap.svg";
import fermitChallenge from "./assets/fermit-challenge.jpg";
import fermitSticker from "./assets/fermit-sticker.png";

type ScoreEntryData = {
  sessionId: number;
  scores: number[];
  iteration: number;
  imageUrls: string[];
};

type ScoreEntry = {
  id: number;
  data: ScoreEntryData;
};

const Details = styled.details`
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
`;
const ResultLabel = styled.summary`
  font-size: 150%;
`;
const QuestionScoreRow = styled.div`
  display: flex;
  margin-top: 10px;
`;
const QuestionLabel = styled.div`
  text-decoration: underline;
  margin-right: 10px;
`;
const QuestionResult = styled.div`
  font-weight: bold;
`;
const StyledImageContainer = styled.div`
  text-align: center;
`;
const StyledImage = styled.img`
  width: 80%;
`;
const Slide = styled.div<{ $noPadding?: boolean }>`
  background-color: var(--black);
  color: var(--white);
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: ${({ $noPadding }) => ($noPadding ? "0" : "3rem")};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const SlideHeader = styled.h2`
  font-size: 4rem;
`;
const SlideText = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

const Result = ({ data }: { data: ScoreEntryData }) => {
  const entries = [];

  for (let i = 0; i < 17; i++) {
    entries.push(
      <div key={i}>
        <QuestionScoreRow>
          <QuestionLabel>Question {i + 1}</QuestionLabel>
          <QuestionResult>{data.scores[i]} / 5</QuestionResult>
        </QuestionScoreRow>
        <StyledImageContainer>
          <StyledImage src={data.imageUrls[i]} alt="" />
        </StyledImageContainer>
      </div>,
    );
  }

  return (
    <Details>
      <ResultLabel>Visit number {data.iteration + 1}</ResultLabel>
      {entries}
    </Details>
  );
};

type PostsolveFermitQuestion = FermitQuestion & {
  scoringMethod: Exclude<
    FermitQuestion["scoringMethod"],
    "team_puzzle_solves" | "all_submissions"
  >;
};

type FermitQuestionAnswer = number | [number, number];

function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

function scoreHelper(
  ranges: [number, number, number, number, number],
  value: number,
) {
  const n = ranges.findIndex((thresh) => value <= thresh);
  return n === -1 ? 0 : 5 - n;
}

const MAP_WIDTH = 1632;
const MAP_HEIGHT = 1056;

function scoreQuestion(
  question: PostsolveFermitQuestion,
  answer: FermitQuestionAnswer,
) {
  if (question.scoringMethod === "raw" || Array.isArray(answer)) {
    if (
      question.scoringMethod !== "raw" ||
      !Array.isArray(answer) ||
      !question.geoguessr
    ) {
      // Mismatch between question type and answer type, that shouldn't happen
      return 0;
    }

    // Javascript does not make this especially easy - it has a SVGGeometryElement.isPointInFill method, but the element has to be part of an SVG document that is attached to the DOM
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    try {
      svg.setAttribute("width", MAP_WIDTH.toString());
      svg.setAttribute("height", MAP_HEIGHT.toString());
      svg.setAttribute("viewBox", `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`);
      svg.style.position = "absolute";
      svg.style.width = "0";
      svg.style.height = "0";
      document.body.appendChild(svg);

      const bounds = question.answer();
      bounds.forEach((bound) => {
        svg.appendChild(bound);
      });

      const point = svg.createSVGPoint();
      [point.x, point.y] = answer;

      const n = bounds.findIndex((bound) => bound.isPointInFill(point));
      return n === -1 ? 0 : 5 - n;
    } finally {
      svg.remove();
    }
  }

  const difference = Math.abs(answer - question.answer);
  switch (question.scoringMethod) {
    case "percent":
      return scoreHelper(
        [2, 5, 10, 20, 50],
        100 * Math.abs(answer / question.answer - 1),
      );
    case "12345":
      return scoreHelper([1, 2, 3, 4, 5], difference);
    case "12468":
      return scoreHelper([1, 2, 4, 6, 8], difference);
    case "1double":
    case "2double":
    case "3double":
    case "4double":
    case "9double":
    case "10double": {
      const base = parseInt(question.scoringMethod.slice(0, -6));
      return scoreHelper(
        [base, base * 2, base * 4, base * 8, base * 16],
        difference,
      );
    }
    default:
      question.scoringMethod satisfies never;
      return 0;
  }
}

const QUESTIONS_BY_ID = new Map<number, FermitQuestion>(
  ALL_QUESTIONS.map((q) => [q.id, q]),
);

function generateQuestionSet() {
  const qset = new Array<number | undefined>(17).fill(undefined);

  // First, fill in the geoguessrs. They should (a) not be first (b) not be last
  // (c) not be consecutive. And there should be 4 of them.
  const geoGuessrs = shuffle(ALL_QUESTIONS.filter((q) => q.geoguessr));
  const geoguessrIndices = new Set<number>();
  while (geoguessrIndices.size < 4) {
    const idx = Math.floor(Math.random() * 15) + 1;
    if (geoguessrIndices.has(idx - 1) || geoguessrIndices.has(idx + 1)) {
      continue;
    }
    geoguessrIndices.add(idx);
  }
  geoguessrIndices.forEach((idx) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know we have enough questions
    qset[idx] = geoGuessrs.pop()!.id;
  });

  // Next, fill in the rest of the questions. Make sure we don't repeat any categories
  const usedCategories = new Set<string>();
  const questions = shuffle(
    ALL_QUESTIONS.filter((q) => {
      if (q.geoguessr) {
        return false;
      }

      if (["team_puzzle_solves", "all_submissions"].includes(q.scoringMethod)) {
        return false;
      }

      if (q.categories.some((c) => usedCategories.has(c))) {
        return false;
      }

      q.categories.forEach((c) => usedCategories.add(c));
      return true;
    }),
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know we have enough questions
  return qset.map((q) => q ?? questions.pop()!.id);
}

type State = {
  attempts: ScoreEntry[];
  currentQuestionIds: number[];
  shownTitle: boolean;
  shownRules: boolean;
  shownGeoguessrRules: boolean;
  currentQuestionIdx: number;
  currentAnswers: FermitQuestionAnswer[];
};

type Action =
  | { type: "reset" }
  | { type: "advanceSlide"; answer?: FermitQuestionAnswer }
  | { type: "score" };

const initialize = (state?: Partial<State>): State => ({
  attempts: [],
  ...state,
  currentQuestionIds: generateQuestionSet(),
  shownTitle: false,
  shownRules: false,
  shownGeoguessrRules: false,
  currentQuestionIdx: 0,
  currentAnswers: [],
});

const currentSlide = (state: State) => {
  if (!state.shownTitle) {
    return "title";
  }

  if (!state.shownRules) {
    return "rules";
  }

  const qid = state.currentQuestionIds[state.currentQuestionIdx];

  if (qid === undefined) {
    return "final";
  }

  if (QUESTIONS_BY_ID.get(qid)?.geoguessr && !state.shownGeoguessrRules) {
    return "geoguessrRules";
  }

  return "question";
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "reset":
      return initialize();
    case "advanceSlide": {
      let updates: Partial<State> = {};
      const current = currentSlide(state);
      switch (current) {
        case "title":
          updates = { shownTitle: true };
          break;
        case "rules":
          updates = { shownRules: true };
          break;
        case "geoguessrRules":
          updates = { shownGeoguessrRules: true };
          break;
        case "question":
          if (action.answer) {
            updates = {
              currentQuestionIdx: state.currentQuestionIdx + 1,
              currentAnswers: [...state.currentAnswers, action.answer],
            };
          }
          break;
      }
      return {
        ...state,
        ...updates,
      };
    }
    case "score": {
      const scores = state.currentQuestionIds.map((qid, idx) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know this is a valid question ID
        const question = QUESTIONS_BY_ID.get(qid)!;

        const answer = state.currentAnswers[idx];
        if (!answer) {
          return 0;
        }

        return scoreQuestion(question as PostsolveFermitQuestion, answer);
      });
      const data: ScoreEntryData = {
        iteration: state.attempts.length,
        sessionId: state.attempts.length,
        scores,
        imageUrls: scores.map((v, i) => {
          const lookup = albumLookup[i];
          return lookup?.[state.attempts.length % lookup.length]?.[v] ?? "";
        }),
      };

      return initialize({
        ...state,
        attempts: [
          ...state.attempts,
          {
            id: state.attempts.length,
            data,
          },
        ],
      });
    }
    default:
      action satisfies never;
      return state;
  }
};

const NextSlideButton = ({ onSubmit }: { onSubmit: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <Button ref={ref} type="button" onClick={onSubmit}>
      Next Slide
    </Button>
  );
};

const TitleSlide = ({
  onSubmit,
}: {
  onSubmit: (value?: FermitQuestionAnswer) => void;
}) => {
  return (
    <>
      <Slide>
        <SlideHeader>The FerMIT Challenge!</SlideHeader>
      </Slide>
      <NextSlideButton onSubmit={onSubmit} />
    </>
  );
};

const RulesSlide = ({
  onSubmit,
}: {
  onSubmit: (value?: FermitQuestionAnswer) => void;
}) => (
  <>
    <Slide>
      <SlideHeader>The Rules</SlideHeader>
      <SlideText>I’ll show a question on screen and read it out.</SlideText>
      <SlideText>
        Once I’m done reading, your team will have 45 seconds to come up with
        your best estimate.
      </SlideText>
      <SlideText>
        When time is called, hold up your whiteboard so the scorekeeper can
        record your answer
      </SlideText>
      <SlideText>
        Oh, also — please don’t use your devices! You’re going to get plenty of
        screen time this weekend anyhow.
      </SlideText>
    </Slide>
    <NextSlideButton onSubmit={onSubmit} />
  </>
);

const GeoguessrRulesSlide = ({
  onSubmit,
}: {
  onSubmit: (value?: FermitQuestionAnswer) => void;
}) => (
  <>
    <Slide>
      <SlideHeader>Rule Update</SlideHeader>
      <SlideText>This next question is a bit different.</SlideText>
      <SlideText>
        You will receive laminated maps of campus. Write your team name and
        username on the top of each.
      </SlideText>
      <SlideText>
        A picture of a location on campus will be shown. You’ll need to figure
        out where the picture was taken from.
      </SlideText>
      <SlideText>
        Mark that location on the map with an X. When time is up, we will come
        around and collect your maps.
      </SlideText>
    </Slide>
    <NextSlideButton onSubmit={onSubmit} />
  </>
);

const StickerImage = styled(LinkedImage)`
  & img {
    max-width: 300px;
  }
`;

const FinalSlide = ({ onScore }: { onScore: () => void }) => (
  <>
    <Slide>
      <SlideHeader>That’s It!</SlideHeader>
      <SlideText>Congratulations on finishing the FerMIT Challenge!</SlideText>
      <SlideText>You’re all winners (plus or minus a few places).</SlideText>
      <SlideText>
        You will see your results on the puzzle page shortly. If you would like
        to get better results, please come back next hour and try again!
      </SlideText>
      <SlideText>
        To commemorate your success, please come on up and get a sticker before
        you go.
      </SlideText>
      <StickerImage
        src={fermitSticker}
        alt="Sticker design from the FerMIT Challenge. A blurry image of Building 10, the Great Dome, and Killian Court with the text “I got 50±50% on the FerMIT Challenge” with a banner saying ”Mind and Handwaving”"
      />
    </Slide>
    <Button type="button" onClick={onScore}>
      Score and Restart
    </Button>
  </>
);

const GeoguessrImage = styled(LinkedImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: white;
  background-image: url(${campusmap});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: crosshair;
`;

const QuestionSlide = ({
  question,
  idx,
  onSubmit,
}: {
  question: FermitQuestion;
  idx: number;
  onSubmit: (value?: FermitQuestionAnswer) => void;
}) => {
  const [value, setValue] = useState<number | "">("");
  const [showGeoGuessr, setShowGeoGuessr] = useState(false);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  }, []);
  const inputRef = useRef<HTMLInputElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coord, setCoord] = useState<[number, number] | undefined>(undefined);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw an X at the given coordinate
    if (coord) {
      const [x, y] = coord;
      context.strokeStyle = "red";
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(x - 20, y - 20);
      context.lineTo(x + 20, y + 20);
      context.moveTo(x + 20, y - 20);
      context.lineTo(x - 20, y + 20);
      context.stroke();
    }
  }, [showGeoGuessr, coord]);

  const onClickGeoguessr = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      const x = (canvas.width * (e.clientX - rect.left)) / rect.width;
      const y = (canvas.height * (e.clientY - rect.top)) / rect.height;
      setCoord([x, y]);
    },
    [canvasRef],
  );

  const nextSlide = useCallback(() => {
    setShowGeoGuessr(true);
  }, []);
  useEffect(() => {
    setShowGeoGuessr(false);
    setValue("");
    setCoord(undefined);
    inputRef.current?.focus();
  }, [question]);

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (question.geoguessr && coord) {
        onSubmit(coord);
        return;
      }
      if (!question.geoguessr && value !== "") {
        onSubmit(value);
        return;
      }
    },
    [question.geoguessr, coord, value, onSubmit],
  );

  return (
    <>
      <Slide $noPadding={showGeoGuessr}>
        {question.geoguessr && showGeoGuessr ? (
          <GeoguessrImage
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- this is a static dataset
            src={geoguessrLookup[question.geoguessr - 1]!}
            alt=""
          />
        ) : (
          <>
            <SlideHeader>Question {idx + 1}</SlideHeader>
            <SlideText>{question.text}</SlideText>
          </>
        )}
      </Slide>
      {!question.geoguessr && (
        <form onSubmit={submit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TextInput is a control */}
          <label>
            Your answer:
            <TextInput
              ref={inputRef}
              type="number"
              step="any"
              required
              value={value}
              onChange={onChange}
            />
          </label>
          <Button disabled={value === ""} type="submit">
            Submit
          </Button>
        </form>
      )}
      {question.geoguessr && !showGeoGuessr && (
        <NextSlideButton onSubmit={nextSlide} />
      )}
      {question.geoguessr && showGeoGuessr && (
        <>
          <br />
          <StyledCanvas
            ref={canvasRef}
            onClick={onClickGeoguessr}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
          />
          <form onSubmit={submit}>
            <Button disabled={coord === undefined} type="submit">
              Submit
            </Button>
          </form>
        </>
      )}
    </>
  );
};

const ResetModal = forwardRef(function ResetModalInner(
  { onDismiss, onReset }: { onDismiss: () => void; onReset: () => void },
  ref: React.Ref<HTMLDialogElement>,
) {
  const stopClickPropagation: React.MouseEventHandler<HTMLDialogElement> =
    useCallback((e) => {
      // We want to avoid propagating click events within the dialog outside of the dialog, so that we
      // can still have other "dismiss when an unhandled click bubbles up to me" elements in the DOM.
      e.stopPropagation();
    }, []);
  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onReset();
      onDismiss();
    },
    [onReset, onDismiss],
  );

  return (
    <StyledDialog ref={ref} onClick={stopClickPropagation}>
      <div
        style={{
          margin: "auto",
          width: "800px",
          maxWidth: "72vw",
          textWrap: "wrap",
        }}
      >
        <h1>Reset esTIMation dot jpg?</h1>
        <p>
          Resetting this puzzle’s state will clear all previous attempts at the
          FerMIT Challenge and reset the current attempt to the beginning with a
          new set of questions.
        </p>
        <DialogActions>
          <Button onClick={onSubmit}>Reset</Button>
          <ButtonSecondary onClick={onDismiss}>Cancel</ButtonSecondary>
        </DialogActions>
      </div>
    </StyledDialog>
  );
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const state = huntLocalStorage.getItem("estimation_dot_jpg_state");
    return state ? (JSON.parse(state) as State) : initialize();
  });
  useEffect(() => {
    huntLocalStorage.setItem("estimation_dot_jpg_state", JSON.stringify(state));
  }, [state]);

  const onSubmit = useCallback(
    (answer?: FermitQuestionAnswer) => {
      dispatch({ type: "advanceSlide", answer });
    },
    [dispatch],
  );
  const onScore = useCallback(() => {
    dispatch({ type: "score" });
  }, [dispatch]);
  const onReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const showModal = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    modalRef.current?.showModal();
  }, []);
  const dismissModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  let slide;
  const slideType = currentSlide(state);
  switch (slideType) {
    case "title":
      slide = <TitleSlide onSubmit={onSubmit} />;
      break;
    case "rules":
      slide = <RulesSlide onSubmit={onSubmit} />;
      break;
    case "geoguessrRules":
      slide = <GeoguessrRulesSlide onSubmit={onSubmit} />;
      break;
    case "question": {
      /* eslint-disable @typescript-eslint/no-non-null-assertion -- slideType of "question" guarantees this */
      const qid = state.currentQuestionIds[state.currentQuestionIdx]!;
      const question = QUESTIONS_BY_ID.get(qid)!;
      slide = (
        <QuestionSlide
          question={question}
          idx={state.currentQuestionIdx}
          onSubmit={onSubmit}
        />
      );
      break;
      /* eslint-enable @typescript-eslint/no-non-null-assertion -- slideType of "question" guarantees this */
    }
    case "final":
      slide = <FinalSlide onScore={onScore} />;
      break;
    default:
      slideType satisfies never;
      break;
  }

  const priorScores = state.attempts.map((entry, idx) => (
    <Result data={entry.data} key={idx} />
  ));

  const bottomText = priorScores.length > 0 && (
    <>
      <br />
      <div>
        Here&rsquo;s what you got from prior attempts. Participate again for
        approximately better results!
      </div>
      {priorScores}
    </>
  );

  return (
    <>
      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were invited to compete in the FerMIT
          Challenge, the Mystery Hunt&rsquo;s approximately-first estimation
          game show! They were encouraged to send up to three team members and
          warned that knowledge of MIT would be helpful.
        </p>

        <p>
          Once they arrived, they would be treated to a pub trivia style quiz
          where they would be asked a series of questions, mostly about MIT
          campus, MIT culture, or the MIT Mystery Hunt.
        </p>

        <center>
          <p>
            <LinkedImage
              src={fermitChallenge}
              alt="A photo of teams competing in the FerMIT Challenge"
            />
            <br />
            <em>
              (Our scorekeepers added a warning on the chalkboard that
              “Irrational and imaginary numbers will be approximated and
              converted at our sole discretion,” reminding teams that we can
              troll approximately as hard as they can.)
            </em>
          </p>
        </center>

        <br />

        <p>
          While we can no longer supervise the challenge for you, we have done
          our best to reproduce the approximate experience of the quiz below.
          Please imagine that a well-dressed, charismatic game show host is
          reading each slide out loud to you and holding you to a 45 second
          timer for each question.
        </p>

        <p>
          We’ve also excluded two questions that are hard to score outside of
          Mystery Hunt, but reproduced them here for your amusement:
        </p>

        <ul>
          <li>
            By the time this quiz show ends, how many puzzles will your team
            have solved?
          </li>
          <li>
            By the time this quiz show ends, how many answer submissions
            (whether correct or not) will ALL participating teams have submitted
            for this Mystery Hunt?
          </li>
        </ul>
      </AuthorsNoteBlock>

      <ResetModal ref={modalRef} onDismiss={dismissModal} onReset={onReset} />
      <p>
        <Button onClick={showModal}>Reset puzzle state</Button>
      </p>

      {slide}

      {bottomText}
    </>
  );
};

const elem = document.getElementById("estimation-dot-jpg-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #estimation-dot-jpg-root was nowhere to be found",
  );
}
