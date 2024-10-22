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
import { Button, ButtonSecondary } from "./StyledUI";

const StyledDialog = styled.dialog`
  font-size: 24px;
  font-family: var(--body-font);
  background-color: var(--white);
  color: var(--black);
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  text-align: left;

  &::backdrop {
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

const DialogActions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0.5rem;
  gap: 0.5rem;

  button {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const PuzzleUnlockModal = React.forwardRef(
  function PuzzleUnlockModalInner(
    {
      title,
      slug,
      onDismiss,
      cost,
      currency,
      desc,
    }: {
      title: string;
      slug: string;
      onDismiss: () => void;
      cost: number;
      currency: number;
      desc?: string;
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
            Unlocking this puzzle will spend {cost} of your team&rsquo;s{" "}
            {currency} available currency.
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
  lockState,
  answer,
  currency,
  title,
  slug,
  showIcon = true,
  showLabel = true,
  size = 24,
  style = {},
}: {
  lockState: "unlocked" | "unlockable" | "locked";
  answer?: string;
  currency: number;
  title: string;
  slug: string;
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

  if (lockState === "locked") {
    // This slug was not visible to our current understanding of what puzzles exist,
    // or the puzzle is locked and there's nothing for us to show.
    return undefined;
  }

  const buttonDisabled = currency <= 0;
  return (
    <LinkWrapper
      className={`puzzle-link ${answer ? "solved" : "unsolved"} ${lockState}`}
      style={{
        fontSize: `${size}px`,
        ...style,
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
