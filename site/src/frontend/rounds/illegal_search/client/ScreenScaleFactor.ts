import {
  createContext,
  useContext,
  useCallback,
  type PointerEvent as ReactPointerEvent,
  useState,
  useEffect,
} from "react";

export const ScreenScaleFactor = createContext<number>(1);

export type Pos = { x: number; y: number };

export function useGetPointerPos({
  offset = { x: 0, y: 48 },
}: {
  offset?: { x: number; y: number };
} = {}): (e: PointerEvent | ReactPointerEvent) => Pos {
  const scaleFactor = useContext(ScreenScaleFactor);

  return useCallback(
    (e: PointerEvent | ReactPointerEvent): Pos => {
      return {
        x: (e.pageX - offset.x) / scaleFactor,
        y: (e.pageY - offset.y) / scaleFactor, // account for the header
      };
    },
    [scaleFactor, offset.x, offset.y],
  );
}

export function useTrackPointerPos({
  offset = { x: 0, y: 48 },
  skipScaleFactor = false,
}: {
  offset?: { x: number; y: number };
  skipScaleFactor?: boolean;
} = {}): Pos | null {
  const [mousePos, setMousePos] = useState<Pos | null>(null);
  const scaleFactor = useContext(ScreenScaleFactor);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (skipScaleFactor) {
        setMousePos({ x: e.pageX - offset.x, y: e.pageY - offset.y });
      } else {
        setMousePos({
          x: (e.pageX - offset.x) / scaleFactor,
          y: (e.pageY - offset.y) / scaleFactor,
        });
      }
    },
    [skipScaleFactor, scaleFactor, offset.x, offset.y],
  );

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  });

  return mousePos;
}
