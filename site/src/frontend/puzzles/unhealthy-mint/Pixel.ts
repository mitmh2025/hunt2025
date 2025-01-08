import type p5 from "p5";
class Pixel {
  private p: p5;
  public color: p5.Color;
  public distance: number;
  public empty: boolean;

  constructor(p: p5) {
    this.p = p;
    this.color = this.p.color(0, 0, 0);
    this.distance = -1;
    this.empty = true;
  }

  reset() {
    this.color = this.p.color(0, 0, 0);
    this.distance = -1;
    this.empty = true;
  }
}

export default Pixel;
