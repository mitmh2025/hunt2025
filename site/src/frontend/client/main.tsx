import { hydrateApp } from "@mfng/core/client/browser";
import "./main.css";

hydrateApp().catch((e: unknown) => {
  console.error(e);
});
