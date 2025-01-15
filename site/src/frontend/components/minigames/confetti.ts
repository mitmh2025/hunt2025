import confetti from "canvas-confetti";

const getConfetti = () => {
  const colors = ["#f1db35", "#00bbbb", "#080806", "#f8f8f6"];
  confetti({
    particleCount: 200,
    angle: 60,
    spread: 55,
    origin: { x: -0.1 },
    colors: colors,
  });
  confetti({
    particleCount: 200,
    angle: 120,
    spread: 55,
    origin: { x: 1.1 },
    colors: colors,
  });
};

export default getConfetti;
