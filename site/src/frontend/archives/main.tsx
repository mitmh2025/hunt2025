import React, { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import {
  fetchActivityLog,
  generateCompleteLogs,
  initializeLogs,
} from "../../../lib/api/archive/log";
import { reduceTeamStateIntermediate } from "../../../lib/api/archive/reducers";
import { AuthorsNoteBlock } from "../components/PuzzleLayout";
import { Button } from "../components/StyledUI";
import rootUrl from "../utils/rootUrl";

const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 50%;
  padding: 2rem;
`;

const InitializeActivityLogModal = ({ unmount }: { unmount: () => void }) => {
  const [disable, setDisable] = useState(false);

  const handleReset = useCallback(() => {
    void (async () => {
      setDisable(true);
      try {
        await initializeLogs();
        unmount();
      } finally {
        setDisable(false);
      }
    })();
  }, [unmount]);

  const handleEnd = useCallback(() => {
    void (async () => {
      setDisable(true);
      try {
        await generateCompleteLogs();
        unmount();
      } finally {
        setDisable(false);
      }
    })();
  }, [unmount]);

  return (
    <ModalBackdrop>
      <ModalContent>
        <AuthorsNoteBlock>
          <p>
            Welcome to the 2025 MIT Mystery Hunt: The Case of the Shadow
            Diamond!
          </p>

          <p>
            Right now, the Hunt hasn’t started yet. If you’d like, you can start
            at the beginning of the Hunt — this archival site supports as much
            of the original unlock structure as we were able to manage.
            Alternatively, you can skip to what the Hunt website looked like by
            the time a team had finished.
          </p>

          <p>
            If you change your mind or want to share your current state with
            someone else, you can do so on the{" "}
            <a href={`${rootUrl}/team`}>Manage Team page</a>.
          </p>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={handleReset} disabled={disable}>
              Start the Hunt from beginning
            </Button>
            <Button onClick={handleEnd} disabled={disable}>
              Explore from the end
            </Button>
          </div>
        </AuthorsNoteBlock>
      </ModalContent>
    </ModalBackdrop>
  );
};

const LockedModal = ({ unmount }: { unmount: () => void }) => {
  return (
    <ModalBackdrop onClick={unmount}>
      <ModalContent>
        <AuthorsNoteBlock>
          <p>
            You’ve managed to find your way to a page that should be locked
            given your current state of progression through the Hunt. You can
            view it anyway, but keep in mind that interacting with this page
            (e.g. by guessing at the puzzle’s answer) may not work as expected.
          </p>

          <p>
            You can always <a href={`${rootUrl}/`}>return to the Hub</a> to find
            the content that should currently be available to you.
          </p>

          <p>
            If you’d like to reset your local state to the end of the Hunt,
            ensuring that this page is unlocked, you can do so on the{" "}
            <a href={`${rootUrl}/team`}>Manage Team page</a>
          </p>
        </AuthorsNoteBlock>
      </ModalContent>
    </ModalBackdrop>
  );
};

const huntPage = location.pathname.startsWith(rootUrl);

const huntStarted = fetchActivityLog().some(
  (e) => e.type === "gate_completed" && e.slug === "hunt_started",
);

const checkLocked = () => {
  const puzzleSlug = (window as unknown as { puzzleSlug?: string }).puzzleSlug;
  const parentSlug = (window as unknown as { parentSlug?: string }).parentSlug;
  const interactionSlug = (window as unknown as { interactionSlug?: string })
    .interactionSlug;

  if (!puzzleSlug && !interactionSlug) return;

  const state = reduceTeamStateIntermediate(fetchActivityLog());
  const locked =
    (puzzleSlug !== undefined &&
      parentSlug === undefined &&
      !state.puzzles_unlocked.has(puzzleSlug)) ||
    (interactionSlug !== undefined &&
      !state.interactions_unlocked.has(interactionSlug));

  if (locked) {
    const rootElem = document.createElement("div");
    document.body.appendChild(rootElem);
    const root = createRoot(rootElem);
    root.render(
      <LockedModal
        unmount={() => {
          root.unmount();
        }}
      />,
    );
  }
};

if (huntPage && !huntStarted) {
  const rootElem = document.createElement("div");
  document.body.appendChild(rootElem);
  const root = createRoot(rootElem);
  root.render(
    <InitializeActivityLogModal
      unmount={() => {
        root.unmount();
        checkLocked();
      }}
    />,
  );
} else {
  checkLocked();
}
