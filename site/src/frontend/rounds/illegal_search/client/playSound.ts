export default function playSound(
  src: string,
  { volume = 1 }: { volume?: number } = {},
) {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.volume = volume;
  void audio.play();
}
