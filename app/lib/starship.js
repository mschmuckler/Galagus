import Laser from './laser';

class Starship {
  constructor() {
    this.img = document.getElementById("starship");
    this.x = 223;
    this.y = 540;
    this.diameter = 50;
    this.lasers = [];
    this.keysDown = {};

    document.addEventListener("keydown", (e) => {
      this.keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", (e) => {
      delete this.keysDown[e.keyCode];
    }, false);
  }


  moveStarship() {
    if (this.keysDown[37] && this.x > 10) {
      this.x -= 3;
    } else if (this.keysDown[39] && this.x < 440) {
      this.x += 3;
    }
  }

  shootLaser() {
    if (this.keysDown[32]) {
      const laser = new Laser(this.x, this.y);
      this.lasers.push(laser);
    }
  }

  renderLasers(canvas, ctx) {
    this.lasers.forEach(laser => {
      laser.renderLaser(canvas, ctx);
    });
  }

  renderStarship(canvas, ctx) {
    this.moveStarship();
    this.shootLaser();
    this.renderLasers(canvas, ctx);

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.diameter,
      this.diameter
    );
  }
}

export default Starship;
