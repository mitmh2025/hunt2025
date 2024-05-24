import { hydrateApp } from "@mfng/core/client/browser";

hydrateApp().catch((e: unknown) => {
  console.error(e);
});
