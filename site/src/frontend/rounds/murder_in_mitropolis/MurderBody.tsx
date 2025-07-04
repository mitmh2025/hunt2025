import {
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useDismiss,
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
import { PuzzleUnlockModal, usePuzzleState } from "../../components/PuzzleLink";
import { PuzzleTooltipComponent } from "../../components/Tooltip";
import rootUrl from "../../utils/rootUrl";
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
  epoch,
  item,
  position,
  imgStyle,
  currency,
}: {
  epoch: number;
  item: MurderPuzzleObject;
  position: { left: string; top: string; transform?: string };
  imgStyle: { width: string };
  currency: number;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const puzzleStateHandle = usePuzzleState(epoch, {
    slug: item.slug,
    state: item.state === "solved" ? "unlocked" : item.state,
    title: item.title,
    answer: item.answer,
    desc: item.desc,
  });
  const [puzzleState] = puzzleStateHandle;

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
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
    dismiss,
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

  const tooltip = showTooltip && (
    <PuzzleTooltipComponent
      innerRef={refs.setFloating}
      style={{
        ...floatingStyles,
        zIndex: 5,
        maxWidth: "30rem",
        visibility: "visible",
      }}
      title={puzzleState.title}
      lockState={puzzleState.state}
      answer={puzzleState.answer}
      desc={puzzleState.desc}
      {...getFloatingProps()}
    />
  );
  const itemContents = (
    <>
      <img src={item.asset} alt={item.alt} style={{ ...imgStyle }} />
    </>
  );

  if (puzzleState.state === "unlockable") {
    return (
      <>
        <MurderWindowComponent
          as="button"
          style={position}
          ref={refs.setReference}
          {...getReferenceProps()}
          onClick={showUnlockModal}
        >
          {itemContents}
        </MurderWindowComponent>
        <PuzzleUnlockModal
          ref={unlockModalRef}
          onDismiss={dismissUnlockModal}
          cost={1}
          currency={currency}
          stateHandle={puzzleStateHandle}
        />
        {tooltip}
      </>
    );
  } else {
    return (
      <>
        <MurderWindowComponent
          href={`${rootUrl}/puzzles/${puzzleState.slug}`}
          style={position}
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          {itemContents}
        </MurderWindowComponent>
        {tooltip}
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
  if (item.page) {
    return (
      <>
        <MurderWindowComponent
          target="_blank"
          rel="noreferrer"
          href={item.page}
          style={{ ...position, position: "absolute" }}
        >
          <img style={imgStyle} src={item.asset} alt={item.alt} />
        </MurderWindowComponent>
      </>
    );
  } else {
    return (
      <img
        style={{ ...position, ...imgStyle, position: "absolute" }}
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
        epoch={state.epoch}
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
        <h1 className="round-title">The Murder in MITropolis</h1>
        {objects}
        {pdfObjects}
      </CityWrapper>
    </MurderWrapper>
  );
};

export default MurderBody;
