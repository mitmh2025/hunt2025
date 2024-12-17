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
import Bookcase from "./Bookcase";
import Cryptex from "./Cryptex";
import DeskDrawer from "./DeskDrawer";
import PaintingOne from "./PaintingOne";
import PaintingTwo from "./PaintingTwo";
import Rug from "./Rug";
import { default_cursor, zoom_cursor } from "./cursors";

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
    cursor: zoom_cursor,
    ...boundsForArea(modal.area),
    border: "none",
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
  z-index: 100;
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

  position: relative;
  overflow: hidden;
  cursor: ${default_cursor};

  ${({ $backgroundImage }) => {
    if ($backgroundImage === "__wallpaper__") {
      return `
        background-color: #657056;
        background-image: url("data:image/svg+xml,%3Csvg width='80' height='88' viewBox='0 0 80 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 21.91V26h-2c-9.94 0-18 8.06-18 18 0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73 3.212-6.99 9.983-12.008 18-12.73V62h2c9.94 0 18-8.06 18-18 0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73-3.212 6.99-9.983 12.008-18 12.73zM54 58v4.696c-5.574 1.316-10.455 4.428-14 8.69-3.545-4.262-8.426-7.374-14-8.69V58h-5.993C12.27 58 6 51.734 6 44c0-7.732 6.275-14 14.007-14H26v-4.696c5.574-1.316 10.455-4.428 14-8.69 3.545 4.262 8.426 7.374 14 8.69V30h5.993C67.73 30 74 36.266 74 44c0 7.732-6.275 14-14.007 14H54zM42 88c0-9.94 8.06-18 18-18h2v-4.09c8.016-.722 14.787-5.738 18-12.73v7.434c-3.545 4.262-8.426 7.374-14 8.69V74h-5.993C52.275 74 46 80.268 46 88h-4zm-4 0c0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73v7.434c3.545 4.262 8.426 7.374 14 8.69V74h5.993C27.73 74 34 80.266 34 88h4zm4-88c0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73v-7.434c-3.545-4.262-8.426-7.374-14-8.69V14h-5.993C52.27 14 46 7.734 46 0h-4zM0 34.82c3.213-6.992 9.984-12.008 18-12.73V18h2c9.94 0 18-8.06 18-18h-4c0 7.732-6.275 14-14.007 14H14v4.696c-5.574 1.316-10.455 4.428-14 8.69v7.433z' fill='%23ffd65d' fill-opacity='0.48' fill-rule='evenodd'/%3E%3C/svg%3E");
      `;
    } else if ($backgroundImage === "") {
      return `
        background-color: black;
      `;
    } else {
      return `
        background-color: black;
        background-image: url('${$backgroundImage}');
        background-size: contain;
        background-position: center;
      `;
    }
  }}
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

  function getMouseCoords(e: React.MouseEvent): { x: number; y: number } {
    const offsetY = e.pageY - 48;
    const offsetX = e.pageX;
    return {
      x: ((offsetX - RASTER_WIDTH / 2) / RASTER_WIDTH) * 2,
      y: ((RASTER_HEIGHT / 2 - offsetY) / RASTER_HEIGHT) * 2,
    };
  }

  const mouseDown: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    const { x, y } = getMouseCoords(e);
    setStartPoint({ x, y });
    setDragPoint({ x, y });
  }, []);
  const mouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();

      const { x, y } = getMouseCoords(e);

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

  const assets = node.placedAssets
    .map((placedAsset) => {
      return (
        <Asset key={`asset-${placedAsset.asset}`} placedAsset={placedAsset} />
      );
    })
    .concat(
      node.modals.map((modal) => {
        return (
          <Asset
            key={`modal-${modal.asset}`}
            placedAsset={modal.placedAsset ?? modal}
          />
        );
      }),
    );

  const navigations = node.navigations.map((navigation) => {
    return (
      <Navigation
        key={`nav-${navigation.destId}-${navigation.area.left}-${navigation.area.top}`}
        navigation={navigation}
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
    if (interaction.plugin === "deskdrawer") {
      return (
        <DeskDrawer
          key={`interaction-${interaction.plugin}`}
          node={node}
          showModal={showModal}
          setNode={setNode}
          teamState={teamState}
        />
      );
    }
    if (interaction.plugin === "cryptex") {
      return (
        <Cryptex
          key={`interaction-${interaction.plugin}`}
          node={node}
          showModal={showModal}
          setNode={setNode}
          teamState={teamState}
        />
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- might add more plugins later
    if (interaction.plugin === "bookcase") {
      return (
        <Bookcase
          key={`interaction-${interaction.plugin}`}
          setNode={setNode}
          teamState={teamState}
          navigate={(dest) => {
            handleNavClick({ destId: dest });
          }}
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
        key={`${node.id}-modal-${i}-${modal.asset}`}
        modal={modal}
        showModal={showModal}
        backgroundColor={
          ENABLE_DEVTOOLS && !modal.asset ? "rgba(0,0,255,0.3)" : undefined
        }
      />
    );
  });

  let modalOverlay = undefined;
  if (modalShown) {
    const puzzleState = teamState.puzzles[modalShown.slug];
    modalOverlay = (
      <ModalBackdrop onClick={dismissModal}>
        <img
          width={800}
          height={600}
          src={modalShown.asset}
          style={{ objectFit: "contain" }}
          alt="TODO"
        />
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
