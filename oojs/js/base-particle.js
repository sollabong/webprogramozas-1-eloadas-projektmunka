export class BaseParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 20 + 10;
    this.color = '#2fdab4';
  }

  drawBase(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
