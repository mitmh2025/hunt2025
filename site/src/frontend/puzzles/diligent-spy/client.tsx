const elem = document.getElementById("can-do-transmissions-audio");
if (elem && elem instanceof HTMLAudioElement) {
  // Attempt to preserve the "live" nature of the broadcast, unless the user manually seeks
  let autoSeek = false;
  let didManualSeek = false;

  elem.addEventListener("play", () => {
    if (didManualSeek) {
      return;
    }
    const seek = (Date.now() / 1000) % elem.duration;
    autoSeek = true;
    elem.currentTime = seek;
  });
  elem.addEventListener("seeked", () => {
    if (autoSeek) {
      autoSeek = false;
      return;
    }
    didManualSeek = true;
  });
}
