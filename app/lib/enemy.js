class Enemy {
  constructor(xFormation, yFormation, centerX, centerY, curveDirection) {
    this.img = document.getElementById("enemy1");
    this.size = 50;
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
    this.curveDirection = curveDirection;
  }

  moveEnemyFromEntrance() {
    this.angle += .015;
    this.x = this.centerX + ((Math.cos(this.angle) * this.radius) * this.curveDirection);
    this.y = this.centerY + Math.sin(this.angle) * this.radius;
    this.entryFrameCount++;
  }

  moveEnemyToFormation() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.entryFrameCount++;
  }

  renderEnemy(canvas, ctx) {
    if (this.entryFrameCount < 170) {
      this.moveEnemyFromEntrance();
      this.xSpeed = ((this.xF - this.x) / 50);
      this.ySpeed = ((this.yF - this.y) / 50);
    } else if (this.entryFrameCount < 220) {
      this.moveEnemyToFormation();
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
