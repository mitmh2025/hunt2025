import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const Count = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--headline-font);
`;

// A component which animates a grey spinner between startTime and endTime like
//     _____         __            __            __            __            __
//    /  _  \       /  |  _       /  |          /  |          /  |          /  |           |
//   /  / \  \     /  /  \ \     /  /          /  /          /  /           \_/
//  |  |   | | -> |  |   | | -> |  |   --| -> |  |       -> |  |       ->            ->
//   \  \_/  /     \  \_/  /     \  \_/  /     \  \_         \_/
//    \_____/       \_____/       \_____/       \__|
//
//   startTime                              halfway between                             endTime
const SpinnerTimer = ({
  width,
  height,
  startTime,
  endTime,
  className,
  color = "#c7c7bb",
  syncedTime,
  disableColorChange,
}: {
  width: number;
  height: number;
  startTime: number;
  endTime: number;
  className?: string;
  color?: string;
  syncedTime?: { getCurrentTime: () => number };
  disableColorChange?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const periodicHandle = useRef<number | undefined>(undefined);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    Math.max(
      Math.round(
        (endTime - (syncedTime ? syncedTime.getCurrentTime() : Date.now())) /
          1000,
      ),
      0,
    ),
  );

  const drawSpinner = useCallback(() => {
    // request repaint on next animation frame
    periodicHandle.current = window.requestAnimationFrame(drawSpinner);

    // Compute fraction of spinner we should show (100% if <= startTime, 0% if >= endTime)
    const now = syncedTime ? syncedTime.getCurrentTime() : Date.now();
    let frac: number;
    if (now < startTime) {
      frac = 1;
    } else if (now > endTime) {
      frac = 0;
    } else {
      frac = (now - startTime) / (endTime - startTime);
    }

    setRemainingSeconds(Math.max(Math.round((endTime - now) / 1000), 0));

    // paint, if we have a canvas, the outline of an arc:
    const centerX = width / 2;
    const centerY = height / 2;

    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = (outerRadius * 2) / 3;

    const startRadians = frac * (Math.PI * 2) + (3 * Math.PI) / 2;
    const endRadians = (3 * Math.PI) / 2;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        let computedColor = color;

        if (!disableColorChange) {
          if (frac > 0.75) {
            computedColor = "#be9d29"; // gold-600
          }
          if (frac > 0.9) {
            computedColor = "#ab371d"; // red-600
          }
        }

        ctx.fillStyle = computedColor;
        ctx.beginPath();
        // outer arc
        ctx.arc(centerX, centerY, outerRadius, startRadians, endRadians);
        // line to inner arc at endRadians, which is always just straight up
        ctx.lineTo(centerX, centerY + innerRadius);
        // inner arc
        ctx.arc(centerX, centerY, innerRadius, endRadians, startRadians, true);
        // fill to close
        ctx.fill();

        if (frac === 0) {
          // show a faded circle behind the zero
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }, [
    startTime,
    endTime,
    width,
    height,
    color,
    syncedTime,
    disableColorChange,
  ]);

  useEffect(() => {
    if (!periodicHandle.current) {
      periodicHandle.current = window.requestAnimationFrame(drawSpinner);
    }
    return () => {
      if (periodicHandle.current) {
        window.cancelAnimationFrame(periodicHandle.current);
        periodicHandle.current = undefined;
      }
    };
  }, [drawSpinner]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
      }}
    >
      <canvas
        className={className}
        ref={canvasRef}
        width={width}
        height={height}
      />
      <Count
        style={{
          color: color,
          fontSize: `${remainingSeconds < 100 ? height / 2 : height / 3}px`,
        }}
      >
        {remainingSeconds}
      </Count>
    </div>
  );
};

export default SpinnerTimer;
