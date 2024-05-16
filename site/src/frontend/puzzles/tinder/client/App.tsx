"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import borderBottom from "./assets/border-bottom.png";
import borderLeft from "./assets/border-left.png";
import borderRight from "./assets/border-right.png";
import borderTop from "./assets/border-top.png";
import { data, type Entry } from "./constants";
import { Tinderable } from "./tinderable";

const cards: Record<string, Entry> = {};
data.forEach((c) => {
  cards[c.index] = c;
});

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's static data
  const [currentCard, setCurrentCard] = useState<Entry>(cards.node1!);
  const [animation, setAnimation] = useState<string | undefined>(undefined);

  const setCard = useCallback((id: string | undefined) => {
    if (id === undefined) {
      setAnimation("shaking");
      return;
    }
    const card = cards[id];
    if (card) {
      setCurrentCard(card);
    } else {
      setAnimation("shaking");
    }
  }, []);
  const onSwipeLeft = useCallback(() => {
    setCard(currentCard.left);
  }, [currentCard, setCard]);
  const onSwipeRight = useCallback(() => {
    setCard(currentCard.right);
  }, [currentCard, setCard]);

  const onAnimateLeft = useCallback(() => {
    const nextId = currentCard.left;
    if (nextId !== undefined && cards[nextId] !== undefined) {
      setAnimation("swipe-left");
    } else {
      setAnimation("shaking");
    }
  }, [currentCard]);
  const onAnimateRight = useCallback(() => {
    const nextId = currentCard.right;
    if (nextId !== undefined && cards[nextId] !== undefined) {
      setAnimation("swipe-right");
    } else {
      setAnimation("shaking");
    }
  }, [currentCard]);

  const onAnimationDone = useCallback(
    (animation: string) => {
      switch (animation) {
        case "swipe-left":
          onSwipeLeft();
          break;
        case "swipe-right":
          onSwipeRight();
          break;
        default:
        // nothing
      }

      setAnimation(undefined);
    },
    [onSwipeLeft, onSwipeRight],
  );

  const resetStack = useCallback(() => {
    setCard("node1");
  }, [setCard]);

  const tooltip = <Tooltip id="start-again-tooltip">Start again</Tooltip>;

  return (
    <div className="app-vertical">
      <img id="app-border-top" src={borderTop} alt="" />
      <div className="app-horizontal">
        <img id="app-border-left" src={borderLeft} alt="" />
        <div id="app-content">
          <Tinderable
            currentCard={currentCard}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            animation={animation}
            onAnimationDone={onAnimationDone}
          />
          <span className="app-buttons">
            <button onClick={onAnimateLeft}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={onAnimateRight}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </span>
        </div>
        <img id="app-border-right" src={borderRight} alt="" />
      </div>
      <div id="app-bottom">
        <img id="app-border-bottom" src={borderBottom} alt="" />
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <button onClick={resetStack}></button>
        </OverlayTrigger>
      </div>
    </div>
  );
}
