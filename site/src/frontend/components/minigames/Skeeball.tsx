import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import getConfetti from "./confetti";
import crash from "./skeeballAssets/crash.mp3";
import caption from "./skeeballAssets/crash.vtt";

const WIDTH = 400;
const HEIGHT = 500;
const BROWN = "#97714e";
const DARK_BROWN = "#684d34";
const BALL = "#bf6f23";
const HOLE = "#1e1c1c";
const CREAM = "#fffcf0";
const SUCCESS_RANGE = 0.4;
const MAJOR_SUCCESS_RANGE = 0.2;
const CRIT_SUCCESS_RANGE = SUCCESS_RANGE / 10;

const Wrapper = styled.div`
  h2 {
    text-align: center;
  }
`;

const Backdrop = styled.canvas`
  background-color: var(--gray-300);
  margin: 0 auto;
  overflow: hidden;
`;

const Ball = styled.div`
  position: absolute;
  top: ${HEIGHT}px;
  left: 140px;
  height: 30px;
  width: 30px;
  background-color: ${BALL};
  border-radius: 16px;
  transition:
    top 0.6s ease-out,
    left 0.6s linear;
`;

type Position = { x: number; y: number };

const Skeeball = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const crashRef = useRef<HTMLAudioElement | null>(null);
  const periodicHandle = useRef<number | undefined>(undefined);
  const [score, setScore] = useState<number>(0);
  const [tries, setTries] = useState<number>(3);
  const [frozenVelocity, setFrozenVelocity] = useState<number | null>(null);
  const [ballDestination, setBallDestination] = useState<Position | null>(null);

  function drawRing(
    ctx: CanvasRenderingContext2D,
    radius: number,
    thickness: number,
    position: Position,
    fill?: string,
  ) {
    if (fill) {
      ctx.fillStyle = fill ?? CREAM;
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }

    if (thickness) {
      ctx.lineWidth = thickness;
      ctx.beginPath();
      ctx.strokeStyle = DARK_BROWN;
      ctx.arc(position.x, position.y + thickness, radius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = BROWN;
      ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  const drawBall = useCallback(
    (ctx: CanvasRenderingContext2D, position: Position) => {
      ctx.fillStyle = BALL;
      ctx.beginPath();
      ctx.arc(position.x, position.y, 20, 0, 2 * Math.PI);
      ctx.fill();
    },
    [],
  );

  const getIndicatorPosition = useCallback(() => {
    if (frozenVelocity !== null) {
      return frozenVelocity;
    }
    if (tries < 1) {
      return null;
    }
    const clock = 1000;
    const now = Date.now();
    const step = now % clock;
    const direction = now % (clock * 2);
    // alternate directions
    if (direction > clock) {
      return step / clock;
    } else {
      return 1 - step / clock;
    }
  }, [frozenVelocity, tries]);

  const drawForceMeter = useCallback(
    (ctx: CanvasRenderingContext2D, skeeBallWidth: number) => {
      // start force-o-meter
      const forceWidth = WIDTH - skeeBallWidth;
      const meterTop = HEIGHT / 3;
      const meterHeight = HEIGHT - 10 - meterTop;
      const indicatorSize = CRIT_SUCCESS_RANGE / 3;

      ctx.fillStyle = DARK_BROWN;
      ctx.beginPath();
      ctx.rect(skeeBallWidth, 0, forceWidth, HEIGHT);
      ctx.fill();

      for (let i = 0; i < tries; i++) {
        drawBall(ctx, { x: skeeBallWidth + forceWidth / 2, y: 25 + 45 * i });
      }

      ctx.beginPath();
      ctx.strokeStyle = "#1b1a18";
      ctx.moveTo(skeeBallWidth + forceWidth / 2, meterTop);
      ctx.lineTo(skeeBallWidth + forceWidth / 2, HEIGHT - 10);
      ctx.lineWidth = forceWidth / 8;
      ctx.stroke();

      // target range
      ctx.beginPath();
      ctx.strokeStyle = "#ddd01b";
      ctx.moveTo(
        skeeBallWidth + forceWidth / 2,
        meterTop + meterHeight / 2 - (SUCCESS_RANGE * meterHeight) / 2,
      );
      ctx.lineTo(
        skeeBallWidth + forceWidth / 2,
        meterTop + meterHeight / 2 + (SUCCESS_RANGE * meterHeight) / 2,
      );
      ctx.lineWidth = forceWidth / 3;
      ctx.stroke();

      // better target range
      ctx.beginPath();
      ctx.strokeStyle = "#bb8e06";
      ctx.moveTo(
        skeeBallWidth + forceWidth / 2,
        meterTop + meterHeight / 2 - (MAJOR_SUCCESS_RANGE * meterHeight) / 2,
      );
      ctx.lineTo(
        skeeBallWidth + forceWidth / 2,
        meterTop + meterHeight / 2 + (MAJOR_SUCCESS_RANGE * meterHeight) / 2,
      );
      ctx.lineWidth = forceWidth / 3;
      ctx.stroke();

      // ideal target
      ctx.beginPath();
      ctx.strokeStyle = "#b3200c";
      ctx.moveTo(
        skeeBallWidth + forceWidth / 2,
        meterTop + meterHeight / 2 - (CRIT_SUCCESS_RANGE * meterHeight) / 2,
      );
      ctx.lineTo(
        skeeBallWidth + forceWidth / 2,
        meterTop + meterHeight / 2 + (CRIT_SUCCESS_RANGE * meterHeight) / 2,
      );
      ctx.lineWidth = (forceWidth * 2) / 3;
      ctx.stroke();

      // indicator
      ctx.beginPath();
      ctx.strokeStyle = "white";
      const indicatorPositionMultiplier = getIndicatorPosition();
      if (indicatorPositionMultiplier !== null) {
        ctx.moveTo(
          skeeBallWidth + forceWidth / 2,
          meterTop +
            meterHeight * indicatorPositionMultiplier -
            (indicatorSize * meterHeight) / 2,
        );
        ctx.lineTo(
          skeeBallWidth + forceWidth / 2,
          meterTop +
            meterHeight * indicatorPositionMultiplier +
            (indicatorSize * meterHeight) / 2,
        );
        ctx.lineWidth = (forceWidth * 2) / 3 - 6;
        ctx.stroke();
      }
    },
    [frozenVelocity, tries],
  );

  const drawLabel = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      text: string,
      position: Position,
      fontSize?: number,
    ) => {
      ctx.fillStyle = "white";
      ctx.font = `${fontSize ?? 24}px Belanosima`;
      ctx.fillText(text, position.x, position.y);
    },
    [],
  );

  const drawSkeeball = useCallback(
    (ctx: CanvasRenderingContext2D, skeeBallWidth: number) => {
      const ringWidth = 8;
      const centerX = skeeBallWidth / 2;
      const mainCenterY = skeeBallWidth / 2;
      const outerRadius = skeeBallWidth / 2 - 40;
      const smolRingSize = outerRadius / 5;
      const medRingSize = outerRadius / 4;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = HOLE;
      ctx.beginPath();
      ctx.rect(0, 0, skeeBallWidth, HEIGHT);
      ctx.fill();

      // arc at bottom
      ctx.strokeStyle = BROWN;
      ctx.fillStyle = CREAM;
      ctx.lineWidth = ringWidth * 2;
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        mainCenterY,
        (mainCenterY * 3) / 2 + 40,
        (mainCenterY * 5) / 4,
        0,
        0,
        2 * Math.PI,
      );
      ctx.fill();
      drawRing(
        ctx,
        smolRingSize,
        0,
        {
          x: centerX,
          y: mainCenterY + (mainCenterY * 5) / 4 + ringWidth - smolRingSize,
        },
        HOLE,
      );
      drawLabel(ctx, "10", {
        x: centerX - 10,
        y: mainCenterY + (mainCenterY * 5) / 4 + ringWidth - smolRingSize + 6,
      });
      ctx.beginPath();
      ctx.fillStyle = "none";
      ctx.ellipse(
        centerX,
        mainCenterY,
        (mainCenterY * 3) / 2 + 40,
        (mainCenterY * 5) / 4,
        0,
        0,
        2 * Math.PI,
      );
      ctx.stroke();

      // top rings
      drawRing(
        ctx,
        smolRingSize,
        ringWidth,
        {
          x: smolRingSize + 10,
          y: smolRingSize + 10,
        },
        HOLE,
      );
      drawRing(
        ctx,
        smolRingSize,
        ringWidth,
        {
          x: skeeBallWidth - (smolRingSize + 10),
          y: smolRingSize + 10,
        },
        HOLE,
      );
      drawLabel(ctx, "100", { x: smolRingSize, y: smolRingSize + 18 }, 16);
      drawLabel(
        ctx,
        "100",
        {
          x: skeeBallWidth - (smolRingSize + 20),
          y: smolRingSize + 18,
        },
        16,
      );

      // big ring
      // hole for big ring
      drawRing(
        ctx,
        smolRingSize,
        0,
        {
          x: centerX,
          y: mainCenterY + outerRadius + ringWidth - smolRingSize,
        },
        HOLE,
      );
      drawLabel(ctx, "20", {
        x: centerX - 12,
        y: mainCenterY + outerRadius + ringWidth - smolRingSize + 6,
      });
      drawRing(ctx, outerRadius, ringWidth, { x: centerX, y: mainCenterY });

      // med ring 1
      drawRing(
        ctx,
        medRingSize,
        ringWidth,
        {
          x: centerX,
          y: mainCenterY - (outerRadius * 2) / 3,
        },
        HOLE,
      );
      drawLabel(ctx, "40", {
        x: centerX - 12,
        y: mainCenterY - (outerRadius * 2) / 3 + 12,
      });

      // med ring 2
      drawRing(
        ctx,
        medRingSize,
        ringWidth,
        {
          x: centerX,
          y: mainCenterY,
        },
        HOLE,
      );
      drawLabel(ctx, "30", {
        x: centerX - 12,
        y: mainCenterY + 12,
      });

      ctx.fillStyle = DARK_BROWN;
      ctx.beginPath();
      ctx.rect(0, HEIGHT - 30, skeeBallWidth, 30);
      ctx.fill();
    },
    [],
  );

  const draw = useCallback(() => {
    // request repaint on next animation frame
    periodicHandle.current = window.requestAnimationFrame(draw);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const skeeBallWidth = WIDTH - 100;
        drawSkeeball(ctx, skeeBallWidth);
        drawForceMeter(ctx, skeeBallWidth);
      }
    }
  }, [frozenVelocity, tries]);

  useEffect(() => {
    if (!periodicHandle.current) {
      periodicHandle.current = window.requestAnimationFrame(draw);
    }
    return () => {
      if (periodicHandle.current) {
        window.cancelAnimationFrame(periodicHandle.current);
        periodicHandle.current = undefined;
      }
    };
  }, [draw]);

  const handleClick = () => {
    if (!frozenVelocity && tries > 0) {
      setTries((state) => (state -= 1));
      const inverseVelocity = getIndicatorPosition() || 0;
      setFrozenVelocity(inverseVelocity);
      const minSuccess = 0.5 - SUCCESS_RANGE / 2;
      const maxSuccess = 0.5 + SUCCESS_RANGE / 2;
      const minMajorSuccess = 0.5 - MAJOR_SUCCESS_RANGE / 2;
      const maxMajorSuccess = 0.5 + MAJOR_SUCCESS_RANGE / 2;
      const minCrit = 0.5 - CRIT_SUCCESS_RANGE / 2;
      const maxCrit = 0.5 + CRIT_SUCCESS_RANGE / 2;
      if (inverseVelocity >= minCrit && inverseVelocity <= maxCrit) {
        setScore((state) => state + 100);
        getConfetti();
        setBallDestination({ x: 16, y: 16 });
      } else if (
        inverseVelocity >= minMajorSuccess &&
        inverseVelocity <= maxMajorSuccess
      ) {
        setScore((state) => state + 40);
        setBallDestination({ x: 135, y: 65 });
      } else if (
        inverseVelocity >= minSuccess &&
        inverseVelocity <= maxSuccess
      ) {
        setScore((state) => state + 30);
        setBallDestination({ x: 135, y: 140 });
      } else if (inverseVelocity < 0.1) {
        // big ol goose egg and it goes flying
        setBallDestination({ x: 145, y: -1 * HEIGHT });
        setScore((state) => state + 0);
        window.setTimeout(() => {
          if (crashRef.current) {
            crashRef.current.currentTime = 0;
            crashRef.current.play();
          }
        }, 400);
      } else if (inverseVelocity > 0.95) {
        // big ol goose egg
        setBallDestination({ x: 135, y: HEIGHT - 64 });
        setScore((state) => state + 0);
      } else {
        setBallDestination({ x: 135, y: HEIGHT - 200 });
        setScore((state) => state + 10);
      }

      window.setTimeout(resetThrow, 2000);
    }
  };

  const resetThrow = () => {
    setBallDestination(null);
    if (tries > 0) {
      setFrozenVelocity(null);
    }
  };

  useEffect(() => {
    if (tries < 1 && score > 100) {
      getConfetti();
    }
  }, [score, tries]);

  const ballStyle = ballDestination
    ? {
        top: ballDestination.y,
        left: ballDestination.x,
        opacity: 1,
      }
    : { top: HEIGHT, left: 130 + Math.random() * 10, opacity: 0 };

  return (
    <Wrapper>
      <h2>
        {tries > 0 ? "Score" : "Final Score"}: {score}
      </h2>
      <div
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          position: "relative",
          margin: "0 auto",
        }}
      >
        <Backdrop
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          onClick={handleClick}
        />
        <Ball style={ballStyle} />
      </div>
      <audio ref={crashRef} id="crash" src={crash} preload="auto">
        <track default kind="captions" srcLang="en" src={caption} />
      </audio>
    </Wrapper>
  );
};

export default Skeeball;
