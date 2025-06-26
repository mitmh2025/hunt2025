import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import type { TeamHuntState } from "../../../lib/api/client";
import clientIsBot from "../utils/clientIsBot";
import rootUrl from "../utils/rootUrl";
import Loading from "./components/Loading";

const huntPage = location.pathname.startsWith(rootUrl);
const nonUnlockablePuzzlePage =
  (window as unknown as { cannedResponses?: string[] }).cannedResponses !==
    undefined ||
  (window as unknown as { statsSlug?: string }).statsSlug !== undefined;

const puzzleSlug = (window as unknown as { puzzleSlug?: string }).puzzleSlug;
const parentSlug = (window as unknown as { parentSlug?: string }).parentSlug;
const interactionSlug = (window as unknown as { interactionSlug?: string })
  .interactionSlug;

const archiveModals = async () => {
  if (clientIsBot) return;
  if (!huntPage) return;
  if (nonUnlockablePuzzlePage) return;

  const fetchActivityLog = await import("../../../lib/api/archive/log").then(
    (m) => m.fetchActivityLog,
  );
  const reduceTeamStateIntermediate = await import(
    "../../../lib/api/archive/reducers"
  ).then((m) => m.reduceTeamStateIntermediate);

  const isLocked = () => {
    if (!puzzleSlug && !interactionSlug) return false;

    const state = reduceTeamStateIntermediate(fetchActivityLog());
    const locked =
      (puzzleSlug !== undefined &&
        parentSlug === undefined &&
        !state.puzzles_unlocked.has(puzzleSlug)) ||
      (interactionSlug !== undefined &&
        !state.interactions_unlocked.has(interactionSlug));
    return locked;
  };

  const huntStarted = fetchActivityLog().some(
    (e) => e.type === "gate_completed" && e.slug === "hunt_started",
  );

  if (huntStarted && !isLocked()) return;

  const rootElem = document.createElement("div");
  document.body.appendChild(rootElem);
  const root = createRoot(rootElem);

  if (!huntStarted && isLocked()) {
    const UninitializedPuzzleModal = lazy(
      () => import("./components/UninitializedPuzzleModal"),
    );
    root.render(
      <Suspense fallback={<Loading />}>
        <UninitializedPuzzleModal
          unmount={() => {
            root.unmount();
          }}
        />
      </Suspense>,
    );
    return;
  }

  if (!huntStarted) {
    const InitializeActivityLogModal = lazy(
      () => import("./components/InitializeActivityLogModal"),
    );
    await new Promise<void>((resolve) => {
      root.render(
        <Suspense fallback={<Loading />}>
          <InitializeActivityLogModal
            unmount={() => {
              root.unmount();
              resolve();
            }}
          />
        </Suspense>,
      );
    });
  }

  if (isLocked()) {
    const LockedModal = lazy(() => import("./components/LockedModal"));
    root.render(
      <Suspense fallback={<Loading />}>
        <LockedModal
          unmount={() => {
            root.unmount();
          }}
        />
      </Suspense>,
    );
  }
};

const watchBacklinks = async () => {
  const backlinks = document.querySelectorAll<HTMLAnchorElement>(
    "a[data-round-backlink=true]",
  );
  if (backlinks.length === 0) return;

  const globalDatasetManager = await import(
    "@hunt_client/globalDatasetManager"
  ).then((m) => m.default);
  globalDatasetManager.watch(
    "team_state",
    undefined,
    { epoch: -1 },
    (update) => {
      const teamState = update as TeamHuntState;

      const roundSlug = teamState.puzzles[puzzleSlug ?? ""]?.round;
      const round = teamState.rounds[roundSlug ?? ""];

      let href, title;
      if (roundSlug === "stray_leads" || !round) {
        href = `${rootUrl}/rounds/stray_leads`;
        title = "Stray Leads";
      } else {
        href = `${rootUrl}/rounds/${roundSlug}`;
        title = round.title;
      }

      backlinks.forEach((link) => {
        link.href = href;
        link.textContent = `← Back to ${title}`;
      });
    },
  );
};

archiveModals()
  .then(async () => {
    await watchBacklinks();
  })
  .catch((err: unknown) => {
    console.error("Error initializing archive modals:", err);
    alert(
      "An error occurred while initializing the archive modals. Please try again later.",
    );
  });
