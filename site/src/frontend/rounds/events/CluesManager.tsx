import React, { useRef } from "react";
import { BuyAnswerModal, ExchangeClueModal } from "../../components/ClueModals";
import { Button } from "../../components/StyledUI";
import { type EventsState } from "./types";

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
