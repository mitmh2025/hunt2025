import { createRoot, hydrateRoot } from "react-dom/client";
import archiveMode from "../frontend/utils/archiveMode";

// In archive mode, hydration is never going to work, so avoid some noisy log
// lines by just doing a non-hydrating render
export default function renderRoot(
  container: Element | Document,
  children: React.ReactNode,
): void {
  if (archiveMode) {
    createRoot(container).render(children);
  } else {
    hydrateRoot(container, children);
  }
}
