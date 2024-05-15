"use client"

import React, { Component, useCallback, useEffect, useState, useRef } from "react";
import Hammer from "react-hammerjs";

const Card = React.forwardRef(({image, text = "Default text"}, ref) => {
  return (
    <div ref={ref} className="card">
      <div className="image">
        <img
          src={image}
          alt="If you don't see this image, please check your internet connection."
        />
      </div>
      <p>Screenname: {text}</p>
    </div>
  );
});

export const Tinderable = ({ onSwipeLeft, onSwipeRight, onAnimationDone, animation, currentCard, ...rest }) => {

  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0});

  const resetPosition = useCallback(() => {
    setPos({ x: 0, y: 0});
  }, []);

  const handleSwipe = useCallback((ev) => {
    resetPosition()
    if (ev.direction === 2) {
      onSwipeLeft();
    } else if (ev.direction === 4) {
      onSwipeRight();
    }
  }, []);

  const onAnimationDoneCb = useCallback((ev) => {
    onAnimationDone(ev.animationName);
  });
  const handlePan = useCallback((ev) => {
    setPos({ x: ev.deltaX, y: ev.deltaY });
  }, []);
  const handlePanEnd = useCallback((ev) => {
    resetPosition();
    if (ev.deltaX > 150) {
      onSwipeRight();
    } else if (ev.deltaX < -150) {
      onSwipeLeft();
    }
  }, [resetPosition]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener("animationend", onAnimationDoneCb);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("animationend", onAnimationDoneCb);
      }
    };
  });


  const hammerOptions = {
    swipe: {
      threshold: 0,
    },
  };

  const x = Math.min(Math.max(-200, pos.x), 200);
  const y = Math.min(Math.max(-200, pos.y), 200);

  const position = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
  };

  return (
    <div
      ref={cardRef}
      className={`screen ${animation}`}
      style={position}
    >
      <Hammer
        options={hammerOptions}
        onSwipe={handleSwipe}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onPanCancel={resetPosition}
        key={`hammer-${currentCard.index}`}
      >
        <Card
          {...currentCard}
          key={`card-${currentCard.index}`}
        />
      </Hammer>
    </div>
  );
};
