export default function playSound(src: string) {
  const audio = document.createElement("audio");
  audio.src = src;
  void audio.play();
}
