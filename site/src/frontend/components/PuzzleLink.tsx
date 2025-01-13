import React, {
  type MouseEventHandler,
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { type PuzzleState, newClient } from "../../../lib/api/client";
import icon_solved from "../../assets/solved_status.svg";
import icon_unlock from "../../assets/unlock-icon.svg";
import icon_unlocked from "../../assets/unlocked_status.svg";
import icon_unlockable from "../../assets/visible_status.svg";
import apiUrl from "../utils/apiUrl";
import StyledDialog, { DialogActions } from "./StyledDialog";
import { Button, ButtonSecondary } from "./StyledUI";

export type LockState = "unlockable" | "unlocked" | "locked";

type PuzzleBaseState = {
  slug: string;
  title: string;
  state: "unlocked" | "unlockable" | "locked";
  answer?: string;
  desc?: string;
};

type PuzzleStateHandle = [
  PuzzleBaseState,
  (handleApiResponse: PuzzleState) => void,
];

export function usePuzzleState(
  wsEpoch: number,
  wsState: PuzzleBaseState,
): PuzzleStateHandle {
  const [apiState, setApiState] = useState<PuzzleState | null>(null);

  let finalState: PuzzleBaseState = wsState;
  if (apiState && apiState.epoch > wsEpoch) {
    finalState = {
      ...finalState,
      answer: apiState.answer,
      state: apiState.locked,
    };
  }
  return [finalState, setApiState];
}

export const PuzzleUnlockModal = React.forwardRef(
  function PuzzleUnlockModalInner(
    {
      onDismiss,
      cost,
      currency,
      stateHandle,
    }: {
      onDismiss: () => void;
      cost: number;
      currency: number;
      stateHandle: PuzzleStateHandle;
    },
    ref: Ref<HTMLDialogElement>,
  ) {
    const [{ slug, title, desc }, setApiState] = stateHandle;
    const [fetching, setFetching] = useState<boolean>(false);
    const stopClickPropagation: MouseEventHandler<HTMLDialogElement> =
      useCallback((e) => {
        // We want to avoid propagating click events within the dialog outside of the dialog, so that we
        // can still have other "dismiss when an unhandled click bubbles up to me" elements in the DOM.
        e.stopPropagation();
      }, []);
    const onUnlock: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
      // Avoid double-fetching
      if (fetching) {
        return;
      }
      setFetching(true);

      const apiClient = newClient(apiUrl(), undefined);
      apiClient
        .unlockPuzzle({
          params: {
            slug,
          },
        })
        .then((result) => {
          setFetching(false);
          if (result.status === 200) {
            setApiState(result.body);
            onDismiss();
          }
        })
        .catch((err: unknown) => {
          console.error("Failed to unlock puzzle", err);
          setFetching(false);
        });

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
    }, [fetching, onDismiss, slug, setApiState]);
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
          <h1>Unlock puzzle {title}?</h1>
          {desc ? <p>{desc}</p> : undefined}
          <p>
            Unlocking this puzzle will spend {cost} of your team‘s {currency}{" "}
            available key{currency === 1 ? "" : "s"}.
          </p>
          <DialogActions>
            <Button disabled={fetching} onClick={onUnlock}>
              Unlock
            </Button>
            <ButtonSecondary disabled={fetching} onClick={onDismiss}>
              Cancel
            </ButtonSecondary>
          </DialogActions>
        </div>
      </StyledDialog>
    );
  },
);

export const PuzzleIcon = ({
  lockState,
  answer,
  size = 24,
}: {
  lockState: LockState;
  answer?: string;
  size?: number;
}) => {
  let bgImage = "";
  if (lockState === "unlockable") {
    bgImage = icon_unlockable;
  } else if (lockState === "unlocked") {
    if (answer !== undefined) {
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
        verticalAlign: "middle",
        backgroundSize: "contain",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        flex: "0 0 auto",
      }}
    />
  );
};

const LinkWrapper = styled.span`
  transition-property: font-size;
  transition-duration: 0.5s;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;

  .puzzle-link-status-icon {
    flex: 0;
  }

  .puzzle-link-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    flex: 0;
  }
`;

const PuzzleLink = ({
  epoch,
  lockState,
  answer,
  currency,
  title,
  slug,
  desc,
  showIcon = true,
  showLabel = true,
  size = 24,
  style = {},
}: {
  epoch: number;
  lockState: LockState;
  answer?: string;
  currency: number;
  title: string;
  slug: string;
  desc?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  size?: number;
  style?: React.CSSProperties;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  // Avoid including the unlock button (which needs click handlers) in SSR contexts
  const [showUnlockButton, setShowUnlockButton] = useState<boolean>(false);
  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();
    modalRef.current?.showModal();
  }, []);

  const dismissModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  useEffect(() => {
    setShowUnlockButton(true);
  }, []);

  const puzzleStateHandle = usePuzzleState(epoch, {
    slug,
    title,
    state: lockState,
    answer,
    desc,
  });

  const [puzzleState] = puzzleStateHandle;

  if (lockState === "locked") {
    // This slug was not visible to our current understanding of what puzzles exist,
    // or the puzzle is locked and there's nothing for us to show.
    return undefined;
  }

  const buttonDisabled = currency <= 0;
  return (
    <LinkWrapper
      className={`puzzle-link ${answer ? "solved" : "unsolved"} ${puzzleState.state}`}
      style={{
        fontSize: `${size}px`,
        ...style,
      }}
    >
      {showIcon ? (
        <PuzzleIcon
          lockState={puzzleState.state}
          answer={puzzleState.answer}
          size={size}
        />
      ) : undefined}
      {puzzleState.state === "unlocked" ? (
        <a className="puzzle-link-title" href={`/puzzles/${slug}`}>
          {title}
        </a>
      ) : (
        <span className="puzzle-link-title">{title}</span>
      )}{" "}
      {showUnlockButton && puzzleState.state === "unlockable" ? (
        <>
          <PuzzleUnlockModal
            ref={modalRef}
            stateHandle={puzzleStateHandle}
            onDismiss={dismissModal}
            cost={1}
            currency={currency}
          />
          <Button
            className="puzzle-unlock-button"
            disabled={buttonDisabled}
            onClick={showModal}
            style={{
              verticalAlign: "middle",
              height: `${size + 4}px`,
              fontSize: `${size / 2}px`,
              transitionProperty: "height font-size",
              gap: `${size / 8}px`,
            }}
          >
            <span
              className="puzzle-link-status-icon"
              style={{
                display: "inline-block",
                width: `${size / 2}px`,
                height: `${size / 2}px`,
                verticalAlign: "middle",
                backgroundSize: "contain",
                backgroundImage: `url(${icon_unlock})`,
                transitionProperty: "width height font-size",
                transitionDuration: "0.5s",
                backgroundRepeat: "no-repeat",
                flex: "0 0 auto",
              }}
            />
            <span style={{ display: showLabel ? "inline" : "none" }}>
              Unlock
            </span>
          </Button>
        </>
      ) : undefined}
    </LinkWrapper>
  );
};

export default PuzzleLink;
