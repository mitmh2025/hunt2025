import PrefixedLocalStorage from "./PrefixedLocalStorage";
import archiveMode from "./archiveMode";

const huntLocalStorage = new PrefixedLocalStorage(
  archiveMode ? "hunt2025_" : "",
  () => window.localStorage,
);
export default huntLocalStorage;
