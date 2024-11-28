import React, {
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useState,
} from "react";
import { styled, css } from "styled-components";

const SpoilerSpan = styled.span<{ $reveal: boolean; $color: string }>`
  display: inline-block;
  min-width: 200px;
  padding: 0 0.25rem;
  ${({ $reveal, $color }) =>
    $reveal
      ? css`
          color: inherit;
          background-color: transparent;
        `
      : css`
          color: ${$color};
          background-color: ${$color};
        `}
  &:hover {
    color: inherit;
    background-color: transparent;
  }
`;

const Spoiler = ({
  children,
  opaqueColor,
}: {
  children: ReactNode;
  opaqueColor?: string;
}) => {
  // Note that in most places you'd expect to use a Spoiler, you won't actually have the event
  // handlers hooked up because solutions are generally just a static page.  But that's fine because
  // the hover is probably good enough.
  const [reveal, setReveal] = useState<boolean>(false);
  const setRevealed: MouseEventHandler<HTMLSpanElement> = useCallback(() => {
    setReveal(true);
  }, []);

  return (
    <SpoilerSpan
      $reveal={reveal}
      $color={opaqueColor ?? "var(--black)"}
      onClick={setRevealed}
    >
      {children}
    </SpoilerSpan>
  );
};

export default Spoiler;
