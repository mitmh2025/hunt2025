"use client";

import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  type ForwardedRef,
} from "react";
import Hammer from "react-hammerjs";
import type { Entry } from "./constants";

const Card = React.forwardRef(
  (
    { image, text = "Default text" }: { image: string; text: string },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className="card">
        <div className="image">
          <img
            src={image}
            alt="If you don't see this, please check your internet connection."
          />
        </div>
        <p>Screenname: {text}</p>
      </div>
    );
  },
);
Card.displayName = "Card";

export const Tinderable = ({
  onSwipeLeft,
  onSwipeRight,
  onAnimationDone,
  animation,
  currentCard,
}: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onAnimationDone: (animation: string) => void;
  animation: string | undefined;
  currentCard: Entry;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const resetPosition = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  const handleSwipe = useCallback(
    (ev: { direction: number }) => {
      resetPosition();
      if (ev.direction === 2) {
        onSwipeLeft();
      } else if (ev.direction === 4) {
        onSwipeRight();
      }
    },
    [resetPosition, onSwipeLeft, onSwipeRight],
  );

  const onAnimationDoneCb = useCallback(
    (ev: { animationName: string }) => {
      onAnimationDone(ev.animationName);
    },
    [onAnimationDone],
  );
  const handlePan = useCallback((ev: { deltaX: number; deltaY: number }) => {
    setPos({ x: ev.deltaX, y: ev.deltaY });
  }, []);
  const handlePanEnd = useCallback(
    (ev: { deltaX: number; deltaY: number }) => {
      resetPosition();
      if (ev.deltaX > 150) {
        onSwipeRight();
      } else if (ev.deltaX < -150) {
        onSwipeLeft();
      }
    },
    [resetPosition, onSwipeLeft, onSwipeRight],
  );

  useEffect(() => {
    const refThunk = cardRef.current;
    if (refThunk) {
      refThunk.addEventListener("animationend", onAnimationDoneCb);
    }

    return () => {
      if (refThunk) {
        refThunk.removeEventListener("animationend", onAnimationDoneCb);
      }
    };
  });

  const hammerOptions = {
    recognizers: {
      swipe: { threshold: 0 },
    },
  };

  const x = Math.min(Math.max(-200, pos.x), 200);
  const y = Math.min(Math.max(-200, pos.y), 200);

  const position = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
  };

  return (
    <div ref={cardRef} className={`screen ${animation}`} style={position}>
      <Hammer
        options={hammerOptions}
        onSwipe={handleSwipe}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onPanCancel={resetPosition}
        key={`hammer-${currentCard.index}`}
      >
        <Card {...currentCard} key={`card-${currentCard.index}`} />
      </Hammer>
    </div>
  );
};
