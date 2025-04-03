import clientIsBot from "../utils/clientIsBot";

const main = () => {
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.textContent = "#root { display: none }";

  window.addEventListener("load", () => {
    document.head.removeChild(style);
  });
};

if (!clientIsBot) {
  main();
}
