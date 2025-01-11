import React, {
  type MouseEventHandler,
  useCallback,
  useState,
  type Ref,
  useRef,
} from "react";
import { newClient } from "../../../../lib/api/client";
import StyledDialog, { DialogActions } from "../../components/StyledDialog";
import {
  Button,
  ButtonSecondary,
  StyledSelect,
} from "../../components/StyledUI";
import apiUrl from "../../utils/apiUrl";
import { type EventsState } from "./types";

type ModalState =
  | {
      state: "confirming";
    }
  | {
      state: "submitting";
    }
  | {
      state: "error";
      error: string;
    }
  | {
      state: "success";
      message: string;
    };

const ExchangeClueModal = React.forwardRef(function ExchangeClueModalInner(
  {
    onDismiss,
  }: {
    onDismiss: () => void;
  },
  ref: Ref<HTMLDialogElement>,
) {
  const [modalState, setModalState] = useState<ModalState>({
    state: "confirming",
  });

  const stopClickPropagation: MouseEventHandler<HTMLDialogElement> =
    useCallback((e) => {
      // We want to avoid propagating click events within the dialog outside of the dialog, so that we
      // can still have other "dismiss when an unhandled click bubbles up to me" elements in the DOM.
      e.stopPropagation();
    }, []);

  const onExchange: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (modalState.state !== "confirming") {
      return;
    }

    setModalState({ state: "submitting" });

    (async () => {
      const apiClient = newClient(apiUrl(), undefined);

      const result = await apiClient.exchangeStrongCurrency();

      if (result.status !== 200) {
        console.error(result);
        throw new Error(`Failed to exchange clue`);
      }

      setModalState({
        state: "success",
        message: `Exchanged 1 🔎 clue for ${result.body.currency} 🗝️ keys.`,
      });
    })().catch((e: unknown) => {
      console.error(e);
      setModalState({ state: "error", error: "Failed to exchange currency" });
    });
  }, [modalState]);

  const handleClose = useCallback(() => {
    onDismiss();
    setModalState({ state: "confirming" });
  }, [onDismiss]);

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
        <h1>Exchange clue for keys</h1>
        {(modalState.state === "confirming" ||
          modalState.state === "submitting") && (
          <>
            <p>Are you sure you want to exchange 1 🔎 clue for 3 🗝️ keys?</p>
            <DialogActions>
              <Button
                onClick={onExchange}
                disabled={modalState.state === "submitting"}
              >
                Exchange
              </Button>
              <ButtonSecondary
                onClick={handleClose}
                disabled={modalState.state === "submitting"}
              >
                Cancel
              </ButtonSecondary>
            </DialogActions>
          </>
        )}
        {modalState.state === "error" && (
          <>
            <p>{modalState.error}</p>
            <DialogActions>
              <ButtonSecondary onClick={handleClose}>Cancel</ButtonSecondary>
            </DialogActions>
          </>
        )}
        {modalState.state === "success" && (
          <>
            <p>{modalState.message}</p>
            <DialogActions>
              <ButtonSecondary onClick={handleClose}>Close</ButtonSecondary>
            </DialogActions>
          </>
        )}
      </div>
    </StyledDialog>
  );
});

const BuyAnswerModal = React.forwardRef(function ExchangeClueModalInner(
  {
    onDismiss,
    eventsState,
  }: {
    onDismiss: () => void;
    eventsState: EventsState;
  },
  ref: Ref<HTMLDialogElement>,
) {
  const [modalState, setModalState] = useState<ModalState>({
    state: "confirming",
  });

  const [puzzle, setPuzzle] = useState<{ slug: string; title: string } | null>(
    null,
  );

  const stopClickPropagation: MouseEventHandler<HTMLDialogElement> =
    useCallback((e) => {
      // We want to avoid propagating click events within the dialog outside of the dialog, so that we
      // can still have other "dismiss when an unhandled click bubbles up to me" elements in the DOM.
      e.stopPropagation();
    }, []);

  const onBuy: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (modalState.state !== "confirming") {
      return;
    }

    if (!puzzle) {
      return;
    }

    setModalState({ state: "submitting" });

    (async () => {
      const apiClient = newClient(apiUrl(), undefined);

      const result = await apiClient.buyPuzzleAnswer({
        params: {
          slug: puzzle.slug,
        },
      });

      if (result.status !== 200) {
        console.error(result);
        throw new Error(`Failed to buy answer`);
      }

      setModalState({
        state: "success",
        message: `Bought answer for ${puzzle.title}: ${result.body.answer}`,
      });
    })().catch((e: unknown) => {
      console.error(e);
      setModalState({ state: "error", error: "Failed to exchange currency" });
    });
  }, [modalState, puzzle]);

  const handleClose = useCallback(() => {
    onDismiss();
    setModalState({ state: "confirming" });
    setPuzzle(null);
  }, [onDismiss]);

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
        <h1>Buy a puzzle answer</h1>
        {(modalState.state === "confirming" ||
          modalState.state === "submitting") && (
          <>
            <p>Exchange 1 🔎 clue for the answer to a puzzle:</p>
            <div>
              <StyledSelect
                value={puzzle?.slug ?? ""}
                onChange={(e) => {
                  const slug = e.target.value;
                  const puzzle = eventsState.puzzlesCanBuyAnswerTo.find(
                    (p) => p.slug === slug,
                  );
                  if (puzzle) {
                    setPuzzle(puzzle);
                  } else {
                    setPuzzle(null);
                  }
                }}
              >
                <option value="">Select...</option>
                {eventsState.puzzlesCanBuyAnswerTo.map((puzzle) => (
                  <option key={puzzle.slug} value={puzzle.slug}>
                    {puzzle.title}
                  </option>
                ))}
              </StyledSelect>
            </div>
            <DialogActions>
              <Button
                onClick={onBuy}
                disabled={modalState.state === "submitting" || !puzzle}
              >
                Buy Answer
              </Button>
              <ButtonSecondary
                onClick={handleClose}
                disabled={modalState.state === "submitting"}
              >
                Cancel
              </ButtonSecondary>
            </DialogActions>
          </>
        )}
        {modalState.state === "error" && (
          <>
            <p>{modalState.error}</p>
            <DialogActions>
              <ButtonSecondary onClick={handleClose}>Cancel</ButtonSecondary>
            </DialogActions>
          </>
        )}
        {modalState.state === "success" && (
          <>
            <p>{modalState.message}</p>
            <DialogActions>
              <ButtonSecondary onClick={handleClose}>Close</ButtonSecondary>
            </DialogActions>
          </>
        )}
      </div>
    </StyledDialog>
  );
});

export default function CluesManager({ state }: { state: EventsState }) {
  const exchangeModalRef = useRef<HTMLDialogElement>(null);
  const buyAnswerModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <p>
        You have {state.strongCurrency}{" "}
        {state.strongCurrency === 1 ? "clue" : "clues"} available.
      </p>

      <div>
        <Button
          onClick={() => {
            exchangeModalRef.current?.showModal();
          }}
        >
          Exchange 1 🔎 for 3 🗝️
        </Button>
        <Button
          onClick={() => {
            buyAnswerModalRef.current?.showModal();
          }}
        >
          Exchange 1 🔎 for a puzzle answer
        </Button>
        <ExchangeClueModal
          ref={exchangeModalRef}
          onDismiss={() => {
            exchangeModalRef.current?.close();
          }}
        />
        <BuyAnswerModal
          ref={buyAnswerModalRef}
          onDismiss={() => {
            buyAnswerModalRef.current?.close();
          }}
          eventsState={state}
        />
      </div>
    </div>
  );
}
