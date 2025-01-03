import { Tooltip, type TooltipProps } from "@mui/material";
import React, { useState, useRef, cloneElement } from "react";

// From : https://github.com/mui/material-ui/issues/27057#issuecomment-2533790445
export const CustomTooltip = ({
  title,
  children,
  ...rest
}: TooltipProps & {
  overlayClassName?: string;
  children: React.ReactElement<
    {
      onMouseEnter: (e: React.MouseEvent) => void;
      onMouseLeave: (e: React.MouseEvent) => void;
    },
    string
  >;
}) => {
  const [renderTooltip, setRenderTooltip] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!React.isValidElement(children)) {
    console.error(
      "CustomTooltip expects a single valid React element as a child.",
    );
    return null;
  }

  // Clear any active close timeout
  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Start the close timeout
  const startCloseTimeout = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setRenderTooltip(false);
    }, 500);
  };

  // Handle mouse enter on the child element
  const handleMouseEnterChild = (e: React.MouseEvent) => {
    clearCloseTimeout();
    if (!renderTooltip) setRenderTooltip(true);
    if (
      typeof children.props === "object" &&
      "onMouseEnter" in children.props &&
      typeof children.props.onMouseEnter === "function"
    ) {
      children.props.onMouseEnter(e);
    }
  };

  // Handle mouse leave on the child element
  const handleMouseLeaveChild = (e: React.MouseEvent) => {
    startCloseTimeout();
    if (
      typeof children.props === "object" &&
      "onMouseLeave" in children.props &&
      typeof children.props.onMouseLeave === "function"
    ) {
      children.props.onMouseLeave(e);
    }
  };

  return renderTooltip ? (
    <Tooltip {...rest} title={title && <div>{title}</div>}>
      {cloneElement(children, {
        onMouseEnter: handleMouseEnterChild,
        onMouseLeave: handleMouseLeaveChild,
      })}
    </Tooltip>
  ) : (
    cloneElement(children, {
      onMouseEnter: handleMouseEnterChild,
    })
  );
};
