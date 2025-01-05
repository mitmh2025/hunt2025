import p5 from "p5";
import type Pixel from "./Pixel";
import type Player from "./Player";
import {
  type WallShape,
  fogAttenuation,
  lensDepth,
  lensWidth,
  lineLength,
  shadeAngle,
  shadeDarkness,
} from "./constants";

class Wall {
  private p: p5;
  private pos1: p5.Vector;
  private pos2: p5.Vector;
  private normal: p5.Vector;
  private color: p5.Color;

  constructor(p: p5, { x1, y1, x2, y2, r, g, b }: WallShape) {
    this.p = p;
    this.pos1 = this.p.createVector(x1, y1);
    this.pos2 = this.p.createVector(x2, y2);
    this.normal = this.p.createVector(y2 - y1, x1 - x2);
    this.color = p.color(r, g, b);
  }

  update(player: Player, pixels: Pixel[]) {
    //Transform points so player is at the origin facing up
    const rot = player.rot;
    const resetPos1 = this.pos1.copy();
    const resetPos2 = this.pos2.copy();
    resetPos1.sub(player.pos);
    resetPos2.sub(player.pos);
    resetPos1.rotate(-rot);
    resetPos2.rotate(-rot);

    //Signed display pixel
    let leftx, rightx;

    //Clip and project line vertices to camera plane
    if (resetPos1.y < 0.01 && resetPos2.y < 0.01) {
      //Both vertices behind camera
      return;
    } else if (resetPos1.y < 0.01) {
      //Left vertex behind camera
      const m = (resetPos2.y - resetPos1.y) / (resetPos2.x - resetPos1.x);
      if (resetPos1.x + (0.01 - resetPos1.y) / m > 0)
        //Behind right side of camera
        return;
      //Behind left side of camera
      leftx = -lineLength / 2;
      const lensx2 = this.p.int(
        ((resetPos2.x / resetPos2.y) * lensDepth * lineLength) / 2 / lensWidth,
      );
      rightx = this.p.min(lensx2, lineLength / 2);
    } else if (resetPos2.y < 0.01) {
      //Left vertex behind camera
      const m = (resetPos2.y - resetPos1.y) / (resetPos2.x - resetPos1.x);
      if (resetPos1.x + (0.01 - resetPos1.y) / m < 0)
        //Behind left side of camera
        return;
      //Behind right side of camera
      const lensx1 = this.p.int(
        ((resetPos1.x / resetPos1.y) * lensDepth * lineLength) / 2 / lensWidth,
      );
      leftx = this.p.max(-lineLength / 2, lensx1);
      rightx = lineLength / 2;
    } else {
      const lensx1 = this.p.int(
        ((resetPos1.x / resetPos1.y) * lensDepth * lineLength) / 2 / lensWidth,
      ); //correct scale for lensWidth
      const lensx2 = this.p.int(
        ((resetPos2.x / resetPos2.y) * lensDepth * lineLength) / 2 / lensWidth,
      );

      leftx = this.p.max(-lineLength / 2, lensx1);
      rightx = this.p.min(lensx2, lineLength / 2);
    }

    //Interpolate from left to right pixel, calculating the associated vertex on the line
    //Updates pixel value according to distance
    const x1 = resetPos1.x;
    const y1 = resetPos1.y;
    const x2 = resetPos2.x;
    const y2 = resetPos2.y;
    let m1;
    const m2 = (y1 - y2) / (x1 - x2);
    const b = y1 - m2 * x1;

    for (let x = leftx; x < rightx; x++) {
      //Interpolate
      let x0, y0;

      if (x === 0) {
        if (x1 === x2) continue;
        x0 = 0;
        y0 = b;
      } else if (x1 === x2) {
        m1 = lensDepth / ((x / lineLength) * 2 * lensWidth);
        x0 = x1;
        y0 = m1 * x0;
      } else {
        m1 = lensDepth / ((x / lineLength) * 2 * lensWidth);
        if (m1 === m2) continue;
        x0 = b / (m1 - m2);
        y0 = m1 * x0;
      }
      const projectedPoint = this.p.createVector(x0, y0);

      const dist = projectedPoint.mag();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed to be present
      const pixel = pixels[x + lineLength / 2]!;
      if (pixel.empty || (dist > lensDepth && dist < pixel.distance)) {
        pixel.distance = dist;

        const r = this.p.red(this.color);
        const g = this.p.green(this.color);
        const b = this.p.blue(this.color);
        const fogDist = this.p.max(dist, fogAttenuation);
        const shading = this.p.map(
          this.p.cos(this.normal.heading() + shadeAngle),
          -1,
          1,
          shadeDarkness,
          1,
        );
        pixel.color = this.p.color(
          ((r * shading) / fogDist) * fogAttenuation,
          ((g * shading) / fogDist) * fogAttenuation,
          ((b * shading) / fogDist) * fogAttenuation,
        );

        pixel.empty = false;
      }
    }
  }

  collideEdges(player: Player) {
    const playerPos = player.pos.copy();
    const origPos1 = this.pos1.copy();
    const origPos2 = this.pos2.copy();
    const midPoint = p5.Vector.add(origPos1, origPos2);
    midPoint.div(2);
    origPos1.sub(midPoint);
    origPos2.sub(midPoint);
    playerPos.sub(midPoint);

    const rot = origPos1.heading();
    origPos1.rotate(-rot);
    origPos2.rotate(-rot);
    playerPos.rotate(-rot);

    const lineSize = origPos1.x;

    //Broad scale collision check
    if (
      playerPos.y > player.radius ||
      playerPos.y < 0 ||
      this.p.abs(playerPos.x) > lineSize
    )
      return;
    const displacement = this.p.createVector(0, player.radius - playerPos.y);

    displacement.rotate(rot);
    player.pos.add(displacement);
  }

  collideVertices(player: Player) {
    const playerPos = player.pos.copy();
    const origPos1 = this.pos1.copy();
    const origPos2 = this.pos2.copy();
    const midPoint = p5.Vector.add(origPos1, origPos2);
    midPoint.div(2);
    origPos1.sub(midPoint);
    origPos2.sub(midPoint);
    playerPos.sub(midPoint);

    const rot = origPos1.heading();
    origPos1.rotate(-rot);
    origPos2.rotate(-rot);
    playerPos.rotate(-rot);

    // const lineSize = origPos1.x;

    //Broad scale collision check
    const displacement = p5.Vector.sub(origPos1, playerPos);
    if (displacement.mag() > player.radius) return;

    displacement.rotate(rot);
    displacement.setMag(displacement.mag() - player.radius);
    player.pos.add(displacement);
  }
}

export default Wall;
