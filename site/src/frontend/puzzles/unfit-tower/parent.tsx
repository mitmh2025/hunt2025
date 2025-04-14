import rootUrl from "../../utils/rootUrl";

const iframe = document.getElementById(
  "maze-of-lies-iframe",
) as HTMLIFrameElement | null;
if (iframe) {
  const search = new URLSearchParams(location.search);
  const room = search.get("room");
  if (room) {
    iframe.src = `${rootUrl}/puzzles/maze_of_lies/rooms/${room}`;
  }
}

window.addEventListener("message", (event) => {
  if (!event.isTrusted) {
    return;
  }

  if (!("type" in event.data)) {
    return;
  }

  const data = event.data as { type: string; roomId?: string };

  if (data.type === "setCurrentRoom" && data.roomId) {
    const search = new URLSearchParams(location.search);
    search.set("room", data.roomId);
    history.replaceState({}, "", `${location.pathname}?${search}`);
  }
});
