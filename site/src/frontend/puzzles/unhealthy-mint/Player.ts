import p5 from "p5";
class Player {
  private p: p5;
  public pos: p5.Vector;
  public rot: number;
  public speed: number;
  public rotspeed: number;
  public radius: number;
  public snapspeed: number;
  public snapdir: number;

  constructor(p: p5) {
    this.p = p;
    this.pos = p.createVector(0, 0);
    this.rot = -0.000001;
    this.speed = 0.07;
    this.rotspeed = 0.02;
    this.radius = 0.5;
    this.snapspeed = 0.05;
    this.snapdir = -1;
  }

  move(
    lrot: boolean,
    rrot: boolean,
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean,
    north: boolean,
    west: boolean,
    south: boolean,
    east: boolean,
  ) {
    if (lrot) {
      this.rot = (this.rot + this.rotspeed) % this.p.TWO_PI;
    }
    if (rrot) {
      this.rot = (this.rot - this.rotspeed) % this.p.TWO_PI;
    }
    if (left) {
      this.pos.sub(p5.Vector.fromAngle(this.rot, this.speed));
    }
    if (right) {
      this.pos.add(p5.Vector.fromAngle(this.rot, this.speed));
    }
    if (up) {
      this.pos.add(p5.Vector.fromAngle(this.rot + this.p.HALF_PI, this.speed));
    }
    if (down) {
      this.pos.sub(p5.Vector.fromAngle(this.rot + this.p.HALF_PI, this.speed));
    }

    if (north && this.snapdir === -1) {
      this.snapdir = -0.000001;
    } else if (east && this.snapdir === -1) {
      this.snapdir = this.p.PI + this.p.HALF_PI;
    } else if (south && this.snapdir === -1) {
      this.snapdir = this.p.PI;
    } else if (west && this.snapdir === -1) {
      this.snapdir = this.p.HALF_PI;
    }

    if (this.snapdir !== -1) {
      if (this.p.sin(this.snapdir - this.rot) > 0.2) {
        this.rot = (this.rot + this.snapspeed) % this.p.TWO_PI;
      } else if (this.p.sin(this.snapdir - this.rot) < -0.2) {
        this.rot = (this.rot - this.snapspeed) % this.p.TWO_PI;
      } else if (this.p.cos(this.rot - this.snapdir) < 0) {
        this.rot = (this.rot + this.snapspeed) % this.p.TWO_PI;
      } else {
        this.rot = this.snapdir;
        this.snapdir = -1;
      }
    }
  }
}

export default Player;
