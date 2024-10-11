import p5 from "p5";
import Pixel from "./Pixel";
import Player from "./Player";
import Wall from "./Wall";
import {
  type WallShape,
  lineLength,
  height,
  orienterLength,
} from "./constants";
import wallData from "./wallData";

const elem = document.getElementById("_land-root");

let player: Player;
let walls: Wall[];
let pixels: Pixel[];

// TODO: just import this directly
function initWalls(p: p5) {
  const walls: Wall[] = [];

  const json = JSON.parse(wallData) as WallShape[];
  for (const wall of json) {
    walls.push(new Wall(p, wall));
  }
  return walls;
}

function sketch(p: p5) {
  p.preload = function preload() {
    walls = initWalls(p);
  };
  p.setup = function setup() {
    p.createCanvas(lineLength, height);

    player = new Player(p);
    pixels = new Array<Pixel>(lineLength);
    for (let j = 0; j < lineLength; j++) {
      pixels[j] = new Pixel(p);
    }
    p.background(0);
  };
  p.draw = function draw() {
    //Reset pixels
    for (let j = 0; j < lineLength; j++) {
      pixels[j]?.reset();
    }

    //Update position
    player.move(
      p.keyIsDown(81) || p.keyIsDown(p.LEFT_ARROW),
      p.keyIsDown(69) || p.keyIsDown(p.RIGHT_ARROW),
      p.keyIsDown(65),
      p.keyIsDown(68),
      p.keyIsDown(87) || p.keyIsDown(p.UP_ARROW),
      p.keyIsDown(83) || p.keyIsDown(p.DOWN_ARROW),
      p.keyIsDown(73),
      p.keyIsDown(74),
      p.keyIsDown(75),
      p.keyIsDown(76),
    );
    for (const wall of walls) {
      wall.collideEdges(player);
    }
    for (const wall of walls) {
      wall.collideEdges(player);
    }
    for (const wall of walls) {
      wall.collideVertices(player);
    }
    for (const wall of walls) {
      wall.update(player, pixels);
    }

    // Draw to canvas
    p.background(0);
    p.strokeWeight(1);
    for (let j = 0; j < lineLength; j++) {
      const pixel = pixels[j];
      if (pixel) {
        p.stroke(pixel.color);
        p.line(j, 0, j, height);
      }
    }
    p.line(lineLength, 0, lineLength, height);

    for (let j = lineLength - 2 * orienterLength; j < lineLength; j++) {
      if (p.sin(player.rot) >= 0 !== j < lineLength - orienterLength) {
        p.stroke(255, 0, 0);
      } else {
        p.stroke(210, 210, 210);
      }
      if (
        p.abs(lineLength - orienterLength - j) <
        p.abs(p.sin(player.rot)) * orienterLength
      ) {
        p.line(j, 0, j, height);
      }
    }
  };
}

if (elem) {
  new p5(sketch, elem);
  //const root = createRoot(elem);
  //root.render(<App />);
} else {
  console.error(
    "Could not mount _land because #_land-root was nowhere to be found",
  );
}
