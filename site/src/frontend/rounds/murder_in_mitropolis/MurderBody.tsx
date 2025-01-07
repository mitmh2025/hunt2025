import {
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import React, {
  type MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { PuzzleUnlockModal } from "../../components/PuzzleLink";
import { PuzzleTooltipComponent } from "../../components/Tooltip";
import {
  CityWrapper,
  MurderCityBg,
  MurderWrapper,
  MurderWindowComponent,
  proportionify,
} from "./Layout";
import { MurderFonts } from "./MurderFonts";
import SparkleComponent, { SPARKLES } from "./Sparkle";
import SkylineBg from "./assets/murder-bg.png";
import {
  type MurderPDFObject,
  type MurderPuzzleObject,
  type MurderState,
} from "./types";

const MurderWindow = ({
  item,
  position,
  imgStyle,
  currency,
}: {
  item: MurderPuzzleObject;
  position: { left: string; top: string; transform?: string };
  imgStyle: { width: string };
  currency: number;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: item.tooltip_placement ?? "top",
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const role = useRole(context, { role: "label" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
  ]);

  const unlockModalRef = useRef<HTMLDialogElement>(null);
  const showUnlockModal: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      unlockModalRef.current?.showModal();
    },
    [],
  );
  const dismissUnlockModal = useCallback(() => {
    unlockModalRef.current?.close();
  }, []);

  const lockState = item.state === "solved" ? "unlocked" : item.state;
  const tooltip = showTooltip && (
    <PuzzleTooltipComponent
      innerRef={refs.setFloating}
      style={{ ...floatingStyles, visibility: "visible" }}
      title={item.title}
      lockState={lockState}
      answer={item.answer}
      desc={item.desc}
      {...getFloatingProps()}
    />
  );
  const itemContents = (
    <>
      <img
        ref={refs.setReference}
        {...getReferenceProps()}
        src={item.asset}
        alt={item.alt}
        style={imgStyle}
      />
    </>
  );

  if (lockState === "unlockable") {
    return (
      <>
        <MurderWindowComponent
          as="button"
          style={position}
          onClick={showUnlockModal}
        >
          {itemContents}
          {tooltip}
        </MurderWindowComponent>
        <PuzzleUnlockModal
          ref={unlockModalRef}
          title={item.title}
          slug={item.slug}
          onDismiss={dismissUnlockModal}
          cost={1}
          currency={currency}
          desc={item.desc}
        />
      </>
    );
  } else {
    return (
      <>
        <MurderWindowComponent
          style={position}
          href={
            item.state !== "unlockable" ? `/puzzles/${item.slug}` : undefined
          }
        >
          {itemContents}
          {tooltip}
        </MurderWindowComponent>
      </>
    );
  }
};

const MurderPdf = ({
  item,
  position,
  imgStyle,
}: {
  item: MurderPDFObject;
  position: { left: string; top: string; transform?: string };
  imgStyle: { width: string };
}) => {
  if (item.solved) {
    return (
      <>
        <MurderWindowComponent as="button" style={position}>
          <img style={imgStyle} src={item.asset} alt={item.alt} />
        </MurderWindowComponent>
      </>
    );
  } else {
    return (
      <img
        style={{ ...position, ...imgStyle }}
        src={item.asset}
        alt={item.alt}
      />
    );
  }
};

const MurderBody = ({
  state,
  teamState,
}: {
  state: MurderState;
  teamState: TeamHuntState;
}) => {
  const objects = state.imagery.map((item: MurderPuzzleObject) => {
    const aStyle = {
      left: proportionify(item.pos.left),
      top: proportionify(item.pos.top),
      transform: item.pos.transform,
    };
    const imgStyle = {
      width: proportionify(item.width),
    };
    return (
      <MurderWindow
        key={item.slug}
        item={item}
        position={aStyle}
        imgStyle={imgStyle}
        currency={teamState.currency}
      />
    );
  });
  const pdfObjects = state.pdfImagery.map((item: MurderPDFObject) => {
    const aStyle = {
      left: proportionify(item.pos.left),
      top: proportionify(item.pos.top),
    };
    const imgStyle = {
      width: proportionify(item.width),
    };
    return (
      <MurderPdf
        key={`pdf-window-${item.pos.left}-${item.pos.top}`}
        position={aStyle}
        imgStyle={imgStyle}
        item={item}
      />
    );
  });
  return (
    <MurderWrapper key="murder">
      <MurderFonts />
      <CityWrapper>
        <MurderCityBg src={SkylineBg} />
        <div className="sparkles">
          {SPARKLES.map((s) => (
            <SparkleComponent
              key={`sparkle-${s.pos.top}-${s.pos.left}`}
              {...s}
            />
          ))}
        </div>
        <h1>The Murder in MITropolis</h1>
        {objects}
        {pdfObjects}
      </CityWrapper>
    </MurderWrapper>
  );
};

export default MurderBody;
