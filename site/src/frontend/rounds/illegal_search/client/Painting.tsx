import React, {
  type PointerEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import heavy_thump from "../assets/audio/heavy_thump.mp3";
import light_thump from "../assets/audio/light_thump.mp3";
import medium_thump from "../assets/audio/medium_thump.mp3";
import very_heavy_thump from "../assets/audio/very_heavy_thump.mp3";
import clamp from "./clamp";
import { draggable_cursor, dragging_cursor } from "./cursors";

type Pos = {
  x: number;
  y: number;
};

function audioFileForFallHeight(fallHeight: number): string {
  if (fallHeight < 300) {
    return light_thump;
  } else if (fallHeight < 600) {
    return medium_thump;
  } else if (fallHeight < 900) {
    return heavy_thump;
  } else {
    return very_heavy_thump;
  }
}

const PaintingDiv = styled.div<{
  $imageUrl: string;
  $dragging: boolean;
  $width: number;
  $height: number;
}>`
  position: absolute;
  cursor: ${({ $dragging }) =>
    $dragging ? dragging_cursor : draggable_cursor};
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  background-color: black;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Painting = ({
  initialPosition,
  imageUrl,
  width = 730,
  height = 970,
}: {
  initialPosition: Pos;
  imageUrl: string;
  width?: number;
  height?: number;
}) => {
  // Is the painting being dragged?
  const [dragging, setDragging] = useState<boolean>(false);
  // Where is the painting located?
  const [position, setPosition] = useState<Pos>(initialPosition);
  // Where, in page coordinates, was the painting grabbed?
  const [dragPos, setDragPos] = useState<Pos>({ x: 0, y: 0 });
  // Where, relative to the element, was the painting grabbed?
  const [dragAnchor, setDragAnchor] = useState<Pos>({ x: 0, y: 0 });

  // Have we finished animating this out of the viewport?  Once true, we no longer need to include the div in the DOM.
  const [gone, setGone] = useState<boolean>(false);

  // What is our requestAnimationFrame handle?
  const rafRef = useRef<number>(0);
  // When was the drag dropped?
  const dropTimeRef = useRef<number>(0);
  // Is the painting still hooked to the nail in the wall?
  const hookedRef = useRef<boolean>(true);
  // Is the painting in free-fall?
  const fallingRef = useRef<boolean>(false);
  // what was position, at the time of the drop?
  const dropPosRef = useRef<Pos>({ x: 0, y: 0 });

  const animationFrameCb: FrameRequestCallback = useCallback((time) => {
    if (fallingRef.current) {
      if (!dropTimeRef.current) {
        dropTimeRef.current = time;
      }
      // only apply gravity if the object is falling
      const timeFalling = (time - dropTimeRef.current) * 0.001;
      const FALL_SPEED = 5500;
      // gravity applies at 1/2 * g * t^2
      const fallDistanceForTime = FALL_SPEED * (timeFalling * timeFalling);
      const dropPos = dropPosRef.current;
      const pos = {
        x: dropPos.x,
        y: dropPos.y + fallDistanceForTime,
      };
      setPosition(pos);
      // schedule another frame if we're doing anything, but we don't need to
      // keep animating once the photo is offscreen
      if (pos.y < 1080) {
        rafRef.current = requestAnimationFrame(animationFrameCb);
      } else {
        rafRef.current = 0;
        // Fall complete.  Play the collision sound, depending on how far the picture was dropped from.
        const audio = document.createElement("audio");
        const fallHeight = 1080 - dropPos.y;
        audio.src = audioFileForFallHeight(fallHeight);
        void audio.play();
        setGone(true);
      }
    }
  }, []);

  useEffect(() => {
    if (fallingRef.current) {
      rafRef.current = requestAnimationFrame(animationFrameCb);
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animationFrameCb, dragging]);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
      setDragPos({
        x: e.pageX,
        y: e.pageY,
      });
      setDragAnchor({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    },
    [],
  );

  const onPointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (dragging) {
        // Determine
        //const x = e.pageX;
        //const y = e.pageY;
        let dx = e.pageX - dragPos.x;
        let dy = e.pageY - dragPos.y;
        if (hookedRef.current) {
          // Confine motion.  We're sorta imitating the effect of pulling on the string the frame is hanging from,
          // so you have to lift it first.  You can move horizontally only as much as you have lifted it vertically.

          // If you are pulling hard to the side, the painting won't come quite as far as you pulled
          // it, and you will also cause the object to slightly rise, because the wire in the back is
          // pulling against the nail in the wall
          if (dy > 0) {
            dy = -0.25 * Math.abs(dx);
            dx = 0.5 * dx;
          }

          // You cannot pull the painting any farther down until it is unhooked, full stop.
          dy = clamp(dy, dy, 0);

          // if dy is "up" enough, unhook from the nail on the wall
          if (dy < -20) {
            hookedRef.current = false;
          }
        }
        setPosition({
          x: dragPos.x - dragAnchor.x + dx,
          y: dragPos.y - dragAnchor.y + dy,
        });
      }
    },
    [dragging, dragPos, dragAnchor],
  );

  const onPointerUp: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setDragging(false);
      if (!hookedRef.current) {
        fallingRef.current = true;
      } else {
        setPosition(initialPosition);
      }
      dropPosRef.current = {
        x: e.pageX - dragAnchor.x,
        y: e.pageY - dragAnchor.y,
      };
    },
    [dragAnchor, initialPosition],
  );

  const style = {
    left: position.x,
    top: position.y,
  };

  if (gone) return undefined;

  return (
    <PaintingDiv
      $imageUrl={imageUrl}
      $dragging={dragging}
      $width={width}
      $height={height}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
};

export default Painting;
