import archiveMode from "./archiveMode";

function apiUrl() {
  // We would like to make the assumption about where the API base URL is in
  // exactly one place in case we need to change that later.  We probably won't.
  if (archiveMode) {
    return "";
  }
  return location.origin + "/api";
}

export default apiUrl;
