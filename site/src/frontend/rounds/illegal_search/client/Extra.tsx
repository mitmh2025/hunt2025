import React, {
  useState,
  type MouseEventHandler,
  useCallback,
  type ReactNode,
  useRef,
  useContext,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../../lib/api/client";
import PuzzleLink from "../../../components/PuzzleLink";
import huntLocalStorage from "../../../utils/huntLocalStorage";
import blacklight_off from "../assets/blacklight/blacklight_off.svg";
import blacklight_on from "../assets/blacklight/blacklight_on.svg";
import {
  type Modal,
  hasExtraPuzzleFields,
  hasExtraPostCode,
  type Node,
  type ModalWithExtraPuzzleFields,
  type ScreenArea,
  type PlacedAsset,
} from "../types";
import { useExtraModalRenderer } from "./ExtraModalRenderer";
import {
  type Pos,
  ScreenScaleFactor,
  useTrackPointerPos,
} from "./ScreenScaleFactor";
import {
  Asset,
  boundsForArea,
  ModalBackdrop,
  PuzzleLinkBackdrop,
} from "./SearchEngine";
import { fetchModal } from "./clientState";
import { zoom_cursor, default_cursor } from "./cursors";

// This is a copy of ModalTrigger, but using the "extra" fields that return
// the blacklight assets
function ExtraModalTrigger({
  modal,
  showModal,
  backgroundColor,
}: {
  modal: Modal;
  showModal: ({ modal }: { modal: ModalWithExtraPuzzleFields }) => void;
  backgroundColor?: string;
}) {
  const initialTitle = hasExtraPuzzleFields(modal)
    ? modal.extra?.title
    : undefined;
  const initialSlug = hasExtraPuzzleFields(modal)
    ? modal.extra?.slug
    : undefined;
  const initialDesc = hasExtraPuzzleFields(modal)
    ? modal.extra?.desc
    : undefined;
  const [title, setTitle] = useState<string | undefined>(initialTitle);
  const [slug, setSlug] = useState<string | undefined>(initialSlug);
  const [desc, setDesc] = useState<string | undefined>(initialDesc);
  const postCode = hasExtraPostCode(modal) ? modal.extra?.postCode : undefined;

  const onAreaClicked: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      // If there is a postCode set, we need to make the fetch so we can
      // 1) notify the backend we found the thing to click on, so it unlocks the associated puzzle
      // 2) in the response to that POST, get (and save) the title and slug that we need to display
      if (postCode !== undefined && title === undefined && slug === undefined) {
        console.log("POSTing extra code", postCode);

        fetchModal(postCode)
          .then((json) => {
            setTitle(json.title);
            setSlug(json.slug);
            setDesc(json.desc);

            const modalWithExtraPuzzleFields = {
              area: modal.area,
              asset: modal.asset,
              altText: modal.altText,
              extra: modal.extra
                ? {
                    asset: modal.extra.asset,
                    altText: modal.extra.altText,
                    title: json.title,
                    slug: json.slug,
                    desc: json.desc,
                  }
                : undefined,
            };
            showModal({ modal: modalWithExtraPuzzleFields });
          })
          .catch(() => {
            console.log("unexpected error");
          });
      } else if (title && slug) {
        const modalWithExtraPuzzleFields = {
          area: modal.area,
          asset: modal.asset,
          altText: modal.altText,
          extra: modal.extra
            ? {
                asset: modal.extra.asset,
                altText: modal.extra.altText,
                title,
                slug,
                desc,
              }
            : undefined,
        };
        showModal({ modal: modalWithExtraPuzzleFields });
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
  };

  return (
    <button style={style} onClick={onAreaClicked}>
      {/* Show bigger object art and puzzle title/link/state when clicked */}
    </button>
  );
}

// InteractionLayer wraps the blacklight assets and selectively reveals only
// the portion around the mouse.
function InteractionLayer({
  children,
  styles = {},
}: {
  children: ReactNode;
  styles?: React.CSSProperties;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mousePos = useTrackPointerPos({
    offset: {
      x: wrapperRef.current?.getBoundingClientRect().left ?? 0,
      y: wrapperRef.current?.getBoundingClientRect().top ?? 0,
    },
  });

  useEffect(() => {
    // Instead of updating the mask on every render, we use requestAnimationFrame
    // to throttle the updates. Mask updates are expensive, so we only want to
    // apply them as quicky as the browser can handle.
    function render() {
      if (!wrapperRef.current || !mousePos) {
        return;
      }

      const mask = `radial-gradient(
        circle at ${mousePos.x}px ${mousePos.y}px,
        black 100px,
        transparent 150px
      )`;

      wrapperRef.current.style.mask = mask;
    }

    const handle = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(handle);
    };
  }, [mousePos]);

  if (!mousePos) {
    return null;
  }

  const wrapperStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    mask: `radial-gradient(
      circle at -1000px -1000px,
      black 100px,
      transparent 150px
    )`,
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
    },
    pointerEvents: "none",
    "& *": {
      pointerEvents: "default",
    },
    ...styles,
  } as const;
  return (
    <div style={wrapperStyles} ref={wrapperRef}>
      {children}
    </div>
  );
}

