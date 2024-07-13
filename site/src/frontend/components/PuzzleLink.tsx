import React, {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { TeamState } from "../../../lib/api/client";

const PuzzleUnlockModal = ({
  title,
  slug,
  onDismiss,
  cost,
  currency,
}: {
  title: string;
  slug: string;
  onDismiss: () => void;
  cost: number;
  currency: number;
}) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const onUnlock: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    // Avoid double-fetching
    if (fetching) {
      return;
    }
    setFetching(true);
    fetch(`/puzzles/${slug}/unlock`, {
      method: "POST",
    }).then(
      (result) => {
        setFetching(false);
        if (result.ok) {
          onDismiss();
        }
      },
      () => {
        setFetching(false);
      },
    );
  }, [fetching, onDismiss, slug]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <h1>Unlock puzzle {title}?</h1>
      <p>
        Unlocking this puzzle will spend {cost} of your team&rsquo;s {currency}{" "}
        available currency.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <button disabled={fetching} onClick={onUnlock}>
          Unlock
        </button>
        <button disabled={fetching} onClick={onDismiss}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const PuzzleLink = ({
  teamState,
  title,
  slug,
}: {
  teamState: TeamState;
  title: string;
  slug: string;
}) => {
  const [modalShown, setModalShown] = useState<boolean>(false);
  // Avoid including the unlock button (which needs click handlers) in SSR contexts
  const [showUnlockButton, setShowUnlockButton] = useState<boolean>(false);
  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setModalShown(true);
  }, []);

  const dismissModal = useCallback(() => {
    setModalShown(false);
  }, []);

  useEffect(() => {
    setShowUnlockButton(true);
  }, []);

  const puzzleState = teamState.puzzles[slug];
  if (!puzzleState) {
    // This slug was not visible to our current understanding of what puzzles exist.
    return undefined;
  }

  if (puzzleState.locked === "unlockable") {
    const buttonDisabled = teamState.currency <= 0;
    return (
      <span className="puzzle-summary">
        {"🔓 "}
        {title}{" "}
        {showUnlockButton ? (
          <button disabled={buttonDisabled} onClick={showModal}>
            Unlock
          </button>
        ) : undefined}
        {modalShown
          ? createPortal(
              <PuzzleUnlockModal
                title={title}
                slug={slug}
                onDismiss={dismissModal}
                cost={1}
                currency={teamState.currency}
              />,
              document.body,
            )
          : undefined}
      </span>
    );
  }

  if (puzzleState.locked === "unlocked") {
    const showCheck = puzzleState.answer !== undefined;
    return (
      <span className="puzzle-summary">
        {showCheck ? "✅ " : ""}
        <a href={`/puzzles/${slug}`}>{title}</a>
      </span>
    );
  }

  // Puzzle is locked, there's nothing for us to show.
  return undefined;
};

export default PuzzleLink;
