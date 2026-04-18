import { BaseParticle } from './base-particle.js';

export class Particle extends BaseParticle {
  constructor(x, y) {
    super(x, y);
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw(ctx) {
    this.drawBase(ctx);
  }
}
