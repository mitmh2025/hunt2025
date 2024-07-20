import React, {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { TeamState } from "../../../lib/api/client";
import icon_solved from "../../assets/solved_status.svg";
import icon_unlocked from "../../assets/unlocked_status.svg";
import icon_unlockable from "../../assets/visible_status.svg";

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
        backgroundColor: "#eee",
      }}
    >
      <div style={{ margin: "auto", maxWidth: "800px" }}>
        <h1>Unlock puzzle {title}?</h1>
        <p>
          Unlocking this puzzle will spend {cost} of your team&rsquo;s{" "}
          {currency} available currency.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            margin: "8px",
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
    </div>
  );
};

const PuzzleIcon = ({
  puzzleState,
  size,
}: {
  puzzleState: TeamState["puzzles"][""];
  size?: number;
}) => {
  let bgImage = "";
  if (puzzleState.locked === "unlockable") {
    bgImage = icon_unlockable;
  } else if (puzzleState.locked === "unlocked") {
    if (puzzleState.answer !== undefined) {
      bgImage = icon_solved;
    } else {
      bgImage = icon_unlocked;
    }
  }
  return (
    <span
      className="puzzle-link-status-icon"
      style={{
        display: "inline-block",
        width: `${size}px`,
        height: `${size}px`,
        margin: "2px",
        verticalAlign: "middle",
        backgroundSize: "contain",
        backgroundImage: `url(${bgImage})`,
        transitionProperty: "width height font-size",
        transitionDuration: "0.5s",
      }}
    />
  );
};

const PuzzleLink = ({
  teamState,
  title,
  slug,
  showIcon = true,
  size = 24,
}: {
  teamState: TeamState;
  title: string;
  slug: string;
  showIcon?: boolean;
  size?: number;
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
  if (!puzzleState || puzzleState.locked === "locked") {
    // This slug was not visible to our current understanding of what puzzles exist,
    // or the puzzle is locked and there's nothing for us to show.
    return undefined;
  }

  const buttonDisabled = teamState.currency <= 0;
  return (
    <span
      className="puzzle-link"
      style={{
        transitionProperty: "font-size",
        transitionDuration: "0.5s",
        fontSize: `${size}px`,
      }}
    >
      {showIcon ? (
        <PuzzleIcon puzzleState={puzzleState} size={size} />
      ) : undefined}
      {puzzleState.locked === "unlocked" ? (
        <a className="puzzle-link-title" href={`/puzzles/${slug}`}>
          {title}
        </a>
      ) : (
        <span className="puzzle-link-title">{title}</span>
      )}{" "}
      {showUnlockButton && puzzleState.locked === "unlockable" ? (
        <button
          className="puzzle-unlock-button"
          disabled={buttonDisabled}
          onClick={showModal}
          style={{
            verticalAlign: "middle",
            height: `${size}px`,
            fontSize: `${size / 2}px`,
            transitionProperty: "height font-size",
          }}
        >
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
};

export default PuzzleLink;
