import React, {
  type MouseEventHandler,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../../lib/api/client";
import useDataset from "../../../client/useDataset";
import PuzzleLink from "../../../components/PuzzleLink";
import {
  type ScreenArea,
  type Node,
  hasPostCode,
  hasPuzzleFields,
  type Modal,
  type ModalWithPuzzleFields,
  type PlacedAsset,
  type PostcodeResponse,
} from "../types";
import PaintingOne from "./PaintingOne";
import PaintingTwo from "./PaintingTwo";
import Rug from "./Rug";

// TODO: remove this (or extract to some other component that isn't used by default) once positions are more set
const ENABLE_DEVTOOLS = true as boolean; // type loosened to avoid always-truthy lints firing

// Dimensions of the space we're working with
const RASTER_WIDTH = 1920;
const RASTER_HEIGHT = 1080;

function boundsForArea(area: ScreenArea): {
  left: string;
  right: string;
  top: string;
  bottom: string;
} {
  const left = `${RASTER_WIDTH * (0.5 + area.left / 2)}px`;
  const right = `${RASTER_WIDTH * (0.5 - area.right / 2)}px`;
  const top = `${RASTER_HEIGHT * (0.5 - area.top / 2)}px`;
  const bottom = `${RASTER_HEIGHT * (0.5 + area.bottom / 2)}px`;
  return {
    left,
    right,
    top,
    bottom,
  };
}

export const Asset = ({
  placedAsset,
  backgroundColor,
}: {
  placedAsset: PlacedAsset;
  backgroundColor?: string;
}) => {
  const { area, asset } = placedAsset;
  const areaStyle = {
    position: "absolute" as const,
    ...boundsForArea(area),

    backgroundImage: `url('${asset}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",

    backgroundColor,
  };
  return <div key={asset} style={areaStyle} />;
};

const Navigation = ({
  navigation,
  backgroundColor,
  onClick,
}: {
  navigation: Node["navigations"][0];
  backgroundColor?: string;
  onClick: ({ destId, sound }: { destId: string; sound?: string }) => void;
}) => {
  const { destId, sound, area, cursor } = navigation;
  const onClicked: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.preventDefault();
      onClick({ destId, sound });
    },
    [onClick, destId, sound],
  );
  const style = {
    position: "absolute" as const,
    cursor: cursor,
    ...boundsForArea(area),
    backgroundColor,
  };
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content -- These are unlikely to have any non-visual content
    <a
      style={style}
      href={`/rounds/illegal_search?node=${navigation.destId}`}
      onClick={onClicked}
    />
  );
};

export const ModalTrigger = ({
  modal,
  showModal,
  backgroundColor,
}: {
  modal: Modal;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  backgroundColor?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialTitle = hasPuzzleFields(modal) ? modal.title : undefined;
  const initialSlug = hasPuzzleFields(modal) ? modal.slug : undefined;
  const initialDesc = hasPuzzleFields(modal) ? modal.desc : undefined;
  const [title, setTitle] = useState<string | undefined>(initialTitle);
  const [slug, setSlug] = useState<string | undefined>(initialSlug);
  const [desc, setDesc] = useState<string | undefined>(initialDesc);
  const postCode = hasPostCode(modal) ? modal.postCode : undefined;

  const onAreaClicked: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      // Don't double-fetch.
      if (loading) return;
      // If there is a postCode set, we need to make the fetch so we can
      // 1) notify the backend we found the thing to click on, so it unlocks the associated puzzle
      // 2) in the response to that POST, get (and save) the title and slug that we need to display
      if (postCode !== undefined && title === undefined && slug === undefined) {
        console.log("POSTing code", postCode);
        setLoading(true);
        fetch("/rounds/illegal_search/modal", {
          method: "POST",
          body: JSON.stringify({
            postCode,
          }),
          headers: {
            "Content-Type": "application/json", // This body is JSON
            Accept: "application/json", // Indicate that we want to receive JSON back
          },
        })
          .then(async (result) => {
            setLoading(false);
            const json = (await result.json()) as PostcodeResponse;
            // Save the title and slug returned in case the modal is displayed again
            setTitle(json.title);
            setSlug(json.slug);
            setDesc(json.desc);

            const { area, asset } = modal;
            const modalWithPuzzleFields = {
              area,
              asset,
              title: json.title,
              slug: json.slug,
              desc: json.desc,
            };
            showModal({ modal: modalWithPuzzleFields });
          })
          .catch((error: unknown) => {
            setLoading(false);
            console.log(error);
          });
      } else {
        const modalWithPuzzleFields = {
          area: modal.area,
          asset: modal.asset,
          title,
          slug,
          desc,
        } as ModalWithPuzzleFields;
        showModal({ modal: modalWithPuzzleFields });
      }

      // If we already have the title and slug, no need to POST again; we can immediately show the popover.
    },
    [loading, modal, postCode, showModal, slug, title, desc],
  );

  const style = {
    position: "absolute" as const,
    cursor: "zoom-in",
    ...boundsForArea(modal.area),
    border: 0,
    padding: 0,
    backgroundColor: backgroundColor ?? "transparent",
  };

  return (
    <button style={style} onClick={onAreaClicked}>
      {/* Show bigger object art and puzzle title/link/state when clicked */}
    </button>
  );
};

const ModalBackdrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // Dim other things currently visible, maybe animate this later?
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PuzzleLinkBackdrop = styled.div`
  background-color: rgb(255, 255, 255, 0.9);
  width: 600px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchEngineSurface = styled.div<{ $backgroundImage: string }>`
  width: 1920px;
  height: 1080px;
  background-color: black;
  background-image: ${({ $backgroundImage }) => `url('${$backgroundImage}')`};
  background-size: contain;
  background-position: center;
  position: relative;
  overflow: hidden;
`;

const SearchEngine = ({
  initialNode,
  initialTeamState,
}: {
  initialNode: Node;
  initialTeamState: TeamHuntState;
}) => {
  const [node, setNode] = useState<Node>(initialNode);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalShown, setModalShown] = useState<
    ModalWithPuzzleFields | undefined
  >(undefined);

  // A bunch of stuff that should only happen in devtools mode for making page measurements easier
  const [shouldCapture, setShouldCapture] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [cursorX, setCursorX] = useState<number>(0);
  const [cursorY, setCursorY] = useState<number>(0);
  const toggleCapture = useCallback(() => {
    setShouldCapture((prevState) => {
      return !prevState;
    });
  }, []);
  const mouseDown: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    const x = ((e.clientX - RASTER_WIDTH / 2) / RASTER_WIDTH) * 2;
    const y = ((RASTER_HEIGHT / 2 - e.clientY) / RASTER_HEIGHT) * 2;
    setStartPoint({ x, y });
  }, []);
  const mouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      const x = ((e.clientX - RASTER_WIDTH / 2) / RASTER_WIDTH) * 2;
      const y = ((RASTER_HEIGHT / 2 - e.clientY) / RASTER_HEIGHT) * 2;
      setCursorX(x);
      setCursorY(y);
      if (dragging) {
        setDragPoint({ x, y });
      }
    },
    [dragging],
  );
  const mouseUp: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleNavClick = useCallback(
    ({ destId, sound }: { destId: string; sound?: string }) => {
      // Avoid doing anything if we are already attempting to load a destination.
      if (loading) return;

      // Disable other interactive elements while loading progresses.
      setLoading(true);

      // start playing sound, if requested
      if (sound !== undefined) {
        const elem = document.createElement("audio");
        elem.src = sound;
        void elem.play();
      }

      // start fetching info for `destId`
      fetch(`/rounds/illegal_search/node/${destId}`, {
        headers: {
          "Content-Type": "application/json", // This body is JSON
          Accept: "application/json", // Indicate that we want to receive JSON back
        },
      })
        .then(async (result) => {
          const json = (await result.json()) as Node;
          console.log(json);
          history.pushState(
            { node },
            "",
            `/rounds/illegal_search?node=${destId}`,
          );
          setNode(json);
          setLoading(false);
        })
        .catch((error: unknown) => {
          console.error(error);
          setLoading(false);
        });
    },
    [loading, node],
  );

  const onGoBack = useCallback((e: PopStateEvent) => {
    // Override history back/forward
    e.preventDefault();
    console.log(e.state);
    const prevState = e.state as { node: Node };
    const prevNode = prevState.node;
    setNode(prevNode);
  }, []);

  const showModal = useCallback(
    ({ modal }: { modal: ModalWithPuzzleFields }) => {
      setModalShown(modal);
    },
    [],
  );

  const dismissModal = useCallback(() => {
    setModalShown(undefined);
  }, []);

  useEffect(() => {
    history.replaceState({ node }, "", undefined);
    window.addEventListener("popstate", onGoBack);
    return () => {
      window.removeEventListener("popstate", onGoBack);
    };
  }, [node, onGoBack]);

  const teamState = useDataset("team_state", undefined, initialTeamState);

  const assets = node.placedAssets.map((placedAsset) => {
    return (
      <Asset
        key={`asset-${placedAsset.asset}`}
        placedAsset={placedAsset}
        backgroundColor={ENABLE_DEVTOOLS ? "rgba(255,0,0,0.3)" : undefined}
      />
    );
  });

  const navigations = node.navigations.map((navigation) => {
    return (
      <Navigation
        key={`nav-${navigation.destId}-${navigation.area.left}-${navigation.area.top}`}
        navigation={navigation}
        backgroundColor={ENABLE_DEVTOOLS ? "rgba(0,255,0,0.3)" : undefined}
        onClick={handleNavClick}
      />
    );
  });

  const interactions = node.interactions.map((interaction) => {
    // Modals need to show interactions, but often on the other side of the lock, so we pass that callback down.
    if (interaction.plugin === "painting1") {
      return (
        <PaintingOne
          key={`interaction-${interaction.plugin}`}
          node={node}
          showModal={showModal}
          setNode={setNode}
          teamState={teamState}
        />
      );
    }
    if (interaction.plugin === "painting2") {
      return (
        <PaintingTwo
          key={`interaction-${interaction.plugin}`}
          node={node}
          showModal={showModal}
          setNode={setNode}
          teamState={teamState}
        />
      );
    }
    if (interaction.plugin === "rug") {
      return (
        <Rug
          key={`interaction-${interaction.plugin}`}
          node={node}
          showModal={showModal}
          setNode={setNode}
          teamState={teamState}
        />
      );
    }
    // TODO: do something with interaction.plugin
    return (
      <div key={`interaction-${interaction.plugin}`}>{interaction.plugin}</div>
    );
  });

  const modals = node.modals.map((modal, i) => {
    return (
      <ModalTrigger
        key={`modal-${i}`}
        modal={modal}
        showModal={showModal}
        backgroundColor={ENABLE_DEVTOOLS ? "rgba(0,0,255,0.3)" : undefined}
      />
    );
  });

  let modalOverlay = undefined;
  if (modalShown) {
    const puzzleState = teamState.puzzles[modalShown.slug];
    modalOverlay = (
      <ModalBackdrop onClick={dismissModal}>
        <img width={800} height={600} src={modalShown.asset} alt="TODO" />
        <PuzzleLinkBackdrop>
          <PuzzleLink
            lockState={puzzleState?.locked ?? "locked"}
            answer={puzzleState?.answer}
            currency={teamState.currency}
            title={modalShown.title}
            slug={modalShown.slug}
            desc={modalShown.desc}
          />
        </PuzzleLinkBackdrop>
      </ModalBackdrop>
    );
  }

  const devBox = useMemo(() => {
    const left = startPoint.x < dragPoint.x ? startPoint.x : dragPoint.x;
    const right = startPoint.x < dragPoint.x ? dragPoint.x : startPoint.x;
    const top = startPoint.y < dragPoint.y ? dragPoint.y : startPoint.y;
    const bottom = startPoint.y < dragPoint.y ? startPoint.y : dragPoint.y;
    return { left, right, top, bottom };
  }, [startPoint, dragPoint]);
  const devtoolsOverlay = useMemo(() => {
    if (shouldCapture) {
      return (
        <div
          style={{
            position: "absolute" as const,
            backgroundColor: "rgba(255,0,0,0.6)",
            ...boundsForArea(devBox),
            color: "white",
          }}
        />
      );
    } else {
      return undefined;
    }
  }, [devBox, shouldCapture]);
  const devtoolsAddendum = useMemo(() => {
    if (ENABLE_DEVTOOLS) {
      return (
        <div>
          <div>Cursor position:</div>
          <div>x: {cursorX}</div>
          <div>y: {cursorY}</div>

          <div>Bounding box drawn:</div>
          <div>left: {devBox.left},</div>
          <div>right: {devBox.right},</div>
          <div>top: {devBox.top},</div>
          <div>bottom: {devBox.bottom},</div>
        </div>
      );
    } else {
      return undefined;
    }
  }, [cursorX, cursorY, devBox]);

  // We stack navigations atop interactions because the rug view has overlap,
  // and we want to ensure the navigation is always accessible at the top.
  return (
    <>
      <SearchEngineSurface
        $backgroundImage={node.background}
        onMouseMove={shouldCapture ? mouseMove : undefined}
        onMouseDown={shouldCapture ? mouseDown : undefined}
        onMouseUp={shouldCapture ? mouseUp : undefined}
      >
        {assets}
        {interactions}
        {navigations}
        {modals}
        {modalOverlay}
        {devtoolsOverlay}
      </SearchEngineSurface>
      {ENABLE_DEVTOOLS ? <div>{JSON.stringify(node)}</div> : undefined}
      {devtoolsAddendum}
      {ENABLE_DEVTOOLS ? (
        <button onClick={toggleCapture}>
          {shouldCapture ? "Stop measuring" : "Measure"}
        </button>
      ) : undefined}
    </>
  );
};

export default SearchEngine;
