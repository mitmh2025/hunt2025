import PrefixedLocalStorage from "../../../utils/PrefixedLocalStorage";
import huntLocalStorage from "../../../utils/huntLocalStorage";

export const CLEANSTRING_REGEX = /[^A-Z]/gi;
export const LOCAL_STORAGE_PREFIX = "TAMSB_";
export const SPELLING_BEE_STORAGE = new PrefixedLocalStorage(
  LOCAL_STORAGE_PREFIX,
  () => huntLocalStorage,
);
export const HAS_STORAGE = typeof Storage !== "undefined";
