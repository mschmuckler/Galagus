class Enemy {
  constructor(xFormation, yFormation, centerX, centerY, xCurveDirection, yCurveDirection) {
    this.img = document.getElementById("enemy1");
    this.destroyImg = document.getElementById("enemy-explosion");
    this.size = 50;
    this.alive = true;
    this.x = null;
    this.y = null;
    this.xSpeed = null;
    this.ySpeed = null;
    this.xF = xFormation;
    this.yF = yFormation;
    this.entryFrameCount = 0;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = 150;
    this.angle = 0;
    this.xCurveDirection = xCurveDirection;
    this.yCurveDirection = yCurveDirection;
  }

  curveFromEntrance() {
    if (this.alive) {
      this.angle += .018;
      this.x = this.centerX + ((Math.cos(this.angle) * this.radius) * this.xCurveDirection);
      this.y = this.centerY + ((Math.sin(this.angle) * this.radius) * this.yCurveDirection);
      this.entryFrameCount++;
    }
  }

  reEnterFormation() {
    if (this.alive) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.entryFrameCount++;
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

  renderEnemy(canvas, ctx) {
    if (this.entryFrameCount < 170) {
      this.curveFromEntrance();
      this.xSpeed = ((this.xF - this.x) / 50);
      this.ySpeed = ((this.yF - this.y) / 50);
    } else if (this.entryFrameCount < 220) {
      this.reEnterFormation();
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