// Pointer overlay: display a radial flashlight effect around the pointer
const PointerEl = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(150, 118, 203, 0.5) 10px,
    transparent 150px
  );
  pointer-events: none;
`;
function Pointer({ pos }: { pos: Pos }) {
  const scaleFactor = useContext(ScreenScaleFactor);

  return (
    <>
      {createPortal(
        <PointerEl
          style={{
            top: pos.y - 150,
            left: pos.x - 150,
            transform: `scale(${scaleFactor})`,
          }}
        />,
        document.body,
      )}
    </>
  );
}

const ToggleOn = styled.button`
  position: absolute;
  bottom: 10px;
  right: 200px;
  background: url(${blacklight_on});
  background-repeat: no-repeat;
  width: 64px;
  height: 150px;
  user-select: none;
  border: none;
  cursor: ${default_cursor};
`;

const ToggleOff = styled(ToggleOn)`
  background: url(${blacklight_off});
`;

const OtherModalBackdrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  pointer-events: none;
  background: #00000033;
`;

export default function Extra({
  node,
  teamState,
}: {
  node: Node;
  teamState: TeamHuntState;
}) {
  // Track page pointer position to render the mouse overlay (we do this without
  // applying the scale factor, since the mouse overlay is rendered via Portal
  // into the document body rather than the scaled SearchEngineContainer)
  const mousePos = useTrackPointerPos({
    skipScaleFactor: true,
    offset: { x: 0, y: 0 },
  });

  // Modal state for blacklight modals
  const [modalShown, setModalShown] = useState<
    ModalWithExtraPuzzleFields | undefined
  >(undefined);

  const [active, setActive] = useState(
    huntLocalStorage.getItem("flashlightOn") === "true",
  );
  const toggleActive = useCallback(() => {
    setActive((active) => {
      huntLocalStorage.setItem("flashlightOn", (!active).toString());
      return !active;
    });
  }, []);

  const dismissModal = useCallback(() => {
    setModalShown(undefined);
  }, []);

  // Provide an "extra modal renderer" to the ExtraModalRendererProvider.
  // Interactions that use modals will call this function to render their
  // extra / blacklight modals.
  const modalRenderer = useCallback(
    (modals: Modal[], otherPlacedAssets: PlacedAsset[] = []) => {
      if (!active) {
        return null;
      }

      const allAssets = otherPlacedAssets
        .map((asset) => {
          if (!asset.extraAsset) {
            return null;
          }

          return (
            <Asset
              key={asset.asset}
              placedAsset={{
                area: asset.area,
                asset: asset.extraAsset,
              }}
            />
          );
        })
        .concat(
          modals.map((modal) => {
            if (!modal.extra) {
              return null;
            }

            let area: ScreenArea;
            let asset: string | null;
            if (modal.placedAsset) {
              area = modal.placedAsset.area;
              asset = modal.placedAsset.extraAsset ?? modal.placedAsset.asset;
            } else {
              area = modal.area;
              asset = modal.extra.asset;
            }

            const placedAsset = { area, asset };
            return <Asset key={modal.asset} placedAsset={placedAsset} />;
          }),
        );

      if (allAssets.length === 0) {
        return null;
      }

      const modalTriggers = modals.map((modal) => {
        if (!modal.extra) {
          return null;
        }

        return (
          <ExtraModalTrigger
            key={`interaction-modal-${modal.asset}`}
            modal={modal}
            showModal={({ modal }) => {
              setModalShown(modal);
            }}
          />
        );
      });

      return (
        <>
          <InteractionLayer>{allAssets}</InteractionLayer>
          {modalTriggers}
        </>
      );
    },
    [active],
  );

  useExtraModalRenderer(modalRenderer);

  const nonInteractionModalTriggers = modalRenderer(
    node.modals,
    node.placedAssets,
  );

  // Render blacklight modal if it's been triggered
  let modalOverlay = undefined;
  if (modalShown && modalShown.extra) {
    const puzzleState = teamState.puzzles[modalShown.extra.slug];
    modalOverlay = (
      <ModalBackdrop onClick={dismissModal}>
        <div style={{ position: "relative" }}>
          <img
            width={800}
            height={600}
            src={modalShown.asset}
            style={{ objectFit: "contain" }}
            alt={modalShown.altText}
          />
          {active && (
            <InteractionLayer>
              <img
                width={800}
                height={600}
                src={modalShown.extra.asset}
                style={{ objectFit: "contain" }}
                alt={modalShown.altText}
              />
            </InteractionLayer>
          )}
        </div>

        <PuzzleLinkBackdrop>
          <PuzzleLink
            epoch={teamState.epoch}
            lockState={puzzleState?.locked ?? "locked"}
            answer={puzzleState?.answer}
            currency={teamState.currency}
            title={modalShown.extra.title}
            slug={modalShown.extra.slug}
            desc={modalShown.extra.desc}
          />
        </PuzzleLinkBackdrop>
      </ModalBackdrop>
    );
  }

  return (
    <>
      {nonInteractionModalTriggers}
      {active ? (
        <ToggleOn onClick={toggleActive} />
      ) : (
        <ToggleOff onClick={toggleActive} />
      )}
      {active && <OtherModalBackdrop />}
      {modalOverlay}
      {active && mousePos ? <Pointer pos={mousePos} /> : null}
    </>
  );
}
