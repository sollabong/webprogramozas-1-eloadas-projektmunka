import { Particle } from './particle.js';

class App {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];

    this.initCanvas();
    this.addListeners();
    this.animate();
  }

  initCanvas() {
    this.canvas.width = 800;
    this.canvas.height = 400;
  }

  addListeners() {
    this.canvas.addEventListener('click', (e) => {
      for (let i = 0; i < 10; i++) {
        this.particles.push(new Particle(e.offsetX, e.offsetY));
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);

      if (p.size <= 0.2) {
        this.particles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

new App();
