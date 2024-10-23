import React, {
  type MouseEventHandler,
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import icon_solved from "../../assets/solved_status.svg";
import icon_unlock from "../../assets/unlock-icon.svg";
import icon_unlocked from "../../assets/unlocked_status.svg";
import icon_unlockable from "../../assets/visible_status.svg";
import { Button } from "./StyledUI";

const StyledDialog = styled.dialog`
  font-size: 24px;

  &::backdrop {
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

const PuzzleUnlockModal = React.forwardRef(function PuzzleUnlockModalInner(
  {
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
  },
  ref: Ref<HTMLDialogElement>,
) {
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
    <StyledDialog ref={ref} onClick={stopClickPropagation}>
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
    </StyledDialog>
  );
});

export const PuzzleIcon = ({
  lockState,
  answer,
  size,
}: {
  lockState: "unlockable" | "unlocked" | "locked";
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
        transitionProperty: "width height font-size",
        transitionDuration: "0.5s",
        backgroundRepeat: "no-repeat",
        flex: "0 0 auto",
      }}
    />
  );
};

const PuzzleLink = ({
  lockState,
  answer,
  currency,
  title,
  slug,
  showIcon = true,
  size = 24,
}: {
  lockState: "unlocked" | "unlockable" | "locked";
  answer?: string;
  currency: number;
  title: string;
  slug: string;
  showIcon?: boolean;
  size?: number;
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

  if (lockState === "locked") {
    // This slug was not visible to our current understanding of what puzzles exist,
    // or the puzzle is locked and there's nothing for us to show.
    return undefined;
  }

  const buttonDisabled = currency <= 0;
  return (
    <span
      className={`puzzle-link ${answer ? "solved" : "unsolved"} ${lockState}`}
      style={{
        transitionProperty: "font-size",
        transitionDuration: "0.5s",
        fontSize: `${size}px`,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {showIcon ? (
        <PuzzleIcon lockState={lockState} answer={answer} size={size} />
      ) : undefined}
      {lockState === "unlocked" ? (
        <a className="puzzle-link-title" href={`/puzzles/${slug}`}>
          {title}
        </a>
      ) : (
        <span className="puzzle-link-title">{title}</span>
      )}{" "}
      {showUnlockButton && lockState === "unlockable" ? (
        <>
          <PuzzleUnlockModal
            ref={modalRef}
            title={title}
            slug={slug}
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
            <span>Unlock</span>
          </Button>
        </>
      ) : undefined}
    </span>
  );
};

export default PuzzleLink;
