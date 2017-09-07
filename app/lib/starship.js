import Laser from './laser';

class Starship {
  constructor() {
    this.img = document.getElementById("starship");
    this.x = 223;
    this.y = 540;
    this.size = 50;
    this.lasers = [];
    this.allowShoot = true;
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
    if (this.allowShoot && this.lasers.length < 2) {
      if (this.keysDown[32]) {
        const laser = new Laser(this.x, this.y);
        this.lasers.push(laser);
      }

      setTimeout(() => {
        this.allowShoot = true;
      }, 300);
      this.allowShoot = false;
    }
  }

  renderLasers(canvas, ctx) {
    this.lasers.forEach( (laser, idx) => {
      if (laser.y > 5) {
        laser.renderLaser(canvas, ctx);
      } else {
        let length = this.lasers.length;
        this.lasers = this.lasers.splice(0, idx).concat(
          this.lasers.splice(idx + 1, length)
        );
      }
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
      this.size,
      this.size
    );
  }
}

export default Starship;
