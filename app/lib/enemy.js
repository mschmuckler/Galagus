class Enemy {
  constructor(xFormation, yFormation, centerX, centerY, xCurveDirection, yCurveDirection) {
    this.img = document.getElementById("enemy1");
    this.destroyImg = document.getElementById("enemy-explosion");
    this.size = 50;
    this.alive = true;
    this.attacking = false;
    this.horizontalGain = 1;
    this.x = null;
    this.y = null;
    this.xSpeed = null;
    this.ySpeed = null;
    this.xF = xFormation;
    this.yF = yFormation;
    this.frameCount = 0;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = 150;
    this.angle = 0;
    this.xCurveDirection = xCurveDirection;
    this.yCurveDirection = yCurveDirection;

    setTimeout(() => {
      this.attacking = true;
    }, Math.random() * 30000);
  }

  curveFromEntrance() {
    if (this.alive) {
      this.angle += .018;
      this.x = this.centerX + ((Math.cos(this.angle) * this.radius) * this.xCurveDirection);
      this.y = this.centerY + ((Math.sin(this.angle) * this.radius) * this.yCurveDirection);
      this.frameCount++;
    }
  }

  reEnterFormation() {
    if (this.alive) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.frameCount++;
    }
  }

  attack() {
    if (this.alive && this.attacking) {
      if (this.y > 600) {
        this.y = -10;
      } else {
        this.y += 3;
      }

      if (this.horizontalGain > 0) {
        if (this.horizontalGain > Math.random() * 60) {
          this.horizontalGain = 0;
        } else {
          this.horizontalGain += 0.1;
        }
      } else {
        if (this.horizontalGain < Math.random() * -60) {
          this.horizontalGain = 1;
        } else {
          this.horizontalGain -= 0.1;
        }
      }

      this.x += this.horizontalGain;
      this.frameCount++;
    }
  }

  destroy() {
    this.alive = false;
    this.img = this.destroyImg;
    setTimeout(() => {
      this.x = -1000;
      this.y = -1000;
    }, 100);
  }

  setSpeeds() {
    this.xSpeed = ((this.xF - this.x) / 50);
    this.ySpeed = ((this.yF - this.y) / 50);
  }

  renderEnemy(canvas, ctx) {
    if (this.frameCount < 170) {
      this.curveFromEntrance();
      this.setSpeeds();
    } else if (this.frameCount < 220) {
      this.reEnterFormation();
    } else if (this.frameCount < 400) {
      this.attack();
      this.setSpeeds();
    } else {
      this.reEnterFormation();
      this.attacking = false;
      this.frameCount = 170;
      setTimeout(() => {
        this.attacking = true;
      }, Math.random() * 30000);
    }

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
}

export default Enemy;
