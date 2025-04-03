import React, {
  type MouseEventHandler,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../../lib/api/client";
import HUNT from "../../../../huntdata";
import billie from "../../../assets/billie.png";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";
import PuzzleLink from "../../../components/PuzzleLink";
import { Button } from "../../../components/StyledUI";
import archiveMode from "../../../utils/archiveMode";
import rootUrl from "../../../utils/rootUrl";
import {
  type ScreenArea,
  type Node,
  hasPostCode,
  hasPuzzleFields,
  type Modal,
  type ModalWithPuzzleFields,
  type PlacedAsset,
  type InteractionComponent,
  type Escape,
} from "../types";
import Bookcase from "./Bookcase";
import Cryptex from "./Cryptex";
import DeskDrawer from "./DeskDrawer";
import Extra from "./Extra";
import { ExtraModalRendererProvider } from "./ExtraModalRenderer";
import PaintingOne from "./PaintingOne";
import PaintingTwo from "./PaintingTwo";
import Rug from "./Rug";
import Safe from "./Safe";
import { ScreenScaleFactor } from "./ScreenScaleFactor";
import Telephone from "./Telephone";
import { fetchModal, fetchNode } from "./clientState";
import { default_cursor, zoom_cursor } from "./cursors";
import { useTeamState } from "@hunt_client/illegal_search_state";

const plugins: Record<string, InteractionComponent> = {
  bookcase: Bookcase,
  cryptex: Cryptex,
  deskdrawer: DeskDrawer,
  extra: Extra,
  painting1: PaintingOne,
  painting2: PaintingTwo,
  rug: Rug,
  safe: Safe,
  telephone: Telephone,
};

// TODO: remove this (or extract to some other component that isn't used by default) once positions are more set
const ENABLE_DEVTOOLS = false as boolean; // type loosened to avoid always-truthy lints firing

// Dimensions of the space we're working with
const RASTER_WIDTH = 1920;
const RASTER_HEIGHT = 1080;

export function boundsForArea(area: ScreenArea): {
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
  zIndex,
}: {
  placedAsset: PlacedAsset;
  backgroundColor?: string;
  zIndex?: number;
}) => {
  if (placedAsset.asset === null) {
    return null;
  }

  const { area, asset } = placedAsset;
  const areaStyle = {
    position: "absolute" as const,
    ...boundsForArea(area),

    backgroundImage: `url('${asset}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",

    backgroundColor,

    zIndex: zIndex,
  };
  return <div key={asset} style={areaStyle} />;
};

export const Navigation = ({
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
      href={`${rootUrl}/rounds/illegal_search?node=${navigation.destId}`}
      onClick={onClicked}
    />
  );
};

export const EscapeLink = ({ escape }: { escape: Escape }) => {
  const { area, cursor, href } = escape;
  const style = {
    position: "absolute" as const,
    cursor,
    ...boundsForArea(area),
  };
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content -- These are unlikely to have any non-visual content
    <a style={style} href={href} />
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
      // If there is a postCode set, we need to make the fetch so we can
      // 1) notify the backend we found the thing to click on, so it unlocks the associated puzzle
      // 2) in the response to that POST, get (and save) the title and slug that we need to display
      if (postCode !== undefined && title === undefined && slug === undefined) {
        console.log("POSTing code", postCode);
        void (async () => {
          const json = await fetchModal(postCode);

          setTitle(json.title);
          setSlug(json.slug);
          setDesc(json.desc);

          const { area, asset, altText } = modal;
          const modalWithPuzzleFields = {
            area,
            asset,
            altText,
            title: json.title,
            slug: json.slug,
            desc: json.desc,
          };
          showModal({ modal: modalWithPuzzleFields });
        })();
      } else {
        const modalWithPuzzleFields = {
          area: modal.area,
          asset: modal.asset,
          altText: modal.altText,
          title,
          slug,
          desc,
        } as ModalWithPuzzleFields;
        showModal({ modal: modalWithPuzzleFields });
      }

      // If we already have the title and slug, no need to POST again; we can immediately show the popover.
    },
    [modal, postCode, showModal, slug, title, desc],
  );

  const style = {
    position: "absolute" as const,
    cursor: zoom_cursor,
    ...boundsForArea(modal.area),
    border: "none",
    padding: 0,
    backgroundColor: backgroundColor ?? "transparent",
    zIndex: modal.zIndex,
  };

  return (
    <button style={style} onClick={onAreaClicked}>
      {/* Show bigger object art and puzzle title/link/state when clicked */}
    </button>
  );
};

export const ModalBackdrop = styled.div`
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

export const PuzzleLinkBackdrop = styled.div`
  background-color: rgba(101, 112, 86, 0.8);
  width: 600px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

const BillieSpeechContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const SpeechBubble = styled.div`
  width: 50%;
  padding: 2rem;
  margin-right: 50px;
  margin-bottom: 100px;
  position: relative;
  border: 3px solid #7f7f7f;
  border-radius: 43px;
  background: rgba(255, 255, 255, 0.86);
  outline: 4px solid rgba(255, 255, 255, 0.86);
  box-shadow: 20px -20px 15px rgb(20 34 35 / 20%);
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-family: "EB Garamond", serif;
  white-space: pre-wrap;
  font-size: 24px;

  &::before {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, 0.86);
    width: 10%;
    height: 50px;
    left: calc(100% + 7px);

    bottom: 45px;
    clip-path: polygon(0 0, 100% 100%, 0 75%);
  }
`;

const Billie = styled.img`
  width: 15%;
`;

const BillieSpeech = () => {
  function handleReset() {
    const hasLocalState = !!window.localStorage.getItem("illegalSearchGates");
    const confirmed =
      !hasLocalState ||
      confirm(
        "Are you sure you want to reset The Illegal Search and lose your progress?",
      );
    if (confirmed) {
      localStorage.setItem("haveShownSearchIntro", "true");

      window.localStorage.removeItem("illegalSearchGates");

      document.location.reload();
    }
  }

  function handleGoToUnlocked() {
    const hasLocalState = !!window.localStorage.getItem("illegalSearchGates");
    const confirmed =
      !hasLocalState ||
      confirm(
        "Are you sure you want to skip to the fully-unlocked state and lose your progress?",
      );
    if (confirmed) {
      localStorage.setItem("haveShownSearchIntro", "true");

      const illegalSearchGates =
        HUNT.rounds.find((r) => r.slug === "illegal_search")?.gates ?? [];

      window.localStorage.setItem(
        "illegalSearchGates",
        illegalSearchGates.map((g) => g.id).join(","),
      );

      document.location.reload();
    }
  }

  return (
    <BillieSpeechContainer>
      <SpeechBubble>
        <div>
          For this investigation we want to lay out important ground rules.
          Normally for this type of search, I’d want to get in and escape within
          one hour, but fortunately Papa is tied up at the Gala, so you should
          have until Sunday evening to complete the search. Each code is only
          used once, and once you’ve opened a lock, leave it where you found it
          to make it easier to reset the room, I mean, cover our tracks. You
          won’t need to climb on the furniture. If something doesn’t move with
          two fingers of force, you probably haven’t opened it yet. And
          remember—the front door will remain unlocked the entire time if you
          feel the need to investigate other locations.{"\n\n"}Now don’t just
          stand there, team. Go find out what Papa’s hiding!
        </div>
        {!archiveMode && (
          <AuthorsNoteBlock style={{ marginTop: "1rem", fontSize: "24px" }}>
            <p>
              During the hunt, teams advanced through this round with state
              persisted to the server. For this archival version, we save your
              progress in-browser. You can start from the beginning, or jump to
              the fully-unlocked state revealed after solving the second
              metapuzzle.
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={handleReset}>Start from Beginning</Button>
              <Button onClick={handleGoToUnlocked}>
                Explore From After Second Metapuzzle
              </Button>
            </div>
          </AuthorsNoteBlock>
        )}
      </SpeechBubble>
      <Billie src={billie} alt="Billie" />
    </BillieSpeechContainer>
  );
};

const BilliePopupTrigger = styled.button`
  transform: scaleX(-1);
  background: none;
  border: none;
  padding: none;
  position: absolute;
  bottom: 10px;
  left: 10px;

  cursor: ${zoom_cursor};

  & img {
    width: 150px;
  }
`;

const wallpaperSvg = `url("data:image/svg+xml,%3Csvg width='80' height='88' viewBox='0 0 80 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 21.91V26h-2c-9.94 0-18 8.06-18 18 0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73 3.212-6.99 9.983-12.008 18-12.73V62h2c9.94 0 18-8.06 18-18 0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73-3.212 6.99-9.983 12.008-18 12.73zM54 58v4.696c-5.574 1.316-10.455 4.428-14 8.69-3.545-4.262-8.426-7.374-14-8.69V58h-5.993C12.27 58 6 51.734 6 44c0-7.732 6.275-14 14.007-14H26v-4.696c5.574-1.316 10.455-4.428 14-8.69 3.545 4.262 8.426 7.374 14 8.69V30h5.993C67.73 30 74 36.266 74 44c0 7.732-6.275 14-14.007 14H54zM42 88c0-9.94 8.06-18 18-18h2v-4.09c8.016-.722 14.787-5.738 18-12.73v7.434c-3.545 4.262-8.426 7.374-14 8.69V74h-5.993C52.275 74 46 80.268 46 88h-4zm-4 0c0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73v7.434c3.545 4.262 8.426 7.374 14 8.69V74h5.993C27.73 74 34 80.266 34 88h4zm4-88c0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73v-7.434c-3.545-4.262-8.426-7.374-14-8.69V14h-5.993C52.27 14 46 7.734 46 0h-4zM0 34.82c3.213-6.992 9.984-12.008 18-12.73V18h2c9.94 0 18-8.06 18-18h-4c0 7.732-6.275 14-14.007 14H14v4.696c-5.574 1.316-10.455 4.428-14 8.69v7.433z' fill='%23765d2f' fill-opacity='0.48' fill-rule='evenodd'/%3E%3C/svg%3E");`;

const SearchEngineSurface = styled.div<{
  $backgroundImage: string;
}>`
  width: 1920px;
  height: 1080px;
  transform-origin: top left;

  position: relative;
  overflow: hidden;
  cursor: ${default_cursor};

  ${({ $backgroundImage }) => {
    if ($backgroundImage === "__wallpaper__") {
      return `
        background-color: #4a431e;
        background-image: ${wallpaperSvg}
      `;
    } else if ($backgroundImage === "__wallpaper_lg__") {
      return `
        background-color: #4a431e;
        background-image: ${wallpaperSvg};
        background-size: 160px 196px;
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

const Interaction = ({
  pluginName,
  node,
  showModal,
  setNode,
  navigate,
  teamState,
}: {
  pluginName: string;
  node: Node;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  setNode: (node: Node) => void;
  navigate: (destId: string) => void;
  teamState: TeamHuntState;
}) => {
  const Component = plugins[pluginName];

  if (!Component) {
    return null;
  }

  return (
    <Component
      node={node}
      showModal={showModal}
      setNode={setNode}
      navigate={navigate}
      teamState={teamState}
    />
  );
};

const SearchEngine = ({
  initialTeamState,
}: {
  initialTeamState: TeamHuntState;
}) => {
  const teamState = useTeamState(initialTeamState);

  const haveShownIntro =
    localStorage.getItem("haveShownSearchIntro") === "true";
  console.log(window.localStorage);
  const [introModalShown, setShownIntroModal] =
    useState<boolean>(!haveShownIntro);
  const setShowIntroModal = useCallback(() => {
    setShownIntroModal(true);
  }, []);
  const dismissIntroModal = useCallback(() => {
    setShownIntroModal(false);
    localStorage.setItem("haveShownSearchIntro", "true");
    console.log(window.localStorage);
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const [node, setNode] = useState<Node>(
    fetchNode(urlParams.get("node") ?? "main_north"),
  );
  console.log("NODE", node);
  const [modalShown, setModalShown] = useState<
    ModalWithPuzzleFields | undefined
  >(undefined);

  const [scaleFactor, setScaleFactor] = useState<number>(1);
  useLayoutEffect(() => {
    const updateScale = () => {
      setScaleFactor(
        Math.min(
          (document.documentElement.clientHeight - 48) / RASTER_HEIGHT, // account for navbar
          document.documentElement.clientWidth / RASTER_WIDTH,
        ),
      );
    };
    (window.visualViewport ?? window).addEventListener("resize", updateScale);
    updateScale();

    return () => {
      (window.visualViewport ?? window).removeEventListener(
        "resize",
        updateScale,
      );
    };
  }, []);

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

  function getMouseCoords(
    scaleFactor: number,
    e: React.MouseEvent,
  ): { x: number; y: number } {
    const offsetY = (e.pageY - 48) / scaleFactor;
    const offsetX = e.pageX / scaleFactor;
    return {
      x: ((offsetX - RASTER_WIDTH / 2) / RASTER_WIDTH) * 2,
      y: ((RASTER_HEIGHT / 2 - offsetY) / RASTER_HEIGHT) * 2,
    };
  }

  const mouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      const { x, y } = getMouseCoords(scaleFactor, e);
      setStartPoint({ x, y });
      setDragPoint({ x, y });
    },
    [scaleFactor],
  );
  const mouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();

      const { x, y } = getMouseCoords(scaleFactor, e);

      setCursorX(x);
      setCursorY(y);
      if (dragging) {
        setDragPoint({ x, y });
      }
    },
    [dragging, scaleFactor],
  );
  const mouseUp: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleNavClick = useCallback(
    ({ destId, sound }: { destId: string; sound?: string }) => {
      setModalShown(undefined);

      // start playing sound, if requested
      if (sound !== undefined) {
        const elem = document.createElement("audio");
        elem.src = sound;
        void elem.play();
      }

      setNode(fetchNode(destId));

      history.pushState(
        { node },
        "",
        `${rootUrl}/rounds/illegal_search?node=${destId}`,
      );
    },
    [node],
  );

  const onGoBack = useCallback((e: PopStateEvent) => {
    // Override history back/forward
    e.preventDefault();
    console.log(e.state);
    const prevState = e.state as { node: Node };
    const prevNode = prevState.node;
    setModalShown(undefined);

    // refetch the node in case it's changed
    setNode(fetchNode(prevNode.id));
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
            zIndex={modal.zIndex}
          />
        );
      }),
    );

  const navigations = node.navigations.map((navigation) => {
    return (
      <Navigation
        key={`nav-${navigation.destId}-${navigation.area.left}-${navigation.area.top}-${navigation.area.right}-${navigation.area.bottom}`}
        navigation={navigation}
        onClick={handleNavClick}
      />
    );
  });

  const escapes = (node.escapes ?? []).map((escape) => {
    return (
      <EscapeLink
        key={`escape-${escape.href}-${escape.area.left}-${escape.area.top}-${escape.area.right}-${escape.area.bottom}`}
        escape={escape}
      />
    );
  });

  const billiePopupTrigger = !introModalShown && (
    <BilliePopupTrigger onClick={setShowIntroModal}>
      <img src={billie} alt="Billie" />
    </BilliePopupTrigger>
  );

  const interactions: JSX.Element[] = [];
  const overlayInteractions: JSX.Element[] = [];

  node.interactions.forEach((interaction) => {
    const jsx = (
      <Interaction
        pluginName={interaction.plugin}
        key={`interaction-${interaction.plugin}`}
        node={node}
        showModal={showModal}
        setNode={setNode}
        navigate={(dest) => {
          handleNavClick({ destId: dest });
        }}
        teamState={teamState}
      />
    );

    if (interaction.overlay) {
      overlayInteractions.push(jsx);
    } else {
      interactions.push(jsx);
    }
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
  if (introModalShown) {
    modalOverlay = (
      <ModalBackdrop onClick={dismissIntroModal}>
        <BillieSpeech />
      </ModalBackdrop>
    );
  } else if (modalShown) {
    const puzzleState = teamState.puzzles[modalShown.slug];
    modalOverlay = (
      <ModalBackdrop onClick={dismissModal}>
        <img
          width={800}
          height={600}
          src={modalShown.asset}
          style={{ objectFit: "contain" }}
          alt={modalShown.altText}
        />
        <PuzzleLinkBackdrop>
          <PuzzleLink
            epoch={teamState.epoch}
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
    <ScreenScaleFactor.Provider value={scaleFactor}>
      <ExtraModalRendererProvider>
        <SearchEngineSurface
          style={{
            // Performance: we use inline styles instead of styled-components for
            // properties that can change frequently (e.g. during window resize)
            // or to values from a very large domain of possibilities (many
            // possible floating point values for scaleFactor)
            transform: `scale(${scaleFactor})`,
          }}
          $backgroundImage={node.background}
          onMouseMove={shouldCapture ? mouseMove : undefined}
          onMouseDown={shouldCapture ? mouseDown : undefined}
          onMouseUp={shouldCapture ? mouseUp : undefined}
        >
          {assets}
          {interactions}
          <Asset
            key="round_title"
            placedAsset={{
              area: {
                left: 0.76,
                right: 1,
                top: -0.8,
                bottom: -0.965,
              },
              asset: node.title,
            }}
          />
          {navigations}
          {escapes}
          {billiePopupTrigger}
          {modals}
          {overlayInteractions}
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
      </ExtraModalRendererProvider>
    </ScreenScaleFactor.Provider>
  );
};

export default SearchEngine;
