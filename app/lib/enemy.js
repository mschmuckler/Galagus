class Enemy {
  constructor(x, y, xFormation, yFormation) {
    this.img = document.getElementById("enemy1");
    this.x = x;
    this.y = y;
    this.xF = xFormation;
    this.yF = yFormation;
    this.xSpeed = ((this.xF - this.x) / 120);
    this.ySpeed = ((this.yF - this.y) / 120);
    this.entryMoveCount = 0;
    this.diameter = 50;
  }

  moveEnemyFromEntrance() {
    if (this.entryMoveCount < 120) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.entryMoveCount++;
    }
  }

  renderEnemy(canvas, ctx) {
    this.moveEnemyFromEntrance();
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.diameter,
      this.diameter
    );
  }
}

export default Enemy;
