class Enemy {
  constructor(x, y, xFormation, yFormation) {
    this.img = document.getElementById("enemy1");
    this.size = 50;
    this.x = x;
    this.y = y;
    this.xF = xFormation;
    this.yF = yFormation;
    this.xSpeed = ((this.xF - this.x) / 70);
    this.ySpeed = ((this.yF - this.y) / 70);
    this.entryCurveCount = 0;
    this.centerX = 341;
    this.centerY = 200;
    this.radius = 150;
    this.angle = 0;
  }

  moveEnemyFromEntrance() {
    this.angle += .02;
    this.x = this.centerX + Math.cos(this.angle) * this.radius;
    this.y = this.centerY + Math.sin(this.angle) * this.radius;
    this.entryCurveCount++;
  }

  moveEnemyToFormation() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.entryCurveCount++;
  }

  renderEnemy(canvas, ctx) {
    if (this.entryCurveCount < 150) {
      this.moveEnemyFromEntrance();
      this.xSpeed = ((this.xF - this.x) / 100);
      this.ySpeed = ((this.yF - this.y) / 100);
    } else if (this.entryCurveCount < 270) {
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
