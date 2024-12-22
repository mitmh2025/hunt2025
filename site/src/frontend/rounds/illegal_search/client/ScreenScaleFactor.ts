import {
  createContext,
  useContext,
  useCallback,
  type PointerEvent as ReactPointerEvent,
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
